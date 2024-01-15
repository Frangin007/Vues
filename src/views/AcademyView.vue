<template>
    <section class="academy-ctn">
        <!--<div class="section-container">
            <router-link to="/academy/videos" class="head-spot head-spot--active">
                Videos
            </router-link>
            <router-link to="/academy/serials" class="head-spot">
                Masterclasses Series
            </router-link>
            <h6 class="head-spot">
                Users
            </h6>
        </div>-->
        <router-view/>
        <!-- <div class="section-view">
        </div> -->
    </section>
</template>

<script>
import academyService from '@/services/AcademyService';
import programService from '@/services/ProgramService';
//eslint-disable-next-line
import { ref, onBeforeMount, computed, provide } from 'vue';

export default {
    name : 'AcademyView',
    setup () {
        const serials = ref([])
        const packages  = ref([])
        const trainers = ref([])
        

        onBeforeMount(async () => {
            await academyService.getAllSerials().then(res => {
                console.log(res)
                //console.log(serials)
                if (res.data.success) {
                    serials.value = res.data.data
                }
            }).catch (err => {
                console.log(err)
            })
            await programService.getAllPackage().then(res => {
                console.log(res)
                if (res.data.success) {
                    packages.value = res.data.data
                }
            })
            await academyService.getAllTrainers().then(res => {
                console.log(res)
                //console.log(serials)
                if (res.data.success) {
                    trainers.value = res.data.data
                }
            })
            
        })
        provide('allSerials', serials)
        provide('allPackage', packages)
        provide('allTrainers', trainers)
        //provide('allVideos', videos)
        //provide('videosCount', videosCount)
        return {
            serials,
            trainers
        }
    }
}
</script>
