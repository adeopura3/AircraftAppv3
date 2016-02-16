'use strict';

describe('queueManagementService', function() {
    beforeEach(module('airTrafficControlApp'));
    
    var queueManagementService;
    
    beforeEach (function(){
        
        inject(function($injector){
            queueManagementService = $injector.get('queueManagementService');
        });
        
        queueManagementService.initialize();
    });
    
    it('should have an empty queue at the start', (function() {
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(0);
    }));
    
    it('should be able to enqueue aircraft of different types and sizes', (function() {
        var aircraftPassengerLarge = {"type": "Passenger", "size": "Large", "timeAdded": new Date().getTime()};
        queueManagementService.enqueueItem(aircraftPassengerLarge);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(1);
        
        var aircraftPassengerSmall = {"type": "Passenger", "size": "Small", "timeAdded": new Date().getTime()};
        queueManagementService.enqueueItem(aircraftPassengerSmall);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(2);
        
        
        var aircraftCargoLarge = {"type": "Cargo", "size": "Large", "timeAdded": new Date().getTime()};
        queueManagementService.enqueueItem(aircraftCargoLarge);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(3);
        
        var aircraftCargoSmall = {"type": "Cargo", "size": "Small", "timeAdded": new Date().getTime()};
        queueManagementService.enqueueItem(aircraftCargoSmall);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(4);
    }));
    
    it('should be able to dequeue enqueue in priority order', (function() {
        var dateTimeFirst = new Date().getTime() - 1000;
        var dateTimeSecond = new Date().getTime() - 500;
        var dateTimeThird = new Date().getTime();
    
        // Passenger large
        var aircraftPassengerLargeFirst = {"type": "Passenger", "size": "Large", "timeAdded": dateTimeFirst};
        var aircraftPassengerLargeSecond = {"type": "Passenger", "size": "Large", "timeAdded": dateTimeSecond};
        var aircraftPassengerLargeThird = {"type": "Passenger", "size": "Large", "timeAdded": dateTimeThird};
        
        // Passenger small
        var aircraftPassengerSmallFirst = {"type": "Passenger", "size": "Small", "timeAdded": dateTimeFirst};
        var aircraftPassengerSmallSecond = {"type": "Passenger", "size": "Small", "timeAdded": dateTimeSecond};
        var aircraftPassengerSmallThird = {"type": "Passenger", "size": "Small", "timeAdded": dateTimeThird};
        
        // Cargo Large   
        var aircraftCargoLargeFirst = {"type": "Cargo", "size": "Large", "timeAdded": dateTimeFirst};
        var aircraftCargoLargeSecond = {"type": "Cargo", "size": "Large", "timeAdded": dateTimeSecond};
        var aircraftCargoLargeThird = {"type": "Cargo", "size": "Large", "timeAdded": dateTimeThird};
       
        
        // Cargo Small
        var aircraftCargoSmallFirst = {"type": "Cargo", "size": "Small", "timeAdded": dateTimeFirst};
        var aircraftCargoSmallSecond = {"type": "Cargo", "size": "Small", "timeAdded": dateTimeSecond};
        var aircraftCargoSmallThird = {"type": "Cargo", "size": "Small", "timeAdded": dateTimeThird};
       
        // Enqueue
        queueManagementService.enqueueItem(aircraftPassengerLargeFirst);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(1);
        
        
        queueManagementService.enqueueItem(aircraftCargoSmallFirst);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(2);
        
        queueManagementService.enqueueItem(aircraftCargoLargeFirst);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(3);
        
        
        queueManagementService.enqueueItem(aircraftPassengerLargeSecond);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(4);
        
        
        queueManagementService.enqueueItem(aircraftCargoLargeSecond);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(5);
         
        queueManagementService.enqueueItem(aircraftPassengerLargeThird);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(6);
       
       
        queueManagementService.enqueueItem(aircraftPassengerSmallFirst);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(7);
       
        queueManagementService.enqueueItem(aircraftCargoLargeThird);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(8);
        
        queueManagementService.enqueueItem(aircraftCargoSmallSecond);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(9);
       
        queueManagementService.enqueueItem(aircraftCargoSmallThird);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(10);
        
        queueManagementService.enqueueItem(aircraftPassengerSmallSecond);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(11);
       
        queueManagementService.enqueueItem(aircraftPassengerSmallThird);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(12);
        
        
        // Dequeue
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();   
        expect(angular.equals(dequeuedAircraft, aircraftPassengerLargeFirst)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(11);
        
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();   
        expect(angular.equals(dequeuedAircraft, aircraftPassengerLargeSecond)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(10);
        
        
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();   
        expect(angular.equals(dequeuedAircraft, aircraftPassengerLargeThird)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(9);
        
        
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();  
        expect(angular.equals(dequeuedAircraft, aircraftPassengerSmallFirst)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(8);
        
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();
        expect(angular.equals(dequeuedAircraft, aircraftPassengerSmallSecond)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(7);
        
        
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();
        expect(angular.equals(dequeuedAircraft, aircraftPassengerSmallThird)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(6);
        
        // Cargo Large
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();
        expect(angular.equals(dequeuedAircraft, aircraftCargoLargeFirst)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(5);
        
        
        // Enqueue in between
        queueManagementService.enqueueItem(aircraftPassengerLargeThird);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(6);
        
        queueManagementService.enqueueItem(aircraftPassengerSmallThird);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(7);
        // end enqueue in between
        
        
        // Resume dequeue
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();
        expect(angular.equals(dequeuedAircraft, aircraftPassengerLargeThird)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(6);
        
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();
        expect(angular.equals(dequeuedAircraft, aircraftPassengerSmallThird)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(5);
        
        
        
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();
        expect(angular.equals(dequeuedAircraft, aircraftCargoLargeSecond)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(4);
        
        
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();
        expect(angular.equals(dequeuedAircraft, aircraftCargoLargeThird)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(3);
        
        // Cargo Small
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority(); 
        expect(angular.equals(dequeuedAircraft, aircraftCargoSmallFirst)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(2);
        
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();
        expect(angular.equals(dequeuedAircraft, aircraftCargoSmallSecond)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(1);
        
        var dequeuedAircraft = queueManagementService.dequeueItemWithHighestPriority();
        expect(angular.equals(dequeuedAircraft, aircraftCargoSmallThird)).toBe(true);
        expect(queueManagementService.numberOfAircraftsInQueue()).toBe(0);
        
    }));
    
});

