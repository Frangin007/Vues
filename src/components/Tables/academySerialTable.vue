<template>
    <div class="serial-table-container">
        <slot name="dropClient" v-bind="activeSerial">

        </slot>
        <div class="table-row-header">
            <div class="table-cols-header">N°</div>
            <div class="table-cols-header">Title</div>
            <div class="table-cols-header">Description</div>
            <div class="table-cols-header">language</div>
            <div class="table-cols-header">Actions</div>
        </div>
        
        <div class="table-row" v-for="(serial, index) in serials" :key="serial.id" v-show="serials.length != 0"  @click="setCurrentClient(serial)">
        <div class="table-cols">
            <span>{{ index + 1 }}</span>
        </div>
        <div class="table-cols"> {{ serial.title }} </div>
        <div class="table-cols">
            {{ serial.description }}
        </div>
        <div class="table-cols">
            {{  serial.lang }}
        </div>
        <div class="table-cols">
            <button class="eye"><eye-icon/></button>
            <button class="trash"><trash-icon/></button>
            <button class="dropdown" @click="dropDownClient($event)" :data-show="isCurrentDrop"><caretDown-icon/></button>
        </div>
        </div>
        <div class="load loading-container" v-show="serials.length == 0">
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
    name : 'academySerialTable',
    data () {
        return {
            activeSerial : {},
            //isDrop : false,
        }
    },
    props : {
        serials : {
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
        setCurrentClient(serial) {
            this.activeSerial = serial;
            this.$emit('currentClient',serial)
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>