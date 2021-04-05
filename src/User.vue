<template>


<div class="container mt-5">
    <div class="profile">
        <div class="profile-header">
            <div class="profile-header-cover"></div>
            <div class="profile-header-content">
                <div class="profile-header-img">
                    <img :src="this.data.avatar_url" alt="" />
                </div>
                <ul class="profile-header-tab nav nav-tabs nav-tabs-v2">
                    <li class="nav-item">
                        <a href="#" @click.prevent class="nav-link" data-toggle="tab">
                            <div class="nav-field">Repositories</div>
                            <div class="nav-value">{{ this.data.public_repos }}</div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" @click.prevent class="nav-link active" data-toggle="tab">
                            <div class="nav-field">Followers</div>
                            <div class="nav-value">{{ this.data.followers }}</div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" @click.prevent class="nav-link" data-toggle="tab">
                            <div class="nav-field">Following</div>
                            <div class="nav-value">{{ this.data.following }}</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="profile-container">
            <div class="profile-sidebar">
                <div class="desktop-sticky-top">
                    <h4>{{ this.data.login }}</h4>
                    <div class="font-weight-600 mb-3 text-muted mt-n2">@johnsmith</div>
                    <p>
                        {{ this.data.bio }}
                    </p>
                    <hr class="mt-4 mb-4" />
                </div>
            </div>

            <div class="profile-content">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="tab-content p-0">
                            <div class="tab-pane fade active show" id="profile-followers">
                                <div class="list-group">

                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div>
                                              <a href="#" @click.prevent class="text-dark font-weight-600">User №1</a>
                                            </div>
                                            <div class="text-muted fs-13px">Russia, Moscow</div>
                                        </div>
                                        <a href="#" @click.prevent class="btn btn-outline-primary">Follow</a>
                                    </div>
                                    <div class="list-group-item d-flex align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" width="50px" class="rounded-sm ml-n2" />
                                        <div class="flex-fill pl-3 pr-3">
                                            <div><a href="#" @click.prevent class="text-dark font-weight-600">User №2</a></div>
                                            <div class="text-muted fs-13px">Russia, Moscow</div>
                                        </div>
                                        <a href="#" @click.prevent class="btn btn-outline-primary">Follow</a>
                                    </div>
                                </div>
                                <div class="text-center p-3">
                                    <a href="#" @click.prevent class="text-dark text-decoration-none">Show more <b class="caret"></b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
      client_id: process.env.VUE_APP_CLIENT_ID, 
      client_secret: process.env.VUE_APP_CLIENT_SECRET, 
    };
  },
  computed: {},
  methods: {
    // openThread  : function(){ {
    //   console.log('openThread')
    //   return false;
    // }
  },
  created () {},
  mounted() {
    axios.get(`https://api.github.com/users/${this.$route.params.id}?client_id=${this.client_id}&client_secret=${this.client_secret}`).then(user => {
      this.data = user.data
      console.log(user.data, 'user')
    })
  }
};
</script>
