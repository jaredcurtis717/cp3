<template>
<div class="home">

  <div class="team">
    <div class="teamMember" v-for="piece in team" :key="piece.position">
      <img :src="'/images/' + piece.image" v-on:click="selectPos(piece)">
    </div>
  </div>

  <div class="pieces">
    <div class="pieceHolder" v-for="piece in pieces" :key="piece.id">
      <img :src="'/images/' + piece.image" v-on:click="selectPiece(piece)">
      <p>{{piece.position}}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
     team: [],
     pieces: [],
     currentTeamPos: 0,
    }
  },
  created() {
    this.setCurrentTeamPos();
    this.getPieces();
    this.getTeam();
  },
  methods: {
    setCurrentTeamPos: function(){
      this.currentTeamPos = 1;
    },
    getPieces: function(){
      console.log("getting pieces");
      this.pieces = this.$root.$data.pieces;
    },
    getTeam: function(){
      console.log("getting team");
      this.team = this.$root.$data.team;
    },
    selectPiece: function(p){
      console.log("Selected Piece: " + p.name);
      console.log("currentTeamPos: " + this.currentTeamPos);

      this.$root.$data.team = this.team;
    },
    selectPos: function(pos){
      console.log("Selected position: " + pos.position)
      this.currentTeamPos = pos.position;
    },
  }
}
</script>

<style>
  img{
    max-width: 100%;
    max-height: 100%;
  }

  .team{
    display: flex;
    justify-content: space-around;
    height: 50vh;
    padding: 30px;
  }

  .board{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 6%;
    padding-right: 6%;
    height: 80vh;
  }

  .tile{
    flex-shrink: 3;
    width: 20%;
    height: 20%;
    display: flex;
    justify-content: center;
  }

  .pieces{
    height: 15vh;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
