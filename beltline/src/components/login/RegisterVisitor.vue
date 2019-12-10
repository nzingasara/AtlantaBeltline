<template>
  <v-app >
    <v-content>
      <v-container>
        <div sm10 class="elevation-12">
          <h1>Atlanta Beltline</h1>
          <v-form ref='form' v-model="valid" lazy-validation>
            <v-container>
              <v-layout row wrap>
                
                <v-flex xs12 sm6 md3>
                  <v-text-field required :rules="firstnameRules" v-model='firstname'
                                label="First Name"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md3>
                  <v-text-field required :rules="lastnameRules" v-model='lastname'
                                label="Last Name"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md3>
                  <v-text-field required :rules="usernameRules" v-model='username'
                                label="Username"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>

                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="password"
                    required
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-text-field required
                                :rules="passwordRules"
                                :type="show2 ? 'text' : 'password'"
                                name="input-10-2"
                                label="Confirm Password"
                                class="input-group--focused"
                                @click:append="show2 = !show2"
                  ></v-text-field>
                </v-flex>

              </v-layout>
              <v-card>
                <v-list>
                  <v-list-tile required
                    v-for="(item, index) in items"
                    :key="item.email"
                    avatar
                  >
                    <v-list-tile-action>
                      <v-icon v-if="item.icon" color="pink">star</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.email"></v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-btn icon ripple @click='removeEmail(index)'>
                        <v-icon dark>remove_circle</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-list-tile>
                    <v-flex xs12 sm6 md3>
                      <v-text-field v-model="email"
                                    label="New Email"
                      ></v-text-field>
                    </v-flex>

                    <v-list-tile-action>
                      <v-btn icon ripple @click="addEmail">
                        <v-icon dark>note_add</v-icon>
                      </v-btn>
                    </v-list-tile-action>

                  </v-list-tile>

                </v-list>
              </v-card>

            </v-container>

            <v-layout row wrap center align-center justify-center>
              <v-btn  color="primary"
                     @click="back">Back
              </v-btn>
              <br>
              <v-btn  :disabled="!valid" color="primary"
                     @click="registerUser">Register
              </v-btn>
              <br>
            </v-layout>

          </v-form>
        </div>
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
        valid: false,
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        items: [],
        firstnameRules: [
          v => !!v || 'First name is required',
          v => (v && v.length <= 15) || 'First name must be at most 15 characters'
        ],
        lastnameRules: [
          v => !!v || 'Last name is required',
          v => (v && v.length <= 15) || 'Last name must be at most 15 characters'
        ],
        usernameRules: [
          v => !!v || 'Username is required',
          v => (v && v.length <= 15) || 'Username must be at most 15 characters'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length <= 15) || 'Password must be at most 15 characters'
        ],
      }
    },
    methods: {
      registerUser() {
        if (this.$refs.form.validate()) {
          axios.post('http://localhost:8081/registerVisitor', {
            firstname: this.firstname,
            lastname: this.lastname,
            emails: this.items,
            username: this.username,
            password: this.password
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      back() {
        this.$router.push('/RegisterNavigation')
      },
      addEmail() {
        this.items.push({'email': this.email})
      },
      removeEmail(index) {
        this.items.splice(index, 1)
      }
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
</style>
