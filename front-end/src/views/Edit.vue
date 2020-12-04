<template>
<div class="home">

  <div class="board">
    <div class="tile" v-for="square in grid" :key="square.position">
      <img :src="square.imagePath" v-on:click="selectTile(square)"/>
    </div>
  </div>

  <div class="pieces">
    <div class="pieceHolder" v-for="piece in pieces" :key="piece.id">
      <img :src="piece.image" v-on:click="selectPiece(piece)">
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
     grid: [],
     pieces: [],
     selectedPiece: {},
     pieceSelected: false,
     boardHeight: 5,
     boardLength: 5,
     newMove: {},
    }
  },
  created() {
    this.makeBoard();
    this.getPieces();
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
    async getPieces(){
      console.log("getting pieces")
      try {
        let response = await axios.get("/api/pieces");
        this.pieces = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    selectPiece: function(p){
      console.log("piece selected: " + p.name)

      this.pieceSelected = true;
      this.selectedPiece = p;

      this.grid.forEach(function(tile) {
        if(tile.imagePath == "/images/blueBox.png"){
          tile.imagePath = "/images/emptyBox.png"
        }

        if(tile.xPosition == 2 && tile.yPosition == 2){
          tile.imagePath = p.image;
        }

        p.moves.forEach(function(move){
          if((2 + move.x) == tile.xPosition && (2 - move.y) == tile.yPosition){
            tile.imagePath = "/images/blueBox.png";
          }
        });
      });
    },

    async editItem(piece) {
      console.log("editing piece, moves = " + piece.moves)
      try {
        await axios.put("/api/pieces/" + piece._id, {
          moves: piece.moves,
        });
        console.log("edited good");
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    selectTile: function(tile){
      console.log("tile selected: " + tile.xPosition + " " + tile.yPosition)
      if(this.pieceSelected){
        if(tile.imagePath == "/images/blueBox.png"){
          tile.imagePath = "/images/emptyBox.png";
          /* remove move from piece */
          for(var i = this.selectedPiece.moves.length - 1; i >= 0; i--){
            if (this.selectedPiece.moves[i].x == tile.xPosition - 2 && tile.yPosition == (this.selectedPiece.moves[i].y * -1 + 2)) {
              this.selectedPiece.moves.splice(i,1);
            }
          }
        }
        else if(tile.imagePath == "/images/emptyBox.png"){
          tile.imagePath = "/images/blueBox.png";
          /* add move to piece */
          this.newMove = {};
          this.newMove["x"] = tile.xPosition - 2;
          this.newMove["y"] = (tile.yPosition * -1 + 2);
          this.selectedPiece.moves.push(this.newMove);
        }
        this.editItem(this.selectedPiece);
      }
    }
  }
}
</script>

<style>
  img{
    max-width: 100%;
    max-height: 100%;
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

  .pieceHolder{
    max-height: 15vh;
    max-width: 25%;
  }

  .pieces{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
