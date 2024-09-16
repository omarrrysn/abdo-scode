import myImagePng from './image.png';
import myImageSvg from './image.svg';
import myImageJpeg from './image.jpeg';
import myImageJpg from './image.jpg';

const imgPng = document.createElement('img');
imgPng.src = myImagePng;
imgPng.alt = 'PNG Example';

const imgSvg = document.createElement('img');
imgSvg.src = myImageSvg;
imgSvg.alt = 'SVG Example';

const imgJpeg = document.createElement('img');
imgJpeg.src = myImageJpeg;
imgJpeg.alt = 'JPEG Example';

const imgJpg = document.createElement('img');
imgJpg.src = myImageJpg;
imgJpg.alt = 'JPG Example';

// Append the images to the document body (or any other element)
document.body.appendChild(imgPng);
document.body.appendChild(imgSvg);
document.body.appendChild(imgJpeg);
document.body.appendChild(imgJpg);
