<template>
    <Transition name="alert-box">
        <div class="alert-container">
            <div class="alert" :class="{'alert-danger' : (alertType == 'danger') ? true : false }">
                <p>
                    {{ text }}
                </p>
                <button v-show="isClose" @click="$emit('close')">
                    <x-icon/>
                </button>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name : 'alertBox',
    emits : ['close'],
    props : {
        text : {
            type : String,
            default () {
                return 'An alert success box'
            }
        },
        isClose : {
            type : Boolean,
            default  : false
        },
        alertType : {
            type : String,
            default : 'success'
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>