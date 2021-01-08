import React from 'react';

import Canvas from './Canvas';

import cover from './covers/8372036-M.jpg';
// import cover from './covers/8401325-M.jpg'

function Covers() {

  // const width = 180;
  const number_of_pages = 216;
  const width = number_of_pages * 0.3;
  const height = 273;

  return (
    <div className="covers">
      <div>
        <p>Original cover</p>
        <img src={cover} alt="cover" />
      </div>
      <div>
        <p>Colour block</p>
        <Canvas width={width} height={height} mode="colourBlock" />
      </div>
      <div>
        <p>Colour gradient</p>
        <Canvas width={width} height={height} mode="colourGradient" />
      </div>
      <div>
        <p>Cover crop</p>
        <Canvas width={width} height={height} mode="coverCrop" />
      </div>
      <div>
        <p>Cover blur</p>
        <Canvas width={width} height={height} mode="coverBlur" />
      </div>
    </div>
  );
}

export default Covers;