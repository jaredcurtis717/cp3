<template>
<div class="home">
<div class="soon">
  <h1>COMING SOON!</h1>
</div>
<!--
  <div class="board">
    <div class="tile" v-for="square in grid" :key="square.position">
      <img :src="square.imagePath" />

    </div>
  </div>
-->
</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
     grid: [],
     pieces: [],
     boardHeight: 5,
     boardLength: 5,
    }
  },
  created() {
    this.getPieces();
    this.makeBoard();
  },
  methods: {
    makeBoard: function(){
      console.log("Making board");
      let pos = 0;
      for(var y = 0; y < this.boardHeight; y++){
        for(var x = 0; x < this.boardLength; x++){
          var gridEntry = {};
          gridEntry["position"] = pos;
          gridEntry["xPosition"] = x;
          gridEntry["yPosition"] = y;
          gridEntry["imagePath"] = "/images/emptyBox.png";
          this.grid.push(gridEntry);
          pos+=1;
        }
      }
    },
    getPieces: function(){
      console.log("getting pieces")
      this.pieces = this.$root.$data.pieces;
    },

    selectPiece: function(p){
      console.log("piece selected: " + p.name)
      console.log("moves: " + p.moves)
      this.grid.forEach(function(tile) {
        if(tile.imagePath == "/images/blueBox.png"){
          tile.imagePath = "/images/emptyBox.png"
        }

        if(tile.xPosition == 2 && tile.yPosition == 2){
          tile.imagePath = "/images/" + p.image;
        }

        p.moves.forEach(function(move){
          if((2 + move.x) == tile.xPosition && (2 - move.y) == tile.yPosition){
            tile.imagePath = "/images/blueBox.png";
          }
        });
      });
    }
  }
}
</script>

<style>
  img{
    max-width: 100%;
    max-height: 100%;
  }

  .soon{
    display: flex;
    padding: 50px;
    justify-content: center;
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
