<template>
    <div class="trainer-table-container">
        <slot name="dropClient" v-bind="activeTrainer">

        </slot>
        <div class="table-row-header">
            <div class="table-cols-header">Trainers</div>
            <div class="table-cols-header">Bio</div>
            <div class="table-cols-header">Videos</div>
            <div class="table-cols-header">Gain</div>
            <div class="table-cols-header">Actions</div>
        </div>
        
        <div class="table-row" v-for="(trainer, index) in trainers" :key="trainer.id" v-show="trainers.length != 0"  @click="setCurrentClient(trainer)">
        <div class="table-cols">
            <div class="profile-container">
                <div class="profile-image-pic" v-if="trainer.profile_pic">
                    <img :src="'https://admin.takafamindset.com/takafa_streaming/' + trainer.profile_pic">
                </div>
                <div class="profile-image" v-else>
                    {{ index + 1 }}
                </div>
                <div class="profile-name">
                    <p>{{ trainer.firstname }} {{ trainer.lastname }} | 22 y.o</p>
                    <p>{{ trainer.email }}</p>
                </div>
            </div>
            <div class="verified verified--true" v-if="trainer.verify">
                <check-icon />
            </div>
            <div class="verified verified--false" v-else>
                <x-icon />
            </div>
        </div>
        <div class="table-cols"> {{ trainer.bio }} </div>
        <div class="table-cols">
            20
        </div>
        <div class="table-cols">
            $15
        </div>
        <div class="table-cols">
            <button class="eye"><eye-icon/></button>
            <button class="trash"><trash-icon/></button>
            <button class="dropdown" @click="dropDownClient($event)" :data-show="isCurrentDrop"><caretDown-icon/></button>
        </div>
        </div>
        <div class="load loading-container" v-show="trainers.length == 0">
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

export default {
    name : 'academyTrainersTable',
    data () {
        return {
            activeTrainer : {},
            //isDrop : false,
        }
    },
    props : {
        trainers : {
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
    emits : ['dropClient', 'currentClient'],
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
        setCurrentClient(trainer) {
            this.activeTrainer = trainer;
            this.$emit('currentClient',trainer)
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>