<template>
    <section>
        <div class="trainer-container">
            <modal-global :modalTitle="'Add a trainer'" v-show="modalShow" @closeMod="modalShow = false">
                <div class="trainer-add-ctn">
                        <div class="error-ctn bd-md" v-show="validateError">
                            {{ validateErrorMessage }}
                        </div>
                        <form>
                            <inputTemplate :textHolder="'Firstname'" v-model:modelValueText="trainerFirstname" />
                            <inputTemplate :textHolder="'Lastname'" v-model:modelValueText="trainerLastname" />
                            <inputTemplate :textHolder="'Email'" :type="'email'" v-model:modelValueText="trainerEmail" />
                            <inputTemplate :textHolder="'Bio'" :type="'textarea'" v-model:modelValueText="trainerBio"/>
                                                        
                            <div class="submit-default">
                                <button type="submit" v-if="!isSubmit" :disabled="isSubmit" @click.prevent="submitTrainer">
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
            <div class="trainer-header">
                <h5>Trainers</h5>
                <div class="side-action">
                    <button @click.stop="modalShow = true">
                        <plus-icon/> 
                        <span>Add</span>
                    </button>
                </div>
            </div>
            <div class="trainer-content">
                <academyTrainersTable :trainers="allTrainers" class="trainer-table">

                </academyTrainersTable>
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
import academyTrainersTable from '@/components/Tables/academyTrainersTable';
import { inject } from 'vue'

export default {
    name : 'TrainersView',
    setup () {
        const allTrainers = inject('allTrainers')
        //console.log(allSerials)
        return {
            allTrainers
        }
    },
    data () {
        return {
            modalShow : false,
            trainerFirstname : '',
            trainerLastname : '',
            trainerEmail : '',
            trainerBio : '',
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
        academyTrainersTable
    },

    methods : {
        async submitTrainer() {
            this.validateError = false
            this.isSubmit = true;
            let notTrainerValidate = this.validateTrainerSubmit();
            if (notTrainerValidate) {
                this.validateError = true
                this.isSubmit = false
                return
            }
            let trainerPayload = {
                firstname : this.trainerFirstname,
                lastname : this.trainerLastname,
                email : this.trainerEmail,
                biography : this.trainerBio
            }
            console.log(trainerPayload)
            //return
            //eslint-disable-next-line
            await academyService.createTrainer(trainerPayload).then(res => {
                this.isSubmit = false
                console.log(res)
                if (res.data.success) {
                    this.isAlert.close = true
                    this.isAlert.text = res.data.message
                    this.isAlert.open = true
                }
            })
        },
        validateTrainerSubmit() {
            if (this.trainerFirstname.trim() == '') {
                this.validateErrorMessage = 'Please insert the firstname'
                return true
            } else if (this.trainerLastname.trim() == '') {
                this.validateErrorMessage = 'Please insert the lastname'
                return true
            } else if (this.trainerEmail.trim() == '') {
                this.validateErrorMessage = 'Please enter a email'
                return true
            } else if (this.trainerBio.trim() == '') {
                this.validateErrorMessage = 'Please enter a bio for'
                return true
            }
            return false
        }
    }
}
</script>

<style>

</style>