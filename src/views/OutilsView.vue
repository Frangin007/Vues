<template>
    <!--eslint-disable-->
 <header class="header">
        
         <div class="lien" >
              <a class="neuro" href="/outils/bref" :class="{'active':verif('/outils/bref')}" >Neuro-Profil <br>Bref</a>
        </div>
        <div class="lien">
            <a class="neuro" href="/outils/talents" :class="{'active':verif('/outils/talents')}">Neuro-Profil<br> Talent</a>
        </div>
        <div class="lien">
                <a class="neuro" href="/outils/decouverte" :class="{'active':verif('/outils/decouverte')}">Neuro-Profil<br> Découverte</a>
        </div> 
        <div class="lien">
                 <a class="neuro"> Tout en<br> UN</a>
        </div>
         
         <ul class="lien">
            
             <a class="lang">Français</a> /
             <a class="lang">English</a>
         </ul>
    
    

 </header>
 <router-view/>
</template>

<script>
/* eslint-disable */
import { useRoute } from 'vue-router';

export default {
    setup(){
    const route = useRoute()
    console.log(route)
    const handleClick = menuInfo => {console.log('click ', menuInfo);
    };
    },


  data() {
    return{
  isActive:true,
    }
    },

    methods:{
    verif(nom){
      console.log(this.$route.fullPath)
     if(this.$route.fullPath==nom){
       return this.isActive
    
     }
     else {
       return !this.isActive
     }
    
    }
  }
}
</script>

<style>
.header{
    display: inline-flex;
    width: 93%;
    background-color:white;
    height: 9vh;
    padding: 3%;
    
}
.lien{
   width: 15vw;
   text-align: center;
   margin-left:5%;
   padding-top:0.5%;
  

}
.neuro{
            height: 50px;
            padding:10%;
            display: inline-flex;
            text-decoration: none;
            box-sizing: border-box;
            cursor: pointer;
            font-weight: 40px;
            align-items: center;
            border-radius: 5px;
            color: black;
     
}
.active{
    background-color:whitesmoke;
}
.neuro:hover{
    background-color:whitesmoke;
}
.lang{
    margin-top:4px;
    cursor:pointer;
     padding:2%;
     align-items: center;
}
.lang:hover{
    background-color:whitesmoke;
}
h2 {
    text-align: center;
    margin-top: 10px;
}
.container1 {
    border-radius: 10px;
    box-shadow: 0 0 3px;
    margin-top: 1%;
    padding:3%;
    background-color:white;
    padding-top:4%;
  
}
.page{
    font-size: 18px;
  
}
.text{
  width: 55%;
  height: 5vh;
  border:none;
  box-shadow: 0 0 1px;
  background-color:rgba(252, 252, 252, 0.801);
}
.classeur1 {
    display:block;
   
}
.select{
    width: 20%;
    justify-content: space-between;
    display: inline-flex;
    font-size:17px;
}
h3{
    text-align:center;
    margin-top:5%;
}
.container2{
    padding-left:3%;
    display: flex;
    font-size:18px;
}
.classeur2{
    width:50%;
    justify-content: space-around;
    margin-top: 1%;
    border-left: 0.5px solid black;
    margin-left: -2%;
    padding-left:4%;
}
.classeur5{
    width:50%;
    justify-content: space-around;
    margin-top: 1%;
    
}
.classeur3{
    display: flex;
    justify-content: space-between;
    padding-left:4%;
    padding-right:30%;
}
.page2{
    font-size:20px;
    text-align:center;
    color:darkblue;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
  
    
}
.classeur4{
    padding-left:3%;
}
.button{
  
    background-color: darkblue;
    color:white;
    font-size:20px;
    height:6.5vh;
    border:none;
    cursor: pointer;
    width:25%;
    text-align: center;
    margin-left:35%;
    margin-top:2%;
    border-radius: 7px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

}
</style>