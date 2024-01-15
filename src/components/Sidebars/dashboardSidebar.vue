<template>
  <!-- eslint-disable -->
	<!-- Main Sidebar -->
  <aside class="sidebar">
    <header>
      <img src="http://admin.takafamindset.com/takafa_backend/storage/main/Takafamindset.svg" alt="Takafa Mindset"/>
    </header>
    <nav>
      <ul>
        <li>
          <div class="link-head">
            <div>
              <home-icon /> 
            </div>
            <span>
              Dashboard 
            </span>
          </div>
        </li>

        <router-link to="/clients" class="nav-link " v-bind:class="{ 'nav-link--active': verif('/clients') }">
          <div class="link-head">
            <div>
              <users-icon /> 
            </div>
            <span ref="client">
              Clients 
            </span>
          </div>
        </router-link>
        
        <router-link class="nav-link " to="/programs" :class="{'nav-link--active':verif('/programs')}"> 
          <div class="link-head">
            <div>
              <triangleSquareCircle-icon /> 
            </div>
            <span>
              Programs 
            </span> 
          </div>
        </router-link>
        <router-link class="nav-link " to="/academy/videos" :class="{'nav-link--active':verif('/academy') || verif('/academy/videos') || verif('/academy/serials') || verif('/academy/trainers') || verif('/academy/clients')}">
          <div class="link-head">
            <div>
              <school-icon /> 
            </div>
            <span>
              Academy 
            </span> 
          </div> 
          <ul class="link-child">
            <router-link to="/academy/videos" class="nav-link-child" :class="{'nav-link-child--active':verif('/academy/videos')}">Videos</router-link>
            <router-link to="/academy/serials" class="nav-link-child" :class="{'nav-link-child--active':verif('/academy/serials')}">Serials</router-link>
            <router-link  to="/academy/trainers" class="nav-link-child" :class="{'nav-link-child--active':verif('/academy/trainers')}">Trainers</router-link>
            <router-link  to="/academy/clients" class="nav-link-child" :class="{'nav-link-child--active':verif('/academy/clients')}">Clients</router-link>
          </ul>
        </router-link>
        <li>
          <div class="link-head">
            <div>
              <userSearch-icon /> 
            </div>
            <span>
              Consulting 
            </span> 
          </div>
        </li>
        <li>
          <div class="link-head">
            <div>
              <calendarEvent-icon /> 
            </div>
            <span>
              Events 
            </span> 
          </div>
        </li>
        <router-link to="/outils/bref" class="nav-link " v-bind:class="{ 'nav-link--active': (verif('/outils/bref') || verif('/outils/talents') || verif('/outils/decouverte') )}">
          <div class="link-head">
            <div>
              <calendarEvent-icon /> 
            </div>
            <span>
              Tools 
            </span> 
          </div>
        </router-link>
      </ul>
      <!-- <hr> -->
      <h6>Admins</h6>
      <ul>
        <li>
          <div class="link-head">
            <div>
              <users-icon /> 
            </div>
            <span>
              Admins 
            </span>
          </div>
        </li>
        <li class="">
          <div class="link-head">
            <div>
              <users-icon /> 
            </div>
            <span>
              Groups 
            </span> 
          </div>
        </li>
        <li>
          <div class="link-head">
            <div>
              <userCircle-icon /> 
            </div>
            <span>
              Profile 
            </span> 
          </div>
        </li>
        <li>
          <div class="link-head">
            <div>
              <home-icon /> 
            </div>
            <span>
              Other 
            </span> 
          </div> 
        </li>
      </ul>
    </nav>
    
  </aside>
</template>

<script>
/* eslint-disable */
import {  reactive, toRefs } from 'vue';
//import { MailOutlined, CalendarOutlined, AppstoreOutlined, SettingOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
export default ({
  name : 'sider-layout',

  setup() {
    const state = reactive({
      selectedKeys: [],
      openKeys: [],
    });
    const route = useRoute()
    //console.log(route)
    const handleClick = menuInfo => {
      //console.log('click ', menuInfo);
    };

    return { 
      ...toRefs(state),
      handleClick,
      route
    };
  },
  data () {
    return {
      collapsed : false,
      isActive:true,
      
    }
  },
  components: {
    //MailOutlined,
    //CalendarOutlined,
    //AppstoreOutlined,
    //SettingOutlined,
    //UserOutlined,
    //VideoCameraOutlined,
    //UploadOutlined
  },
  methods:{
    verif(nom){
      //console.log(this.$route.fullPath)
      if(this.$route.fullPath==nom){
        return this.isActive
    
      }
      else {
        return !this.isActive
      }
    
    }
  }


});
    
</script>


<style lang="scss" scoped>

</style>