/**
 * Point-cloud formations for the hero field.
 *
 * Every formation is authored *wide* — roughly 4:1 — rather than being a
 * compact object that gets scaled up. That distinction matters: a compact
 * shape's on-screen width is capped by the hero's height, so it can never span
 * a wide hero without either distorting or getting cropped. Building the
 * geometry wide in the first place means the field fills the hero edge to edge
 * at any viewport, and the scale only has to fit the width.
 *
 * They share a coordinate budget (see FIELD_* below) so morphing between any
 * two is a straight per-component lerp with no rescaling.
 */

export type ShapeName = "lattice" | "wave" | "equalizer" | "disc"

export const SHAPE_ORDER: ShapeName[] = ["lattice", "wave", "equalizer", "disc"]

/** Horizontal half-extent every formation is built to. */
export const FIELD_HALF_WIDTH = 3.0
const HALF_H = 0.78
const HALF_D = 1.35

const TAU = Math.PI * 2

/** Deterministic PRNG so the field looks identical on every load. */
function makeRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0x100000000
  }
}

/** A long box lattice: the cube, stretched into a slab that spans the hero. */
function lattice(out: Float32Array, count: number) {
  const rand = makeRandom(9871)
  const nx = 15
  const ny = 4
  const nz = 6

  for (let i = 0; i < count; i++) {
    // Each point sits on a grid line running along one axis.
    const axis = i % 3
    const t = rand()
    const gy = -HALF_H + Math.floor(rand() * ny) * ((HALF_H * 2) / (ny - 1))
    const gz = -HALF_D + Math.floor(rand() * nz) * ((HALF_D * 2) / (nz - 1))
    const gx =
      -FIELD_HALF_WIDTH +
      Math.floor(rand() * nx) * ((FIELD_HALF_WIDTH * 2) / (nx - 1))

    if (axis === 0) {
      out[i * 3] = -FIELD_HALF_WIDTH + t * FIELD_HALF_WIDTH * 2
      out[i * 3 + 1] = gy
      out[i * 3 + 2] = gz
    } else if (axis === 1) {
      out[i * 3] = gx
      out[i * 3 + 1] = -HALF_H + t * HALF_H * 2
      out[i * 3 + 2] = gz
    } else {
      out[i * 3] = gx
      out[i * 3 + 1] = gy
      out[i * 3 + 2] = -HALF_D + t * HALF_D * 2
    }
  }
}

/** A wide rippling surface. This is the formation the sonar pulse runs on. */
function wave(out: Float32Array, count: number) {
  const side = Math.ceil(Math.sqrt(count))

  for (let i = 0; i < count; i++) {
    const gx = i % side
    const gz = Math.floor(i / side)
    const u = (gx / (side - 1)) * 2 - 1
    const v = (gz / (side - 1)) * 2 - 1

    const x = u * FIELD_HALF_WIDTH
    const z = v * HALF_D * 1.25
    const dist = Math.hypot(u * 2.2, v)

    out[i * 3] = x
    out[i * 3 + 1] = Math.sin(dist * 4.2) * 0.42 * Math.exp(-dist * 0.5)
    out[i * 3 + 2] = z
  }
}

/** Vertical bars across the width, like a spectrum readout. */
function equalizer(out: Float32Array, count: number) {
  const rand = makeRandom(5521)
  const bars = 46
  const rows = 3

  for (let i = 0; i < count; i++) {
    const bar = i % bars
    const row = Math.floor(rand() * rows)
    const u = bar / (bars - 1)

    // A stable pseudo-height per bar so the silhouette reads as a spectrum
    // rather than noise.
    const h =
      0.18 +
      (Math.sin(bar * 1.7) * 0.5 + 0.5) * 0.55 +
      (Math.sin(bar * 0.41) * 0.5 + 0.5) * 0.35

    out[i * 3] = (u * 2 - 1) * FIELD_HALF_WIDTH
    out[i * 3 + 1] = -HALF_H + rand() * h * HALF_H * 2.4
    out[i * 3 + 2] = -HALF_D + (row / (rows - 1)) * HALF_D * 2
  }
}

/** A flat spiral disc, elongated so it reads wide rather than round. */
function disc(out: Float32Array, count: number) {
  const rand = makeRandom(2207)
  const arms = 3
  const armAngle = TAU / arms

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const r = Math.pow(t, 0.62)
    const arm = i % arms
    const scatter = (rand() - 0.5) * 0.45 * (0.25 + t)
    const angle = arm * armAngle + r * 5.4 + scatter

    out[i * 3] = Math.cos(angle) * r * FIELD_HALF_WIDTH
    out[i * 3 + 1] = (rand() - 0.5) * 0.3 * (1 - t * 0.6)
    out[i * 3 + 2] = Math.sin(angle) * r * HALF_D * 1.3
  }
}

const BUILDERS: Record<ShapeName, (out: Float32Array, count: number) => void> = {
  lattice,
  wave,
  equalizer,
  disc,
}

/** Small per-formation nudges so none reads visually smaller than the rest. */
export const SHAPE_SCALE: Record<ShapeName, number> = {
  lattice: 1,
  wave: 1.04,
  equalizer: 1,
  disc: 1.06,
}

export function buildShape(name: ShapeName, count: number): Float32Array {
  const out = new Float32Array(count * 3)
  BUILDERS[name](out, count)
  return out
}
