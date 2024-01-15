<template>
    <Transition name="client-option">
        <div class="dropdown-container" :style="`right:${drop.right};top:${drop.top};`" v-show="dropdown.isDrop">
            <div class="sub-container">
                <slot name="table-actions">
                    
                </slot>
            </div>
        </div>
    </Transition>
</template>

<script>

export default {
    name : 'dropdownTable',
    setup() {

    },
    props : {
        optionsCount : {
            type : Number,
            default : 1
        },
        drop : {
            type : Object,
            default () {
                return {
                    top : "200px",
                    right : "400px"
                }
            }
        },
        dropdown : {
            type : Object,
            default () {
                return {
                    isDrop : false,
                    isOrgClientDrop : false,
                    isModalClient : false
                }
            }
        }
    }
}

</script>

<style lang="scss" scoped>
    //@import '../../scss/app.scss';
    
    .client-option-enter-active {
        transition: all 0.2s ease-out;
    }

    .client-option-leave-active {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .client-option-enter-from {
        transform: translate(50px, -50px);
        opacity: 0;
    }
    .client-option-leave-to {
        transform: scale(0.8);
        opacity : 0;

    }
</style>