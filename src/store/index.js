import Vue from 'vue'
import Vuex from 'vuex'
import db from "../apis/firestore";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
    ROOMS(state, payload) {
      state.rooms = payload
    }
  },
  actions: {
    getDataRooms({
      commit
    }) {
      let roomsTemp = [];
      db.collection("rooms").onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          let obj = {
            id: doc.id
          }
          obj.members = doc.data().members
          obj.total = obj.members.length
          obj.status = doc.data().status
          obj.startGame = doc.data().startGame
          roomsTemp.push(obj);
        })
        commit("ROOMS", roomsTemp);
      })
    },

    createRoom({
      commit
    }, payload) {
      db.collection("rooms").doc(payload).set({
        members: [],
        status: true,
      })

    }
  },
  modules: {}
})