<template>
  <div class="lobby">
    <div style="margin-top: 8vh">
      <h1 style="color: white;">Game Lobby</h1>
      <button type="button" class="btn btn-danger mr-2">Back</button>
      <button type="button" @click="playGame" v-if="owner" class="btn btn-light">Start Game</button>
    </div>
    <table class="table table-dark">
      <thead class="mb-2">
        <tr>
          <th scope="col">id</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in membersName" :key="member.no">
          <th scope="row">{{member.no}}</th>
          <td>{{member.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'lobby',
  data() {
    return {
      // roomId: this.$route.params.id
    };
  },
  computed: {
    members: {
      get() {
        // return this.$store.state.dataMembers
      },
      set() {}
    },
    owner: {
      get() {
        return true // return this.$store.state.master === localStorage.getItem('token')
      },
      set() {}
    },
    startGame: {
      get() {
        // return this.$store.state.startGame
      },
      set() {}
    },
    membersName() {
      let membersName = []
      // this.members.forEach((el, i)=> {
      //   let member = {
      //     no: i+1,
      //     name: el.name
      //   }
      //   membersName.push(member)
      // })
      return membersName
    }
  },
  methods: {
    playGame() {
      // this.$store.dispatch('startGame', this.roomId)
    }
  },
  created() {
    // this.$store.dispatch('getMembers', this.roomId)
  },
  watch: {
    startGame() {
      // if(this.startGame) {
      //   this.$router.push(`/gameplay/${this.roomId}`)
      // }
    }
  }
};
</script>

<style scoped>
.lobby {
  height: 100vh;
  width: 100vw;
  background-image: url("https://opengameart.org/sites/default/files/background1-720.png");
  background-size: 100%;
  overflow: hidden;
  overflow-y: hidden;
}
.table {
  margin: auto;
  width: 25vh !important;
  color: white;
  margin-top: 10vh;
}
</style>