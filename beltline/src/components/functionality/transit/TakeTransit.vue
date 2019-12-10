<template>
  <v-app>
    <v-content>
      <v-container>
        <div class="elevation-12">
          <h1>Take Transit</h1>
          <v-container>
            <v-layout row wrap align-end justify-start>
              <v-flex xs12 sm3 md2>
                <v-label>Contain Site</v-label>
              </v-flex>
              <v-flex xs12, sm3, md2>
                <v-select
                  v-model="selectedSite"
                  :items="containSiteList"
                  @change="showTable()"
                  menu-props="auto"
                  hide-details
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs2 sm2 md2 offset-md3>
                <v-label>Transport Type</v-label>
              </v-flex>
              <v-flex xs12, sm3, md2>
                <v-select
                  v-model="transportType"
                  :items="transportList"
                  menu-props="auto"
                  hide-details
                  label="Select Transport Type"
                  single-line
                ></v-select>
              </v-flex>

            </v-layout>
            <v-layout row wrap align-center justify-start>
              <v-flex xs2 sm3 md2>
                <v-label>Price Range</v-label>
              </v-flex>
              <v-flex xs2 sm1 md1>
                <v-text-field
                  :id.interpolate="lowerRange"
                  v-model="lowerRange"
                  class="center"
                  type="number"
                  min="0"
                  placeholder="00"
                ></v-text-field>
              </v-flex>
              <v-label md5>to</v-label>
              <v-flex xs2 sm1 md1>
                <v-text-field
                  v-model="upperRange"
                  width="10px"
                  type="number"
                  min="0"
                  placeholder="00"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 md1 offset-xs5 offset-md2 offset-lg5>
                <v-btn color="primary"
                       @click="filter()">Filter
                </v-btn>
              </v-flex>


            </v-layout>
          </v-container>


          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="routes"
            :pagination.sync="pagination"
            select-all
            item-key="route"
            class="elevation-1"
          >
            <template v-slot:headers="props">
              <tr>
                <th></th>
                <th
                  v-for="header in props.headers"
                  :key="header.text"
                  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                  @click="changeSort(header.value)"
                >
                  <v-icon small>arrow_upward</v-icon>
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template v-slot:items="props">
              <tr :active="props.selected" @click="props.selected = !props.selected">
                <td class="text-xs-center">
                  <v-checkbox
                    :input-value="props.selected"
                    primary
                    hide-details></v-checkbox>
                </td>
                <td class="text-xs-center">{{ props.item.route }}</td>
                <td class="text-xs-center">{{ props.item.type }}</td>
                <td class="text-xs-center">{{ props.item.price }}</td>
                <td class="text-xs-center">{{ props.item.connectedSites }}</td>
              </tr>
            </template>
          </v-data-table>
          <div>
            <v-alert
              v-model="alert"
              dismissible
              type="warning">
              You must select a transit and a date
            </v-alert>
          </div>
          <v-layout align-center justify-space-around row fill-height>
            <v-flex md1>
              <v-btn color="primary"
                     @click="">Back
              </v-btn>
            </v-flex>

            <v-flex xs12 sm6 md2>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Pick a date"
                    prepend-icon="event"
                    readonly
                    style="text-align:right"
                    class="text-md-center"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>


            <v-flex md1>
              <v-btn color="primary"
                     @click="logTransit()">Log Transit
              </v-btn>
            </v-flex>


          </v-layout>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>

  import axios from 'axios';

  export default {
    name: 'takeTransit',
    data() {
      return {
        pagination: {
          sortBy: 'route'
        },
        selected: [],
        queriedTable: [],
        transportType: 'ALL',
        transportList: [],
        selectedSite: '',
        containSiteList: [],
        lowerRange: '0',
        upperRange: '0',
        username: 'manager3',
        map: {},
        usernameSiteMap: {},
        date: '',
        menu: '',
        alert: '',
        headers: [
          {text: 'Route', align: 'center', value: 'route'},
          {text: 'Transport Type', align: 'center', value: 'type'},
          {text: 'Price', align: 'center', value: 'price'},
          {text: 'Connnected Sites', align: 'center', value: 'connectedSites'},
        ],
        routes: []
      }
    },
    mounted() {
      this.getTransitList();
    },

    methods: {
      // back() {
      // this.$router.push('/RegisterNavigation')
      // }

      filter() {
        var oldList = this.map[this.selectedSite];
        var filterResult = [];
        oldList.forEach((item) => {
          if (this.transportType == "ALL" || item.type == this.transportType) {
            //check if matches the selected transportType
            if (item.price >= this.lowerRange && item.price <= this.upperRange) {
              filterResult.push(item);
            }
          }
        });
        this.routes = filterResult;

      },
      logTransit() {
        //if the user doesn't choose a route or a date, alert!!


        if (!this.selected || !this.date) {
          this.alert = true;
        } else {
          //get the takeTransit(username, type, route, date)
          var selected = this.selected;
          var queriedTable = this.queriedTable;
          var date = this.date;
          var alert = this.alert;
          queriedTable.forEach(function (item) {
            for (var i = 0; i < selected.length; i++) {
              //get the Date instead of Datetime
              var str = new String(item.date).substring(0, 10);
              if (selected[i].type == item.type && selected[i].type == item.type
                && str == date) {
                alert = true;
              }
            }
            //log transit successfully
          })
        }
      },
      showTable() {
        this.routes = this.map[this.selectedSite];
        //display the transport type according the site
        var transportList = [];
        var routes = this.routes;
        routes.forEach(function (item) {
          if (transportList.indexOf(item.type) < 0) {
            transportList.push(item.type);
          }
        });
        transportList.push("ALL");
        this.transportList = transportList;
        this.transportType = this.transportList[0];
      },
      getTransitList() {
        axios.get('http://localhost:8081/takeTransit').then(
          result => {
            this.queriedTable = result.data;
            var map = {};
            var queriedTable = this.queriedTable;
            queriedTable.forEach(function (item) {
              //map site_name to its route, type, price
              if (map[item.site_name] == null) {
                map[item.site_name] = new Array();
              }
              map[item.site_name].push({
                'route': item.route,
                'type': item.type,
                'price': item.price,
                'connectedSites': 0
              });
            });

            this.containSiteList = Object.keys(map);
            this.selectedSite = this.containSiteList[0];
            this.routes = map[this.selectedSite];
            this.map = map;
            // this.usernameSiteMap = usernameSiteMap;
            var routes = this.routes;
            var transportList = [];
            routes.forEach(function (item) {
              if (transportList.indexOf(item.type) < 0) {
                transportList.push(item.type);
              }
            });
            transportList.push("ALL");
            this.transportList = transportList;
            this.transportType = this.transportList[0];
          },
          error => {
            console.log(error);
          }
        )
      },
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false
        }
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

  .styled-input {
    width: 50px;
    font-size: 12px;
  }

  .v-select {
    font-size: 14px;
    text-align: center;
  }

  .center {
    text-align: center;
  }
</style>
