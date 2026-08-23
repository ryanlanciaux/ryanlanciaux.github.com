import { useEffect, useRef } from "react"
import {
  AdditiveBlending,
  NormalBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three"
import {
  buildShape,
  FIELD_HALF_WIDTH,
  SHAPE_ORDER,
  SHAPE_SCALE,
} from "./orb-shapes"

/**
 * The particle orb behind the homepage hero.
 *
 * A single point cloud that cycles through five formations. The morph runs on
 * the GPU: each particle carries a `from` and a `to` position, and a uniform
 * drives the mix. Only when a transition finishes do we touch the buffers,
 * copying `to` into `from` and writing the next shape, so there is no
 * per-frame CPU work and no per-frame upload.
 *
 * Everything here is cheap to tear down, because Astro's view transitions
 * unmount and remount islands on navigation.
 */

const PARTICLES = 7000
const HOLD_MS = 2600 // time settled in a shape
/** The wave dwells longer: it's the one that runs the sonar pulse. */
const WAVE_HOLD_MS = 6200
const MORPH_MS = 1900 // time spent in transit

const VERT = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aScale;

  uniform float uProgress;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uTime;
  uniform float uPulse;

  varying float vDepth;
  varying float vBurst;
  varying float vRing;

  void main() {
    // smootherstep: no visible start/stop snap
    float t = uProgress;
    t = t * t * t * (t * (t * 6.0 - 15.0) + 10.0);

    vec3 pos = mix(aFrom, aTo, t);

    // Push outward mid-flight so the cloud blooms instead of sliding.
    float burst = sin(t * 3.14159265);
    pos += normalize(pos + vec3(0.0001)) * burst * 0.5 * aScale;

    // Sonar pulse: concentric rings expanding outward across the field, lifting
    // particles as each crest passes. Runs on the wave formation only (uPulse
    // ramps 0..1 when it settles). Distance is measured in the ground plane so
    // the rings read as sound spreading over a surface.
    float rxz = length(pos.xz);
    float phase = rxz * 3.2 - uTime * 2.0;
    // pow on a clipped sine gives discrete crests instead of a rolling swell
    float ring = pow(max(sin(phase), 0.0), 7.0);

    pos.y += ring * 0.85 * uPulse;
    vRing = ring * uPulse;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio / max(-mv.z, 0.1);
    gl_PointSize = clamp(gl_PointSize, 1.0, 14.0);

    vDepth = -mv.z;
    vBurst = burst;
  }
`

const FRAG = /* glsl */ `
  precision mediump float;

  uniform vec3 uColorNear;
  uniform vec3 uColorFar;
  uniform float uOpacity;

  varying float vDepth;
  varying float vBurst;
  varying float vRing;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    // soft round sprite
    float alpha = smoothstep(0.5, 0.08, d);
    // nearer particles read brighter
    float near = smoothstep(13.0, 4.0, vDepth);
    float lum = 0.42 + near * 0.58;
    vec3 col = mix(uColorFar, uColorNear, near * near);
    // flare slightly while in transit
    col += vBurst * 0.25;
    // and light up as a sonar crest sweeps through
    col += vRing * 0.55;

    gl_FragColor = vec4(col, alpha * (lum + vRing * 0.4) * uOpacity);
  }
