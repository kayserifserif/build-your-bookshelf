import React from 'react';
import { usePalette } from 'react-palette';

import SpineCanvas from './SpineCanvas';

function SpineGenerator(props) {

  let coverUrl = "https://covers.openlibrary.org/b/olid/" + props.data.cover_edition_key + "-M.jpg";
  let coverUrlCors = "https://cors-anywhere.herokuapp.com/" + coverUrl;

  const palette = usePalette(coverUrlCors);

  return (
    <div className="spines">
      {/*<div>
        <p>Original cover</p>
        <img src={coverUrl} alt="cover" />
      </div>*/}
      <div>
        <p>Colour block</p>
        <button>
          <SpineCanvas
            mode="colourBlock" data={props.data}
            cover_url={coverUrl} colors={palette.data}
            handleAdd={props.handleAdd} />
        </button>
      </div>
      <div>
        <p>Colour gradient</p>
        <button>
          <SpineCanvas
            mode="colourGradient" data={props.data}
            cover_url={coverUrl} colors={palette.data}
            handleAdd={props.handleAdd} />
        </button>
      </div>
      <div>
        <p>Cover crop</p>
        <button>
          <SpineCanvas
            mode="coverCrop" data={props.data}
            cover_url={coverUrl}
            handleAdd={props.handleAdd} />
        </button>
      </div>
      <div>
        <p>Cover blur</p>
        <button>
          <SpineCanvas
            mode="coverBlur" data={props.data}
            cover_url={coverUrl}
            handleAdd={props.handleAdd} />
        </button>
      </div>
    </div>
  );

}

export default SpineGenerator;