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
        <p>Color block</p>
        <button>
          <SpineCanvas
            mode="colorBlock" data={props.data}
            cover_url={coverUrl} colors={palette.data}
            handleAdd={handleAdd.bind(this, {
              mode: 'colorBlock',
              data: props.data,
              cover_url: coverUrl,
              colors: palette.data
            })} />
        </button>
      </div>
      <div>
        <p>Color gradient</p>
        <button>
          <SpineCanvas
            mode="colorGradient" data={props.data}
            cover_url={coverUrl} colors={palette.data}
            handleAdd={handleAdd.bind(this, {
              mode: 'colorGradient',
              data: props.data,
              cover_url: coverUrl,
              colors: palette.data
            })} />
        </button>
      </div>
      <div>
        <p>Cover crop</p>
        <button>
          <SpineCanvas
            mode="coverCrop" data={props.data}
            cover_url={coverUrl}
            handleAdd={handleAdd.bind(this, {
              mode: 'coverCrop',
              data: props.data,
              cover_url: coverUrl,
              colors: palette.data
            })} />
        </button>
      </div>
      <div>
        <p>Cover blur</p>
        <button>
          <SpineCanvas
            mode="coverBlur" data={props.data}
            cover_url={coverUrl}
            handleAdd={handleAdd.bind(this, {
              mode: 'coverBlur',
              data: props.data,
              cover_url: coverUrl,
              colors: palette.data
            })} />
        </button>
      </div>
    </div>
  );

  function handleAdd(spineData) {
    console.log("SpineGenerator", spineData);
    props.handleAdd(spineData);
  }

}

export default SpineGenerator;