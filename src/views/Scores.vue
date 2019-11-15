<template>
  <div class="scores">
    <div style="margin-top: 8vh">
      <h1 style="color: white;">Final Score</h1>
      <button type="button" @click="backToLobby" class="btn btn-secondary">Back to Lobby</button>
    </div>
    <table class="table">
      <thead class="thead-dark mb-2">
        <tr>
          <th scope="col">Score</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="score in formattedScores" :key="score.score">
          <th scope="row">{{score.score}}</th>
          <td>{{score.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    scores: {
      get() {
        return this.$store.state.memberScores;
      }
    },
    formattedScores() {
      let scoresArr = [];
      this.scores.forEach(score => {
        scoresArr.push({
          name: score.name,
          score: score.score
        });
      });
      scoresArr.sort(function(a, b) {
        return b.score - a.score;
      });
      return scoresArr;
    }
  },
  methods: {
    backToLobby() {
      this.$store.dispatch("deleteRoom", this.$route.params.id).then(() => {
        this.$router.push(`/rooms`);
      });
    }
  },
  created() {}
};
</script>

<style scoped>
.scores {
  height: 100vh;
  width: 100vw;
  background-image: url("https://wallpaperplay.com/walls/full/5/e/5/175234.jpg");
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