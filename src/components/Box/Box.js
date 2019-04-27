import React from "react"
import styled from "styled-components"
import { Box as BassBox } from "@rebass/grid"

const Box = styled(BassBox)`
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 2px solid ${({ theme }) => theme.colors.secondary};

  color: ${({ theme }) => theme.colors.main};
  padding: 3rem;
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    color: ${({ theme }) => theme.colors.secondary};
  }

  & a {
    color: ${({ theme }) => theme.colors.secondaryDark};
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

export default Box
