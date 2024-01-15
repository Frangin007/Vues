<template>
    <div class="confirm-container">
        <div class="confirm-wrapper">
            <h5> {{ boxContent.title }} </h5>
            <div class="button-container">
                <button @click.self="_confirm">
                    {{ boxContent.approuve }}
                </button>
                <button @click.self="_cancel">
                    {{ boxContent.cancel }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    /* eslint-disable */
    name : 'confirmBox',
    data () {
        return {
            //isApprove : false
            callback : 'none',
            args : [],
            isApprove : null,
            isTimeout : false,
            timeout : null,
            resolveConfirm : null
        }
    },
    emits : [],
    props : {
        boxContent : {
            type : Object,
            default () {
                return {
                    title : 'Are you sure to continue ?',
                    approuve : 'Yes',
                    cancel : 'No',
                    //callback : 'none',
                    //args : []
                }
            }
        },
        /*callback : {
            type : String,
            default : 'none'
        },
        args : {
            type : Array,
            default () {
                return []
            }
        }*/
        
    },

    methods : {
        approve () {
            //this.isApprove =
            //console.log("approve");
            this.$emit(this.callback, this.args)
            
        },
        isOkay() {
            
            return new Promise((resolve)=> {
                //let timer;
                this.resolveConfirm = resolve
                /*console.log(this.isApprove);
                if (this.isApprove) {
                    
                } else if ((typeof this.isApprove == "Boolean") && !this.isApprove) {
                    
                    resolve('decline')
                } else {
                    this.timeout = setTimeout(this.isOkay, 1000)
                    
                }*/
                
            })
        },
        _confirm() {
            this.resolveConfirm(true)
        },
        _cancel() {
            this.resolveConfirm(false)
        }
    },
    watch : {
        isTimeout(newbool) {
            if (newbool) {
                clearTimeout(this.timeout)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>