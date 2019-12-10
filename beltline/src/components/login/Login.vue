<template>
  <v-app>
    <v-content>
      <v-container fluid >
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Atlanta Beltline</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model='email' prepend-icon="person" label="Email"></v-text-field>
                  <v-text-field v-model='password' prepend-icon="lock" label="Password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-layout row center align-center justify-center>
                <v-btn color="primary" @click="login">Login</v-btn>
                <v-btn color="primary" @click="register">Register</v-btn>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>

  import axios from 'axios';


  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      register() {
        this.$router.push('/RegisterNavigation')
      },
      login() {
        console.log('loggingin')
        axios.post('http://localhost:8081/login', {
          email: this.email,
          password: this.password,
        })
          .then((response) => {
            console.log('login response: ', response);
            if(response.data.isLoggedIn) {
              if (response.data.isVisitor) {
                if (response.data.userType == 'Staff') {
                  console.log('pushing staffvivistorynav')
                  this.$router.push('/StaffVisitorNavigation')
                } else if (response.data.userType == 'Manager') {
                  this.$router.push('/ManagerVisitorNavigation')
                } else if (response.data.userType == 'Admin') {
                  this.$router.push('/AdminVisitorNavigation')
                } else {
                  this.$router.push('/VisitorNavigation')
                }
              } else {
                if (response.data.userType == 'Staff') {
                  this.$router.push('/StaffNavigation')
                } else if (response.data.userType == 'Manager') {
                  this.$router.push('/ManagerNavigation')
                } else if (response.data.userType == 'Admin') {
                  this.$router.push('/AdminNavigation')
                } else {
                  this.$router.push('/UserNavigation')
                }

              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
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

