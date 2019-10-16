import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    entries: null,
    message: '初期メッセージ'
  },
  
  getters: {
    // messageを使用するゲッター
    message(state) {
      return state.message
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

    async getEntries(context) {
      const payload = {
        address: "",
        zip: context.state.zip
      };
      await axios
        .get("http://localhost:8000/api/entries/?", {
          params: { zipcode: payload.zip }
        })
        .then(res => {
          payload.entries = res.data.results;
          context.commit("setEntries", payload);
        });
    }
  }
})
