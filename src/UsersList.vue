<template>
 <div class="container mt-4">

    <div>
      <label for="login" style="color: black">Enter GITHUB login for search users</label>
       <div class="d-flex">
           <input class="form-control mr-sm-2 w-auto" id="login" name="login" type="text">
          <button @click="getInitialUsers()" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search on GITHUB</button>
       </div>
    </div>
  
    <div class="mt-2">
      <button @click="asc()" class="btn btn-outline-primary my-2 my-sm-0">Sort by ascending</button>
      <button @click="desc()" class="btn btn-outline-primary my-2 my-sm-0">Sort by descending</button>
    </div>
    
    <div>

      <div class="paginationWrapper" v-if="this.users.total_count < 30">
        <div class="pagination">
          <div class="page currentPage px-2 py-0 mr-2"> {{ this.page }} </div>
        </div> from {{Math.round(this.users.total_count / 30) + 1}}
      </div>
      
      <div class="paginationWrapper" v-else-if="this.users.total_count > 30">
        <div class="pagination">
          <div @click="changePage('prev')" class="page px-2 py-0" v-if="this.page - 1 >= 1"> {{ this.page - 1 }} </div>
          <div class="page currentPage px-2 py-0"> {{ this.page }} </div>
          <div @click="changePage('next')" class="page px-2 py-0 mr-2"> {{ this.page + 1 }} </div>
        </div> from {{Math.round(this.users.total_count / 30) + 1}}
      </div>

    </div>
    <div class="mt-5">
      <div @click="userPage()" v-for="(item, index) in usersData" :key="index" class="user">
        <router-link :to="{ name: 'Edit', params: { id: item.login } }" exact>
          {{ item.login }} - {{ item.public_repos }} repositories
        </router-link>
      </div>
    </div>
 </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
      page: 1,
      users: [],
      usersData: [],
    };
  },
  computed: {},
  methods: {
    userPage() {
      console.log('userPage')
    },
    asc() {
      this.usersData.sort((a,b) => (a.public_repos > b.public_repos) ? 1 : ((b.public_repos > a.public_repos) ? -1 : 0))
    },
    desc() {
      this.usersData.sort((a,b) => (a.public_repos < b.public_repos) ? 1 : ((b.public_repos < a.public_repos) ? -1 : 0))
    },
    changePage(to) {
      if (to == 'next') {
        this.page = this.page + 1
        this.getInitialUsers(this.page + 1)
      }
      if (to == 'prev') {
        this.page = this.page - 1
        this.getInitialUsers(this.page - 1)
      }
      console.log(to, 'to')
      console.log(this.page, 'this.page')
    },
    getInitialUsers : function(page) {
      let login = document.getElementById("login") ? document.getElementById("login").value : ''
      axios.get(`https://api.github.com/search/users?q=${login}&page=${page || 1}&client_id=${this.client_id}&client_secret=${this.client_secret}`).then(response => {
        this.users = response.data
        console.log(this.users.total_count, 'response total_count')
        for (let i = 0; i < response.data.items.length; i++) {
          axios.get(response.data.items[i].url + `?client_id=${this.client_id}&client_secret=${this.client_secret}`).then(user => {
            this.usersData.push(user.data)
            console.log(user.data, 'user')
          })
        }
      });
    }
  },
  beforeMount() {
    // this.getInitialUsers();
  }
};
</script>
