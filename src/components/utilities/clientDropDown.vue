<template>
    <Transition name="client-option">
        <div class="dropdown-container" >
            
            <div class="sub-container" v-if="client.etat == 'Pending'">
                <button>
                    <handOff-icon />
                    <span> No Action </span>
                </button>
            </div>
            <div class="sub-container" v-else-if="(client.etat == 'New') || (client.etat == 'Assess_Sent') || (client.etat == 'Assess_Reminded')">
                <button @click="$emit('openTest')" :disabled="isDisable">
                    <send-icon :class="{'btn-not' : ((client.etat == 'Assess_Sent') ? true : false )}"/>
                    <span v-if="client.etat == 'Assess_Sent' ">Sent</span>
                    <span v-else-if="isSubmit == 'test' ">Sending...</span>
                    <span v-else>Send Test</span>
                </button>
                <button @click="$emit('remindTest')" :disabled="isDisable"> 
                    <bellRinging-icon :class="{'btn-not' : (((client.etat == 'Assess_Reminded' )) ? true : false )}"/> 
                    <span v-if="(client.etat == 'Assess_Reminded' )">Reminded</span>
                    <span v-else-if="isSubmit == 'remindTest' ">Reminding...</span>
                    <span v-else>Remind Test</span>
                </button>
                <button :disabled="isDisable" @click="$emit('takenTest')">
                    <checks-icon :class="{'btn-not' : ((client.etat == 'Assess_Taken') ? true : false )}"/>
                    <span v-if="client.etat == 'Assess_Taken' ">Assess Done</span>
                    <span v-else-if="isSubmit == 'testTaken'">Marking...</span> 
                    <span v-else >Mark as done</span> 
                </button>
            </div>
            <div class="sub-container" v-else-if="client.etat == 'Assess_Taken' || client.etat == 'Package_Sent'">
                <button @click="$emit('genFile')" >
                    <fileZip-icon/>
                    <span v-if="client.profile_status == 'Off'">Generate Package</span>
                    <div v-else-if="typeof(generateStatus) == 'object'" class="package-bar">
                        <small> {{ progressStatus }} </small>
                        <div class="progress">
                            <div  class="inner-progress" :class="{'inner-progress' : (generateStatus.current_status == 'Off' ? true : false), 'inner-progress-on' : (generateStatus.current_status == 'On' ? true : false), 'inner-progress-half' : (generateStatus.current_status == 'Half' ? true : false), 'inner-progress-finish' : (generateStatus.current_status == 'Finish' ? true : false), }">

                            </div>
                        </div>
                    </div>
                    <span v-else>Loading...</span>
                </button>
                <button :disabled="!clientFileAvailable" @click="$emit('sendPackage')">
                    <fileSymlink-icon/>
                    <span>Send File</span>
                </button>
                <button :disabled="!clientFileAvailable" @click="$emit('download')">
                    <fileDownload-icon/>
                    <span>Download File</span>
                </button>
            </div>
        </div>
    </Transition>
</template>

<script>
import { ref, onUpdated } from 'vue';
import clientService from '@/services/ClientService';

export default {
    name : 'clientDrop',
    setup () {
        const generateStatus = ref ("null");
        onUpdated(() => {
            /**const clientState = ref(props.client.etat);
            console.log(clientState);
            if (clientState.value == 'Test taken') {
                clientService.getProfileStatus(props.client.ID).then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        generateStatus.value = res.data.data
                    }
                })
            }*/
        })

        return {
            generateStatus
        }
    },
    props : {
        active : {
            type : Boolean,
            default : false
        },
        isSubmit : {
            type : String,
            default : 'none'
        },
        client : {
            type : Object
        }
    },
    emits : ['openTest', 'remindTest', 'takenTest', 'genFile', 'sendPackage', 'download'],
    data() {
        return {
            
        }
    },
    computed : {
        isDisable() {
            if (this.isSubmit != "none") {
                return true
            }
            return false
        },
        clientFileAvailable() {
            if (this.client.profile_status == "On" && this.generateStatus.current_status == "Finish") {
                return true
            }
            return false
        },
        progressStatus() {
            if (this.generateStatus.current_status == "Off") {
                return "Not Started"
            } else if (this.generateStatus.current_status == "On") {
                return "In Progress"
            } else if (this.generateStatus.current_status == "Half") {
                return "Half Progress"
            } else if (this.generateStatus.current_status == "Finish") {
                return "Finish"
            }
            return ""  
        }
    },
    methods : {
        profileStatus() {
            console.log("profile checking")
            if ((this.client.etat == 'Assess_Taken' || this.client.etat == 'Package_Sent' ) && this.client.profile_status == "On") {
                clientService.getProfileStatus(this.client.ID).then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        this.generateStatus = res.data.data
                    }
                })
            }
        }
    },
    watch : {
        active (newvalue) {
            console.log(newvalue)
            if (newvalue) {
                setTimeout(() => {
                    this.profileStatus();
                }, 1000)
            } else {
                this.generateStatus = "null"
            }
        }
    },
    mounted () {

    }
}
</script>

<style lang="scss" scoped>
    //@import '../../scss/app.scss';
    
    .client-option-enter-active {
        transition: all 0.2s ease-out;
    }

    .client-option-leave-active {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .client-option-enter-from {
        transform: translate(50px, -50px);
        opacity: 0;
    }
    .client-option-leave-to {
        transform: scale(0.8);
        opacity : 0;

    }
</style>