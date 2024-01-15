<template>
    <div class="input-container" :class="{'input-container--no-icon' : !isIcon }" v-if="type == 'text' ">
        <user-icon v-show="isIcon"/>
        <input type="text" :placeholder="textHolder" :value="modelValueText" @input="$emit('update:modelValueText', $event.target.value)"/>
    </div>
    <div class="input-container" v-else-if="type == 'email' ">
        <mail-icon/>
        <input type="email" :placeholder="textHolder" :value="modelValueText" @input="$emit('update:modelValueText', $event.target.value)"/>
    </div>
    <div class="input-container" v-else-if="type == 'password' ">
        <lock-icon/>
        <input type="password" :placeholder="textHolder" :value="modelValueText" @input="$emit('update:modelValueText', $event.target.value)"/>
    </div>
    <div class="input-container" v-else-if="type == 'address' ">
        <mapPin-icon/>
        <input type="text" :placeholder="textHolder" :value="modelValueText" @input="$emit('update:modelValueText', $event.target.value)"/>
    </div>
    <div class="input-container" v-else-if="type == 'number' ">
        <circle1-icon/>
        <input type="number" :placeholder="textHolder" :value="modelValueText" @input="$emit('update:modelValueText', $event.target.value)"/>
    </div>
    <div class="input-container select-container" v-else-if="type == 'select' ">
        <input type="text" :placeholder="textHolder" disabled :value="modelValueText"/>
        <chevronDown-icon @click="selectClickProcess"/>
        <ul :class="{'optionList' : isOption}">
            <li v-for="(option, index) in selectOption" :key="index" ref="countries" @click="selectClick(option)">
                
                
                <span> {{ option }} </span>
            </li>
        </ul>
    </div>
    <div class="input-container country-code" v-else-if="type == 'tel' ">
        <country-code class="country-dial" @code="changeCode"/>
        <!-- <input type="tel" :placeholder="textHolder" :value="modelValueNumber" @input="$emit('update:modelValueNumber', $event.target.value)"/> -->
        <input type="tel" :placeholder="textHolder" v-model="phoneNumber"/>
    </div>
    <div class="input-container country-code country" v-else-if="type == 'country' ">
        <country-code class="country-dial" @code="changeCode" :type="type"/>
        
        <input type="text" :placeholder="textHolder" disabled :value="country"/>
    </div>
    <div class="input-container" v-else-if="type == 'date' ">
        <calendar-icon/>
        <input type="date" :placeholder="textHolder" :value="modelValueText" @input="$emit('update:modelValueText', $event.target.value)"/>
    </div>
    <div class="input-container radio-container" v-else-if="type == 'radio' ">
        <div v-if="textHolder != ''">
            {{ textHolder }}
        </div>
        <div class="radio-box" :class="classObject">
            <p v-for="radio in radioBox" :key="radio"> 
                <input type="radio" :value="radio.value"  @input="$emit('update:modelValueText', $event.target.value)" :checked="((modelValueText == radio.value ? true : false ))"/>
                <label> {{ radio.label }} </label>
            </p>

        </div>
    </div>
    <div class="input-container radio-container" v-else-if="type == 'checkbox' ">
        <div v-if="textHolder != ''">
            {{ textHolder }}
        </div>
        <div class="check-box" :class="classObject">
            <p v-for="checkbox in checkBoxes" :key="checkbox"> 
                <input type="checkbox" :value="checkbox.value" @change="$emit('updateCheckbox', checkboxInput)"  v-model="checkboxInput"  />
                <label> {{ checkbox.label }} </label>
            </p>

        </div>
    </div>
    <div class="input-container file-container" v-else-if="type == 'file'">
        <div class="file" :class="{'file--selected' : fileSelected}">
            <button @click.prevent="fileClick">
                <upload-icon/> {{ textHolder }}
            </button>
            <input type="file" ref="inputFile" @change.prevent="onFilePicked"/>
        </div>
        
    </div>
    <div class="input-container input-search" v-else-if="type == 'search' ">
        <search-icon class="search-icon" @click="searchOpen" v-if="!searchExpand"/>
        
        <x-icon class="close-search-icon" v-if="searchExpand" @click="searchClose"/>
        <input type="text" class="search-input" :class="{'search-input--active' : searchExpand }" :placeholder="textHolder" :value="modelValueText" @input="$emit('update:modelValueText', $event.target.value)"  v-if="searchExpand"/>
        
    </div>
    <div class="input-container" v-else-if="type == 'textarea' ">
        <!-- <user-icon v-show="isIcon"/> -->
        <textarea type="text" :placeholder="textHolder" :value="modelValueText" @input="$emit('update:modelValueText', $event.target.value)">
            
        </textarea>
    </div>
