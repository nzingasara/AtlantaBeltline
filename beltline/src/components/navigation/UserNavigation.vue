<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <h1>User Functionality</h1>
              <v-card>
                <v-layout row center align-center justify-center>
                  <v-flex xs5 md5>
                    <v-btn block color="primary"
                           @click="takeTransit">Take Transit
                    </v-btn>
                    <v-btn block color="primary"
                           @click="viewTransitHistory">View Transit History
                    </v-btn>
                    <v-btn block color="primary" @click="back">Back</v-btn>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>

  export default {
    name: 'UserNavigation',


    methods: {
      takeTransit() {
        console.log("Take transit");
      },
      viewTransitHistory() {
        console.log("there nothing to viuuu");
      },
      back() {
        this.$router.push('/');

      }
    }
  }

</script>

<style scoped>


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
</style>

