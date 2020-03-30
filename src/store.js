import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueGAPI from "vue-gapi";

// create the 'options' object
const apiConfig = {
    apiKey: "AIzaSyCdNp0deyRpn5wrxkAkuBVN-wbuCQxE_ko",
    clientId: "186183757913-49h599553vonqitc24nmdphf3um8uq8j.apps.googleusercontent.com",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    scope: "https://www.googleapis.com/auth/calendar"
    // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

// Use the plugin and pass along the configuration
Vue.use(Vuex,VueGAPI, apiConfig)
export default new Vuex.Store({
    state: {
        count: 0,
        entries: null,
        message: '初期メッセージ',
        events:[],
    },
    
    getters: {
        message(state) {
            return state.message
        },
        entries(state) {
            return state.entries
        }
    },
    
    mutations: {
        // カウントアップするミューテーションを登録
        increment(state) {
            state.count++
        },
        setMessage(state, payload) {
            state.message = payload.message
        },
        setEntries(state, payload) {
            console.log(payload.entries)
            state.entries = payload.entries
        },
        setEvents(state, payload) {
            console.log("fff",payload.events)
            state.events = payload.events
        }
    },
    actions: {
        
        doUpdate({
            commit
        }, message) {
            commit('setMessage', {
                message
            })
        },
        
        async upload({
            commit
        }, file) {
            var message = 'OpenCV Test'
            commit('setMessage', {
                message
            })
            const formData = new FormData()
            var now = new Date();
            var Year = now.getFullYear();
            var Month = now.getMonth()+1;
            var Date1 = now.getDate();
            var Hour = now.getHours();
            var Min = now.getMinutes();
            var Sec = now.getSeconds();
            
            var yd = Year + "-" + Month + "-" + Date1 + " " + Hour + ":" + Min + ":" + Sec;
            formData.append('created_at', yd)
            formData.append('updated_at', yd)
            formData.append('file', file.raw, file.name)
            await axios
            .post("http://localhost:8000/api/images/", formData,{
                timeout: 0
            })
            .then(res => {
                console.log("gggg",res)
            });
            
        },
        
        async getEntries(context) {
            const payload = {
                address: "",
            };
            await axios
            .get("http://localhost:8000/api/images/?", {
                params: { zipcode: payload.address }
            })
            .then(res => {
                console.log("sss",res.data.results)
                payload.entries = res.data.results;
                context.commit("setEntries", payload);
            });
        },
    }
})
