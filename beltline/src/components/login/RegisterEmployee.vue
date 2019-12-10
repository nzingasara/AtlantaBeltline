<template>
  <v-app >
    <v-content>
      <v-container>
        <div sm10 class="elevation-12">
          <h1>Register Employee-Visitor</h1>
          <v-form ref='form' v-model="valid" lazy-validation>
            <v-container>
              <v-layout row wrap center align-center justify-center>

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

              </v-layout>

              <v-layout row wrap center align-center justify-center>
                <v-flex xs12 sm6 md3>
                  <v-text-field required :rules="usernameRules" v-model='username'
                                label="Username"
                  ></v-text-field>
                </v-flex>

              <v-flex xs12, sm6, md3>
                  <v-select
                    v-model="usertype"
                    :items="userlist"
                    menu-props="auto"
                    label="User Type"
                    hide-details
                    single-line
                    outline
                  ></v-select>
              </v-flex>

              </v-layout>

              <v-layout row wrap center align-center justify-center>

                <v-flex xs12 sm6 md3>
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

                <v-flex xs12 sm6 md3>
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

              <v-layout row wrap center align-center justify-center>

                <v-flex xs12 sm6 md3>
                  <v-text-field required :rules="phoneRules" :mask="mask" v-model='phone'
                                label="Phone Number"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <v-text-field required :rules="addressRules" v-model='address'
                                label="Address" counter = "25"
                  ></v-text-field>
                </v-flex>

              </v-layout>

              <v-layout row wrap center align-center justify-center>

                <v-flex xs12 sm6 md3>
                  <v-text-field required :rules="cityRules" v-model='city'
                                label="City"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12, sm6, md3>
                  <v-select
                    v-model="e1"
                    :items="states"
                    menu-props="auto"
                    label="State"
                    hide-details
                    prepend-icon="map"
                    single-line
                    outline
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6 md3>
                  <v-text-field required :rules="zipcodeRules" v-model='zipcode'
                                label="Zipcode"
                  ></v-text-field>
                </v-flex>

              </v-layout>

              <v-card>
                <v-list>
                  <v-list-tile
                    v-for="(item, index) in emailitems"
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
                  <v-layout row wrap center align-center justify-center>
                    <v-flex xs12 sm6 md3>
                      <v-text-field v-model="email"
                                    label="New Email"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

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
                     @click="registerEmployeeVisitor">Register
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
    name: 'RegisterEmployeeVisitor',
    data() {
      return {
        valid: false,
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        emailitems: [],
        usertype: '',
        phone: '',
        mask: '###-###-####',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        e1: 'Alabama',
        e2: 'Texas',
        e3: null,
        e4: null,
        items: [
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' },
          { text: 'State 4' },
          { text: 'State 5' },
          { text: 'State 6' },
          { text: 'State 7' }
        ],
        states: [
          'AL', 'AK', 'AZ', 'AR', 'CA',
          'CO', 'CT', 'DE', 'FL', 'GA',
          'HI', 'ID', 'IL', 'IN', 'IA',
          'KS', 'KY', 'LA', 'ME', 'MD',
          'MA', 'MI', 'MN', 'MS', 'MO',
          'MT', 'NE', 'NV', 'NH', 'NJ',
          'NM', 'NY', 'NC', 'ND', 'OH',
          'OK', 'OR', 'PA', 'RI', 'SC',
          'SD', 'TN', 'TX', 'UT', 'VT',
          'VA', 'WA', 'WV', 'WI', 'WY',
          'Other'
        ],
        userlist: [
          'Manager', 'Staff'
        ],
        firstnameRules: [
          v => !!v || 'Last name is required',
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
        usertypeRules: [
          v => !!v || 'User type is required',
          v => (v && v.length <= 15) || 'User type must be at most 15 characters'
        ],
        phoneRules: [
          v => !!v || 'Enter a phone number in the following format xxx-xxx-xxxx',
          v => (v && v.length <= 12) || 'The phone number must be at most 12 characters'
        ],
        addressRules: [
          v => !!v || 'Address is required',
          v => (v && v.length <= 25) || 'Address must be at most 50 characters'
        ],
        cityRules: [
          v => !!v || 'City is required',
          v => (v && v.length <= 15) || 'City must be at most 15 characters'
        ],
        zipcodeRules: [
          v => !!v || 'Zipcode is required',
          v => (v && v.length <= 5) || 'City must be at most 5 characters'
        ],
      }
    },
    methods: {
      registerEmployeeVisitor() {
        if (this.$refs.form.validate()) {
          console.log('registering')
          axios.post('http://localhost:8081/registerEmployee', {
            firstname: this.firstname,
            lastname: this.lastname,
            emails: this.emailitems,
            username: this.username,
            password: this.password,
            usertype: this.usertype,
            phone: this.phone,
            address: this.address,
            city: this.city,
            state: this.e1,
            zipcode: this.zipcode
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
        this.emailitems.push({'email': this.email})
      },
      removeEmail(index) {
        this.emailitems.splice(index, 1)
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
