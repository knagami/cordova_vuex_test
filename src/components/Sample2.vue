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
import VueGAPI from "vue-gapi";



const apiConfig = {
    apiKey: process.env.VUE_APP_apiKey,
    clientId: process.env.VUE_APP_clientId,
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    scope: "https://www.googleapis.com/auth/calendar"
};
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
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    computed: {
        ...mapState(["events"]),// イベントデータ
    },
    methods: {
        login () {
            this.$login()
        },
        // カレンダーデータ取得処理
        getEvents ({ start, end }) {
            const events = []
            
            // Googleカレンダーに接続
            this.$getGapiClient().then(gapi => {
                
                // Googleカレンダーの検索パラメータセット        
                gapi.client.calendar.events.list({
                    calendarId: "nagami@key-p.jp",
                    timeMin: (new Date(Date.parse("2020-01-01"))).toISOString(),
                    timeMax: (new Date(Date.parse("2020-06-01"))).toISOString(),
                    items: [{ "id": 'primary' }]
                }).then(function(response) {
                    
                    // レスポンスを変数にセット
                    var allEvents = response.result.items;
                    
                    // 日付変換関数
                    const formatDate = (a) => {
                        var start =a.dateTime
                        if(a.date){
                            start=a.date
                        }
                        return  String(start).replace("T", " ").replace("+09:00", "");
                    }
                    
                    // 取得したデータを配列にセット
                    for (let i = 0; i < allEvents.length; i++) {
                        if(allEvents[i].start){
                        events.push({
                            name: allEvents[i].summary,
                            start: formatDate(allEvents[i].start),
                            end: formatDate(allEvents[i].end),
                            color: 'blue',
                        })
                        }
                    }
                    
                    // ステートにイベントデータを保存
                    store.commit("setEvents",{events: events});
                })
            })
        },
    }, 
};
</script>