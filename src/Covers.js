import React from 'react';
import { usePalette } from 'react-palette';

import Canvas from './Canvas';
import coverData from './covers/covers.json'

console.log(coverData);

// https://stackoverflow.com/questions/53762640/how-to-import-all-images-from-a-folder-in-reactjs
// function importAll(r) {
//   return r.keys().map(r);
// }
// const images = importAll(require.context('./covers', false, /\.jpg$/));
// const i = Math.floor(Math.random() * images.length);

const id = Object.keys(coverData)[Math.floor(Math.random() * Object.keys(coverData).length)];
const data = coverData[id];
const path = data.path;

function Covers() {

  const palette = usePalette(path);

  return (
    <div className="covers">
      <div>
        <p>Original cover</p>
        <img src={path} alt="cover" />
      </div>
      <div>
        <p>Colour block</p>
        <Canvas width={data.pages * 0.3} height={data.height} mode="colourBlock" data={data} colors={palette.data} />
      </div>
      <div>
        <p>Colour gradient</p>
        <Canvas width={data.pages * 0.3} height={data.height} mode="colourGradient" data={data} colors={palette.data} />
      </div>
      <div>
        <p>Cover crop</p>
        <Canvas width={data.pages * 0.3} height={data.height} mode="coverCrop" data={data} image={path} />
      </div>
      <div>
        <p>Cover blur</p>
        <Canvas width={data.pages * 0.3} height={data.height} mode="coverBlur" data={data} image={path} />
      </div>
    </div>
  );
}

export default Covers;