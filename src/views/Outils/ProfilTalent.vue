<template>
 <br><br>

        <router-view class="neuro"/>
           <h2>Modèle du Neuro-Profil Talent</h2>
           <div class="container1">
      <div id="container1">
            <div id="classeur1">
                <p class="page">Nom et Prénom(s) :<br><br>
                <input id="text" type="text"/></p><br>
                
                <p class="page">Prénom(s) :<br><br>
               <input id="text" type="text"/></p><br>

                <p class="page">Sexe</p><br>
                <div id ="select">
                    <div><input type="radio" name="select"/> Homme</div>
                 <div><input type="radio" name="select"/> Femme</div>
                 </div>
          </div>
          <p style="background-color:black;width:1px;"></p>
       <div class="container2">
        
         <div style="display:block;width:70%">
          <h5>Talents</h5><br>
            <p id="page"><input type="checkbox"/> Acuite Emotionnelle</p>
            <p id="page"><input type="checkbox"/> Analyse critique</p>
            <p id="page"><input type="checkbox"/> Conception</p>
            <p id="page"><input type="checkbox"/> Engagement</p>
            <p id="page"><input type="checkbox"/> Imagination</p>
            <p id="page"><input type="checkbox"/> Priorisation</p>
            <p id="page"><input type="checkbox"/> Réflexion</p>
            <p id="page"><input type="checkbox"/> Résolution de probleme</p>
            <p id="page"><input type="checkbox"/> Tri de donnees</p>
         
         </div>
          <div style="display:block;width:25vw">
           <br><br>
            <p id="page"><input type="checkbox"/> Adaptabilté</p>
            <p id="page"><input type="checkbox"/> Collaboration</p>
            <p id="page"><input type="checkbox"/> Connexion</p>
            <p id="page"><input type="checkbox"/> Esprit d'Entreprise</p>
            <p id="page"><input type="checkbox"/> Modelisation</p>
            <p id="page"><input type="checkbox"/> Proactivité</p>
            <p id="page"><input type="checkbox"/> Résilience</p>
            <p id="page"><input type="checkbox"/> Tolérance aux risques</p>
            <p id="page"><input type="checkbox"/> Vision</p>
         
         </div>

       </div>
      </div> <br>
  <div><button class="button">Obtenir le fichier pdf</button></div><br>
  <br>

  </div>
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
#container1 {
   
    
    margin-top: 1%;
    padding:3%;
    display: flex;
  
}

#classeur1 {
    display:block;
    width:58%; 
   
}
#text{
  width: 95%;
  height: 5vh;
  border:none;
  box-shadow: 0 0 1px;
  background-color:rgba(252, 252, 252, 0.801);

}
#select{
    width: 50%;
    justify-content: space-between;
    display: inline-flex;
    font-size:17px;
}
#page{
  padding-top:5%;
  font-size:17px;
}

</style>