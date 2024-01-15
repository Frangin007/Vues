<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
-->

<template>
  <!--eslint-disable-->
  <section class="client-view global-view-ctn">
    <div class="overlay-global" v-show="isOverlay" @click.stop></div>
    <!-- <dashboard-header/> -->
    <article class="content-container">
      <modal-client v-show="dropdowns.isModalClient" @closeMod="dropdowns.isModalClient = false" @sendTest="sendTestLink" @confirmTest="confirmAction" :isSubmit="isModalSubmit" :modalTitle="modalTitle" @click.stop :type="modalType" @alert="boxNot" :clientSource="clientActive" :client="currentClient"/>
      <confirm-box v-show="isConfirm" @click.stop ref="confirm" :boxContent="confirmContent" @close="isConfirm = false"/>
      <div class="program-container">
        <div class="program-header"> 
          <h5>Takafa Mindset's Programs</h5>
          <!-- <button @click="isAlert.open = !isAlert.open">alert</button> -->
          <!-- <inputTemplate type="select" :textHolder="'Program'" v-model:modelValueText="currentProgram" :selectOption="programs.map(program => program.title)" @selectClick="getClients(currentProgram)"/> -->
          <div class="side-action">
            <button @click.stop="setModalType('add')">
                <plus-icon/> 

              <span>Add</span>
              
            </button>
          </div>
        </div>
        <div class="programs">
          <div class="each-program">
            
            <h6 v-for="program in programs" :key="program.id" :class="{'program-active' : checkCurrentProgram(program.title)}" @click="getClients(program.title)">{{ program.aliasTitle }}</h6>
          </div>
          <div class="tabs-container">
            <h6 class="tab" :class="{'tab--active' : ((tabActive == 'clients') ? true : false)}" @click="tabActive = 'clients'">
              Single Clients
            </h6>
            <h6 class="tab" :class="{'tab--active' : ((tabActive == 'organisations') ? true : false)}" @click="tabActive = 'organisations'">
              Corporates
            </h6>
          </div>
          <div class="client-sub-container tab-sub-container" v-if="tabActive == 'clients'">
            
            <clients-table :clients="clients" @dropClient="drawDropClient" :isDrop="dropdowns.isClientDrop" :dropValue="'isClientDrop'"  @currentClient="setCurrentClient" @showCurrent="isSideModalShow = true">
                <template #dropClient="thisClient">
                  <client-drop :style="`right:${drop.right};top:${drop.top};`" v-show="dropdowns.isClientDrop"  :active="dropdowns.isClientDrop" :isSubmit="isClientDropSubmit" :client="currentClient" @openTest="setModalType('test')" @click.stop @remindTest="remindTestLink()" @takenTest="testTaken()" @genFile="setModalType('generate')" @sendPackage="onPackageSend()" @download="downloadPackage()"/>
                </template>
                <template #page>
                  <pagination :totalCount="clientsCount" :step="10" @changePage="getClientsPerPage" ref="pageControl"/>
                </template>
              </clients-table>
          </div>
          <div class="org-sub-container tab-sub-container" v-else>
            <div class="table-org">
              <client-drop :style="`right:${drop.right};top:${drop.top};`" v-show="dropdowns.isClientDrop"  :active="dropdowns.isClientDrop" :isSubmit="isClientDropSubmit" :client="currentClient" @openTest="setModalType('test')" @click.stop @remindTest="remindTestLink()" @takenTest="testTaken()"/>
              <div class="table-row-header">
                <div class="table-cols-header">Organisation</div>
                <div class="table-cols-header">Type</div>
                <div class="table-cols-header">Person of Contact</div>
                <div class="table-cols-header">Clients</div>
                <div class="table-cols-header">Actions</div>
              </div>
              
              <div class="table-row" v-for="(client, orgIndex) in orgClients" :key="client.id" v-if="orgClients.length != 0" ref = "orgRow">
                <div class="table-cols table-org-cols">
                  <div class="profile-container">
                    
                    <div class="profile-name">
                      <p>{{ client.org_name }}  | {{ client.country }}</p>
                      <p>{{ client.email }}</p>
                    </div>
                  </div>
                  <div class="verified verified--true" v-if="client.verify">
                    <check-icon />
                  </div>
                  <div class="verified verified--false" v-else>
                    <x-icon />
                  </div>
                </div>
                <div class="table-cols">
                    <span v-if="client.org_type == 'University/School' " class="university">
                      {{ client.org_type }} 
                    </span>
                    <span v-else-if="client.org_type == 'Company' " class="company">
                      {{ client.org_type }} 
                    </span>
                    <span v-else-if="client.org_type == 'NGO' " class="ngo">
                      {{ client.org_type }} 
                    </span>
                </div>
                <div class="table-cols">
                  <div class="profile-container">
                    
                    <div class="profile-name">
                      <p>{{ client.contact_person.fullname }}  | {{ client.contact_person.country }} </p>
                      <p>{{ client.contact_person.email }}</p>
                    </div>
                  </div>
                </div>
                <div class="table-cols">
                  
                </div>
                <div class="table-cols">
                  <button class="eye" @click="getClientsOrg(client.id, orgIndex)" ref="orgView"><eye-icon/></button>
                  <button class="trash"><trash-icon/></button>
                  <button class="dropdown" @click=""><caretDown-icon/></button>
                </div>
              </div>
              <div class="load loading-container" v-else>
                <div class="snippet" data-title=".dot-carousel">
                  <div class="stage">
                    <div class="dot-carousel"></div>
                  </div>
                </div>
              </div>
              <pagination :totalCount="clientOrgCount" :step="5" @changePage="getClientsOrgPerPage" ref="pageControlOrg"/>
            </div>
            <clients-table :clients="clientOrgData" @dropClient="drawDropClient" :isDrop="dropdowns.isOrgClientDrop" :dropValue="'isOrgClientDrop'" class="table-org-clients" v-show="isClientOrg" @currentClient="setCurrentClient" @showCurrent="isSideModalShow = true">
              <template #dropClient="thisClient">
                <client-drop :style="`right:${drop.right};top:${drop.top};`" v-show="dropdowns.isOrgClientDrop"  :active="dropdowns.isOrgClientDrop" :isSubmit="isClientDropSubmit"  @openTest="setModalType('test', 'clientOrgData')" :client="currentClient" @click.stop @remindTest="remindTestLink('clientOrgData')" @takenTest="testTaken('clientOrgData')" @genFile="setModalType('generate', 'clientOrgData')" @sendPackage="onPackageSend()" @download="downloadPackage()"/>
              </template>
              <template #page>
                <pagination :totalCount="clientOrgDataCount" :step="5" @changePage="getClientOrgDataPerPage" ref="pageControlOrgClient"/>
              </template>
            </clients-table>
          </div>
          
        </div>
      </div>
      <sideModal :sideShow="isSideModalShow" @close-modal="isSideModalShow = false">
        <template #side-header>
          <p v-if="tabActive == 'clients' && clientSideShow">
            {{ clientSideShow.name.content }}
          </p>
          <p v-else-if="tabActive == 'organisations' && clientSideShow">
            {{ clientSideShow.name.content }}
          </p>
        </template>
        <template #side-content>
          <div class="client-details" v-for="(clientFormat, designation, index) in clientSideShow" :key="designation">
              <span class="title"> {{  clientFormat.title  }} :</span>
              <span v-if="clientFormat.type == 'link'">
                <a  :href="clientFormat.content"> {{  clientFormat.content  }} </a>
                  <span @click.stop="(e) => copyContent(e, clientFormat.content)" class="copy-btn">
                    <copy-icon />
                  </span>
              </span>
              <span v-else-if="clientFormat.type == 'email'">
                <a  :href="'mailto:' + clientFormat.content"> {{  clientFormat.content  }} </a>
                  <span @click.stop="(e) => copyContent(e, clientFormat.content)" class="copy-btn">
                    <copy-icon/>
                  </span>
              </span>
              <span v-else :class="clientFormat.classes"> 
                {{  clientFormat.content  }} 
                <span v-if="clientFormat.copiable" @click.stop="(e) => copyContent(e, clientFormat.content)" class="copy-btn">
                  <copy-icon /></span>

                </span> 
          </div>
        </template>
      </sideModal>
    </article>
    <help-box v-bind="copiableObj"/>
    <alert-box v-show="isAlert.open" @close="isAlert.open = false" :isClose="isAlert.close" :alertType="isAlert.type" :text="isAlert.text" @click.stop/>
  </section>
