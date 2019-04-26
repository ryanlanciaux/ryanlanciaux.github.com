import React, { useRef, useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Image from "./space-background.inline.svg"

const SpaceContainer = styled.div`
  height: 600px;
  overflow: hidden;
  width: 100%;
  position: absolute;
  z-index: -2;
  top: 0;

  @media (max-width: 800px) {
    height: ${props => props.mobileHeight || 600}px;
  }
`

const Hero = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 0) 0%,
    rgba(35, 15, 42, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h2 {
    font-size: 72px;

    @media (max-width: 1000px) {
      font-size: 48px;
    }
  }

  & h3 {
    font-weight: 400;
    font-size: 48px;
    color: ${({ theme }) => theme.colors.mainLight} !important;

    @media (max-width: 1000px) {
      font-size: 32px;
    }
  }
`

const NewImage = styled(Image)`
  opacity: 0.2;
  width: 100%;
  height: 100%;

  @media (max-width: 1000px) {
    height: 100%;
    width: auto;
  }
`

export const SpaceBackground = ({ children }) => {
  const [height, setHeight] = useState(0)
  const ref = useRef()

  useEffect(() => {
    const newHeight =
      ref && ref.current && ref.current.querySelector("div").offsetHeight
    setHeight(newHeight)
  })

  return (
    <SpaceContainer mobileHeight={height}>
      <div>
        <NewImage />
      </div>
      <Hero ref={ref}>{children}</Hero>
    </SpaceContainer>
  )
}
