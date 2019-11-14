<template>
    <form>
        <div class="form-group" @submit.prevent="setLogin">
        <input v-model="username" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your username"/>
        </div>
        <button type="submit" class="btn btn-success">Dive In</button>
    </form>
</template>

<script>
export default {
    name: 'UsernameForm',
    data () {
        return {
            username: ''
        }
    },
    methods: {
        setLogin () {
            let token = ''
            let library = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890milotic'
            for(let i = 0; i < 20; i++) {
                token += library[Math.floor(Math.random() * library.length)]
            }
            localStorage.setItem('username', this.username)
            localStorage.setItem('token', token)
            this.username = ''
            this.$.router.push('/rooms')
        }
    }
};
</script>

<style scoped>
form {
    width: 500px;
}
</style>