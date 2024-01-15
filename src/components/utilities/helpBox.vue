<template>
    <Transition name="help-transition">
        <div class="help-box" :style="{...styleObject, ...targetElement, ...customStyle}" v-show="showHelp" :class="classes">
            <div class="sub-content">
                {{ boxContent }}
            </div>
        </div>
    </Transition>
</template>

<script setup>
    import { defineProps, reactive } from 'vue'
    defineProps({
        boxContent : {
            type : String,
            default : null
        },
        showHelp : {
            type : Boolean,
            default : false
        },
        customStyle : {
            type : Object
        },
        targetElement : {
            type : Object,
            default  () {
                return {
                    top : '50px',
                    left  : '50%'
                }
            }
        },
        classes : {
            type : Object
        }

    })
    // Set default style for positioning element
    const styleObject = reactive({
        position : 'fixed',
    })

</script>