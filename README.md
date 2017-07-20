<h1 align="center">domToTexture</h1>

<br><br>
Transform DOMNode (like font stuff) to image(texture) with Blob & Foreign object SVG methods
<br><br>

## Features

<br>

## Installation

```sh
npm install antoninlanglade/domToTexture -S
```

<br>

## Example
See example folder

```js
var texture = domToTexture(domNode, (img, svg) => {
  container.appendChild(svg);
  container.appendChild(img);
});
```

<br>

## License
MIT.
