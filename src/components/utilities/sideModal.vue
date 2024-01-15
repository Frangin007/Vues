<template>
    <Transition name="side-modal">
        <article class="side-modal-global-container" v-show="sideShow">
            <div class="modal-header">
                <div>
                    <slot name="side-header">
    
                    </slot>
                </div>
                <button @click="$emit('closeModal')">
                    <x-icon/>
                </button>
            </div>
            <div class="line-bar"></div>
            <div class="modal-content">
                <slot name="side-content">
    
                </slot>
            </div>
        </article>
    </Transition>
</template>

<script setup>
    /* eslint-diasble */
    import { defineProps, defineEmits } from 'vue';

    // Properties definition
    defineProps({
        sideShow : {
            type : Boolean,
            default : false
        }
    })

    defineEmits(['closeModal'])

</script>

