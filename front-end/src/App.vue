<template>
  <div id="app">
    <div class="welcome">
      <router-link to="/">
        <p><strong>Welcome to RogueChess!</strong></p>
      </router-link>
      <router-link to="/Play">
        <p>Pick team</p>
      </router-link>
      <router-link to="/View">
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
      <a href="https://github.com/jaredcurtis717/cp3">github</a>
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
    background-color: #04b825;
  }

  .githubRepo{
    display: flex;
    justify-content: center;
    background-color: #04b825;
  }
</style>
