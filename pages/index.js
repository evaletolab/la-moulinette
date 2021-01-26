import React from 'react';
import Link from 'next/link';


// Open WebSocket connection to ShareDB server
import ReconnectingWebSocket  from 'reconnecting-websocket';
import * as sharedb from 'sharedb/lib/client'


// BBBBBBBBAAAAADD boy programming
let socket = null; 


export default class HomePage extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            status: null,
            content: "",
        }; 
    }

    componentDidMount(){
        // only run if we are on the browser
        if(process.browser && !socket){
            console.log("creating socket-----------------------------------------");
            socket = new ReconnectingWebSocket('ws://localhost:8080');
            socket.addEventListener('open', function () {
                this.setState({
                    status: 'Connected'
                });
            }.bind(this));

            socket.addEventListener('close', function () {
                this.setState({
                    status: 'Closed'
                });
            }.bind(this));

            socket.addEventListener('error', function () {
                this.setState({
                    status: 'Error'
                });
            }.bind(this));
            
            const connection = new sharedb.Connection(socket);
            const doc = connection.get('la-moulinette');
            doc.subscribe(function (err) {
                if (err) throw err;
                console.log('--- ', doc.data.content);
                this.setState({content:doc.data.content});
            }.bind(this));
        }
    }

    render(){
        return (
            <div>
                <h1>the moulinette</h1>
                <Link href="/about"><a>about</a></Link>
                <p>status: {this.state.status}</p>
                <p>{this.state.content}</p>
            </div>
        );
    }
}