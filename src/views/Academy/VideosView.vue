<template>
    <article>
        <confirm-box v-show="isConfirm" @click.stop ref="confirm" :boxContent="confirmContent" @close="isConfirm = false"/>
        <div class="video-container">
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
                        <inputTemplate :type="'select'" :textHolder="'Language'" v-model:modelValueText="language" :selectOption="languageArray" :isSelectEmit="true" @selectClick="serialEnable"/>
                        <inputTemplate :type="'select'" :textHolder="'Serial'" v-model:modelValueText="videoCat" :selectOption="categoryArray" :isSelectClick="isSerialActive" @selectError="serialPrevent"/>
                        <inputTemplate :type="'select'" :textHolder="'Trainers'" v-model:modelValueText="videoTrainer" :selectOption="trainersArray"/>

                        <inputTemplate :textHolder="'Duration : 12:20:20'" v-model:modelValueText="videoTime" :isIcon="false"/>
                        <div class="form-row form-row--three">
                            <inputTemplate :type="'file'" :textHolder="`File ${index == 0 ? 'A' : index == 1 ? 'B' : 'C' }`" class="file-select" @fileChanged="fileHandle" ref="fileInput" :isMultipleFile="true" :fileIndex="index" :fileSelected="fileSelectArray[index]" v-for="(file, index) in fileSelectArray" :key="file"/>                            <!-- <inputTemplate :type="'file'" :textHolder="'File B'" class="file-select" @fileChanged="fileHandle" ref="fileInput" :isMultipleFile="true" :fileIndex="1"/> -->
                            <!-- <inputTemplate :type="'file'" :textHolder="'File C'" class="file-select" @fileChanged="fileHandle" ref="fileInput" :isMultipleFile="true" :fileIndex="2"/> -->
                        </div>
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
            <div class="video-header">
                <h5>Masterclasses Videos</h5>
                <div class="side-action">
                    <button @click.stop="() => { modalAction='add'; resetVideoProps(); modalShow = true }">
                        <plus-icon/> 
                        <span>Add</span>
                    </button>
                </div>
            </div>
            <div class="video-content">
                <academyVideoTable :videos="allVideos" :activeVideo="currentVideo" :actionsCount="4" @currentVideo="setCurrentVideo" @onAction="dropdownAction" :isSubmit="isDropSubmit">
                    <template #page>
                        <pagination :totalCount="videosCount" :step="15" @changePage="getVideosPerPage" ref="pageControl"/>
                    </template>
                </academyVideoTable>
            </div>
        </div>
        <alert-box v-show="isAlert.open" @close="isAlert.open = false" :isClose="isAlert.close" :alertType="isAlert.type" :text="isAlert.text" @click.stop/>
    </article>
</template>

<script>
import utilities from '@/utils/utilities.js';
import modalGlobal from '../../components/utilities/modalGlobal';
import inputTemplate from '../../components/forms/inputs';
import { inject, onBeforeMount, ref } from 'vue';
import academyService from '@/services/AcademyService';
import academyVideoTable from '@/components/Tables/academyVideoTable';
import pagination from '../../components/utilities/pagination';
import alertBox from '@/components/utilities/alertBox';
import confirmBox from '@/components/utilities/confirmationBox';
import utils from '@/composable/utilities'


