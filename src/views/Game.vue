<template>
  <div class="game">
    <div class="game-board container">
      <div class="score">
        <h2>Total Point</h2>
        <h1>{{score}}</h1>
      </div>
      <div>
        <Countdown @endgame="endgame"></Countdown>
      </div>
      <GameBoard></GameBoard>
    </div>
  </div>
</template>

<script>
import Countdown from "../components/Countdown";
import GameBoard from "../components/GameBoard";
import Swal from "sweetalert2";

export default {
  name: "Game",
  components: {
    Countdown,
    GameBoard
  },
  methods: {
    endgame() {
      clearInterval(this.hideShowInterval);
      Swal.fire({
        icon: "success",
        title: `You got ${this.score}!`,
        confirmButtonText: "Next",
        allowOutsideClick: false
      })
        .then(value => {
          let payload = {
            roomId: this.$route.params.id,
            score: this.$store.state.score
          };
          this.$store.dispatch('setScore', payload)
          this.$router.push(`/scores/${this.$route.params.id}`)
        })
        .catch(err => {
          Swal(err);
        });
    }
  },
  computed: {
    score() {
      return this.$store.state.score;
    }
  },
  watch: {
    score() {}
  }
};
</script>
<style scoped>
h2, h1 {
  color: white;
}
.game {
  background-image: url("../assets/forest.jpg");
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.game-board {
  background-color:rgb(85, 85, 85, 0.5);
  margin-top: -4vh;
  padding-top: 20px;
  padding-bottom: 15px;
  height: 75vh;
  width: 53vw;
  border-radius: 15px;
}
</style>