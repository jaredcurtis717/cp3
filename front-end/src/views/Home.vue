<template>
<div class="home">
  <div class="body">
    <div class="frontAndCenter">
      <h1>Welcome!</h1>
    </div>

    <h2>What is RogueChess?</h2>
    <p>RogueChess is a browser-based game developed by Jared Curtis.  Players will try to build their team that match after match to become stronger and stronger.  Watch out though, if one of your pieces is killed in a match it is gone forever!  Everytime your piece gets a kill however, it grows stronger, being able to move further or in a different direction.  You will need to pick your battles, sometimes its better to retreat than lose a powerful piece forever!</p>
    <h2>Is it ready to play?</h2>
    <p>Unfortunately, the game is currently not playable. Eventually, players will be able to upload a picture of their piece to add to their team.  currently however, only the pre-made pieces are available to look at.  To view how a certain piece moves, take a look at the "View Pieces" tab.  This will always be available and shows all the squares a piece can move to.  When a piece "levels up" more moves will be available to them.  To see how a piece can be upgraded to gain more available moves, see the "Edit Pieces" tab.</p>
    

  </div>

  <div class="pieces">
    <div class="pieceHolder" v-for="piece in pieces" :key="piece.id">
      <img :src="'/images/' + piece.image">
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
     pieces: [],
    }
  },
  created() {
    this.getPieces();
  },
  methods: {
    getPieces: function(){
      console.log("getting pieces");
      this.pieces = this.$root.$data.pieces;
    },
  }
}
</script>

<style>
  .body{
    padding: 30px;
  }

  .frontAndCenter{
    display: flex;
    justify-content: center;
  }
</style>
