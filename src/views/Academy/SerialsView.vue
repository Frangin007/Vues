<template>
    <section>
        <div class="serial-container">
            <modal-global :modalTitle="'Add a serial'" v-show="modalShow" @closeMod="modalShow = false">
                    <div class="serial-add-ctn">
                        <div class="error-ctn bd-md" v-show="validateError">
                            {{ validateErrorMessage }}
                        </div>
                        <form>
                            <inputTemplate :textHolder="'Title'" v-model:modelValueText="serialTitle" :isIcon="false" />
                            <inputTemplate :textHolder="'Description'" :type="'textarea'" v-model:modelValueText="serialDescription"/>
                            
                            <inputTemplate :type="'select'" :textHolder="'Language'" v-model:modelValueText="language" :selectOption="languageArray"/>
                            
                            <div class="submit-default">
                                <button type="submit" v-if="!isSubmit" :disabled="isSubmit" @click.prevent="submitSerial">
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
            </modal-global>
            <div class="serial-header">
                    <h5>Masterclasses Serials</h5>
                    <div class="side-action">
                        <button @click.stop="modalShow = true">
                            <plus-icon/> 
                            <span>Add</span>
                        </button>
                    </div>
            </div>
            <div class="serial-content">
                <academySerialTable :serials="allSerials" class="serial-table">

                </academySerialTable>
            </div>
        </div>
        <alert-box v-show="isAlert.open" @close="isAlert.open = false" :isClose="isAlert.close" :alertType="isAlert.type" :text="isAlert.text" @click.stop/>
    </section>
</template>

<script>
import modalGlobal from '../../components/utilities/modalGlobal';
import inputTemplate from '../../components/forms/inputs';
import academyService from '@/services/AcademyService';
import alertBox from '@/components/utilities/alertBox';
import academySerialTable from '@/components/Tables/academySerialTable';
import { inject } from 'vue'

export default {
    name : 'SerialsView',
    setup () {
        const allSerials = inject('allSerials')
        //console.log(allSerials)
        return {
            allSerials
        }
    },
    data () {
        return {
            modalShow : false,
            serialTitle : '',
            serialDescription : '',
            language : '',
            languageArray : [
                "EN",
                "FR"
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
            validateErrorMessage : ''
        }
    },
    components : { 
        modalGlobal,
        inputTemplate,
        alertBox,
        academySerialTable
    },
    methods : {
        async submitSerial() {
            this.validateError = false
            this.isSubmit = true;
            let notSerieValidate = this.validateSerieSubmit();
            if (notSerieValidate) {
                this.validateError = true
                this.isSubmit = false
                return
            }
            let serialPayload = {
                title : this.serialTitle,
                description : this.serialDescription,
                language : this.language
            }
            console.log(serialPayload)
            //return
            //eslint-disable-next-line
            await academyService.createSerial(serialPayload).then(res => {
                this.isSubmit = false
                console.log(res)
                if (res.data.success) {
                    this.isAlert.close = true
                    this.isAlert.text = res.data.message
                    this.isAlert.open = true
                }
            }) 
        },
        validateSerieSubmit() {
            if (this.serialTitle.trim() == '') {
                this.validateErrorMessage = 'Please give a title'
                return true
            } else if (this.serialDescription.trim() == '') {
                this.validateErrorMessage = 'Please give a description'
                return true
            } else if (this.language.trim() == '') {
                this.validateErrorMessage = 'Please select a language'
                return true
            }
            return false
        } 
    }
}
</script>

<style>

</style>