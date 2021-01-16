// modules
import React from 'react';
// components
import SpinesGenerator from '../components/SpinesGenerator';
// assets
import coverData from '../assets/covers/covers.json'

console.log(coverData);

// https://stackoverflow.com/questions/53762640/how-to-import-all-images-from-a-folder-in-reactjs
function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('../assets/covers', false, /\.jpg$/));
console.log(images);

// https://github.com/gabrielarchanjo/marvinj

function Spines(props) {
  const id = Object.keys(coverData)[Math.floor(Math.random() * Object.keys(coverData).length)];
  return (
    <SpinesGenerator data={coverData[id]} />
  );
}

export default Spines;