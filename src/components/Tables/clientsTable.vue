<template>
    <div class="client-table-container">
        <slot name="dropClient" v-bind="activeClient">
        </slot>
        <div class="table-row-header">
            <div class="table-cols-header">Client</div>
            <div class="table-cols-header">Profession</div>
            <div class="table-cols-header">Payment</div>
            <div class="table-cols-header">Status</div>
            <div class="table-cols-header">Actions</div>
        </div>
        
        <div class="table-row" v-for="client in clients" :key="client.ID" v-show="clients.length != 0"  @click="setCurrentClient(client)">
            <div class="table-cols">
                <div class="profile-container">
                    <div class="profile-image-pic" v-if="client.profile_pic">
                        <img :src=" assetUrl + '/' + client.profile_pic">
                    </div>
                    <div class="profile-image" v-else>
                        <genderFemale-icon v-if="client.gender == 'Female'"/>
                        <genderMale-icon v-else/>
                    </div>
                    <div class="profile-name">
                        <p>{{ client.firstname }} {{ client.lastname }} | {{ calculateYear(client.birthdate) }} y.o</p>
                        <p>{{ client.email }}</p>
                    </div>
                </div>
                <div class="verified verified--true" v-if="client.verify">
                    <check-icon />
                </div>
                <div class="verified verified--false" v-else>
                    <x-icon />
                </div>
            </div>
            <div class="table-cols"> {{ client.profession }} </div>
            <div class="table-cols">
                <span class="dunya" v-if="client.payment_method == 'DunyaPay'">PayDunya</span>
                <span class="dunya" v-else-if="client.payment_method == 'FedaPay'">FedaPay</span>
                <span class="flutter" v-else-if="client.payment_method == 'Flutterwave'">Flutterwave</span>
                <span class="sponsored" v-else >Sponsored</span>
            </div>
            <div class="table-cols">
                <Transition name="state-changing" mode="out-in">
                <span class="pending" v-if="client.etat == 'Pending'">Pending</span>
                <span class="complete" v-else-if="client.etat == 'New'">New</span>
                <span class="test_sent" v-else-if="client.etat == 'Assess_Sent'">Psycho-Ass</span>
                <span class="test_taken" v-else-if="client.etat == 'Assess_Taken'">Ass-Done</span>
                <span class="test_remind" v-else-if="client.etat == 'Assess_Reminded'">Ass-Reminded</span>
                <span class="package_sent" v-else-if="client.etat == 'Package_Sent'">Package Sent</span>
                <span class="test_expire" v-else-if="client.etat == 'Expired'">Ass-Expired</span>
                </Transition>
            </div>
            <div class="table-cols">
                <button class="eye" @click="showCurrentClient"><eye-icon/></button>
                <button class="trash"><trash-icon/></button>
                <button class="dropdown" @click="dropDownClient($event)" :data-show="isCurrentDrop"><caretDown-icon/></button>
            </div>
            <span class="stick-class">
                {{ client.langue }}
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
//import clientDrop from '@/components/utilities/clientDropDown';
import utils from '@/composable/utilities'
import { inject } from 'vue';

export default {
    name : 'clientTable',
    setup() {
        const assetUrl = inject("academyAssetUrl")
        return {
            assetUrl
        }
    },
    data () {
        return {
            activeClient : {},
            //isDrop : false,
        }
    },
    props : {
        clients : {
            type : Array,
            default () {
                return []
            }
        },
        isDrop : {
            type : Boolean,
            default : false
        },
        dropValue : {
            type : String,
            default : 'nope'
        }
    },
    emits : ['dropClient', 'currentClient', 'showCurrent'],
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
    //    clientDrop
    
    },
    methods : {
        dropDownClient(event) {
            //this.isDrop = !this.isDrop ;
            this.$emit('dropClient', event, this.dropValue)
        },
        setCurrentClient(client) {
            this.activeClient = client;
            this.$emit('currentClient',client)
        },
        showCurrentClient() {
            this.$emit('showCurrent')
        },
        calculateYear(date) {
            return utils.calculateYear(date)
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>