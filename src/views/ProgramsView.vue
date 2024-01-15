<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
-->

<template>
  <!--eslint-disable-->
 

  <section> 
    <dashboard-header/>
    <article class="content-container">
      <div class="programs-container">

        <div class="liste">
          <h1>Programs</h1><br>
          <nav>
            <ul>
              <li class="p1"><span> Self-Empowerment</span></li><br>
              <li class="p1"><span> Character/Cover-dvelopment</span></li>
            </ul>
          </nav>

        </div>
        
        <div class="programs">
          <div class="program-header"> 
          <h5>Academy Programs</h5>
          </div>
      
     <div class="programs-container">
        <div class="programs">
          <div class="table-container">
            <div class="table-row-header">
              <div id="profil" class="table-cols-header">Name</div>
              <div class="table-cols-header">Description</div>
              <div class="table-cols-header">Number of enable</div>
              <div class="table-cols-header">Completed</div>
              <div class="table-cols-header">Edited</div>
            </div>

            <div class="table-row">
              <div class="table-cols">
                    <p class="profile">Daouda Malick | 22 y.o</p>
              </div>
              <div class="table-cols">Manager</div>
              <div class="table-cols">PayDunya</div>
              <div class="table-cols">New</div>
              <div class="table-cols"><button>Options</button></div>
            </div>

            <div class="table-row">
              <div class="table-cols">
                    <p class="profile">Daouda Malick | 22 y.o</p>
              </div>
              <div class="table-cols">Profession</div>
              <div class="table-cols">Flutterwave</div>
              <div class="table-cols">Status</div>
              <div class="table-cols"><button>Options</button></div>
            </div>
            <div class="table-row">
              <div class="table-cols">
                    <p class="profile">Daouda Malick | 22 y.o</p>
              </div>
              <div class="table-cols">Profession</div>
              <div class="table-cols">Flutterwave</div>
              <div class="table-cols">Status</div>
              <div class="table-cols"><button>Options</button></div>
            </div>
            
          </div>
        </div>
      </div>

        </div>
       

      </div>
      <div>
        <h5 class="titre">Package</h5>
      <table class="table1">
  <thead>
    <tr>
     <td>Name</td><td>Description</td><td>Price</td><td>Edit Price</td>
    </tr>
  </thead>
  <tbody>
      <tr class="ligne">
        <td>Development</td><td></td><td></td><td><button class="button">Edit</button></td>
      </tr>
      <tr class="ligne">
        <td>Development</td><td></td><td></td><td><button class="button">Edit</button></td>
      </tr>
      <tr class="ligne">
        <td>Development</td><td></td><td></td><td><button class="button">Edit</button></td>
      </tr>
      
  </tbody>
 
</table>
      </div>
    </article>
  </section>
</template>

<script>
/* eslint-disable */
	import dashboardHeader from '../components/Headers/dashboardHeader' ;

	export default ({
        name : 'programsView',
		components: {
      dashboardHeader
		},
		data() {
			return {
        
			}
		},
	})

</script>

<style lang="scss">
  //@import '../scss/app.scss';
  /*
  section {
    padding: 20px;
    box-sizing: border-box;
    background-color: $color-gray-2;
    
    .content-container {
      margin-top: 15px;
      padding: 10px;
      width : 100%;
      background-color: transparent;

      .programs-container {
        
        display:flex;
        
      
      
        h5 {
          font-weight: $fw-minibold;
          margin-left: 40%;
          width: 50%;
        }

        .programs {
        
          position : relative;
          padding: 1%;
          width:370%;
          padding-left:3%;
          
          .each-program {
            h6 {
              font-weight: $fw-minibold;
            }
          }
          .table-container {
           
            @extend %table;
          }
        }
      }
    }
  }

.table-row{
  background-color: $color-white;
}
.table-row-header{
  background-color: $color-white;
}
.liste{
   width: 15%;
   background-color: $color-gray-2;
   padding: 1%;
   align-items: center;

   h1{
      font-weight: $fw-minibold;
      font-size:20px;
      margin-top:8%;

   }
}
.p1{
   cursor:pointer;
   background-color:rgb(1, 1, 41);
   padding:5px;
   color:white;
   border-radius: 7px ;
   font-size:17px;
  
}
.p1:hover{
  background-color:rgb(240, 238, 238);
  color:black;
  
}

.table1{
  justify-content: space-between;
  width: 100%;
  margin-top:1%;
  td{
    padding-left:2%;
  }

 
}

thead{
  background-color: rgb(1, 1, 41);
  height: 6.5vh;
  color:white;
  border-top-right-radius: 10px;
}

.table2{
  justify-content: space-between;
  width: 350%;
  margin-top:2%;

 
}.titre{
  text-align: center;
  margin-top: -1%;
}
.profile{
  padding-left: 8%;
}
.ligne{
  background-color: white;
  height: 7vh;
}
.ligne:hover{
  background-color: whitesmoke;
}
.button{
  font-size: 15px;

}
#id{
  height:18%;
}
*/
</style>