<template>
    <Transition name="modal-client">
        <div class="modal-global-container">
            <div class="close-container">
                    <h5>
                        {{ modalTitle }}
                    </h5>
                    <button @click="$emit('closeMod')">
                        <x-icon/>
                    </button>
                </div>
            <div class="line-bar"></div>
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name : 'modalGlobal',

    props: {
        modalTitle : {
            type :  String,
            default : 'Modal Title'
        },
    }
}
</script>

<style>

</style>