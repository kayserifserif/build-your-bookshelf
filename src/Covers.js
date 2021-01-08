import React from 'react';
import { usePalette } from 'react-palette';

import Canvas from './Canvas';

// https://stackoverflow.com/questions/53762640/how-to-import-all-images-from-a-folder-in-reactjs
function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./covers', false, /\.jpg$/));
const i = Math.floor(Math.random() * images.length);

function Covers() {

  // const width = 180;
  const number_of_pages = 216;
  const width = number_of_pages * 0.3;
  const height = 273;

  const { data, loading, error } = usePalette(images[i].default);

  return (
    <div className="covers">
      <div>
        <p>Original cover</p>
        <img src={images[i].default} alt="cover" />
      </div>
      <div>
        <p>Colour block</p>
        <Canvas width={width} height={height} mode="colourBlock" colors={data} />
      </div>
      <div>
        <p>Colour gradient</p>
        <Canvas width={width} height={height} mode="colourGradient" colors={data} />
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