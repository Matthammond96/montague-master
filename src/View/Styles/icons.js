import React from 'react'

export const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.6 64.7"><path fill="#1c1c1c" d="M10.4 13.2c6.1-1 20.8-3 34.4-3s28.3 2 34.4 3v14.5h7.1V7.2l-2.9-.5c-.8-.1-20.3-3.6-38.6-3.6S7.1 6.5 6.2 6.7l-2.9.5v21.2h7.1V13.2zm32.7 14.4H19.2c0-2.8 5.4-5.1 12-5.1s11.9 2.3 11.9 5.1zm27.1 0H46.3c0-2.8 5.4-5.1 12-5.1s11.9 2.3 11.9 5.1zm18 6.9c-.8-.7-1.9-.9-2.9-.7-.1 0-6 1.2-14 1.2-4.7 0-9.1-.4-13.2-1.2-5-1-12.3-1.5-21.8-1.5-15.9 0-32.8 1.4-33 1.4-1.8.2-3.2 1.7-3.2 3.5v15.6c0 1.9 1.6 3.5 3.5 3.5H4l1.3 5.3h3.5l1.3-5.3h69.4l1.3 5.3h3.5l1.3-5.3h.4c1.9 0 3.5-1.6 3.5-3.5V37.2c0-1-.5-2-1.3-2.7z"/></svg>
)

export const BathIcon = () => (
<svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.000000 30.000000"><g transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
fill="#1c1c1c" stroke="none"><path d="M340 280 c-12 -12 -18 -26 -14 -32 5 -7 10 -4 15 10 9 24 38 29 57
10 7 -7 12 -29 12 -50 l0 -38 -207 0 c-113 0 -204 -3 -201 -6 9 -8 438 -10
438 -1 0 4 -4 7 -10 7 -5 0 -10 20 -10 43 0 30 -6 49 -18 60 -24 22 -38 21
-62 -3z"/><path d="M26 141 c-9 -15 9 -54 39 -81 25 -23 35 -25 145 -28 133 -4 168 7
195 58 32 61 34 60 -179 60 -107 0 -197 -4 -200 -9z"/><path d="M67 24 c-8 -8 1 -24 14 -24 5 0 9 7 9 15 0 15 -12 20 -23 9z"/><path d="M356 21 c-4 -5 -2 -12 3 -15 5 -4 12 -2 15 3 4 5 2 12 -3 15 -5 4
-12 2 -15 -3z"/></g></svg>
)

export const ArrowLeft = (props) => {
  let colour = "#ffffff";
  let weight = 6;
  if (props.colour) { colour = props.colour };
  if (props.weight) { weight = props.weight };
  return (
    <svg version="1.1" class="icon icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94 180.18">
      <path fill="none" stroke={colour} stroke-width={weight} stroke-linecap="round" stroke-linejoin="round" d="M4.28,90.59 C37,123.4,57.36,143.34,90,176.18"></path>
      <path fill="none" stroke={colour} stroke-width={weight} stroke-linecap="round" stroke-linejoin="round" d="M4,90.29 C36.73,57.59,57.23,36.71,90,4"></path>
    </svg>
  )
}

export const ArrowRight = (props) => {
  let colour = "#ffffff";
  let weight = 6;
  if (props.colour) { colour = props.colour };
  if (props.weight) { weight = props.weight };
  return (
    <svg version="1.1" class="icon icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94 180.18">
      <path fill="none" stroke={colour} stroke-width={weight} stroke-linecap="round" stroke-linejoin="round" d="M89.72,90.61 C57.04,123.41,36.64,143.35,4,176.19"></path>
      <path fill="none" stroke={colour} stroke-width={weight} stroke-linecap="round" stroke-linejoin="round" d="M90,90.3 C57.27,57.55,36.77,36.72,4,4"></path>
    </svg>
  )
}