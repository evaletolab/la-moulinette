<template>
    <div>
        <h2>Sharedb Test</h2>
        <p>status {{status}}</p>
        <span>Multiline message is:</span>
        <p style="white-space: pre-line;">{{ content }}</p>
        <br>
        <textarea v-model="content" placeholder="content-here"></textarea>
    </div>

</template>


<script>
import ReconnectingWebSocket  from 'reconnecting-websocket';
import * as sharedb from 'sharedb/lib/client'; 

export default {
    data: function(){
        return {
            status:"NOT CONNECTED",
            content:"",
            socket:null
        };
    },

    mounted(){
        this.initSharedb();
    },

    methods:{
        initSharedb(){
            // move this to service
            // implement cleanup
            this.socket = new ReconnectingWebSocket('ws://127.0.0.1:8090');
            console.log("init");
            this.socket.addEventListener('open', function() {
                this.status = 'connected';
            }.bind(this));

            this.socket.addEventListener('close', function() {
                this.status = 'closed';
            }.bind(this));

            this.socket.addEventListener('error', function() {
                this.status = 'connection-error';
            }.bind(this));
            const connection = new sharedb.Connection(this.socket);
            const doc = connection.get('la-moulinette');
            doc.subscribe(function(err) {
                if (err) throw err;
                console.log('--- ', doc);
                this.content = doc.data.content;
                console.log(this.content);
            }.bind(this));
        }
    }

}
</script>

<style>

</style>