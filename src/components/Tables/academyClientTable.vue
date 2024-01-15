<template>
    <div class="academyClient-table-container">
        <dropdownTable :dropdown="dropdown" :drop="drop" >
            
        </dropdownTable>
        <div class="table-row-header">
            <div class="table-cols-header">User</div>
            <div class="table-cols-header">Stats</div>
            <div class="table-cols-header">Subscription</div>
            <div class="table-cols-header">Last Logged</div>
            <div class="table-cols-header">Actions</div>
        </div>
        <div class="table-row" v-for="client in clients" :key="client.id" v-show="clients.length != 0"  @click="setCurrentClient(client)">
            <div class="table-cols">
                <div class="profile-container">
                    <div class="profile-image-pic" >
                        <img :src="academyAssetUrl + '/' + client.profile_pic" v-if="client.profile_pic">
                        <img :src="assetUrl + '/user.png'" v-else>
                    </div>
                    <!-- <div class="profile-image" v-else>
                        <genderFemale-icon v-if="client.gender == 'Female'"/>
                        <genderMale-icon v-else/>
                    </div> -->
                    <div class="profile-name">
                        <p>{{ client.firstname }} {{ client.lastname }}</p>
                        <p>{{ client.email }}</p>
                    </div>
                    
                </div>
                <div class="verified verified--true" v-if="client.logged">
                    <span>Online</span>
                </div>
                <div class="verified verified--false" v-else>
                    <span>Offline</span>
                </div>
            </div>
            <div class="table-cols"> 
                <!-- {{ client.user_type }} -->
                <div>
                    <!-- <p>
                        <span class="prog">{{ client.format.program_name }}</span> | <span class="pack">{{ client.format.package_name }}</span>
                    </p> -->
                    <p> 
                        <rss-icon/> : <span>1000h</span>
                    </p>
                    <p> 
                        <thumbUp-icon/> : <span>20</span>
                    </p>
                    <p>
                        <messageCircle2-icon/> : <span>20</span>
                    </p>
                </div>
            </div>
            <div class="table-cols">
                <Transition name="state-changing" mode="out-in">
                <span class="dunya" v-if="client.format.subscription == 'Free'">{{ client.format.subscription }}</span>
                <span class="sponsored" v-else-if="client.format.subscription == '1 Month'">{{ client.format.subscription }}</span>
                <span class="flutter" v-else-if="client.format.subscription == '3 Months'">{{ client.format.subscription }}</span>
                <span class="year" v-else-if="client.format.subscription == '1 Year'">{{ client.format.subscription }}</span>
                <!-- <span class="sponsored" v-else >Sponsored</span> -->
                </Transition>
            </div>
            <div class="table-cols">
                <Transition name="state-changing" mode="out-in">
                <span class="pending">{{ client.last_logged }}</span>
                </Transition>
            </div>
            <div class="table-cols">
                <button class="eye" @click="showCurrentClient"><eye-icon/></button>
                <button class="trash"><trash-icon/></button>
                <button class="dropdown" @click="dropDownClient($event)" :data-show="isCurrentDrop"><caretDown-icon/></button>
            </div>
            <span class="stick-class">
                {{ client.lang }}
            </span>
        </div>
        <div class="load loading-container" v-show="clients.length == 0">
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
    import dropdownTable from '../utilities/tableDropDown.vue'
    import tableFunctions from '@/composable/table';
    import { inject } from 'vue';

    export default {
        name : 'academyClientTable',
        setup () {
            const assetUrl = inject("assetUrl")
            const academyAssetUrl = inject("academyAssetUrl")
            return {
                assetUrl,
                academyAssetUrl
            }
        },
        data () {
            return {
                drop : {
                    top : "200px",
                    right : "400px"
                },
                dropdown : {
                    isDrop : false,
                },
            }
        },
        props : {
            clients : {
                type : Array,
                default () {
                    return []
                }
            },
            activeClient : {
                type : Object,
                default : null
            },
            actionsCount : {
                type : Number
            },
            isDrop : {
                type : Boolean,
                default : false
            }
        },
        emits : ['dropClient', 'currentClient', 'editClient', 'onAction'],
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
            dropDownClient(event, client) {
                this.setCurrentClient(client)
                this.dropdown.isDrop = !this.dropdown.isDrop
                this.drop = tableFunctions.dropdownPosition(event)
            },
            setCurrentClient(client) {
                this.$emit('currentClient',client)
            },
        }

    }

</script>