import io from 'socket.io-client';
import { find, body, doc, Elem } from './src/Elem';

body.css({
  margin: '0px',
  paddingLeft: '100px'
});

const livereload = find('#livereload');
const ready = doc
  .create('img')
  .attr('src', '/test/images/checkmark.png');
const loading = doc
  .create('img')
  .attr('src', '/test/images/loading.gif');

new Elem([ready, loading]).css({
  width: '30px',
  height: '30px'
});

livereload.css({
  position: 'fixed',
  top: '0',
  left: '0',
  padding: '10px 0 0 10px',
  width: '50px',
  height: '50px',
  borderBottomRightRadius: '50px',
  backgroundColor: 'rgba(0,127,0,0.4)'
});
ready.into(livereload);

const socket = io();

socket.on('connect', () => {
  console.log('%c%s', colored('green'), 'livereload enabled');
});

socket.on('toreload', () => {
  console.log('%c%s', colored('orange'), 'something changed...');

  livereload.css({
    backgroundColor: 'rgba(255,127,0,0.4)'
  });

  ready.replace(loading);
});

socket.on('reload', () => {
  console.log('%c%s', colored('red'), 'reloading...');

  location.reload();
});

function colored(color) {
  return `color: ${ color }; font-weight: 900; font-size: 16px;`;
}
