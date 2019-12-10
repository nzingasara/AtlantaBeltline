<template>
  <v-app>
    <v-content>
      <v-container>
        <div sm8 class="elevation-12">
          <h1>Transit History</h1>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>

  import axios from 'axios';

  export default {
    name: 'transitHistory',
    data() {
      console.log("");
    },

    methods: {
      // back() {
      // this.$router.push('/RegisterNavigation')
      // }
    }


  }

</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .compact-form {
    transform: scale(0.875);
    transform-origin: left;
  }

  .styled-input {
    width: 50px;
    font-size: 12px;
  }
</style>
