<template>
  <div>
    <div class="player">
      <div class="row">
        <div class="col">
          <div class="you">
            <h2>YOU</h2>
            <img :src="image1" class="img img-you" />
          </div>
        </div>
        <div class="col"></div>
        <div class="col">
          <div class="comp">
            <h2>COMP</h2>
            <img :src="image2" class="img img-comp" />
          </div>
        </div>
      </div>
      <div class="tombol" @click="play">Play</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameBoard",
  data() {
    return {
      score: 0,
      img1: "fox",
      img2: "fox",
      soundSuccess: new Audio('https://storage.cloud.google.com/sigitarprasetyo/matched-tune.mp3'),
      soundFail: new Audio('https://storage.cloud.google.com/sigitarprasetyo/match-failed.mp3')
    };
  },
  methods: {
    random1() {
      let randomAngka1 = Math.random();
      if (randomAngka1 < 0.34) {
        this.img1 = "fox";
      } else if (randomAngka1 >= 0.34 && randomAngka1 < 0.67) {
        this.img1 = "wolf";
      } else {
        this.img1 = "tiger";
      }
    },
    random2() {
      let randomAngka2 = Math.random();
      if (randomAngka2 < 0.34) {
        this.img1 = "fox";
      } else if (randomAngka2 >= 0.34 && randomAngka2 < 0.67) {
        this.img2 = "wolf";
      } else {
        this.img2 = "tiger";
      }
    },
    play() {
      this.putar();
      setTimeout(() => {
        this.random1();
        this.random2();
      }, 1000);
      if (this.img1 == this.img2) {
        this.soundSuccess.play();
        this.$store.dispatch("addScore", 10);
      } else {
        this.soundFail.play()
      }
    },
    putar() {
      const img = ["fox", "wolf", "tiger"];
      const waktuMulai = new Date().getTime();
      let i = 0;

      setInterval(function() {
        if (new Date().getTime() - waktuMulai > 1000) {
          clearInterval;
          return;
        }
        this.img1 = img[i++];
        if (i == img.length) i = 0;
        this.img2 = img[i++];
        if (i == img.length) i = 0;
      }, 100);
    }
  },
  computed: {
    image1() {
      return `https://storage.cloud.google.com/sigitarprasetyo/${this.img1}.png`;
    },
    image2() {
      return `https://storage.cloud.google.com/sigitarprasetyo/${this.img2}.png`;
    }
  }
};
</script>

<style scoped>
.player {
  text-align: center;
}

.player .row {
  margin: 10px;
}

.player .row .col {
  width: 35%;
}

.row .col1 {
  width: 10%;
}

h2 {
  color: white;
}

.img {
  margin: 0 auto;
  width: 110%;
  height: 300px;
  border: 2px solid white;
  box-sizing: border-box;
}

.col1 .tmbl-main {
  font-family: "Montserrat", sans-serif;
  margin: 10px auto;
  padding: 7px;
  text-align: center;
  font-size: 20px;
  width: 70%;
  border-radius: 15px;
  color: aliceblue;
  background-color: rgb(48, 57, 189);
  cursor: pointer;
  display: none;
  transition: 0.2s;
}

.tmbl-main:hover {
  background-color: rgb(247, 120, 70);
  font-size: 21px;
  width: 85%;
  padding: 6.5px;
}

.tombol {
  font-family: "Montserrat", sans-serif;
  margin: 20px auto;
  padding: 7px;
  text-align: center;
  font-size: 22px;
  width: 100px;
  border-radius: 15px;
  color: aliceblue;
  background-color: rgb(48, 57, 189);
  cursor: pointer;
}

.tombol:hover {
  background-color: rgb(247, 120, 70);
  padding: 6.5px;
  font-size: 23px;
}
</style>