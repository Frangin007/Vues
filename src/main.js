import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueTablerIcons from 'vue-tabler-icons';
import alertBox from '@/components/utilities/alertBox.vue'
import helpBox from '@/components/utilities/helpBox.vue'
import inputTemplate from '@/components/forms/inputs.vue';

//import 'ant-design-vue/dist/antd.css';
//import Antd from "ant-design-vue";
import './scss/app.scss';

const app = createApp(App);
app.component('alertBox', alertBox)
app.component('helpBox', helpBox)
app.component('inputTemplate', inputTemplate)
app.use(store).use(VueTablerIcons).use(router).mount("#app");
