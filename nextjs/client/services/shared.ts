// FIXME importing sharedb create an error 
//import { sharedb } from 'sharedb/lib/client';
import * as sharedb from 'sharedb/lib/client'


// Open WebSocket connection to ShareDB server
import ReconnectingWebSocket  from 'reconnecting-websocket';

import { writable } from 'svelte/store';


const socket = new ReconnectingWebSocket('ws://' + window.location.host);


export const status = writable('Not Connected');
export const backgroundColor = writable('gray');
export const content = writable('');

socket.addEventListener('open', function() {
  //status.update('Connected');
  //backgroundColor.update('white');
});

socket.addEventListener('close', function() {
  // status.update('Closed');
  // backgroundColor.update('gray');
});

socket.addEventListener('error', function() {
  // status.update('Error');
  // backgroundColor.update('red');
});

//
// Create local Doc instance mapped to 'examples' collection document with id 'textarea'
// FIXME import sharedb
// const connection = new sharedb.Connection(socket);
// const doc = connection.get('la-moulinette');
// doc.subscribe(function(err) {
//   if (err) throw err;
//   console.log('--- ', doc);
//   content.update(doc);
// });
