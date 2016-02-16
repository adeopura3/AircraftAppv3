// Services

// Boot service
airTrafficControlApp.service('systemBootService', ['$location', function($location){
    
    var self = this;
    // Initialize the system status to be
    // unstarted at the beginning
    this.systemBootStatus = 'Unstarted';
    
    // Have a function to determine if the system is booted
    this.systemIsBooted = function(){
        // Note that within a function, "this" will refer
        // to the function itself (Functions are objects in JS)
        // so use the self variable as defined earlier in the service
        // which refers to the service
        return (self.systemBootStatus === 'Booted');
    };
    
    // Function is called when the system is booted
    this.bootSystem = function(){
        self.systemBootStatus = 'Booted';
    };
    
    // If the system is not booted, redirect to
    // home page
    this.handleUnbootedSystemAccess = function(){
        $location.path("/");
    };
        
}]);




// Queue management service [Enqueue/Dequeue]
// Use the array to avoid the minification problem
airTrafficControlApp.service('queueManagementService', [function() {
    var self = this;
    this.aircraftQueuesContainer = [{
        "type": "Passenger",
        "size": "Large",
        "aicraftQueue": []
    },
    {
        "type": "Passenger",
        "size": "Small",
        "aicraftQueue": []
    },
    {
        "type": "Cargo",
        "size": "Large",
        "aicraftQueue": []
    },
    {
        "type": "Cargo",
        "size": "Small",
        "aicraftQueue": []
    }
    ];
      
    this.initialize = function(){
        // Just clear out all the queues
        for (aircraftQueueContainerIndex = 0;  aircraftQueueContainerIndex < self.aircraftQueuesContainer.length; aircraftQueueContainerIndex++){
            this.aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue = [];
        }
    };
        
    // Determine the number of items present in the queue
    this.numberOfAircraftsInQueue = function(){
        var numberOfAircrafts = 0;
        for (aircraftQueueContainerIndex = 0;  aircraftQueueContainerIndex < self.aircraftQueuesContainer.length; aircraftQueueContainerIndex++){
            numberOfAircrafts = numberOfAircrafts + this.aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue.length;
        }
        
        return numberOfAircrafts;
    };
    
    this.getQueueWithMatcingPriority = function(aircraft){
        for (aircraftQueueContainerIndex = 0;  aircraftQueueContainerIndex < self.aircraftQueuesContainer.length; aircraftQueueContainerIndex++){
            if ((this.aircraftQueuesContainer[aircraftQueueContainerIndex].size === aircraft.size)
                && this.aircraftQueuesContainer[aircraftQueueContainerIndex].type === aircraft.type)
                {
                return this.aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue;
                }
        }
        
        return null;
    };
    
    this.getHighestPriorityNonEmptyQueue = function(aircraft){
        for (aircraftQueueContainerIndex = 0;  aircraftQueueContainerIndex < self.aircraftQueuesContainer.length; aircraftQueueContainerIndex++){
            if (this.aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue.length > 0) {
                return this.aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue
            }
        }
        return null;
    };
    
    this.getAllAircraftsInSystemInPriorityOrder = function(){
        aircraftsInSystemInPriorityOrder = [];
        for (aircraftQueueContainerIndex = 0;  aircraftQueueContainerIndex < self.aircraftQueuesContainer.length; aircraftQueueContainerIndex++){
            if (this.aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue.length > 0) {
                aircraftsInSystemInPriorityOrder = aircraftsInSystemInPriorityOrder.concat(this.aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue);
            }
        }
        
        return aircraftsInSystemInPriorityOrder;
    }
    
    this.insertIntoQueue = function (itemToInsert) {
        if (null == itemToInsert) {
            throw "Trying to add invalid null item";
        }
        
        var aircraftQueue = this.getQueueWithMatcingPriority(itemToInsert);
        aircraftQueue.push(itemToInsert);        
    };    
    
    this.enqueueItem = function(item){
        self.insertIntoQueue(item);
    };
    
    this.dequeueItemWithHighestPriority = function(){
        var dequeuedItem = (self.getHighestPriorityNonEmptyQueue().splice(0,1))[0];
        return dequeuedItem;
    };
    
    return{
        getAllAircraftsInSystemInPriorityOrder: getAllAircraftsInSystemInPriorityOrder
    }
    
}]);