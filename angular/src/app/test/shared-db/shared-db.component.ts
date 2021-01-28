import { Component, OnInit } from '@angular/core';

import sharedb  from 'sharedb/lib/client';
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
  }

}
