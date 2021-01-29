import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import sharedb  from 'sharedb/lib/client';
import * as StringBinding from 'sharedb-string-binding';


import ReconnectingWebSocket  from 'reconnecting-websocket';

const socket = new ReconnectingWebSocket('ws://' + window.location.host);


@Component({
  selector: 'app-shared-db',
  templateUrl: './shared-db.component.html',
  styleUrls: ['./shared-db.component.scss']
})
export class SharedDbComponent implements OnInit {

  status: string;
  backgroundColor:string;
  connection: any;

  @ViewChild('editor') editor: ElementRef;


  constructor() { 
    this.backgroundColor = 'white';
    this.status = '';
  }

  ngOnInit(): void {

    socket.addEventListener('open', () => {
      this.status = 'Connected';
      this.backgroundColor = 'white';
    });
    
    socket.addEventListener('close', () => {
      this.status = 'Closed';
      this.backgroundColor = 'gray';
    });
    
    socket.addEventListener('error', () => {
      this.status = 'Error';
      this.backgroundColor = 'red';
    });    

    this.connection = new sharedb.Connection(socket);

    // Create local Doc instance mapped to 'examples' collection document with id 'textarea'
    const doc = this.connection.get('la-moulinette','test');
    doc.subscribe((err) => {
      if (err) throw err;

      console.log('----',this.editor);
      console.log('----',doc);
      
      const binding = new StringBinding(this.editor.nativeElement, doc, ['content']);
      binding.setup();
    });    
  }

}
