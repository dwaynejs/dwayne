import io from 'socket.io-client';
import { find, body, document as doc, Elem } from './dwayne';

body.css('margin', '0px');

const livereload = find('#livereload');
const ready = doc.img('$src(/test/images/checkmark.png)');
const loading = doc.img('$src(/test/images/loading.gif)');

new Elem([ready, loading])
  .css({
    width: '30px',
    height: '30px'
  })
  .load()
  .then(() => {
    livereload

      .css({
        position: 'absolute',
        top: '0',
        left: '0',
        padding: '10px 0 0 10px',
        width: '50px',
        height: '50px',
        borderBottomRightRadius: '50px',
        backgroundColor: 'green'
      })
      .child(ready);
  });

const socket = io();

socket.on('connect', () => {
  console.log('livereload enabled');
});

socket.on('toreload', () => {
  console.log('something changed...');

  livereload
    .css({
      backgroundColor: 'orange'
    });

  ready.replace(loading);
});

socket.on('reload', () => {
  console.log('reloading...');

  location.reload();
});
