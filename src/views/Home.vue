<template>
  <div id="home">
    <UsernameForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import UsernameForm from '../components/UsernameForm'

export default {
  name: 'home',
  components: {
    UsernameForm
  },
}
</script>

<style scoped>
#home {
    background-image: url('../assets/forest.jpg');
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
</style>