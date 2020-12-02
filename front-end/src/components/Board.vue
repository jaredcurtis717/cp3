<template>
  <div class="board">
    <div class="tile" v-for="square in grid" :key="square.position">
      <img :src="square.imagePath" />
    </div>
  </div>
</template>

<script>
  export default{
    name: "Board",
    data(){
      grid: [],
      boardHeight: 5,
      boardLength: 5,
    },
    created(){

    },
    methods{

    }
  }
