import domToTexture from '../src/index.js';

var text = document.getElementById('text');
var container = document.getElementById('container');

var texture = domToTexture(text, (img, svg) => {
  container.appendChild(svg);
  container.appendChild(img);
});