`

export default function ParticleOrb() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      })
    } catch {
      // No WebGL. The CSS gradient behind this element stands on its own.
      return
    }

    const scene = new Scene()
    const camera = new PerspectiveCamera(46, 1, 0.1, 100)
    camera.position.z = 8.6

    // --- geometry -----------------------------------------------------------
    let shapeIndex = 0
    const from = buildShape(SHAPE_ORDER[0], PARTICLES)
    const to = buildShape(SHAPE_ORDER[1], PARTICLES)

    const scales = new Float32Array(PARTICLES)
    for (let i = 0; i < PARTICLES; i++) {
      // A few larger motes stop the cloud reading as flat noise.
      scales[i] = 0.7 + Math.pow(((i * 2654435761) % 1000) / 1000, 3) * 1.6
    }

    const geometry = new BufferGeometry()
    const fromAttr = new BufferAttribute(from, 3)
    const toAttr = new BufferAttribute(to, 3)
    geometry.setAttribute("aFrom", fromAttr)
    geometry.setAttribute("aTo", toAttr)
    geometry.setAttribute("aScale", new BufferAttribute(scales, 1))
    // `position` is unused by the shader but three needs it to count vertices.
    geometry.setAttribute("position", fromAttr)

    /**
     * Additive blending only works against a dark ground: on the light theme it
     * drives every particle toward white and the cloud disappears. Light mode
     * swaps to normal blending with dark teal particles so they read as ink on
     * paper instead.
     */
    function paletteFor(theme: string | undefined) {
      return theme === "light"
        ? {
            blending: NormalBlending,
            near: "#0e7490",
            far: "#7dd3e8",
            opacity: 0.9,
          }
        : {
            blending: AdditiveBlending,
            near: "#cffafe",
            far: "#0891b2",
            opacity: 1,
          }
    }

    let palette = paletteFor(document.documentElement.dataset.theme)

    const material = new ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: palette.blending,
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uPulse: { value: 0 },
        uSize: { value: 30.0 },
        uPixelRatio: { value: 1 },
        uOpacity: { value: 0 },
        uTargetOpacity: { value: palette.opacity },
        uColorNear: { value: new Color(palette.near) },
        uColorFar: { value: new Color(palette.far) },
      },
    })

    const points = new Points(geometry, material)
    scene.add(points)

    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.display = "block"

    // --- sizing -------------------------------------------------------------
    // Declared before resize(), which assigns to them on its first call.
    let visibleH = 7.3
    let visibleW = 7.3

    function resize() {
      const { clientWidth: w, clientHeight: h } = host!
      if (!w || !h) return
      // Cap DPR: past 2x the extra pixels buy nothing on a point cloud.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      renderer.setPixelRatio(dpr)
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.position.z = w < 640 ? 10.5 : 8.6
      camera.updateProjectionMatrix()
      material.uniforms.uPixelRatio.value = dpr

      // Scale uniformly — stretching x/z to fill a wide hero turned the sphere
      // into an ellipsoid. The actual factor is per-shape and applied in the
      // loop, so it can be interpolated through a morph; here we just record
      // how much world space the camera can see.
      const vFov = (camera.fov * Math.PI) / 180
      visibleH = 2 * Math.tan(vFov / 2) * camera.position.z
      visibleW = visibleH * camera.aspect
    }
    resize()

    /**
     * The formations are built wide, so the scale is driven by width: fill the
     * hero edge to edge. On a narrow, tall hero that alone would leave a thin
     * ribbon stranded in the middle, so there's a height-derived floor which
     * lets the field bleed off the sides instead.
     */
    function scaleFor(shape: (typeof SHAPE_ORDER)[number]) {
      const fillWidth = (visibleW / 2) / FIELD_HALF_WIDTH
      const floorForHeight = (visibleH / 2) / 2.4
      return Math.max(fillWidth, floorForHeight) * SHAPE_SCALE[shape]
    }

    const observer = new ResizeObserver(resize)
    observer.observe(host)

    // --- animation ----------------------------------------------------------
    let frame = 0
    const startedAt = performance.now()
    let phaseStart = startedAt
    let morphing = false
    let visible = true

    // Only run while the hero is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !frame) loop(performance.now())
      },
      { threshold: 0 }
    )
    io.observe(host)

    const themeWatcher = new MutationObserver(() => {
      palette = paletteFor(document.documentElement.dataset.theme)
      material.blending = palette.blending
      material.uniforms.uColorNear.value.set(palette.near)
      material.uniforms.uColorFar.value.set(palette.far)
      material.uniforms.uTargetOpacity.value = palette.opacity
      material.needsUpdate = true
      if (!frame) loop(performance.now())
    })
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    const onVisibility = () => {
      if (document.hidden) {
        visible = false
      } else {
        visible = true
        phaseStart = performance.now()
        if (!frame) loop(performance.now())
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    function advanceShape() {
      shapeIndex = (shapeIndex + 1) % SHAPE_ORDER.length
      const next = SHAPE_ORDER[(shapeIndex + 1) % SHAPE_ORDER.length]
      // What we just morphed *to* becomes the new starting point.
      from.set(to)
      to.set(buildShape(next, PARTICLES))
      fromAttr.needsUpdate = true
      toAttr.needsUpdate = true
      material.uniforms.uProgress.value = 0
    }

    function loop(now: number) {
      if (!visible) {
        frame = 0
        return
      }
      frame = requestAnimationFrame(loop)

      // fade in once the first frame is ready
      const target = material.uniforms.uTargetOpacity.value as number
      const op = material.uniforms.uOpacity.value as number
      if (Math.abs(op - target) > 0.005) {
        material.uniforms.uOpacity.value = op + (target - op) * 0.08
      }

      if (!reduceMotion) {
        // Wrapped at a multiple of the wave period so the phase never jumps.
        material.uniforms.uTime.value =
          ((now - startedAt) / 1000) % (Math.PI * 1000)

        // Pulse only while the sphere is settled, faded in and out so it never
        // pops on mid-morph.
        const onWave = !morphing && SHAPE_ORDER[shapeIndex] === "wave"
        const pulse = material.uniforms.uPulse.value as number
        const wanted = onWave ? 1 : 0
        material.uniforms.uPulse.value = pulse + (wanted - pulse) * 0.09

        const elapsed = now - phaseStart

        if (morphing) {
          const t = Math.min(1, elapsed / MORPH_MS)
          material.uniforms.uProgress.value = t
          if (t >= 1) {
            advanceShape()
            morphing = false
            phaseStart = now
          }
        } else if (
          elapsed >=
          (SHAPE_ORDER[shapeIndex] === "wave" ? WAVE_HOLD_MS : HOLD_MS)
        ) {
          morphing = true
          phaseStart = now
        }

        // Scale rides the same eased curve as the morph, so a shape grows or
        // shrinks into place rather than snapping when the transition ends.
        const p = material.uniforms.uProgress.value as number
        const eased = p * p * p * (p * (p * 6 - 15) + 10)
        const a = scaleFor(SHAPE_ORDER[shapeIndex])
        const b = scaleFor(SHAPE_ORDER[(shapeIndex + 1) % SHAPE_ORDER.length])
        points.scale.setScalar(a + (b - a) * eased)

        // A fixed tilt gives the field perspective; the rest is a slow sway.
        // A full Y spin would swing the long axis into depth and the field
        // would go narrow twice a revolution.
        points.rotation.y = Math.sin(now * 0.00011) * 0.26
        points.rotation.x = 0.3 + Math.sin(now * 0.00008) * 0.07
        points.rotation.z = Math.sin(now * 0.00006) * 0.03
      }

      if (reduceMotion) {
        points.scale.setScalar(scaleFor(SHAPE_ORDER[shapeIndex]))
      }

      renderer.render(scene, camera)
    }

    loop(performance.now())

    // --- teardown -----------------------------------------------------------
    return () => {
      if (frame) cancelAnimationFrame(frame)
      observer.disconnect()
      io.disconnect()
      themeWatcher.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={hostRef} className="orb-canvas" aria-hidden="true" />
}