export default {
    name : 'VideosView',
    setup () {
        const allSerials = inject('allSerials')
        console.log(allSerials.value)
        const allPackages = inject('allPackage')
        console.log(allPackages)
        const allTrainers = inject('allTrainers')
        console.log(allTrainers.value)
        const allVideos = ref([])
        const videosCount = ref(0);
        //const categoryArray = ref([])
        //categoryArray.value = allSerials.value.map((serial) => serial.title)
        onBeforeMount(async ()=> {
            await academyService.getAllVideos().then(res => {
                console.log(res)
                if (res.data.success) {
                    allVideos.value = res.data.data.videos
                    videosCount.value = res.data.data.count
                }
            })
        })
        return {
            allSerials,
            allPackages,
            allTrainers,
            allVideos,
            videosCount
            //categoryArray
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
            currentVideo : null,
            modalAction : "add",
            isConfirm : false, // confirm box detection
            confirmProp : null,
            isDropSubmit : false
        }
    },
    computed : {
        categoryArray() {
            if (this.language == "") {
                return []
            }
            if (this.allSerials) {
                return (this.allSerials.filter(serial => serial.lang == this.language)).map( serial => serial.title)
            }
            return []
        },
        trainersArray() {
            if (this.allTrainers) {
                return this.allTrainers.map( trainer => trainer.firstname + " " + trainer.lastname)
            }
            return []
        },
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
        academyVideoTable,
        pagination,
        confirmBox
    },

    methods: {
        fileHandle(file, index) {
            this.fileTypeArray[index] = file
            //console.log(this.$refs[`fileInput${index}`])
            if (this.fileTypeArray[index].size > 0) {
                this.fileSelectArray[index] = true
                this.$refs.fileInput[index].fileClass = true
                console.log(this.$refs.fileInput[index].fileClass)
            }
            console.log(this.fileTypeArray)
        },
        async getVideosPerPage(page = 0) {
            this.allVideos = [];
            await academyService.getAllVideos(page).then(res => {
                console.log(res)
                this.allVideos = res.data.data.videos;
                this.videosCount = res.data.data.count;
            
            })
        },
        async submitVideo() {
            this.validateError = false
            this.isSubmit = true
            let notVideoValidate = this.validateVideoSubmit();
            if (notVideoValidate) {
                this.validateError = true
                this.isSubmit = false
                return
            }
            console.log("okay")
            //return
            //eslint-disable-next-line
            let video = {
                title : this.videoTitle,
                description : this.videoDescription,
                category : this.videoCat,
                authorId : this.mapTrainerId(this.videoTrainer),
                url : this.videoUrl,
                //covers : this.fileTypeArray,
                language : this.language,
                duration : this.videoTime,
                package : this.pack
            }
            let videosArray = [
                video
            ];
            let fileArray = [
                this.fileTypeArray
            ]
            let videosFormPost = new FormData();
            videosFormPost.append('datas', JSON.stringify(videosArray));
            for (let filePos = 0; filePos < fileArray.length; filePos++) {
                const aFile = fileArray[filePos]
                for(let fileTypePos = 0; fileTypePos < aFile.length; fileTypePos++) {
                    let fileType = fileTypePos == 0 ? 'a' : (fileTypePos == 1 ? 'b' : 'c')
                    videosFormPost.append(`file${filePos}-${fileType}`, aFile[fileTypePos])
                }
                
            }
            console.log(videosFormPost)
            console.log(videosArray)
            
            //return
            //eslint-disable-next-line
            if (this.modalAction == "add") {
                await academyService.createVideos(videosFormPost).then(res => {
                    this.isSubmit = false
                    console.log(res)
                    if (res.data.success) {
                        this.isAlert.close = true
                        this.isAlert.text = res.data.message
                        this.isAlert.open = true
                    }
                }).catch(err => {
                    this.isSubmit = false
    
                    console.log(err)
                })
            } else if (this.modalAction == "edit") {
                await academyService.updateVideo(this.currentVideo.id, videosFormPost).then(res => {
                    this.isSubmit = false
                    console.log(res)
                    if (res.data.success) {
                        this.isAlert.close = true
                        this.isAlert.text = res.data.message
                        this.isAlert.open = true
                        this.modalShow = false
                        this.updateIndexVideo(res.data.data)
                    }
                }).catch(err => {
                    this.isSubmit = false
                    
                    console.log(err)
                })
            }

        },
        serialPrevent() {
            alert("Please choose a language")
        },
        serialEnable() {
            this.isSerialActive = true
        },
        mapTrainerId(trainer) {
            let trainerNames = trainer.split(" ")
            let trainerSelect = (this.allTrainers.filter(trainer => trainer.firstname == trainerNames[0] && trainer.lastname == trainerNames[1]))[0]
            //console.log(trainerSelect) 
            return trainerSelect.id
        },
        validateVideoSubmit() {
            //console.log(this.fileTypeArray)
            if (this.videoTitle.trim() == '') {
                this.validateErrorMessage = 'Please give a title'
                return true
            } else if (this.videoDescription.trim() == '') {
                this.validateErrorMessage = 'Please give a description'
                return true
            } else if (this.videoUrl.trim() == '' || !utilities.validateUrl(this.videoUrl)) {
                this.validateErrorMessage = 'Invalid video url'
                return true
            } else if (this.pack.trim() == '') {
                this.validateErrorMessage = 'Select a package'
                return true
            } else if (this.language.trim() == '') {
                this.validateErrorMessage = 'Select a languague'
                return true
            } else if (this.videoCat.trim() == '') {
                this.validateErrorMessage = 'Select a serial'
                return true
            } else if (this.videoTrainer.trim() == '') {
                this.validateErrorMessage = 'Select a trainer'
                return true
            } else if (this.videoTime.trim() == '') {
                this.validateErrorMessage = 'Please give the duration'
                return true
            } else if (!this.validateFiles()) {
                if (this.fileTypeArray.length == 0 && this.modalAction == "edit") return
                this.validateErrorMessage = 'Please upload the exact number of files\n Only accepting jpeg files'
                return true
            }
            
        },
        validateFiles() {
            if (this.fileTypeArray.length != 3) {
                return false
            }
            for(let fileTypePos = 0; fileTypePos < this.fileTypeArray.length; fileTypePos++) {
                    console.log(this.fileTypeArray[fileTypePos])
                    if (this.fileTypeArray[fileTypePos].type != "image/jpeg") {
                        return false
                    }
            }
            return true
        },
        updateIndexVideo(newVideo) {
            if (this.allVideos.length == 0) {
                return
            }

            const index = this.allVideos.findIndex(object => {
                return object.id === newVideo.id
            })
            if (typeof(index) == "number") {
                this.currentVideo = newVideo
                console.log("new Client")
                // this.allVideos[index].coverUrl = ""
                // setTimeout(()=>{
                // }, 1000)
                this.allVideos[index] = newVideo
            }
        },
        setCurrentVideo(video) {
            this.currentVideo = video
            console.log(this.currentVideo)
        },
        videoDisplayTitle(video) {
            return utils.videoTitle(video)
        },
        resetVideoProps() {
            this.videoTitle = ""
            this.videoDescription = ""
            this.videoUrl = ""
            this.videoCat = ""
            this.videoTrainer = ""
            this.language =  ""
            this.videoTime =  ""
            this.pack  = ""
            this.isSerialActive = false
        },
        dropdownAction(action) {
            this[action]()
        },
        editVideo() {
            // editing the current video
            this.resetVideoProps()
            if (this.currentVideo) {
                console.log(this.currentVideo)
                let videoAuth = this.allTrainers.filter(trainer => trainer.firstname == this.currentVideo.firstname && trainer.lastname == this.currentVideo.lastname)[0]
                let vidCategory = this.allSerials.filter(serial => serial.id == this.currentVideo.categoryId)[0] 
                //console.log(vidCategory.title)
                this.videoTitle = utils.videoTitle(this.currentVideo.title)
                this.videoDescription = this.currentVideo.description
                this.videoUrl = this.currentVideo.url
                this.videoCat = vidCategory.title
                this.videoTrainer = videoAuth.firstname + " " + videoAuth.lastname
                this.language =  this.currentVideo.lang
                this.videoTime =  this.currentVideo.duration
                this.pack  = this.currentVideo.packageId

                this.isSerialActive = true
                this.modalAction = "edit"
                this.modalShow = true
            }
        },
        async publishVideo() {
            if (this.currentVideo) {
                this.isConfirm = true;
                await this.$refs.confirm.isOkay().then(async res => {
                    this.isConfirm = false
                    if (!res) {
                        return
                    }
                    this.isDropSubmit = true
                    //setTimeout(()=> {this.isDropSubmit = false; console.log('yeah')} , 5000)
                    //return //eslint-disable-next-line   
                    await academyService.publishVideo(this.currentVideo.id).then(res => {
                        console.log(res)
                        if (res.data.success) {
                            this.isAlert.close = true
                            this.isAlert.text = res.data.message
                            this.isAlert.open = true
                            this.isDropSubmit = false
                            this.updateIndexVideo(res.data.data)
                        }
                    })
                })
            }
        }


    }

}
</script>
<style>

</style>