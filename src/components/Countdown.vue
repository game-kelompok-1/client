<template>
  <div class="countdown">
    <h5>Time Left</h5>
    <h5>{{ second }}</h5>
  </div>
</template>

<script>
export default {
  name: "Countdown",
  data() {
    return {
      second: 20
    };
  },
  methods: {
    runCountdown() {
      let countdownInterval = setInterval(() => {
        if (this.second > 0) {
          this.second--
        } else {
          this.$emit("endgame");
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
  },
  created() {
    this.runCountdown();
  }
};
</script>
<style scoped>
h5 {
  color: white;
}
</style>