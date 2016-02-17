// Services

// Boot service

airTrafficControlApp.factory('systemBootService', ['$location', 'queueManagementService', function($location, queueManagementService){
    
    // Initialize the system status to be
    // unstarted at the beginning
    var systemBootStatus = 'Unstarted';
    
    // Have a function to determine if the system is booted
    var systemIsBooted = function(){
        return (systemBootStatus === 'Booted');
    };
    
    // Function is called when the system is booted
    var bootSystem = function(){
        systemBootStatus = 'Booted';
        
        // initialize queue management service
        queueManagementService.initialize();
    };
    
    // If the system is not booted, redirect to
    // home page
    var handleUnbootedSystemAccess = function(){
        $location.path("/");
    };
    
    return {
        bootSystem: bootSystem,
        systemIsBooted: systemIsBooted,
        handleUnbootedSystemAccess: handleUnbootedSystemAccess
    };
}]); 




// Queue management service [Enqueue/Dequeue]
airTrafficControlApp.factory('queueManagementService', [function() {
    
    // define 4 queues, one for each type size
    // combination of aircraft
    var aircraftQueuesContainer = [{
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
      
    // Go over all the aircraft queues and initialize them
    // to be empty. This happens at system boot
    var initialize = function(){
        // Just clear out all the queues
        for (aircraftQueueContainerIndex = 0;
             aircraftQueueContainerIndex < aircraftQueuesContainer.length; aircraftQueueContainerIndex++){
            aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue = [];
        }
    };
        
    // Determine the number of items present in the queue
    // This helps enable/disable the dequeue button
    var numberOfAircraftsInQueue = function(){
        var numberOfAircrafts = 0;
        for (aircraftQueueContainerIndex = 0;
            aircraftQueueContainerIndex < aircraftQueuesContainer.length;
            aircraftQueueContainerIndex++){
            numberOfAircrafts = numberOfAircrafts + aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue.length;
        }
        return numberOfAircrafts;
    };
    
    // Determine the queue that we need to insert the item
    // into based on the type,size
    var getQueueWithMatcingPriority = function(aircraft){
        for (aircraftQueueContainerIndex = 0;
             aircraftQueueContainerIndex < aircraftQueuesContainer.length;
             aircraftQueueContainerIndex++){
            if ((aircraftQueuesContainer[aircraftQueueContainerIndex].size === aircraft.size)
                && aircraftQueuesContainer[aircraftQueueContainerIndex].type === aircraft.type)
                {
                return aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue;
                }
        }
        
        return null;
    };
    
    // determine the highest priority non empty
    // queue so that we can dequeue from that
    // queue
    var getHighestPriorityNonEmptyQueue = function(aircraft){
        for (aircraftQueueContainerIndex = 0;
             aircraftQueueContainerIndex < aircraftQueuesContainer.length;
             aircraftQueueContainerIndex++){
            if (aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue.length > 0) {
                return aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue
            }
        }
        return null;
    };
    
    // This function provides a list of all aircrafts
    // in the system in order of priority
    var getAllAircraftsInSystemInPriorityOrder = function(){
        aircraftsInSystemInPriorityOrder = [];
        for (aircraftQueueContainerIndex = 0;
             aircraftQueueContainerIndex < aircraftQueuesContainer.length;
             aircraftQueueContainerIndex++){
            // Go in order and find the first non empty queue
            if (aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue.length > 0) {
                aircraftsInSystemInPriorityOrder =
                    aircraftsInSystemInPriorityOrder.concat(aircraftQueuesContainer[aircraftQueueContainerIndex].aircraftQueue);
            }
        }
        
        return aircraftsInSystemInPriorityOrder;
    }  
    
    // Public function that enqueues the item
    var enqueueItem = function(itemToInsert){
        if (null == itemToInsert) {
            throw "Trying to add invalid null item";
        }
        
        // Get the appropriate queue that
        // we should use to insert the item
        var aircraftQueue = getQueueWithMatcingPriority(itemToInsert);
        aircraftQueue.push(itemToInsert);
    };
    
    // Dequeue item with highest priority
    // Public function
    var dequeueItemWithHighestPriority = function(){
        var dequeuedItem = (getHighestPriorityNonEmptyQueue().splice(0,1))[0];
        return dequeuedItem;
    };
    
    return{
        initialize: initialize,
        numberOfAircraftsInQueue: numberOfAircraftsInQueue,
        getAllAircraftsInSystemInPriorityOrder: getAllAircraftsInSystemInPriorityOrder,
        enqueueItem: enqueueItem,
        dequeueItemWithHighestPriority: dequeueItemWithHighestPriority
    };
    
}]);