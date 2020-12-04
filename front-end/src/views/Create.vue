<template>
<div class="home">
  <h1>Create New Piece:</h1>
  <div class="createButton">
  <div class="form">
    <input v-model="title" placeholder="Name">
    <p></p>
    <input type="file" name="photo" @change="fileChanged">
    <button @click="upload">Upload</button>
  </div>
  <div class="upload" v-if="addItem">
    <h2>{{addItem.name}}</h2>
    <img :src="addItem.image" />
  </div>
  </div>

  <br/>
  <h1>Current Pieces:</h1>
  <div class="pieces">
    <div class="pieceHolder" v-for="piece in pieces" :key="piece._id">
      <img :src="piece.image">
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
     title: "",
     file: null,
     pieces: [],
     addItem: null,
    }
  },
  created() {
    this.getPieces();
  },
  methods: {
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

    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/pieces', {
          name: this.title,
          image: r1.data.path,
          moves: [{x: 0, y:1}],
        });
        this.addItem = r2.data;
        this.getPieces();
      } catch (error) {
        console.log(error);
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
  }
}
</script>

<style>
  img{
    max-width: 100%;
    max-height: 100%;
  }

  .upload h2 {
    margin: 0px;
  }

  .upload img {
    max-width: 300px;
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
