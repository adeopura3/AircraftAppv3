// Directives
airTrafficControlApp.directive('aircraftDetails', function(){
   return{
      templateUrl:'directives/aircraftDetails.html',
      scope:{
         aircraftObject: "="
         // Restrict scope to only access
         // aircraft object
         // This directive will render the aircraft
         // details. In the future, if there was a
         // different way to render the aircraft details,
         // only this directive will have to be changed 
      }
   } 
});
