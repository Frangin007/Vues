<template>
    <article>
        <confirm-box v-show="isConfirm" @click.stop ref="confirm" :boxContent="confirmContent" @close="isConfirm = false"/>
        <div class="academyClient-container">
            <modal-global :modalTitle="modalAction == 'add' ? 'Add a video' : videoDisplayTitle(currentVideo.title)" v-show="modalShow" @closeMod="modalShow = false">

                <div class="video-add-ctn">
                    <div class="error-ctn bd-md" v-show="validateError">
                        {{ validateErrorMessage }}
                    </div>
                    <form>
                        <inputTemplate :textHolder="'Title'" v-model:modelValueText="videoTitle" :isIcon="false" />
                        <inputTemplate :textHolder="'Description'" :type="'textarea'" v-model:modelValueText="videoDescription"/>
                        <inputTemplate :textHolder="'url : https://example.com/jFBGSbd5cHGDFF'" v-model:modelValueText="videoUrl" :isIcon="false"/>
                        <inputTemplate :type="'select'" :textHolder="'Package'" v-model:modelValueText="pack" :selectOption="packageArray"/>
                        
    
                        
                        <div class="submit-default">
                            <button type="submit" v-if="!isSubmit" :disabled="isSubmit" @click.prevent="submitVideo">
                                <span v-if="modalAction == 'add'">
                                    Submit
                                </span>
                                <span v-else>
                                    Modify
                                </span>
                            </button>
                            <div class="load loading-container" v-else>
                                <div class="snippet" data-title=".dot-flashing">
                                    <div class="stage">
                                        <div class="dot-flashing"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </modal-global>
            <div class="academyClient-header">
                <h5>Academy Users</h5>
                <div class="side-action">
                    <button @click.stop="() => { modalAction='add'; resetVideoProps(); modalShow = true }">
                        <plus-icon/> 
                        <span>Add</span>
                    </button>
                </div>
            </div>
            <div class="clients-content">
                <academyClientTable :clients="clients" :activeClient="currentClient" :actionsCount="4" @currentClient="setCurrentClient" @onAction="dropdownAction" :isSubmit="isDropSubmit">
                    <template #page>
                        <pagination :totalCount="clientsCount" :step="15" @changePage="getClientPerPage" ref="pageControl"/>
                    </template>
                </academyClientTable>
            </div>
        </div>
        <alert-box v-show="isAlert.open" @close="isAlert.open = false" :isClose="isAlert.close" :alertType="isAlert.type" :text="isAlert.text" @click.stop/>
    </article>
</template>


<script>
    //import utilities from '@/utils/utilities.js';
    import modalGlobal from '../../components/utilities/modalGlobal';
    import inputTemplate from '../../components/forms/inputs';
    import { inject } from 'vue';
    import academyService from '@/services/AcademyService';
    import academyClientTable from '@/components/Tables/academyClientTable';
    import pagination from '../../components/utilities/pagination';
    import alertBox from '@/components/utilities/alertBox';
    import confirmBox from '@/components/utilities/confirmationBox';
    //import utils from '@/composable/utilities'
    import { ref, onBeforeMount } from 'vue'
    export default {
        name : 'ClientView',
        setup() {
            const allPackages = inject('allPackage')
            console.log(allPackages)
            const clients = ref([])
            const clientsCount = ref(0)
            onBeforeMount(async ()=> {
                await academyService.getAllClients().then((res)=> {
                    console.log(res)
                    if (res.data.success) {
                        clients.value = res.data.data.clients
                        clientsCount.value  = res.data.data.count
                    }
                })
            })
            return {
                allPackages,
                clients,
                clientsCount
            }
        },
        data () {
            return {
                modalShow : false,
                videoTitle : '',
                videoDescription : '',
                videoUrl : '',
                videoCat : '',
                videoTrainer : '',
                language : '',
                videoTime : '',
                pack : '',
                isSerialActive : false,
                languageArray : [
                    "EN",
                    "FR"
                ],
                fileTypeArray :[],
                fileSelectArray : [
                    false,
                    false,
                    false
                ],
                submit : false,
                isSubmit : false,
                isAlert : {
                    open : false,
                    close : false,
                    text : 'An success alert box and show',
                    type : 'success'
                },
                validateError : false,
                validateErrorMessage : '',
                currentClient : null,
                modalAction : "add",
                isConfirm : false, // confirm box detection
                confirmProp : null,
                isDropSubmit : false
            }
        },
        computed : {
            
            packageArray() {
                return [...new Set(this.allPackages.map(pack => pack.title))]
            },
            confirmContent () {
                if(this.confirmProp == null) {
                    return
                } else {
                    return this.confirmProp
                }
            },
        },
        components : { 
            modalGlobal,
            inputTemplate,
            alertBox,
            academyClientTable,
            pagination,
            confirmBox
        },


        methods : {
            setCurrentClient(client) {
                this.currentClient = client
                console.log(this.currentClient)
            },
            dropdownAction(action) {
                this[action]()
            },
            async getClientPerPage(page = 0) {
                this.clients = []
                await academyService.getAllClients(page).then((res)=> {
                    console.log(res)
                    if (res.data.success) {
                        this.clients = res.data.data.clients
                        this.clientsCount  = res.data.data.count
                    }
                })
            }
        }
    }
</script>