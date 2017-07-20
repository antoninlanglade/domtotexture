import copyStyles from 'copy-styles';
import sniffer from 'sniffer';

function domToTexture(el, onLoad) {

  const bounds = el.getBoundingClientRect();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const g = document.createElementNS('http://www.w3.org/2000/svg',"g");
  const foreign = document.createElementNS('http://www.w3.org/2000/svg',"foreignObject");
  const text = document.createElement('div');

  text.innerHTML = el.innerHTML;

  foreign.appendChild(text);
  g.appendChild(foreign);
  svg.appendChild(g);

  function setAttributes() {
    svg.setAttribute('width', bounds.width);
    svg.setAttribute('height',bounds.height);

    svg.setAttribute('viewbox', `0 0 ${bounds.width} ${bounds.height}`);

    g.setAttribute('width', bounds.width);
    g.setAttribute('height',bounds.height);

    foreign.setAttribute('width', bounds.width);
    foreign.setAttribute('height',bounds.height);

    const allNode1 = el.getElementsByTagName('*');
    const allNode2 = text.getElementsByTagName('*');

    copyStyles(el, text);
    for (var i = 0; i < allNode1.length; i++) {
      copyStyles(allNode1[i], allNode2[i]);
    }
  };

  const createBlob = () => {
    var img = new Image();
    var data = (new XMLSerializer()).serializeToString(svg);
    var DOMURL = window.URL || window.webkitURL || window;
    var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svgBlob);

    if (sniffer.isSafari) {
      var reader = new window.FileReader();
      reader.readAsDataURL(svgBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        img.src = base64data;
        onLoad && onLoad(img, svg);
      }
    } else {
      img.src = url;
      onLoad && onLoad(img, svg);
    }
  };

  setAttributes();
  createBlob();
}

export default domToTexture;