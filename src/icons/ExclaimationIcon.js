import React from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
  width: 1.6rem;
  height: 1.6rem;
`

const IconPath = styled.path`
  fill: #d33;
`

const TextGroup = styled.g`
  fill: #fff;
  font-family: "College Slab";
  font-size: 144px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.25;
  word-spacing: 0;
`

const TextPath = styled.path`
  font-family: "Lato";
  -inkscape-font-specification: "Lato Bold";
`

const Circle = styled.circle`
  fill: #fff;
`

export default function ExclamationIcon() {
  return (
    <SVG 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 451.42902 451.42902"
    >
      <g transform="translate(-2887.5916 -192.36151)">
        <IconPath d="M3339.02061728 418.07602803a225.71451193 225.71451193 0 0 1-225.71457045 225.71450023 225.71451193 225.71451193 0 0 1-225.71446512-225.71450023 225.71451193 225.71451193 0 0 1 225.71446512-225.71451193 225.71451193 225.71451193 0 0 1 225.71457045 225.71451193Z" />
        <TextGroup 
          transform="rotate(180 5463.0805 -69.24581) scale(3.14355)"
          style={{
            lineHeight: "125%",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          <TextPath d="M2494.2863-197.59079v73.872h-17.856v-73.872h17.856" />
          <Circle 
            cx="139.73659"
            cy="101.28652"
            r="35.067654"
            transform="translate(2440.9065 -251.44719) scale(.31811)"
          />
        </TextGroup>
      </g>
    </SVG>
  )
}