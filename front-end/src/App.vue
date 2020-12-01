<template>
  <div id="app">
    <div class="welcome">
      <p><strong>Welcome to RogueChess!</strong></p>
      <router-link to="/">
        <p>View Pieces</p>
      </router-link>
      <router-link to="/Edit">
        <p>Edit Pieces</p>
      </router-link>
      <router-link to="/Play">
        <p>Play</p>
      </router-link>
    </div>

    <router-view />

    <div class="githubRepo">
      <p>github</p>
    </div>
  </div>
</template>

<style>
  .welcome{
    font-size: 24px;
    margin: 0px;

    height: 5vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .githubRepo{
    display: flex;
    justify-content: center;
    backgroud-color: blue;
  }
</style>
