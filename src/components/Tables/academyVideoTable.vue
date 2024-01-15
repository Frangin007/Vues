<template>
    <div class="video-table-container" @click="onTableClick">
        <dropdownTable :dropdown="dropdown" :drop="drop" >
            <template #table-actions>
                <button @click="onEditVideo">
                    <pencil-icon />
                    <span> Edit </span>
                </button>
                <button @click.stop="onPublishVideo">
                    <arrowBigUpLine-icon :class="{'btn-not' : activeVideo && activeVideo.format.status == 'active'}" />
                    <span v-if="activeVideo && activeVideo.format.status == 'inactive'"> 
                        {{ isSubmit && isPublishing ? 'Publishing...' : 'Publish' }}  
                    </span>
                    <span v-else-if="activeVideo && activeVideo.format.status == 'active'"> 
                        {{ isSubmit && isPublishing ? 'Unpublishing...' : 'Unpublish' }}  
                    </span>
                </button>
                <button>
                    <externalLink-icon />
                    <span> Go to video </span>
                </button>
            </template>
            
        </dropdownTable>
        <div class="table-row-header">
            <div class="table-cols-header">N°</div>
            <div class="table-cols-header">Video</div>
            <div class="table-cols-header">Author</div>
            <div class="table-cols-header">Status</div>
            <div class="table-cols-header">Actions</div>
        </div>
        
        <div class="table-row" v-for="(video, index) in videos" :key="video.id" v-show="videos.length != 0" >
            
            <div class="table-cols">
                <span>{{ index + 1 }}</span>
            </div>
            <div class="table-cols"> 
                <Transition name="state-update" mode="out-in">
                <div class="video-Image">
                    <img :src="video.coverUrl + '-a.jpg'" :alt="video.coverUrl"/>
                </div>
                </Transition>
                <div class="video-desc">
                    <Transition name="state-update" mode="out-in">
                    <p>
                        {{ videoDisplayTitle(video.title) }}
                    </p>
                    </Transition>
                    <div class="vid-package">
                        <Transition name="state-update" mode="out-in">

                        <span class="vid-pack vid-pack-free" v-if="video.format.package_name == 'Free'">
                            {{ video.format.package_name }}
                        </span>
                        <span class="vid-pack vid-pack-basic" v-else-if="video.format.package_name == 'Basic'">
                            {{ video.format.package_name }}
                        </span>
                        <span class="vid-pack vid-pack-premium" v-else-if="video.format.package_name == 'Premium'">
                            {{ video.format.package_name }}
                        </span>
                        <span class="vid-pack vid-pack-professional" v-else-if="video.format.package_name == 'Professional'">
                            {{ video.format.package_name }}
                        </span>
                        </Transition>
                    </div>
                </div>
            </div>
            <div class="table-cols">
                {{ video.firstname + " " + video.lastname }} 
            </div>
            <div class="table-cols">
                <Transition name="state-update" mode="out-in">
                    <span :class="{ 'status-active' : video.format.status == 'active', 'status-inactive' : video.format.status != 'active'}">
                    {{  video.format.status }}
                    </span>
                </Transition>
            </div>
            <div class="table-cols" @click="setCurrentVideo(video)">
                <button class="eye"><eye-icon/></button>
                <button class="trash"><trash-icon/></button>
                <button class="dropdown" @click.stop="dropDownVideo($event, video)" :data-show="isCurrentDrop"><caretDown-icon/></button>
            </div>
            
        </div>
        <div class="load loading-container" v-show="videos.length == 0">
            <div class="snippet" data-title=".dot-carousel">
                <div class="stage">
                <div class="dot-carousel"></div>
                </div>
            </div>
        </div>
        <slot name="page">
            
        </slot>
    </div>
</template>

<script>
import dropdownTable from '../utilities/tableDropDown';
import tableFunctions from '@/composable/table';
export default {
    name : 'academyVideoTable',
    data () {
        return {
            //activeVideo : null,
            //isDrop : false,
            drop : {
                top : "200px",
                right : "400px"
            },
            dropdown : {
                isDrop : false,
                isOrgClientDrop : false,
                isModalClient : false
            },
            isPublishing : false,
            
        }
    },
    props : {
        videos : {
            type : Array,
            default () {
                return []
            }
        },
        activeVideo : {
            type : Object,
            default : null
        },
        isDrop : {
            type : Boolean,
            default : false
        },
        dropValue : {
            type : String,
            default : 'nope'
        },
        actionsCount : {
            type : Number
        },
        isSubmit : {
            type : Boolean,
            default : false
        }
    },
    emits : ['dropClient', 'currentVideo', 'editVideo', 'onAction'],
    computed : {
        isCurrentDrop () {
            if (this.isDrop) {
                return true
            } else {
                return false
            }
        }
    },
    components : {
        dropdownTable
    },
    methods : {
        dropDownVideo(event, video) {
            this.setCurrentVideo(video)
            //this.$emit('dropClient', event, this.dropValue)
            this.dropdown.isDrop = !this.dropdown.isDrop
            this.drop = tableFunctions.dropdownPosition(event)
        },
        setCurrentVideo(video) {
            //this.activeVideo = video;
            this.$emit('currentVideo',video)
        },

        videoDisplayTitle(videoTitle) {
            return videoTitle.split("_").join(" ")
        },
        onTableClick() {
            tableFunctions.onTableActions(this.dropdown)
        },
        onEditVideo() {
            console.log("editing")
            //this.$emit('editVideo')
            this.$emit('onAction', 'editVideo')
        },
        onPublishVideo() {
            this.isPublishing = true
            this.$emit('onAction', 'publishVideo')
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>