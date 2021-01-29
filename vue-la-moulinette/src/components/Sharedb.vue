<template>
    <div>
        <h2>Sharedb Test</h2>
        <p>status {{status}}</p>
        <!-- <p style="white-space: pre-line;">{{ content }}</p> -->
        <br>
        <!-- <textarea v-model="content" placeholder="content-here"></textarea> -->
        <textarea ref="textarea" placeholder="content-here"></textarea>
    </div>

</template>


<script>
import ReconnectingWebSocket  from 'reconnecting-websocket';
import * as sharedb from 'sharedb/lib/client';
import * as StringBinding from 'sharedb-string-binding';


export default {
    data: function(){
        return {
            status:"NOT CONNECTED",
            content:"", // TODO implement sharedb updates with vue reactive variable
            socket:null
        };
    },

    mounted(){
        this.initSharedb();
    },

    watch:{
        content: function(val, oldVal){
            // would allow to update content with sharedb while keeping control of state
            // in vue
            console.log(val, oldVal);
        }
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
            const doc = connection.get('la-moulinette', 'test');
            doc.subscribe(function(err) {
                if (err) throw err;
                // this.content = doc.data.content;
                // console.log(this.content);
                const binding = new StringBinding(this.$refs.textarea, doc, ['content']);
                binding.setup();
            }.bind(this));
        }
    }
}
</script>

<style>

</style>