// modules
import React from 'react';
// components
import SpineGenerator from './SpineGenerator';
// assets
import coverData from './covers/covers.json'

console.log(coverData);

// https://stackoverflow.com/questions/53762640/how-to-import-all-images-from-a-folder-in-reactjs
function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('./covers', false, /\.jpg$/));
console.log(images);

// https://github.com/gabrielarchanjo/marvinj

function Spines(props) {
  const id = Object.keys(coverData)[Math.floor(Math.random() * Object.keys(coverData).length)];
  return (
    <SpineGenerator data={coverData[id]} />
  );
}

export default Spines;