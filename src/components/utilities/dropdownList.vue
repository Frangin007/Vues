<template>
    <Transition name="drop-list">
        <div class="dropdown-container" >
            <div class="sub-container">
                <slot></slot>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name : 'dropdownList',
    setup () {
        
    },
    props : {
        
    },
    data() {
        return {
            
        }
    },
    computed : {
        
    },
    methods : {
        
    },
    watch : {
        
    },
    mounted () {

    }
}
</script>

<style lang="scss">
    
    .drop-list-enter-active {
        transition: all 0.2s ease-out;
    }

    .drop-list-leave-active {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .drop-list-enter-from {
        transform: translate(50px, -50px);
        opacity: 0;
    }
    .drop-list-leave-to {
        transform: scale(0.8);
        opacity : 0;
    }
</style>