<template>
  <div id="home">
    <div id="matchLogo">
      <img src="../assets/match-random-logo.png" />
    </div>
    <UsernameForm class="formxxxx" />
    <br />
  </div>
</template>

<script>
// @ is an alias to /src
import UsernameForm from "../components/UsernameForm";

export default {
  name: "home",
  components: {
    UsernameForm
  },
  methods: {
    auth() {
      if (localStorage.getItem("token")) {
        this.$router.push("/rooms");
      }
    }
  },
  created() {
    this.auth()
  }
};
</script>

<style scoped>
#home {
  background-image: url("../assets/forest.jpg");
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
</style>