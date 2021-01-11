import React from 'react';
import { usePalette } from 'react-palette';

import Canvas from './Canvas';
// import coverData from './covers/covers.json'

// console.log(coverData);

// // https://stackoverflow.com/questions/53762640/how-to-import-all-images-from-a-folder-in-reactjs
// function importAll(r) {
//   return r.keys().map(r);
// }
// const images = importAll(require.context('./covers', false, /\.jpg$/));
// console.log(images);

// https://github.com/gabrielarchanjo/marvinj

// const id = Object.keys(coverData)[Math.floor(Math.random() * Object.keys(coverData).length)];
// const data = coverData[id];
// const path = data.path;

function CoverGenerator(props) {

  let coverUrl = "https://covers.openlibrary.org/b/olid/" + props.data.cover_edition_key + "-M.jpg";
  let coverUrlCors = "https://cors-anywhere.herokuapp.com/" + coverUrl;

  const palette = usePalette(coverUrlCors);

  return (
    <div className="covers">
      {/*<div>
        <p>Original cover</p>
        <img src={coverUrl} alt="cover" />
      </div>*/}
      <div>
        <p>Colour block</p>
        <button>
          <Canvas
            mode="colourBlock" data={props.data}
            colors={palette.data}
            handleAdd={props.handleAdd} />
        </button>
      </div>
      <div>
        <p>Colour gradient</p>
        <button>
          <Canvas
            mode="colourGradient" data={props.data}
            colors={palette.data}
            handleAdd={props.handleAdd} />
        </button>
      </div>
      <div>
        <p>Cover crop</p>
        <button>
          <Canvas
            mode="coverCrop" data={props.data}
            cover_url={coverUrl}
            handleAdd={props.handleAdd} />
        </button>
      </div>
      <div>
        <p>Cover blur</p>
        <button>
          <Canvas
            mode="coverBlur" data={props.data}
            cover_url={coverUrl}
            handleAdd={props.handleAdd} />
        </button>
      </div>
    </div>
  );

}

export default CoverGenerator;