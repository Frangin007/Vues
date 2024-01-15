<template>
    <div class="pagination" v-if="pageLength != 0">
        <div class="pagination-wrapper">
            <button class="pg-left"  :disabled="prevDisabled" @click="prevPage">
                <chevronLeft-icon/>
            </button>
            <ul class="pages-number">
                <li v-for="(page, index) in pageLength " :key="index" :class="{'page-active' : (index == activePage )}" @click="pageNumber(index)">
                    {{page}}
                </li>
            </ul>
            <button class="pg-right" :disabled="nextDisabled" @click="nextPage">
                <chevronRight-icon/>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name : 'paginationComponent',
    data () {
        return {
            activePage : 0
        }
    },
    props : {
        totalCount : {
            type : Number
        },
        step : {
            type : Number
        }
    },
    emits : ['changePage'],
    computed : {
        pageLength() {
            if (this.totalCount == 0) {
                return 0;
            }
            return Math.ceil(this.totalCount / this.step)
        },
        prevDisabled() {
            if (this.activePage > 0) {
                return false
            }
            return true
        },
        nextDisabled() {
            if (this.activePage < (this.pageLength-1)) {
                return false
            }
            return true
        }
    },

    methods : {
        nextPage() {
            this.$emit('changePage', this.activePage + 1);
            this.activePage += 1
        },
        prevPage() {
            this.$emit('changePage', this.activePage - 1)
            this.activePage -= 1
        },
        pageNumber (index) {
            this.$emit('changePage', index)
            this.activePage = index
        },
        reset() {
            this.activePage = 0
        }
    }
} 
</script>

<style lang="scss" scoped>
    //@import '../../scss/app.scss';
    

</style>