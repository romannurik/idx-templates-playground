import { setup3dScene } from './scene';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div class="root">
    <div class="body">
      <h1>Hello, Three.js!</h1>
      <p>
        This is a demo of <a href="https://threejs.org/">Three.js</a>.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis vitae lacus congue eleifend. Pellentesque laoreet condimentum nunc eu faucibus. Sed mollis nisl non ante rhoncus, nec ornare urna malesuada. Duis at ipsum eget ex scelerisque imperdiet. In venenatis magna vel mauris auctor volutpat. Sed non lobortis augue.
      </p>
      <p>
        Vivamus molestie, leo quis vulputate finibus, urna sem porttitor magna, eget viverra lacus nisl et lorem. Aenean blandit maximus volutpat. Pellentesque in bibendum nulla. Duis vehicula est sed pharetra dictum. Donec diam diam, placerat in sagittis sit amet. Aliquam molestie metus eget nisi tristique, feugiat pellentesque ipsum mattis. Nam sagittis dignissim condimentum. Maecenas volutpat eros at augue maximus, id pretium neque porttitor.
      </p>
    </div>
    <div class="three"></div>
  </div>
`;

setup3dScene('.three');