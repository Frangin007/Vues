<template>
    <Transition name="modal-client">
        <div class="modal-client">
            <div class="close-container">
                <h5>
                    {{ modalTitle }}
                </h5>
                <button @click="$emit('closeMod')">
                    <x-icon/>
                </button>
            </div>
            <div class="line-bar"></div>
            <div class="sub-container" v-if="type == 'test' ">
                <div class="test-container">
                    <h6> Enter the link to send </h6>
                    <div class="test-input">
                        <link-icon/>
                        <input type="text" placeholder="https://asomelink.com/KgFKSB" v-model="linkTest"/>
                        <button :disabled="testBtn" @click="submitTestLink" v-if="!isSubmit">
                            Send
                        </button>
                        <div class="load loading-container" v-else>
                            <div class="snippet" data-title=".dot-flashing">
                                <div class="stage">
                                    <div class="dot-flashing"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div v-else-if="type == 'addClient' " class="container-client" :class="{'container-client--org':((isSectionActive == 'organisation') ? true : false)}">
                <div class="client-container">
                    <div class="row-level">
                        <h5>
                            <div @click="isSectionActive = 'client'">
                                Client
                                <div :class="{line : ((isSectionActive == 'client') ? true : false)}"></div>
                            </div>
                        </h5>
                        <h5>
                            <div @click="isSectionActive = 'organisation'">
                                Organisation
                                <div :class="{line : ((isSectionActive == 'organisation') ? true : false)}"></div>
                            </div>
                        </h5>
                    </div>
                    <div class="form-wrapper">
                        <Transition name="client-section">
                            <div class="form-level" v-if="isSectionActive == 'client'">
                                <article class="client-form">
                                    <div class="choice-level">
                                        <inputTemplate class="client-radio" :type="'radio'"  :radioBox="clientStat" v-model:modelValueText="clientStatus"/>
                                    </div>
                                    <Transition name="form-choice">
                                        <form v-if="clientStatus == 'New'" class="new-client">
                                            <div class="form-row">
                                                <inputTemplate :textHolder="'Firstname'" v-model:modelValueText="firstNameInput"/>
                                                <inputTemplate :textHolder="'Lastname'" v-model:modelValueText="lastNameInput"/>
                                            </div>
                                            <div class="form-row">
                                                <inputTemplate :type="'email'" :textHolder="'Email'" v-model:modelValueText="emailInput"/>
                                                <inputTemplate :textHolder="'Profession'" v-model:modelValueText="profession"/>
                                            </div>
                                            <div class="form-row">
                                                <inputTemplate :type="'date'" :textHolder="'Date'" v-model:modelValueText="date" />
                                                <inputTemplate :type="'address'" :textHolder="'Address'" v-model:modelValueText="address"/>
                                            </div>
                                            <inputTemplate :type="'radio'"  :radioBox="genderValue" v-model:modelValueText="gender" class="gender-box" textHolder='Gender'/>
                                            <div class="form-row">
                                                <inputTemplate :type="'tel'" :textHolder="'123697436641341'" modelValueText="telNumber" @updateNumber="getNumber"/>
                                                <inputTemplate :type="'country'" :textHolder="'Country'" modelValueText="country" @updateNumber="getNumber"/>
                                            </div>
                                            <!--<div class="form-row">
                                            </div>-->
                                            <inputTemplate :type="'radio'"  :radioBox="clientTypeArray" v-model:modelValueText="clientType" class="gender-box" textHolder='Client Type'/>
                                            <div class="form-row form-row-two" v-if="clientType == 'orgPrice'">
                                                <inputTemplate :type="'select'" :textHolder="'Organisation'" v-model:modelValueText="select" :selectOption="orgsArray" />
                                                <inputTemplate :type="'select'" :textHolder="'Language'" v-model:modelValueText="clientLang" :selectOption="langArray"/>

                                            </div>
                                            <div class="form-row form-row--three" v-if="clientType == 'price'">
                                                <inputTemplate :type="'number'" :textHolder="'Price($20)'" v-model:modelValueText="price"/>
                                                <inputTemplate :type="'select'" :textHolder="'Package'" v-model:modelValueText="plan" :selectOption="packageArray"/>
                                                <inputTemplate :type="'select'" :textHolder="'Language'" v-model:modelValueText="clientLang" :selectOption="langArray"/>
    
                                            </div>
                                            
                                            <div class="submit-ctn">
                                                <button type="submit" v-if="!submitClient" :disabled="isClientSubmit" @click.prevent="submitNewClient">
                                                    Submit
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
                                    </Transition>
                                    <Transition name="form-choice">
                                        <form v-if="clientStatus == 'Existing'" class="existing-client">
                                            <inputTemplate :type="'email'" :textHolder="'Email'" v-model:modelValueText="emailInput"/>
                                            <div class="submit-ctn">
                                                <button type="submit" v-if="!submitOldClient" @click.prevent="alertMod">
                                                    Submit
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
                                    </Transition>
                                </article>
                            </div>
                        </Transition>
                        <Transition name="organisation-section">
                            <div class="form-level" v-if="isSectionActive == 'organisation'">
                                <article class="client-form">
                                    
                                    <form>
                                        <div class="form-row">
                                            <inputTemplate :textHolder="'Name'" v-model:modelValueText="orgName"/>
                                            <inputTemplate :type="'email'" :textHolder="'Email'" v-model:modelValueText="orgEmail"/>
                                        </div>
                                        <div class="form-row">
                                            <inputTemplate :textHolder="'Description'" v-model:modelValueText="orgDesc"/>
                                            <inputTemplate :type="'select'" :textHolder="'Language'" v-model:modelValueText="lang" :selectOption="langArray"/>
                                        </div>
                                        <div class="form-row form-row--three">
                                            <inputTemplate :type="'tel'" :textHolder="'12369743'" modelValueText="orgPhone" @updateNumber="getNumber"/>
                                            <inputTemplate :type="'country'" :textHolder="'Country'" modelValueText="orgCountry" @updateNumber="getNumber"/>
                                            <inputTemplate :type="'address'" :textHolder="'Address'" v-model:modelValueText="orgAddr"/>
                                        </div>
                                        <div class="form-row form-row--three">
                                            <inputTemplate :type="'select'" :textHolder="'Organisation Type'" v-model:modelValueText="orgType" :selectOption="orgTypeArray"/>
                                            <inputTemplate :type="'select'" :textHolder="'Plan'" v-model:modelValueText="orgPlan" :selectOption="packageArray"/>
                                            <inputTemplate :type="'number'" :textHolder="'Price($20)'" v-model:modelValueText="orgPrice"/>
                                        </div>
                                        
                                        <h6> Person of contact </h6>
                                        <div class="form-row">
                                            <inputTemplate :textHolder="'Full name'" v-model:modelValueText="refName"/>
                                            <inputTemplate :type="'email'" :textHolder="'Email'" v-model:modelValueText="refEmail"/>
                                        </div>
                                        <div class="form-row">
                                            <inputTemplate :type="'tel'" :textHolder="'12369743'" modelValueText="refPhone" @updateNumber="getNumber"/>
                                            <inputTemplate :type="'country'" :textHolder="'Country'" modelValueText="refCountry" @updateNumber="getNumber"/>
                                        </div>
                                        <!--<div>
                                            <inputTemplate :type="'address'" :textHolder="'Address'" v-model:modelValueText="address"/>
                                        </div>
                                        <inputTemplate :type="'radio'"  :radioBox="clientTypeArray" v-model:modelValueText="clientType"/>
                                        <inputTemplate :type="'radio'"  :radioBox="genderValue" v-model:modelValueText="gender"/>-->
                                        <div class="submit-ctn">
                                            <button type="submit" v-if="!submitOrg" :disabled="isOrgSubmit" @click.prevent="submitOrgClient">
                                                Submit
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
                                </article>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
            <div v-else-if="type == 'generate'" class="package-container">
                <div v-if="program == 'Self Empowerment Program'" class="brain-container">
                    <form @submit.prevent="submitPackageProfile('brief')">
                        <div class="brain-row">
                            <h5> Focus </h5>
                            <inputTemplate :type="'radio'"  :radioBox="BrainArray" v-model:modelValueText="brainFocus" class="brain-box" :classCustom="'radio-two'"/>
                        </div>
                        <div class="brain-row">
                            <h5> Decision </h5>
                            <inputTemplate :type="'radio'"  :radioBox="BrainArray" v-model:modelValueText="brainDecision" class="brain-box" :classCustom="'radio-two'"/>
                        </div>
                        <div class="brain-row">
                            <h5> Drive </h5>
                            <inputTemplate :type="'radio'"  :radioBox="BrainArray" v-model:modelValueText="brainDrive" class="brain-box" :classCustom="'radio-two'"/>
                        </div>
                        <div class="brain-row">
                            <h5> Blue Bubble </h5>
                            <inputTemplate :type="'radio'"  :radioBox="BrainBubbleArray" v-model:modelValueText="brainBlueBubble" class="brain-box" :classCustom="'radio-two'"/>
                        </div>
                        <div class="brain-row">
                            <h5> Red Bubble </h5>
                            <inputTemplate :type="'radio'"  :radioBox="BrainBubbleArray" v-model:modelValueText="brainRedBubble" class="brain-box" :classCustom="'radio-two'"/>
                        </div>
                        <div class="brain-row">
                            <h5> Green Bubble </h5>
                            <inputTemplate :type="'radio'"  :radioBox="BrainBubbleArray" v-model:modelValueText="brainGreenBubble" class="brain-box" :classCustom="'radio-two'" />
                        </div>
                        <div class="brain-file">
                            <inputTemplate :type="'file'" :textHolder="'Select a File'" class="file-select" @fileChanged="fileHandle" ref="fileInput" :fileSelected="fileSelect"/>
                        </div>
                        <div class="submit-ctn">
                            <button type="submit" v-if="!submitPackage" :disabled="isPackageSubmit">
                                Submit
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
                <div v-else-if="program == 'Character and Career Development Program'" class="brain-container">
                    <form @submit.prevent="submitPackageProfile('talent')">
                        <div class="brain-row">
                            <inputTemplate :type="'checkbox'"  :checkBoxes="BrainTalentArray" @updateCheckbox="brainTalentUpdate" class="brain-box" :classCustom="'radio-two'"/>

                        </div>
                        <div class="brain-file">
                            <inputTemplate :type="'file'" :textHolder="'Select a File'" class="file-select" @fileChanged="fileHandle" :fileSelected="fileSelect" ref="fileInput"/>
                        </div>
                        
                        <div class="submit-ctn">
                            <button type="submit" v-if="!submitTalentPackage" :disabled="isTalentPackageSubmit">
                                Submit
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
            </div>
            
        </div>
    </Transition>
    