</template>

<script>
/* eslint-disable */
	//import dashboardHeader from '../components/Headers/dashboardHeader' ;
	import clientService from '@/services/ClientService';
  import programService from '@/services/ProgramService';
  import clientDrop from '../components/utilities/clientDropDown';
  import modalClient from '../components/utilities/modalClient';
  import confirmBox from '../components/utilities/confirmationBox';
  import pagination from '../components/utilities/pagination';
  import clientsTable from '@/components/Tables/clientsTable';
  import sideModal from '@/components/utilities/sideModal.vue'
  import ObjectFormat from '@/composable/object'
  import utils from '@/composable/utilities'
  import { ref, onBeforeMount, provide, computed } from 'vue';
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  //import ClientService from '@/services/ClientService';
  //import clientDropDownVue from '../components/Utilities/clientDropDown.vue';
  //import dropdown from '../components/utilities/dropdown';
	export default ({
    name : 'clientsView',
    setup () {
      const route = useRoute()
      const store = useStore()
      //store.commit('SET_ROUTE', 'Clients')

      const clients = ref([]);
      const orgClients = ref([]);
      const programs = ref([]);
      const currentProgram = ref(null);
      const currentClient = ref({ID : null});
      const clientsCount = ref(0);
      const clientOrgCount = ref(0);
      const clientOrgDataCount = ref(0)
      onBeforeMount(async ()=> {
        await programService.getAllProgram()
        .then(async res => {
          //console.log(res)
          programs.value = res.data;
          currentProgram.value = res.data[0].title;
          // temporary code
          /*if (store.getters.getObj) {
            clients.value = store.getters.getObj.value;
            clientsCount.value = store.getters.getObj.count;
            
          } else {
          }*/
          await clientService.getClientProgram(currentProgram.value).then(res => {
            console.log(res)
            if (res.data.success) {
              clients.value = res.data.data.values;
              clientsCount.value = res.data.data.count;
              store.commit('SET_OBJ', res.data.data.values, res.data.data.count)
            }
          })
          await clientService.getOrgClientProgram(res.data[0].title).then(res => {
            console.log(res)
            orgClients.value = res.data.data.values;
            orgClients.value.map((org) => {
              org.contact_person = JSON.parse(org.contact_person)
            })
            clientOrgCount.value = res.data.data.count
          })
        })
        .catch(err => {
          console.log(err)
        })
        
      })

      provide('program', currentProgram);
      provide('orgs', orgClients)
      return {
        clients,
        programs,
        currentProgram,
        currentClient,
        orgClients,
        clientsCount,
        clientOrgCount,
        clientOrgDataCount,
        
      }
    },
		components: {
      //dashboardHeader,
      clientDrop,
      modalClient,
      confirmBox,
      sideModal,
      pagination,
      //tableDrop : dropdown,
      clientsTable,
      //helpBox
		},
		data() {
			return {
        tabActive : "clients",
        clientActive : 'clients',
        clientOrgData : [],
        isClientOrg : false,
        clientOrgId : 0,
        drop : {
          top : "200px",
          right : "400px"
        },
        dropdowns : {
          isClientDrop : false,
          isOrgClientDrop : false,
          isModalClient : false
        },
        isClientDropSubmit : 'none',
        modalType : 'addClient',
        modalTitle : 'Add a new',
        isModalSubmit : false, // client modal box detection
        isConfirm : false, // confirm box detection
        confirmProp : null,
        /*confirmProp : {
          title : 'Are you sure to continue ?',
          approuve : 'Yes',
          cancel : 'No',
          //callback : 'none',
          //args : []
        },*/
        isAlert : {
          open : false,
          close : false,
          text : 'An success alert box and show',
          type : 'success'
        },
        isSideModalShow : false,
        copiableObj : {
          targetElement : {
            left : '50%',
            top : '50%',
          },
          boxContent : 'Copied',
          showHelp : false,
          classes : {
            'help-box--default' : true,
            'help-box-success' : true,
          }
        }
        
			}
		},
    computed : {
      isOverlay() {
        if (this.dropdowns.isModalClient || this.isConfirm || this.isSideModalShow) {
          return true
        }
        return false
      },
      confirmContent () {
        if(this.confirmProp == null) {
          return
        } else {
          return this.confirmProp
        }
      },
      clientSideShow() {
        if (this.currentClient.ID) {
          console.log('clientttttt')
          return {
            name : new ObjectFormat({
              title : 'Name',
              type : 'text',
              content : `${this.currentClient.firstname} ${this.currentClient.lastname}`,
              classes : {
                content : true
              }
            }) ,
            email : new ObjectFormat({
              title : 'Email',
              type : 'email',
              content : `${this.currentClient.email}`,
              classes : {
                content : true
              }
            }),
            account : new ObjectFormat({
              title : 'Account',
              type : 'bool',
              true : 'verified',
              false : 'unverified',
              content : this.currentClient.verify,
              classes : {
                content : true,
                'content-success' : Boolean(this.currentClient.verify),
                'content-error' : !Boolean(this.currentClient.verify)
              }
            }),
            program : new ObjectFormat({
              title : 'Current Program',
              type : 'text',
              content : `${this.currentProgram}` 
            }),
            package : new ObjectFormat({
              title : 'Package',
              type : 'text',
              content : `${this.currentClient.format.package}`,
              classes : {
                content : true,
                'content-simple' : Boolean(this.currentClient.format.package == 'Free'),
                'content-fade' : Boolean(this.currentClient.format.package == 'Basic'),
                'content-success' : Boolean(this.currentClient.format.package == 'Professional'),
                'content-minimal' : Boolean(this.currentClient.format.package == 'Premium')
              }
            }),
            gender : new ObjectFormat({
              title : 'Gender',
              type : 'text',
              content : `${this.currentClient.gender}` 
            }) ,
            born : new ObjectFormat({
              title : 'Born on',
              type : 'date',
              content : this.currentClient.birthdate 
            }),
            location : new ObjectFormat({
              title : 'Location',
              type : 'text',
              content : `${this.currentClient.country}, ${this.currentClient.adresse}` 
            }),
            occupation : new ObjectFormat({
              title : 'Occupation',
              type : 'text',
              content : `${this.currentClient.profession}` 
            }) ,
            contact : new ObjectFormat({
              title : 'Contact',
              type : 'text',
              content : `${this.currentClient.phone}`,
              copiable : true 
            }) ,
            state : new ObjectFormat({
              title : 'State',
              type : 'text',
              content : ()  => {
                if (this.currentClient.etat == 'Pending') {
                  return 'Pending'
                } else if (this.currentClient.etat == 'New') {
                  return 'New'
                } else if (this.currentClient.etat == 'Assess_Sent') {
                  return 'Assessment Sent'
                } else if (this.currentClient.etat == 'Assess_Taken') {
                  return 'Assessement Done'
                } else if (this.currentClient.etat == 'Assess_Reminded') {
                  return 'Assessment Reminded'
                } else if (this.currentClient.etat == 'Package_Sent') {
                  return 'Package Sent'
                } else if (this.currentClient.etat == 'Expired') {
                  return 'Expired'
                }
              },
              classes : {
                content : true,
                'content-inactive' : Boolean(this.currentClient.etat == 'Pending'),
                'content-fade' : Boolean(this.currentClient.etat == 'Assess_Sent'),
                'content-passed' : Boolean(this.currentClient.etat == 'Assess_Taken'),
                'content-success' : Boolean(this.currentClient.etat == 'New'),
                'content-minimal' : Boolean(this.currentClient.etat == 'Assess_Reminded'),
                'content-ease' : Boolean(this.currentClient.etat == 'Package_Sent'),
                'content-idle' : Boolean(this.currentClient.etat == 'Expired'),
              }
            }) ,
            program_link : new ObjectFormat({
              title : 'Program Test Link',
              type : 'link',
              content : () => {
                if (this.currentClient.link_Test != '') {
                  return this.currentClient.link_Test
                }
                return 'No link'
              } ,
              copiable : true 
            }) ,
            program_expired_at : new ObjectFormat({
              title : 'Expired at',
              type : 'date',
              content : this.currentClient.program_exp 
            }) ,
            payment_method : new ObjectFormat({
              title : 'Payment',
              type : 'text',
              content : `${this.currentClient.payment_method}`,
              classes : {
                content : true,
                'content-simple' : Boolean(this.currentClient.payment_method == 'DunyaPay' || this.currentClient.payment_method == 'FedaPay'),
                'content-fade' : Boolean(this.currentClient.payment_method == 'Sponsored'),
                'content-minimal' : Boolean(this.currentClient.payment_method == 'Flutterwave'),
                
              }
            }) ,
            transaction_reference : new ObjectFormat({
              title : 'Transaction Reference',
              type : 'text',
              content : `${this.currentClient.transaction_reference}`,
              copiable : true 
            }),
            transaction_id : new ObjectFormat({
              title : 'Transaction ID',
              type : 'text',
              content : `${this.currentClient.transaction_id}` 
            }) ,
            added_on : new ObjectFormat({
              title : 'Added On',
              type : 'date',
              content : this.currentClient.createdAt 
            }) 

          }
        }
        return null
      },
      programAlias : {
        get() {
          if (!this.currentProgram) return
          return this.programs.filter(program => this.currentProgram == program.title)[0].aliasTitle;
        },
        set(value) {
          console.log(value, this.programs)
          this.currentProgram = this.programs.filter(program => value == program.title)[0].title
        }
      }
      
    },
    methods: {
      
      setCurrentClient(client) {
        console.log(this.currentClient.ID)
        this.currentClient = client
        console.log(this.currentClient)
      },
      setModalType(type, client = "clients") {
        this.clientActive = client
        if (type == "add") {
          this.modalType = "addClient"
          this.modalTitle = "Add a new "
          this.dropdowns.isModalClient = true
        } else if (type == "test") {
          this.modalType = "test"
          this.modalTitle = "Assessment Link"
          this.dropdowns.isModalClient = true
        } else if (type == "generate") {
          this.modalType = "generate"
          if (this.currentProgram == "Self Empowerment Program") {
            this.modalTitle = "Generate Brain Brief Profile Package"
          } else if (this.currentProgram == "Character and Career Development Program") {
            this.modalTitle = "Generate Brain Talent Profile Package"
          }
          this.dropdowns.isModalClient = true
        }
      },
      async getClients(program) {
        this.clients = [];
        this.orgClients = [];
        this.clientOrgData = [];
        //this.activePage = 0;
        if (this.tabActive == "clients") {
          this.$refs.pageControl.reset()
        } else {
          this.$refs.pageControlOrg.reset()
        }
        await clientService.getClientProgram(program).then(res => {
            console.log(res)
            this.clients = res.data.data.values;
            this.clientsCount = res.data.data.count;
            this.currentProgram = program;
        })
        await clientService.getOrgClientProgram(program).then(res => {
          //console.log(res)
          this.orgClients = res.data.data.values;
          this.clientOrgCount = res.data.data.count
          this.orgClients.map((org) => {
            org.contact_person = JSON.parse(org.contact_person)
          })
        })
      },
      async getClientsPerPage(page=0) {
        this.clients = [];
        await clientService.getClientProgram(this.currentProgram, page).then(res => {
            console.log(res)
            this.clients = res.data.data.values;
            this.clientsCount = res.data.data.count;
            
        })
      },
      async getClientsOrgPerPage(page=0) {
        this.orgClients = [];
        await clientService.getOrgClientProgram(this.currentProgram, page).then(res => {
          //console.log(res)
          this.orgClients = res.data.data.values;
          this.clientOrgCount = res.data.data.count
          this.orgClients.map((org) => {
            org.contact_person = JSON.parse(org.contact_person)
          })
        })
      },
      checkCurrentProgram(program) {
        if (this.currentProgram == program) {
          return true
        }
        return false
      },
      drawDropClient(event, dropType="isClientDrop") {
        console.log(event)
        this.dropdowns[dropType] = !this.dropdowns[dropType] 
        //this.drop.right = (event.target.offsetParent.offsetWidth - (event.target.offsetLeft + (event.target.offsetWidth/2)) ) + "px";
        this.drop.right = (event.target.offsetParent.offsetWidth - (event.target.offsetLeft ) + (event.target.offsetWidth) ) + "px";
        //this.drop.top = event.target.offsetTop + (event.target.offsetHeight/2) + "px";
        this.drop.top = event.clientY + "px";
      },
      autoCloseDrop(event) {
        if (event.target.hasAttribute('data-show')) {
          return
        }  
        
        Object.keys(this.dropdowns).forEach(key => {
          this.dropdowns[key] = false
        })
      },
      confirmAction(callback, confirmObj = false, ...args) {
        //console.log(callback, confirmObj, args);
        //return
        if (typeof confirmObj == "object") {
          this.confirmProp = confirmObj
        }
        this.$refs.confirm.callback = callback
        this.$refs.confirm.args = args
        this.isConfirm = true;
      },
      updateIndexClient(newClient, clientType="clients") {
        if (this[clientType].length == 0) {
          return
        }

        const index = this[clientType].findIndex(object => {
          return object.ID === newClient.ID
        })
        if (typeof(index) == "number") {
          console.log("new Client")
          this[clientType][index] = newClient
        }
      },
      async sendTestLink(args, client="clients") {
        let linkToSend = args;
        this.confirmProp = {
          title : 'Are you sure to continue ?',
          approuve : 'Yes',
          cancel : 'No',
          
        },
        this.isModalSubmit = true;
        this.isConfirm = true;
        await this.$refs.confirm.isOkay().then(async res => {
          this.isConfirm = false
          this.confirmProp = null
          if (!res) {
            this.isModalSubmit = false
            return
          } 
          //console.log(res)
          this.isClientDropSubmit = "test"
          let payload = {
            link : linkToSend
          }
          let userId = this.currentClient.ID;
          await clientService.sendAssessmentLink(payload, userId).then(res => {
            console.log(res)
            if (res.data.success) {
              this.updateIndexClient(res.data.data, client);
              this.isModalSubmit = false
              this.dropdowns.isModalClient = false
              this.isClientDropSubmit = "none";
              this.isAlert.text = res.data.message
              this.isAlert.open = true
              setTimeout(()=> {
                this.isAlert.open = false
              }, 5000)
            }
          }) 
        })
        
      },
      async remindTestLink(client="clients") {
        let clientId = this.currentClient.ID;
        this.confirmProp =  {
          title : 'Do you want to send the reminder ?',
          approuve : 'Send',
          cancel : 'Cancel',
          
        },
        this.isConfirm = true;
        await this.$refs.confirm.isOkay().then(async res => {
          this.isConfirm = false
          this.confirmProp = null

          if (!res) {
            return
          }
          this.isClientDropSubmit = "remindTest";
          await clientService.remindAssessment(clientId).then(res => {
            console.log(res)
            if (res.data.success) {
              this.updateIndexClient(res.data.data, client);
              this.isClientDropSubmit = "none";
              this.isAlert.text = res.data.message
              this.isAlert.open = true
              setTimeout(()=> {
                this.isAlert.open = false
              }, 5000)
            }
          })
        })
      },
      async testTaken(client="clients") {
        let clientId = this.currentClient.ID;
        console.log(client, clientId)
        this.confirmProp =  {
          title : 'Did he/she really taken the test',
          approuve : 'Yes',
          cancel : 'No',
          
        },
        this.isConfirm = true;
        await this.$refs.confirm.isOkay().then(async res => {
          this.isConfirm = false
          this.confirmProp = null
          if (!res) {
            return
          }
          this.isClientDropSubmit = "testTaken";
          await clientService.assessmentTaken(clientId).then(res => {
            console.log(res)
            if (res.data.success) {
              this.updateIndexClient(res.data.data, client);
              this.isClientDropSubmit = "none";
              this.isAlert.text = res.data.message
              this.isAlert.open = true
              setTimeout(()=> {
                this.isAlert.open = false
              }, 5000)
            }
          })
        })
      },

      async onPackageSend() {
        let clientId = this.currentClient.ID;
        
        this.confirmProp =  {
          title : 'Do you really want to send it?',
          approuve : 'Yes',
          cancel : 'No',
          
        },
        this.isConfirm = true;
        await this.$refs.confirm.isOkay().then(async res => {
          this.isConfirm = false
          this.confirmProp = null
          if (!res) {
            return
          }
          await clientService.sendPackageProfile(clientId).then(res => {
            console.log(res)
            if (res.data.success) {
              this.isClientDropSubmit = "none";
              this.isAlert.text = res.data.message
              this.isAlert.open = true
              setTimeout(()=> {
                this.isAlert.open = false
              }, 5000)
            }
          })
          .catch(err => {
            console.log(err)
          })
        })
      },
      async downloadPackage() {
        let clientId = this.currentClient.ID;
        this.confirmProp =  {
          title : 'Do you really want to download the profile?',
          approuve : 'Download',
          cancel : 'Cancel',
          
        },
        this.isConfirm = true;
        await this.$refs.confirm.isOkay().then(res => {
          this.isConfirm = false
          this.confirmProp = null
          if (!res) {
            return
          }
          //window.location.href = clientService.downloadPackageProfile(clientId)
          let fileURL = clientService.downloadPackageProfile(clientId)
          let fileLink = document.createElement('a');
          fileLink.href = fileURL;
          //fileLink.setAttribute('download', 'file.pdf');
          fileLink.setAttribute('target', '_blank');
          document.body.appendChild(fileLink);
          fileLink.click();
        })
      },

      async getClientsOrg(orgId, index) {
        console.log(index)
        this.clientOrgId = orgId
        if (this.isClientOrg) {
          if (this.$refs.orgRow[index].classList.contains('table-row--active')) {
            this.isClientOrg = false
              this.$refs.orgRow[index].classList.remove("table-row--active") ;
              this.$refs.orgView[index].classList.remove("eye--active");
            return
          }
        }

        for (let pos = 0; pos < this.$refs.orgRow.length; pos++) {
            if (pos == index) {
              this.$refs.orgRow[pos].classList.add("table-row--active");
              this.$refs.orgView[pos].classList.add("eye--active");
            } else {
              this.$refs.orgRow[pos].classList.remove("table-row--active");
              this.$refs.orgView[pos].classList.remove("eye--active");
            }
          
        }
        this.isClientOrg = true;
        //this.$refs.orgRow[index].classList.add("table-row--active");
        //this.$refs.orgView[index].classList.add("eye--active");
        this.clientOrgData = [];
        await clientService.getOrgClientProgramData(orgId).then( res => {
          console.log(res)
          if (res.data.success) {
            this.clientOrgData = res.data.data.values
            this.clientOrgDataCount = res.data.data.count
          }
          
        })
      },
      async getClientOrgDataPerPage(page = 0) {
        this.clientOrgData = []
        await clientService.getOrgClientProgramData(this.clientOrgId, page).then( res => {
          console.log(res)
          if (res.data.success) {
            this.clientOrgData = res.data.data.values
            this.clientOrgDataCount = res.data.data.count
          }
        })
      },
      boxNot(message, isclose, type = "success") {
        if (type == "danger") {
          this.isAlert.type = "danger"
        } else {
          this.isAlert.type = "success"
        }
        if (isclose) {
          this.isAlert.close = true
          this.isAlert.text = message
          this.isAlert.open = true
        }
      },
      copyContent(event, content) {
        console.log(content)
        let result = utils.copiableField(this.copiableObj, event, content)
        if (result) {
          console.log(this.copiableObj)
        }
      }
      
    },
    mounted () {
      /*window.addEventListener('click', (event) => {
        console.log(event)
        console.log(event.target.getAttribute('data-show'))
      })*/
      //console.log(process.env.VUE_APP_LINK)
      window.addEventListener('click', this.autoCloseDrop)
      
    }
	})

</script>

<style lang="scss" scoped>

  
</style>