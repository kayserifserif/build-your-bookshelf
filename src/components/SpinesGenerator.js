// modules
import React from 'react';
import PropTypes from 'prop-types';
import { usePalette } from 'react-palette';
// components
import Spine from './Spine';
// assets
import './SpinesGenerator.css';

/**
 * Panel displaying spines generated from given book cover.
 */
function SpinesGenerator(props) {

  let coverUrl = "https://covers.openlibrary.org/b/olid/" + props.data.cover_edition_key + "-M.jpg";
  let coverUrlCors = "https://cors-anywhere.herokuapp.com/" + coverUrl;

  const palette = usePalette(coverUrlCors);

  return (
    <div className="spines">
      {/*<div>
        <p>Original cover</p>
        <img src={coverUrl} alt="cover" />
      </div>*/}
      <div className="spines_mode">
        <p>Color block</p>
        <button>
          <Spine
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
      <div className="spines_mode">
        <p>Color gradient</p>
        <button>
          <Spine
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
      <div className="spines_mode">
        <p>Cover crop</p>
        <button>
          <Spine
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
      <div className="spines_mode">
        <p>Cover blur</p>
        <button>
          <Spine
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
    props.handleAdd(spineData);
  }

}

SpinesGenerator.propTypes = {
  /**
   * Book data from Open Library
   */
  data: PropTypes.object.isRequired,
  /**
   * Handler for adding spine canvas
   */
  handleAdd: PropTypes.func.isRequired,
};

SpinesGenerator.defaultProps = {
  handleAdd: e => console.log(e)
};

export default SpinesGenerator;