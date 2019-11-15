import Vue from 'vue'
import Vuex from 'vuex'
import db from "../apis/firestore";
import firebase from 'firebase/app'
import Swal from "sweetalert2";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myactiveroom: false,
    rooms: [],
    player: {},
    dataMembers: [],
    master: false,
    startGame: false,
    memberScores: [],
    score: 0
  },
  mutations: {
    ENTERING_ROOM(state, payload) {
      state.myactiveroom = payload
    },
    ROOMS(state, payload) {
      state.rooms = payload
    },
    EMPTYROOMS(state, payload) {
      state.rooms = []
    },
    PLAYER_IN_GAME(state, payload) {
      state.player = payload
    },
    ADD_SCORE(state, payload) {
      state.score += payload
    },
    DATA_MEMBERS(state, payload) {
      state.dataMembers = payload
    },
    MASTER_ROOM(state, payload) {
      state.master = payload
    },
    START_GAME(state, payload) {
      state.startGame = payload
    },
    SET_SCORESLIST(state, payload) {
      state.memberScores = payload
    }
  },
  actions: {
    getDataRooms({
      commit
    }) {
      let rooms = []
      db.collection('room').onSnapshot(querySnapshot => {
        querySnapshot.forEach(el => {
          let room = el.data()
          let id = el.id
          let inforoom = {
            id: id,
            name: room.name,
            members: room.members,
            total: room.members.length,
            createdAt: new Date(room.createdAt.seconds * 1000),
            status: room.status,
            startGame: room.startGame
          }
          rooms.push(inforoom)
        })
        rooms.sort(function (a, b) {
          return b.createdAt - a.createdAt
        })
        commit('EMPTYROOMS')
        commit('ROOMS', rooms)
        rooms = []
      })
    },
    // getDataRooms({
    //   commit
    // }) {
    //   let roomsTemp = [];
    //   db.collection("rooms").onSnapshot(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       let obj = {
    //         id: doc.id
    //       }
    //       obj.members = doc.data().members
    //       obj.total = obj.members.length
    //       obj.status = doc.data().status
    //       obj.startGame = doc.data().startGame
    //       roomsTemp.push(obj);
    //     })
    //     commit("ROOMS", roomsTemp);
    //   })
    // },
    createRoom({
      commit
    }, payload) {
      db.collection('room').add(payload)
        .then(function (docRef) {
          commit('ENTERING_ROOM', docRef.id)
          // console.log(docRef)
          Swal.close()
          Swal.fire({
            title: 'Successfully Create',
            text: 'Room has been created',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          })
        })
    },
    // createRoom({commit}, payload) {
    //   db.collection("rooms").doc(payload).set({
    //     members: [],
    //     status: true,
    //   })
    // },

    joinRoom({
      commit
    }, payload) {
      let player = {
        name: localStorage.getItem('username'),
        id: localStorage.getItem('token'),
        score: 0
      }
      db.collection('room')
        .doc(payload.roomId)
        .update({
          members: firebase.firestore.FieldValue.arrayUnion(player)
        })
        .then(() => {
          return db.collection('room').doc(payload.roomId).get()
        })
        .then(doc => {
          if (doc.data().members.length >= 5) {
            db.collection('room').doc(payload.roomId).update({
              status: false
            })
          } else {
            commit('ENTERING_ROOM', payload.roomId)
            commit('PLAYER_IN_GAME', player)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    startGame({
      commit
    }, payload) {
      db.collection('room').doc(payload)
        .update({
          startGame: true
        })
    },
    addScore({
      commit
    }, payload) {
      commit("ADD_SCORE", payload)
    },

    setScore({
      commit
    }, payload) {
      let player = {
        name: localStorage.getItem('username'),
        id: localStorage.getItem('token'),
        score: payload.score
      }
      db.collection('room')
        .doc(payload.roomId)
        .update({
          memberScores: firebase.firestore.FieldValue.arrayUnion(player)
        })
        .then(() => {
          return db.collection('room').doc(payload.roomId).get()
        })
        .then(doc => {
          db.collection('room').doc(payload)
            .update({
              startGame: false
            })
          console.log('update memberScores')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMembers({
      commit
    }, payload) {
      db.collection('room').doc(payload)
        .onSnapshot(doc => {
          let payload = doc.data().members
          let master = doc.data().master
          let start = doc.data().startGame
          let scorelist = doc.data().memberScores
          commit('DATA_MEMBERS', payload)
          commit('MASTER_ROOM', master)
          commit('START_GAME', start)
          commit('SET_SCORESLIST', scorelist)
        })
    },

    deleteRoom(context, payload) {
      return db.collection("room").doc(payload).delete()
    }
  },
  modules: {}
})