</template>

<script>
import countryCode from './countryCode.vue';
//import { toRef } from 'vue';
export default {
    name : 'inputTemplate',
    /*setup(props) {
        const fileClass = toRef(props, 'fileSelected');
        console.log(fileClass)
        return {
            fileClass
        }
    },*/
    data () {
        return {
            inputChange : '',
            phoneNumber : null,
            dialCode : '',
            country : '',
            isOption : true,
            checkboxInput : [],
            fileClass : false,
            searchExpand : false
        }
    },
    emits : ['update:modelValueText', 'updateNumber', 'fileChanged', 'updateCheckbox', 'searchActive', 'searchInactive', 'selectClick', 'selectError'],
    props : {
        type : {
            type : String,
            default () {
                return 'text'
            },
        }, 
        textHolder : {
            type : String,
            default : ''
        },
        modelValueText : {
            type : [String, Array]
        },
        /*modelValueNumber : {
            type : Number
        }*/
        radioBox : {
            type : Array,
        },
        checkBoxes : {
            type :  Array
        },
        selectOption : {
            type : Array
        },
        classCustom : {
            type : String,
            
        },
        fileSelected : {
            type : Boolean,
            default : false
        },
        isIcon : {
            type : Boolean,
            default : true
        },
        fileIndex : {
            type : Number,
        },
        isMultipleFile : {
            type : Boolean,
            default : false
        },
        isSelectClick : {
            type : Boolean,
            default : true
        },
        isSelectEmit : {
            type : Boolean,
            default : false
        }
    },
    computed : {
        inputValue : {
            get ()  {
                return this.modelValue
            },

        },
        classObject () {
            if (this.classCustom == 'radio-two') {
                return {
                    'radio-box--two' : true
                }
            }
            return false
        },
        /*fileClass () {
            if (this.fileSelected) {
                return true
            }
            return false
        }*/
    },
    components : {
        countryCode
    },
    methods : {
        changeCode (country) {
            //console.log(country)
            this.dialCode = '(+' + country[2] + ')'
            this.country = country[0];
            let phone = this.dialCode  + this.phoneNumber;
            if (this.type == "country") {
                this.$emit('updateNumber', this.country, this.modelValueText)
            } else if (this.type == "tel") {
                this.$emit('updateNumber', phone, this.modelValueText)
            }
        },
        selectClickProcess() {
            if (this.isSelectClick) {
                this.isOption = !this.isOption
            } else {
                this.selectDisabled()
            }
        },
        selectClick(value) {
            this.isOption = !this.isOption;
            this.$emit('update:modelValueText', value)
            if (this.isSelectEmit) {
                this.$emit('selectClick')
            }
        },
        selectDisabled() {
            console.log("error")
            this.$emit('selectError')
        },
        fileClick() {
            this.$refs.inputFile.click()
        },
        onFilePicked(event) {
            //console.log(event)
            if (this.isMultipleFile) {
                this.$emit('fileChanged', event.target.files[0], this.fileIndex)
            } else {
                this.$emit('fileChanged', event.target.files[0])
            }
            
        },
        searchOpen() {
            this.searchExpand = true;
            this.$emit('searchActive');
        },
        searchClose() {
            this.searchExpand = false;
            this.$emit('searchInactive');
        }
    },
    watch : {
        phoneNumber(value) {
            //this.modelValueText = this.dialCode + value
            let phone = this.dialCode  + value;
            //console.log(phone);
            this.$emit('updateNumber', phone, this.modelValueText)
            //return value
        }
    }
}
</script>

<style lang="scss" >
    //@import '../../scss/app.scss';
    
    /*.search-trans-enter-active {
		transition: all .3s ease-out;
	}

	.search-trans-leave-active {
		transition: all .1s cubic-bezier(1, 0.5, 0.8, 1);
	}
	.search-trans-enter-from {
		//transform: rotateY(20deg) rotateZ(20deg);
		transform: translateX(-100%);
		opacity: 0;
	}
	.search-trans-leave-to {
		//transform: rotateY(20deg) rotateZ(20deg);
		transform: translateX(-100%);
		//opacity : 0;
	}
    
    .search-btn-trans-enter-active {
		transition: all .1s ease-out;
	}

	.search-btn-trans-leave-active {
		transition: all .3s cubic-bezier(1, 0.5, 0.8, 1);
	}
	.search-btn-trans-enter-from {
		transform: translateX(-100%);
		opacity: 0;
	}
	.search-btn-trans-leave-to {
		transform: translateX(-100%);
		
	} */
</style>