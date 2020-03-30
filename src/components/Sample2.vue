<template>
  <v-app>
    <div id="app">
      <v-app id="inspire">
        <div>
          <v-sheet
            tile
            height="54"
            color="grey lighten-3"
            class="d-flex"
          >
            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.prev()"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-select
              v-model="type"
              :items="types"
              dense
              outlined
              hide-details
              class="ma-2"
              label="type"
            ></v-select>
            <v-select
              v-model="mode"
              :items="modes"
              dense
              outlined
              hide-details
              label="event-overlap-mode"
              class="ma-2"
            ></v-select>
            <v-select
              v-model="weekday"
              :items="weekdays"
              dense
              outlined
              hide-details
              label="weekdays"
              class="ma-2"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.next()"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="value"
              :weekdays="weekday"
              :type="type"
              :events="events"
              :event-overlap-mode="mode"
              :event-overlap-threshold="30"
              @change="getEvents"
            ></v-calendar>
          </v-sheet>
        </div>
      </v-app>
    </div>
  </v-app>
</template>

<script>
import Vue from "vue";
import store from "@/store.js";
import { mapState, mapGetters } from 'vuex'
// import the plugin
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
Vue.use(VueGAPI, apiConfig);

export default {
    name: 'App',
    
    data: () => ({
        type: 'month',
        types: ['month', 'week', 'day', '4day'],
        mode: 'stack',
        modes: ['stack', 'column'],
        weekday: [0, 1, 2, 3, 4, 5, 6],
        weekdays: [
            { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
            { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
            { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
            { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
        ],
        value: '',
        //events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    computed: {
        ...mapState([
            "events"
        ]),
    },
    methods: {
        login () {
            this.$login()
        },
        getEvents ({ start, end }) {
            const events = []
            this.$getGapiClient().then(gapi => {
                //console.log("aaa",this.$isSignedIn())
                
                gapi.client.calendar.events.list({
                    calendarId: "nagami@key-p.jp",
                    //calendarId: "ja.japanese#holiday@group.v.calendar.google.com",
                    // 'timeMin': (new Date()).toISOString(),
                    // 'timeMax': (date.toISOString()),
                    timeMin: (new Date(Date.parse("2020-01-01"))).toISOString(),
                    timeMax: (new Date(Date.parse("2020-06-01"))).toISOString(),
                    items: [{ "id": 'primary' }]
                }).then(function(response) {
                    //vm.results = response.result
                    console.log(response.result.items)
                    var allevents = response.result.items;
                    const formatDate = (a) => {
                        console.log("aaaa",a)
                        var start =a.dateTime
                        if(a.date){
                            start=a.date
                        }
                        return  String(start).replace("T", " ").replace("+09:00", "");
                    }

                    for (let i = 0; i < allevents.length; i++) {
                        if(allevents[i].start){
                        events.push({
                            name: allevents[i].summary,
                            start: formatDate(allevents[i].start),
                            end: formatDate(allevents[i].end),
                            color: 'blue',
                        })
                        }
                    }
                    console.log("bbb",events)
                    const payload = {
                        events: events,
                    };
                    store.commit("setEvents",payload);
                })
            })
        },
    }, 
};
</script>