</template>

<script>
//import inputTemplate from '../forms/inputs';
import { inject, } from  'vue';
import clientService from '@/services/ClientService';
//import notBox from './alertBox';

export default {
    name : 'modalClient',
    setup () {
        const program = inject('program');
        const organs = inject('orgs');
        //const orgsArray = ref(organs.value.map(org => org.org_name));
        //console.log(orgsArray)
        return {
            program,
            organs
            //orgsArray
        }
    },
    data () {
        return {
            linkTest : '',
            firstNameInput : '',
            lastNameInput : '',
            emailInput : '',
            profession : '',
            telNumber : '',
            country : '',
            address : '',
            date : '',
            gender : ' ',
            select : '',
            selectVal : [
                'What',
                'Who',
                'How'
            ],
            price : null,
            plan : '',
            clientLang : '',
            packageArray : [
                'Basic',
                'Professional',
                'Premium',
            ],
            genderValue : [
                {
                    label : 'Male',
                    value : 'Male'
                },
                {
                    label : 'Female',
                    value : 'Female'
                },
            ],
            clientStatus : 'New',
            clientStat : [
                {
                    label : 'New Client',
                    value : 'New'
                },
                {
                    label : 'Existing Client',
                    value : 'Existing'
                },

            ],
            clientType : 'price',
            clientTypeArray : [
                {
                    label : 'Single',
                    value : 'price'
                },
                {
                    label : 'Organisation',
                    value : 'orgPrice'
                }
            ],

            isSectionActive : 'client',
            // Organisation data
            lang : 'EN',
            langArray : ['EN', 'FR'],
            orgName : '',
            orgDesc : '',
            orgEmail : '',
            orgPhone : '',
            orgCountry : '',
            orgAddr : '',
            orgType : '',
            orgTypeArray : ['University/School', 'Company', 'NGO'],
            orgPlan : '',
            orgPrice : null,
            refName : '',
            refEmail : '',
            refPhone : '',
            refCountry : '',
            submitClient : false,
            submitOldClient :  false,
            submitOrg : false,
            alertText : 'Simple test',
            alertShow : false,
            alertClose : true,
            brainFocus : '',
            brainDecision : '',
            brainDrive : '',
            BrainArray : [
                {
                    label : 'Extreme-Left',
                    value : 'Extreme-Left'
                },
                {
                    label : 'Middle-Left',
                    value : 'Middle-Left'
                },
                {
                    label : 'Middle-Right',
                    value : 'Middle-Right'
                },
                {
                    label : 'Extreme-Right',
                    value : 'Extreme-Right'
                },
            ],
            brainBlueBubble : '',
            brainRedBubble : '',
            brainGreenBubble : '',
            BrainBubbleArray : [
                {
                    label : 'Small',
                    value : 'Small'
                },
                {
                    label : 'Big',
                    value : 'Big'
                },
                
            ],
            brainFile : null,
            fileSelect : false,
            submitPackage : false,
            BrainTalentArray : [
                {
                    label : 'Adaptability',
                    value : 'Adaptability'
                },
                {
                    label : 'Collaboration',
                    value : 'Collaboration'
                },
                {
                    label : 'Commitment',
                    value : 'Commitment'
                },
                {
                    label : 'Connection',
                    value : 'Connection'
                },
                {
                    label : 'Critical Thinking',
                    value : 'CriticalThinking'
                },
                {
                    label : 'Data Mining',
                    value : 'DataMining'
                },
                {
                    label : 'Design',
                    value : 'Design'
                },
                {
                    label : 'Emotional Insight',
                    value : 'EmotionalInsight'
                },
                {
                    label : 'Entrepreneurship',
                    value : 'Entrepreneurship'
                },
                {
                    label : 'Imagination',
                    value : 'Imagination'
                },
                {
                    label : 'Modeling',
                    value : 'Modeling'
                },
                {
                    label : 'Prioritizing',
                    value : 'Prioritizing'
                },
                {
                    label : 'Proactivity',
                    value : 'Proactivity'
                },
                {
                    label : 'Problem Solving',
                    value : 'ProblemSolving'
                },
                {
                    label : 'Reflection',
                    value : 'Reflection'
                },
                {
                    label : 'Resilience',
                    value : 'Resilience'
                },
                {
                    label : 'Risk Tolerance',
                    value : 'RiskTolerance'
                },
                {
                    label : 'Vision',
                    value : 'Vision'
                },
                
            ],
            brainTalent : [],
            submitTalentPackage : false
        }
    },
    props : {
        modalTitle : {
            type :  String,
            default : 'Assessment Link'
        },
        isSubmit : {
            type : Boolean,
            //default : false
        },
        type : {
            type : String,
            default : 'test'
        },
        clientSource : {
            type : String,
        },
        client : {
            type : Object
        }
    },
    emits : ['closeMod', 'sendTest', 'confirmTest', 'alert'],
    computed : {
        testBtn () {
            if (this.linkTest == "") {
                return true
            }
            return false
        },
        orgsArray() {
            return this.organs.map(org => org.org_name)
        },
        typeClient () {
            if (this.clientType == "price" ) {
                return "single"
            }
            return "organisation"
        },
        isOrgSubmit() {
            if (this.validateTextInput(this.orgName) || this.validateTextInput(this.orgDesc) || this.validateEmail(this.orgEmail) || this.validateTextInput(this.orgPhone, "phone") || this.validateTextInput(this.orgCountry) || this.validateTextInput(this.orgAddr) || this.validateTextInput(this.orgType) || this.validateTextInput(this.orgPlan) || this.validateTextInput(this.orgPrice, "number") || this.validateTextInput(this.refName) || this.validateEmail(this.refEmail) || this.validateTextInput(this.refPhone, "phone") || this.validateTextInput(this.refCountry)) {
                return true
            }
            return false
        },
        isClientSubmit() {
            let partialValid = (this.validateTextInput(this.firstNameInput) || this.validateTextInput(this.lastNameInput) || this.validateEmail(this.emailInput) || this.validateTextInput(this.profession) || this.validateTextInput(this.telNumber, "phone") || this.validateTextInput(this.country) || this.validateTextInput(this.address) || this.validateTextInput(this.gender) || this.validateTextInput(this.date))
            if (this.clientType == "price") {
                if (partialValid || this.validateTextInput(this.plan) || this.validateTextInput(this.price, "number") || this.validateTextInput(this.clientLang)) {
                    return true
                } else {
                    return false
                }
            } else {
                if ( partialValid ||  this.validateTextInput(this.select)) {
                    return true
                } else {
                    return false
                }

            } 
        },
        isPackageSubmit() {
            if (this.validateTextInput(this.brainFocus)|| this.validateTextInput(this.brainDecision) || this.validateTextInput(this.brainDrive) ||  this.validateTextInput(this.brainBlueBubble) || this.validateTextInput(this.brainRedBubble) || this.validateTextInput(this.brainGreenBubble) || this.validateFile(this.brainFile)) {
                return true
            }
            return false
        },
        isTalentPackageSubmit() {
            if (this.validateArray(this.brainTalent, 6) && !this.validateFile(this.brainFile)) {
                return false
            }
            return true
        }
    },
    components : {
        //inputTemplate,
        //notBox
    },
    methods: {
        submitTestLink() {
            this.$emit('sendTest', this.linkTest, this.clientSource)
            //this.$emit('confirmTest', 'sendTest', false, this.linkTest)
        },
        getNumber(phoneNumber, numberVariable) {
            this[numberVariable] = phoneNumber
        },
        validateTextInput(text, type="text") {
            if (type == "number") {
                if (text == null) {
                    return true
                } else {
                    return false
                }
            }
            if (text.trim() == "") {
                return true
            }
            if (type == "phone" ) {
                if ((text.split(')')[1] == "null") || (text.split(')')[1] == "")) {
                    return true
                }
                //console.log()
            }
            return false
        },
        validateNumber(number) {
            if (number <= 0) {
                return true
            }
            return false
        },
        validateEmail(email) {
            let pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            if (pattern.test(email)) {
                return false
            }
            return true
        },
        validateFile(file) {
            if (file == null) {
                return true
            } else if (file.size <= 0) {
                return true
            } else {
                //this.fileSelect = true
                return false
            }
        },
        validateArray(array, number) {
            if (array.length == number) {
                return true
            } else {
                return false
            }
        },
        brainTalentUpdate(value) {
            this.brainTalent = value
        },

        alertMod(type = "success") {
            this.$emit('alert', this.alertText, this.alertClose, type)
        },
        // Organisation submit form

        async submitOrgClient() {
            this.submitOrg = true;
            const payload = {
                name : this.orgName,
                email : this.orgEmail,
                description : this.orgDesc,
                address : this.orgAddr,
                country : this.orgCountry,
                phone : this.orgPhone,
                ref : {
                    fullname : this.refName,
                    email : this.refEmail,
                    country : this.refCountry,
                    phone : this.refPhone
                },
                type : this.orgType,
                package : this.orgPlan,
                program : this.program,
                price : this.orgPrice,
                langue : this.lang
            }
            console.log(payload);
            //return
            await clientService.createClientOrg(payload).then(res => {
                console.log(res)
                if (res.data.success) {
                    this.alertText = res.data.message;
                    this.alertClose = true;
                    this.alertMod();
                    this.submitOrg = false;
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        async submitNewClient() {
            this.submitClient = true;
            const payload = {
                firstname : this.firstNameInput,
                lastname : this.lastNameInput,
                email : this.emailInput,
                profession : this.profession,
                birthdate : this.date,
                gender : this.gender,
                phone : this.telNumber,
                country : this.country,
                address : this.address,
                langue : this.clientLang,
                type : this.typeClient,
                package : this.plan,
                program : this.program,
                price : this.price,
                org : this.select
            }
            console.log(payload)
            await clientService.createClient(payload).then(res => {
                console.log(res)
                this.submitClient = false;
                if (res.data.success) {
                    this.alertText = res.data.message;
                    this.alertClose = true;
                    this.alertMod();
                } else if (res.data.error) {
                    this.alertText = res.data.message;
                    this.alertClose = true;
                    this.alertMod("danger");
                } else {
                    this.alertText = res.data;
                    this.alertClose = true;
                    this.alertMod();
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        fileHandle(file) {
            this.brainFile = file
            console.log(this.brainFile)
            if (this.brainFile.size > 0) {
                this.fileSelect = true
                this.$refs.fileInput.fileClass = true
            }
        },
        async submitPackageProfile(type) {
            let profileData
            if (type == "brief") {
                this.submitPackage = true
                profileData = {
                    type : 'BBP',
                    data : {
                        focus : this.brainFocus,
                        decision : this.brainDecision,
                        drive : this.brainDrive,
                        blueBubble : this.brainBlueBubble,
                        redBubble : this.brainRedBubble,
                        greenBubble : this.brainGreenBubble,
                    },
                    clientId : this.client.ID
                }
            } else if (type == "talent") {
                this.submitTalentPackage = true
                profileData = {
                    type : 'BTP',
                    data : {
                        talent : this.brainTalent
                    },
                    clientId : this.client.ID
                }
            }
            console.log(profileData)
            let formData = new FormData();
            formData.append('data', JSON.stringify(profileData))
            formData.append('file', this.brainFile)
            //return
            await clientService.generateProfile(formData).then(res => {
                console.log(res)
                if (res.data.success) {
                    this.alertText = res.data.message;
                    this.alertClose = true;
                    this.alertMod();
                    this.submitPackage = false
                    this.submitTalentPackage = false
                }
            })
            .catch(err => { 
                console.log(err)
            })
        }
    }

}
</script>

<style lang="scss" scoped>
    
    
</style>