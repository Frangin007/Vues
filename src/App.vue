<template>
  <!-- eslint-disable -->
  
  <component  :is="layout"> 
      <router-view />
  </component>
  
</template>
<script> 
/* eslint-disable */
import dashboardLayout from '@/layouts/dash-board.vue';
import dashboardAuth from '@/layouts/dash-auth.vue';
import { useStore } from 'vuex';
import { provide } from 'vue';
export default {
  setup() {
    const store = useStore()
    console.log(store.getters['getAcademyAssetUrl'])
    provide('assetUrl', store.getters['getAssetUrl'])
    provide('academyAssetUrl', store.getters['getAcademyAssetUrl'])
  },
  data()  {
    return {
      success : false
    };
  },
  computed : {
    layout() {
			return "dashboard" + "-" + ( this.$route.meta.layout || "layout" );
			//return "dashboard-auth";
		} 
  },
  components : {
    dashboardLayout,
    dashboardAuth
  },
  created () {
    console.log(this.$route)
  }
};
</script>
<style lang="scss" scoped>
/* eslint-disable */


</style>
