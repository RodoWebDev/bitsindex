
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue');

import ChatMessage from './components/ChatMessage.vue';
import ChatLog from './components/ChatLog.vue';
import UserLog from './components/UserLog.vue';
import ChatComposer from './components/ChatComposer.vue';

Vue.use(require('vue-chat-scroll'));
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('chat-message', ChatMessage);
Vue.component('chat-log', ChatLog);
Vue.component('user-log', UserLog);
Vue.component('chat-composer', ChatComposer);

const app = new Vue({
    el: '#chatSection',
    data: {
    	messages:[],
        userInRoom:'',
        information:'',
        users:[],
        userId:'',
        url:$("#base_url").val()
    	},
    methods: {
        /**
         * add message
         * @param array
         */
    	addMessage(message) {
    		// add message to existing messages
    		this.messages.push(message);

            // scroll to bottom after new message added
            this.$nextTick(() => {
                this.scrollToEnd();
            })
    	},
        /**
         * to scroll page to end
         * @return void
         */
        scrollToEnd: function() {
            var container = document.querySelector(".chat-discussion");
            var scrollHeight = container.scrollHeight;
            container.scrollTop = scrollHeight;
        },
        /**
         * get selected user with previous conversation
         * @param  array
         * @return void
         */
        getCurrentUser(user) {
            this.messages = "";
            this.userId = user.userId;
            axios.get('/messages/'+this.userId).then( response=> {
                this.messages = response.data;
                // scroll to bottom after new message added
                this.$nextTick(() => {
                    this.scrollToEnd();
                });
            });

            var authId = $("#authId").val();
            var privateId = this.userId+authId; // unique id for private chat
            // laravel echo to send message to other ends (i.e who join given chatroom)
            Echo.private('chatroom.'+privateId)
            .listen('MessagePosted',(e)=>{
                this.messages.push({
                    message:e.message.message,
                    user:e.user.name,
                    time:e.message.created_at,
                    image_path:e.user.image_path,
                    type:e.message.type,
                    file_path:e.message.file_path,
                    file_name:e.message.file_name,
                    avatar: e.user.avatar
                });

                // scroll to bottom after new message added
                this.$nextTick(() => {
                    this.scrollToEnd();
                });
            });

        }
    },
    updated() {
        this.scrollToEnd();
    }
});
