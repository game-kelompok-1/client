<template>
  <div id="rooms">
    <button type="button" class="btn btn-danger ml-2" id="logout" @click="logout">Logout</button>
    <div class="container d-flex justify-content-center">
      <div class="row mt-5 ml-5">
        <input
          type="email"
          class="form-control col-md"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter room name"
          v-model="name"
        />
        <button
          type="button"
          class="btn btn-dark ml-4"
          data-toggle="modal"
          data-target="#createModal"
          @click="createRoom"
        >Create Room</button>
      </div>
    </div>

    <div class="row box-card mx-5 mt-5" style="height: 600px;">
      <div
        class="card mx-auto mt-3"
        id="card"
        style="width: 250px; height: 200px;"
        v-for="room in rooms"
        :key="room.id"
      >
        <div class="card-body">
          <h5 class="card-title pt-4">{{room.name}}</h5>
          <i class="fas fa-user-friends mt-2"></i>
          {{room.total}}
          <br />
          <button
            type="button"
            @click="enterRoom(room.total, room.id)"
            class="btn btn-dark mt-3"
          >Enter Room</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    createRoom() {
      if (this.name) {
        let newRoom = {
          master: localStorage.getItem("token"),
          name: this.name,
          members: [
            {
              id: localStorage.getItem("token"),
              name: localStorage.getItem("username")
            }
          ],
          memberScores: [],
          status: true,
          createdAt: new Date()
        };
        this.$store.dispatch("createRoom", newRoom);
      } else {
        console.log("noooo");
      }
      this.name = "";
    },
    // createRoom() {
    //   this.$store
    //     .dispatch("createRoom", this.name)
    //     .then(() => {
    //       console.log("masuk");
    //       this.$store.dispatch("getDataRooms");
    //     })
    //     .catch(error => {
    //       console.error("Error writing document: ", error);
    //     });
    // },
    enterRoom(total, id) {
      if (total < 5) {
        let payload = {
          roomId: id
        };
        this.$store.dispatch("joinRoom", payload);
        this.$router.push(`/rooms/${id}`);
      } else {
        Swal.fire({
        icon: "warning",
        title: `Sorry this room full!`,
        allowOutsideClick: false
      })
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.$router.push(`/`);
    }
  },
  created() {
    this.$store.dispatch("getDataRooms");
  },
  computed: mapState(["rooms"])
};
</script>

<style scoped>
#rooms {
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/roomList4.jpg");
  background-size: 100%;
  overflow: hidden;
  overflow-y: hidden;
}

#inputUsername {
  width: 60px;
}

#logout {
  float: right;
  margin: 40px;
}

#card {
  transition: transform 0.2s; /* Animation */
}

#card:hover {
  transform: scale(
    1.2
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.box-card {
  background-color: black;
  opacity: 0.6;
  border-radius: 15px;
}
</style>