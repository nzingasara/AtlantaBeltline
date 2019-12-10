<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <h1>Register Navigation</h1>
              <v-card>
                <v-layout row center align-center justify-center>
                  <v-flex xs5 md5>
                    <v-btn block color="primary"
                           @click="userOnly">User Only
                    </v-btn>
                    <v-btn block color="primary"
                           @click="visitorOnly">Visitor Only
                    </v-btn>
                    <v-btn block color="primary"
                           @click="employeeOnly">Employee Only
                    </v-btn>
                    <v-btn block color="primary"
                           @click="employeeVisitor">Employee Visitor
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
    name: 'RegisterNavigation',
    data() {
      return {}
    },
    methods: {
      userOnly() {
        this.$router.push('/registerUser');
      },
      visitorOnly() {
        this.$router.push('/registerVisitor');
      },
      employeeOnly() {
        this.$router.push('/registerEmployee');
      },
      employeeVisitor() {
        this.$router.push('/employeeVisitor');
      },
      back() {
        this.$router.push('/');
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
</style>
