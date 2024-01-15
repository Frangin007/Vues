<template>
	
	<header class="dashboard-header">
		<div class="left-side">
			<h5> {{ pageTitle }} </h5> <chevronRight-icon/>
		</div>
		<div class="right-side">
			<div class="search-block" :class="{'search-block--active' : searchBoxActive }" >
				<inputTemplate type="search" textHolder="Search" v-model:modelValueText="searchInput" @searchActive="searchBoxActive = true" @searchInactive="searchBoxActive = false"/>
			</div>
			<div class="notif-block">
				<bell-icon/>
			</div>
			<div class="user-profile" @click="profileDrop = !profileDrop" :class="{'user-profile--active' : profileDrop}">
				<!--<div class="profile-container">
					<img src="https://admin.takafamindset.com/takafa_streaming/storage/profiles/TK_IMG_62407f486a564.jpg" alt="none"/>
				</div>-->
				<div class="profile-container profile-container--letter" :style="{}">
					<component :is="profileFirstLetter"/>
					<component :is="profileLastLetter"/>
				</div>
				<dropdown class="dropdown-profile" v-show="profileDrop" @click.stop>
					<button>
						<settings-icon/> <span> Settings </span>
					</button>
					<button @click="logOut">
						<logout-icon/> <span> Log Out </span>						
					</button>
				</dropdown>
			</div>
			<button class="float-menu-icon">
				<menu2-icon/>
			</button>
			<!--<button @click="logOut">
				Log Out
			</button>-->
		</div>
	</header>

</template>

<script>
	import inputTemplate from '@/components/forms/inputs';
	import dropdown from '@/components/utilities/dropdownList';
	import { ref, computed } from 'vue';
	import { useStore } from 'vuex';
	import { useRoute } from 'vue-router'
	export default ({
        name : 'dashboardHeader',
		setup() {
			const store = useStore();
			const route = useRoute();
            const userAdmin = ref(computed(()=> JSON.parse(store.getters['currentUser'])));
			//const letter = userAdmin.value.ussername.split('')[0].toUppercase()
			//const profileLetter = computed(() =>`letter${letter}-icon`)
			console.log(route.meta.pageTitle)
			const pageTitle = computed(()=> route.meta.pageTitle)
			return {
				userAdmin,
				pageTitle
			}

		},
		components : {
			inputTemplate,
			dropdown
		},
		props: {
			// Header fixed status.
			navbarFixed: {
				type: Boolean,
				default: false,
			},

			// Sidebar collapsed status.
			sidebarCollapsed: {
				type: Boolean,
				default: false,
			},

			// Header notifications data.
			/*notificationsData: {
				type: Array,
				default: () => notificationsData,
			},*/
		},
		data() {
			return {
				// Fixed header/sidebar-footer ( Affix component ) top offset.
				top: 0,
				// Search input loading status.
				searchLoading: false,
				// The wrapper element to attach dropdowns to.
				wrapper: document.body,
				searchInput : '',
				searchBoxActive : false,
				profileDrop : false
			}
		},
		computed : {
			profileFirstLetter() {
				if (!this.userAdmin) {
					return ""
				}
				const letterA = this.userAdmin.firstname.split('')[0].toUpperCase()
				return `letter${letterA}-icon`
			},
			profileLastLetter()  {
				if (!this.userAdmin) {
					return ""
				}
				const letterB = this.userAdmin.lastname.split('')[0].toUpperCase()
				return `letter${letterB}-icon`
			}
		},
		methods: {
			resizeEventHandler(){
				this.top = this.top ? 0 : -0.01 ;
				// To refresh the header if the window size changes.
				// Reason for the negative value is that it doesn't activate the affix unless
				// scroller is anywhere but the top of the page.
			},
			/*onSearch(value){
			}*/
			logOut() {
				this.$store.dispatch('signOut')
				this.$router.push('/');
			}
		},
		mounted: function(){
			// Set the wrapper to the proper element, layout wrapper.
			this.wrapper = document.getElementById('layout-dashboard') ;
		},
		created() {
			// Registering window resize event listener to fix affix elements size
			// error while resizing.
			window.addEventListener("resize", this.resizeEventHandler);
		},
		unMounted() {
			// Removing window resize event listener.
			window.removeEventListener("resize", this.resizeEventHandler);
		},
	})

</script>
<style lang="scss" scoped>

	
</style>