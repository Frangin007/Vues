
<template>
<!-- eslint-disable -->
	<div class="sup-container" >

		
		<DashboardSidebar class="layout-side" >
		</DashboardSidebar>
		<section class="layout-content">
			<dashboard-header/>
			<router-view />
			<!-- <slot/> -->
		</section>
		

	</div>
</template>

<script>
    /* eslint-disable */
	import DashboardSidebar from '../components/Sidebars/dashboardSidebar' ;
	//import DashboardHeader from '../components/Headers/dashboardHeader' ;
	import DashboardFooter from '../components/Footers/dashboardFooter' ;
	//import DashboardSettingsDrawer from '../components/Sidebars/DashboardSettingsDrawer' ;
	import dashboardHeader from '../components/Headers/dashboardHeader' ;

	export default ({
        name : 'dashboardLayout',
		components: {
			DashboardSidebar,
			//DashboardHeader,
			DashboardFooter,
			//DashboardSettingsDrawer,
			dashboardHeader
		},
		data() {
			return {
				// Sidebar collapsed status.
				sidebarCollapsed: false,
				
				// Main sidebar color.
				sidebarColor: "primary",
				
				// Main sidebar theme : light, white, dark.
				sidebarTheme: "light",

				// Header fixed status.
				navbarFixed: false,

				// Settings drawer visiblility status.
				showSettingsDrawer: false,
			}
		},
		methods: {
			toggleSidebar( value ) {
				this.sidebarCollapsed = value ;
			},
			toggleSettingsDrawer( value ) {
				this.showSettingsDrawer = value ;
			},
			toggleNavbarPosition( value ) {
				this.navbarFixed = value ;
			},
			updateSidebarTheme( value ) {
				this.sidebarTheme = value ;
			},
			updateSidebarColor( value ) {
				this.sidebarColor = value ;
			},
		},
		computed: {
			// Sets layout's element's class based on route's meta data.
			layoutClass() {
				return this.$route.meta.layoutClass ;
			}
		},
	})

</script>
<style lang="scss" scoped>
    
	


</style>