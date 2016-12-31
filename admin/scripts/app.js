'use strict';

function HashTable(obj) {
    this.length = 0;
    this.items = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }

    this.setItem = function(key, value)
    {
        var previous = undefined;
        if (this.hasItem(key)) {
            previous = this.items[key];
        }
        else {
            this.length++;
        }
        this.items[key] = value;
        return previous;
    }

    this.getItem = function(key) {
        return this.hasItem(key) ? this.items[key] : undefined;
    }

    this.hasItem = function(key)
    {
        return this.items.hasOwnProperty(key);
    }
   
    this.removeItem = function(key)
    {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        }
        else {
            return undefined;
        }
    }

    this.keys = function()
    {
        var keys = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

    this.values = function()
    {
        var values = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    this.each = function(fn) {
        for (var k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    }

    this.clear = function()
    {
        this.items = {}
        this.length = 0;
    }
};

function VariableData() {
        this.currentScreen = "None";
        this.userName = "NA";
        this.firstName = "NA";
        this.lastName = "NA";
        this.dateOfBirth = "";
        this.patientId = "";
        this.modelName = "NA";
        this.interviewLocation = "NA";
        this.age = 0 ;
        this.gender = "NA";
        this.errorMessage = "NA";
        this.errorFlag = 0;
        this.relationships=[];
        this.maxRelationships = 5;
        this.usedRelationships = 0;
        this.currentRelationshipSet = 1;
        this.attributeSetData = [];
        this.attributeSetNum = 0;
        this.attributeSets = [];
        this.currentDimensionSet = 1;
        this.currentHealthState = 1;
        this.step = 50;
        this.start_top = 100;
        this.prev_input = 0;
        this.solution_array = [];
        this.solution_array_counter = 0;
        this.hashTable = new HashTable();
        this.timeTradeOffList = [];
        this.currentTimeTradeOffList = 1;
        this.selectedLifeTimeTradeOff = 0;
        this.sortedAttributeData = [];
};

var app = angular.module("solomonAdminApp", ["ngRoute","ngMaterial","ng-sortable"]);
    
app.service('appDataService', function($http){
        // Custom Sort function: http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
        // Usage: function(field, reverse, primer) ==> $scope.customers2.sort(sort_by("id", false, parseInt));
        var restUrl = "http://localhost:8080/RestService/solomon/models/update";
        var loginUrl = "http://localhost:8080/RestService/solomon/models/patientlogin";
        var patientModelUrl = "http://localhost:8080/RestService/solomon/models/patientModels";
        var sort_by = function(field, reverse, primer){
                   var key = primer ? 
                       function(x) {return primer(x[field])} : 
                       function(x) {return x[field]};
                   reverse = !reverse ? 1 : -1;
                   return function (a, b) {
                       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
                     } 
                };
        var userName = "NA";
        var firstName = "NA";
        var lastName = "NA";
        var dateOfBirth = "";
        var patientId = -1 ;
        var patientModels = "";
        var modelName = "NA";
        var interviewLocation = "NA";
        var age = 0 ;
        var gender = "NA";
        var errorMessage = "NA";
        var errorFlag = 0;
        var relationships=[{id:1, title:'Male friend'},
                           {id:1, title:'Father'},
                           {id:1, title:'Grandmother'},
                           {id:2, title:'Female friend'},
                           {id:2, title:'Mother'},
                           {id:2, title:'Grandfather'},
                           {id:3, title:'Female friend'},
                           {id:3, title:'Sister'},
                           {id:3, title:'Employer'},
                           {id:4, title:'Male friend'},
                           {id:4, title:'Brother'},
                           {id:4, title:'Co worker'},
                           {id:5, title:'Brother'},
                           {id:5, title:'Friends father'},
                           {id:5, title:'Co worker'},
                          ];
        var maxRelationships = 5; // max number relationship sets are available for use
        var usedRelationships = 0; // Number of relationships have been used till now to derive health dimensions
        var currentRelationshipSet = 1; // Id value of current relationship set in use
        this.getErrorMessage = function(){
                return errorMessage;
            };
        this.setErrorMessage = function(value){
                errorMessage=value;
            };
        this.getErrorFlag = function() {
            return errorFlag;
        };
        this.setErrorFlag = function(value) {
            errorFlag = value;
        };
        this.getCurrentRelationshipSet = function() {
            return currentRelationshipSet;
        };
        this.getMaxRelationships = function() {
            return maxRelationships;
        };
        this.getUsedRelationships = function(){
                return usedRelationships;
            };
        this.incrementUsedRelationships = function(){
                usedRelationships = usedRelationships+1;
            };
        this.getNextRelationshipSet = function() {
            currentRelationshipSet = currentRelationshipSet + 1;
            return currentRelationshipSet;
        };
        this.getUserName = function(){
                return userName;
            };
        this.setUserName = function(value){
                userName=value;
            };
        this.getFirstName = function(){
                return firstName;
            };
        this.setFirstName = function(value){
                firstName=value;
            };
        this.getLastName = function(){
                return lastName;
            };
        this.setLastName = function(value){
                lastName=value;
            };
        this.getDateOfBirth = function(){
                return dateOfBirth;
            };
        this.setDateOfBirth = function(value){
                dateOfBirth=value;
            };
        this.getPatientId = function(){
                return patientId;
            };
        this.setPatientId = function(value){
                patientId=value;
            };
        this.getPatientModels = function(){
                return patientModels;
            };
        this.setPatientModels = function(value){
                patientModels=value;
            };
        this.getModelName = function(){
                return modelName;
            };
        this.setModelName = function(value){
                modelName=value;
            };
        this.getInterviewLocation = function(){
                return interviewLocation;
            };
        this.setInterviewLocation = function(value){
                interviewLocation=value;
            };
        this.getAge= function(){
                return age;
            };
        this.setAge = function(value){
                age=value;
            };
        this.getGender= function(){
                return gender;
            };
        this.setGender = function(value){
                gender=value;
            };
        /** Relations data **/
        this.getRelationships = function()
        { return relationships;};
        this.setRelationships = function(value)
        { relationships = value;};
        /** END Relations data **/
        
        /** Attribute data **/
        var attributeSetData = []; // Master set for all health states
        var attributeSetNum = 0; // ID for attributeSetData, each set of health dimensions has the same ID
        var attributeSets = []; // Individual set of labels, reset for each run
        this.newAttributeSet = function()
        {   
            attributeSets = [];
            attributeSetNum = attributeSetNum + 1;
            return attributeSetNum;
        };
        this.saveAttributeSetData = function(){
            for (var i = 0; i < attributeSets.length; i++) {
            //window.alert(attributeSets[i].title);
            attributeSetData.push(attributeSets[i]);
            attributeSetData[attributeSetData.length-1].position=i+1; // New position after rearrangement
            }
            attributeSetData[attributeSetData.length-1].position=99; // Set end pole as 99
        };
        this.getAttributeSetData = function(){
            return attributeSetData;};
        this.getAttributeSetNum = function()
        {   return attributeSetNum;};
        this.getAttributeSet = function()
        {   return attributeSets;};
        this.setAttributeSet = function(value)
        {   attributeSets = value;};
        this.addAttribute = function(setNum, value, pos)
        {
            attributeSets.push({setId: setNum , title: value, position: pos});
            attributeSets.sort(sort_by("position", false, parseInt));
        };
        /** END Attribute data **/
        
        /** Standard Gamble Looping **/
//        attributeSetData =
//        [{"setId":1,"title":"Athlete","position":1},{"setId":1,"title":"Fit","position":2},{"setId":1,"title":"Unhealthy","position":3},{"setId":1,"title":"Dead","position":99},{"setId":2,"title":"A","position":1},{"setId":2,"title":"B","position":2},{"setId":2,"title":"C","position":99},{"setId":3,"title":"X","position":1},{"setId":3,"title":"Y","position":2},{"setId":3,"title":"Z","position":99}];
        
        var currentDimensionSet = 1;
        
        var currentHealthState = 1;
        
        this.getCurrentDimensionSet = function() {
            return currentDimensionSet;
        };
        
        this.getCurrentHealthState = function() {
            return currentHealthState;
        };
        
        this.getPole1 = function() {
        var currentDimension = attributeSetData.filter(function( obj ) {
                                return obj.setId == currentDimensionSet && obj.position == 1;
                                });
        return currentDimension[0].title;
        };
        
        this.getPole2 = function() {
        var currentDimension = attributeSetData.filter(function( obj ) {
                                return obj.setId == currentDimensionSet && obj.position == 99;
                                });
        return currentDimension[0].title;
        };
        
        this.getCurrentLabel = function() {
        console.log('currentDimensionSet: '+currentDimensionSet);
        console.log('currentHealthState: '+currentHealthState);
        var currentDimension = attributeSetData.filter(function( obj ) {
                                return obj.setId == currentDimensionSet && obj.position == currentHealthState;
                                });
        return currentDimension[0].title;  
        };
        
        this.getCurrentDimensionList = function() {
        var currentDimension = attributeSetData.filter(function( obj ) {
                                return obj.setId == currentDimensionSet;
                                });
        return currentDimension;  
        };
        
        this.nextItemStandardGamble = function() {
            currentHealthState = currentHealthState + 1;
            
            var testList = attributeSetData.filter(function( obj ) {
                                return obj.setId == currentDimensionSet && obj.position == currentHealthState;
                                });
            
            if(testList  == '')
            {
            currentDimensionSet = currentDimensionSet+1;
            currentHealthState = 2;
                
                //Check if all sets exhausted
                var testList2 = attributeSetData.filter(function( obj ) {
                                    return obj.setId == currentDimensionSet;
                                    });
                if(testList2  == '')
                { errorFlag = 1; 
                }
                
            };
            
            var testList3 = attributeSetData.filter(function( obj ) {
                                    return obj.setId == currentDimensionSet;
                                    });
            
            if(testList3.length == 2)
            {
            console.log('here');
            currentHealthState = 1;
            currentDimensionSet = currentDimensionSet+1;  
            this.nextItemStandardGamble(); 
            }
            
            return;
        };
        
        this.setRelativeWeight = function(value)
        {
        var index = attributeSetData.findIndex(function( obj ) {
                                return obj.setId == currentDimensionSet && obj.position == currentHealthState;
                                });
        attributeSetData[index].relativeWeight = (-1)*(value/100);
        };
        
        this.setPoleRelativeWeight = function(){
        console.log('SetPole0');
          for(var i = 0 ; i< attributeSetData.length ; i = i+1)
          {
              if (attributeSetData[i].position == 1)
              {
                console.log('SetPole1');
                 attributeSetData[i].relativeWeight = 1; 
              };
              
              if (attributeSetData[i].position == 99)
              {
                  console.log('SetPole2');
                 attributeSetData[i].relativeWeight = 0; 
              };
          };
        };
        
        /** END Standard Gamble Looping **/
        
        /** Standard Gamble Calculation Method **/
        var step = 50;
        var start_top = 100;
        var prev_input = 0;

        var solution_array = [];
        var solution_array_counter = 0;
        
        var hashTable = new HashTable();
        hashTable.setItem(100, 1); //Inserted to prevent error on first has function call
        
        this.resetStandardGamble = function () {
        step = 50;
        start_top = 100;
        prev_input = 0;

        solution_array = [];
        solution_array_counter = 0;
        
        hashTable = new HashTable();
        hashTable.setItem(100, 1);
        };
        
        this.calculateStandardGamble = function (input) {
            
            console.log('Start: '+input);
            
            if (!hashTable.hasItem(start_top))
            {
                hashTable.setItem(start_top, input);
            }
            
            console.log('Hash Table Inserted: '+hashTable.getItem(start_top));
            
            if (input != prev_input)
            {
                step = -1 * (step / 2);
                console.log('Input reversed ');

            };
            console.log('Step value ' +step);

            if (input == 1)
            { }
            else if (input == 0)
            { }
            else
            {
                solution_array[solution_array_counter] = start_top;
                solution_array_counter = solution_array_counter + 1 ;

                if (solution_array_counter > 2)
                {
                    var temp = Math.round((solution_array[0] + solution_array[1] + solution_array[2]) / 3);
                    return -temp;
                }
            };

            var old_start_top = start_top;
//            console.log('Old start top: '+old_start_top);
            
            start_top = Math.round((start_top + step));
//            console.log('New start top: '+start_top);

            if (old_start_top == start_top)
            {   
                return -start_top;
            }

            if (start_top <= 0)
            {
                step = step / 2;
                start_top = old_start_top;
                this.calculateStandardGamble(input);
            }
            
            if (start_top > 100) 
            {
                step = step / 2;
                start_top = old_start_top;
                this.calculateStandardGamble(input);
                
            }
            

            prev_input = input;
            var checkAnswered = this.stdGambleCheckAnswered(start_top);
            return (checkAnswered);
        };
        
        this.stdGambleCheckAnswered = function(input_start_top)
        {
            if (hashTable.hasItem(input_start_top))
            {
                return this.calculateStandardGamble(hashTable.getItem(input_start_top));
            }
            else
            return input_start_top;
        };
        /** END Standard Gamble Calculation Method **/
        
        /** Time trade off methods **/
        var timeTradeOffList = []; //List to store coefficents and poles for each health dimension
        this.getTimeTradeOffList = function()
        {
            return timeTradeOffList;
        };
        
        var currentTimeTradeOffList = 1; //Pointer to store the current element, being worked on, starts with the second element
        this.getCurrentTimeTradeOffList = function()
        {
            return currentTimeTradeOffList;
        };
        
        this.incrementCurrentTimeTradeOffList = function()
        {
            currentTimeTradeOffList = currentTimeTradeOffList+1;
            
            if (currentTimeTradeOffList >= attributeSetNum)
            {return -1;} //End of list
            else
            {return currentTimeTradeOffList;}
        };
        
        // Create a new list for time trade off from the AttributeSetDataList, with one entry for each of the sets
        this.setUpTimeTradeOffArray = function()
        {  
            // In case of re- order list, do nothing
            if(timeTradeOffList != '')
            {
                return;
            };
            
            console.log('currentRelationshipSet: '+currentRelationshipSet);
            console.log(attributeSetData);
            
            //Comment later
//                    attributeSetData = 
//            [{"setId":1,"title":"Athlete","position":1},{"setId":1,"title":"Weekend warrior","position":2},{"setId":1,"title":"Somewhat unfit","position":3},{"setId":1,"title":"Couch potato","position":99},{"setId":2,"title":"Good Heart","position":1},{"setId":2,"title":"Okay heart","position":2},{"setId":2,"title":"Problematic heart","position":99},{"setId":3,"title":"No diabetes","position":1},{"setId":3,"title":"Mild diabetes","position":2},{"setId":3,"title":"Severe diabetes","position":99}];
//                        [{"setId":1,"title":"Normal blood pressure","position":1,"relativeWeight":1},{"setId":1,"title":"Low Blood Pressure","position":2},{"setId":1,"title":"High Blood Pressure","position":3},{"setId":1,"title":"Very High Blood Pressure","position":99,"relativeWeight":0},{"setId":2,"title":"Very Fit","position":1,"relativeWeight":1},{"setId":2,"title":"Joint Pain","position":2},{"setId":2,"title":"Severe Joint Pain","position":3},{"setId":2,"title":"Cant walk","position":99,"relativeWeight":0},{"setId":3,"title":"No diabetes","position":1,"relativeWeight":1},{"setId":3,"title":"Diabetes","position":2},{"setId":3,"title":"Severe Diabetes","position":99,"relativeWeight":0},{"setId":4,"title":"Good heart","position":1,"relativeWeight":1},{"setId":4,"title":"Mild heart problems","position":2},{"setId":4,"title":"Severe heart problems","position":99,"relativeWeight":0}];
            
//                    currentRelationshipSet = 4;
            //
            
            for(var i = 1 ; i <= attributeSetNum ; i++)
            {
                var pole1List = attributeSetData.filter(function( obj ) {
                                return obj.setId == i && obj.position == 1;
                                });
                var pole2List = attributeSetData.filter(function( obj ) {
                                return obj.setId == i && obj.position == 99;
                                });
                
                var tempValue = {position:-1 ,setId: i, pole1:pole1List[0].title, pole2:pole2List[0].title,yearsTaken:0, yearsAvailable:0, coefficient:0};  
                
                timeTradeOffList.push(tempValue);
            };
        };
        
        this.setSortedTimeTradeOffArray = function(inputArray)
        {
           timeTradeOffList = inputArray;
            
           for(var i = 0 ; i < attributeSetNum ; i++)
            {
                timeTradeOffList[i].position = i;
            };  
        };
        
        this.calculateLifeRemaining = function()
        {
            if (age >= 0 && age <= 20)
            {
            return 60;
            }
            
            if (age >= 21 && age <= 40)
            {
            return 40;
            }
            
            if (age >= 41 && age <= 70)
            {
            return 20;
            }
            
            if (age >= 71 && age <= 90)
            {
            return 10;
            }
            
            if (age >= 91 && age <= 100)
            {
            return 5;
            }
              
        };
        
        this.setTimeTradeOffEqualImportance = function(value)
        {
            var years = this.calculateLifeRemaining();
            
            timeTradeOffList[value].yearsAvailable = years;
            timeTradeOffList[value].yearsTaken = years;
            
        };
        
        this.setTimeTradeOffYears = function(indexVal, yearsVal)
        {
            var years = this.calculateLifeRemaining();
            
            timeTradeOffList[indexVal].yearsAvailable = years;
            timeTradeOffList[indexVal].yearsTaken = yearsVal;
            
        };
        
        var selectedLifeTimeTradeOff = 0;
        this.setSelectedLifeTimeTradeOff = function(value)
        {
           selectedLifeTimeTradeOff = value; 
        };
        
        this.getSelectedLifeTimeTradeOff = function()
        {
            return selectedLifeTimeTradeOff;
        };
        
        this.calculateTimeTradeOffCoefficient = function()
        {
            
//            timeTradeOffList = 
//[{"position":0,"setId":2,"pole1":"Good Heart","pole2":"Problematic heart","yearsTaken":0,"yearsAvailable":0,"coefficient":0},{"position":1,"setId":3,"pole1":"No diabetes","pole2":"Severe diabetes","yearsTaken":7,"yearsAvailable":10,"coefficient":0},{"position":2,"setId":1,"pole1":"Athlete","pole2":"Couch potato","yearsTaken":6,"yearsAvailable":10,"coefficient":0},{"position":3,"setId":4,"pole1":"Physically able","pole2":"Disabled","yearsTaken":5,"yearsAvailable":10,"coefficient":0}];
            
        ////////////
        
        var matrixA = [];
    
        for(var i=1;i<=timeTradeOffList.length;i++)
        {   
                var row = [];

                if(i != timeTradeOffList.length)
                {
                    for(var j=0; j<timeTradeOffList.length;j++)
                    {
                        if(j==0)
                        {
                            row.push(-1*timeTradeOffList[i].yearsTaken);
                        }
                        else if(i==j)
                        {
                            row.push(timeTradeOffList[i].yearsAvailable);
                        }
                        else
                        {
                            row.push(0);
                        }
                    };
                }
                else
                {
                   for(var j=0; j<timeTradeOffList.length;j++)
                    {
                        row.push(1);
                    }
                }

                matrixA.push(row);
        };
    
        //Matrix B
    var matrixB = [];
    
    for(var k=1; k<=timeTradeOffList.length;k++)
    {
        if(k == timeTradeOffList.length)
        {
           matrixB.push(1);  
        }
        else
        {
           matrixB.push(0);  
        }
    };
    
var matrixA_Inv = numeric.inv(matrixA);
    
var matrixSol = numeric.dot(matrixA_Inv,matrixB);
    
for(var i = 0; i<matrixSol.length;i++)
{
    timeTradeOffList[i].coefficient =  matrixSol[i];   
}
            
        };
        /** END Time trade off methods **/
        
        var sortedAttributeData = [];
        
        this.prepareFinalList = function()
        {

//        timeTradeOffList = [{"position":0,"setId":4,"pole1":"Good heart","pole2":"Severe heart problems","yearsTaken":0,"yearsAvailable":0,"coefficient":0.27522935779816515},{"position":1,"setId":2,"pole1":"Very Fit","pole2":"Cant walk","yearsTaken":54,"yearsAvailable":60,"coefficient":0.24770642201834864},{"position":2,"setId":1,"pole1":"Normal blood pressure","pole2":"Very High Blood Pressure","yearsTaken":44,"yearsAvailable":60,"coefficient":0.20183486238532108},{"position":3,"setId":3,"pole1":"No diabetes","pole2":"Severe Diabetes","yearsTaken":60,"yearsAvailable":60,"coefficient":0.27522935779816515}];
            
//        attributeSetData = [{"setId":1,"title":"Normal blood pressure","position":1,"relativeWeight":1},{"setId":1,"title":"Low Blood Pressure","position":2,"relativeWeight":0.4},{"setId":1,"title":"High Blood Pressure","position":3,"relativeWeight":0.5},{"setId":1,"title":"Very High Blood Pressure","position":99,"relativeWeight":0},{"setId":2,"title":"Very Fit","position":1,"relativeWeight":1},{"setId":2,"title":"Joint Pain","position":2,"relativeWeight":0.47},{"setId":2,"title":"Severe Joint Pain","position":3,"relativeWeight":.91},{"setId":2,"title":"Cant walk","position":99,"relativeWeight":0},{"setId":3,"title":"No diabetes","position":1,"relativeWeight":1},{"setId":3,"title":"Diabetes","position":2,"relativeWeight":.43},{"setId":3,"title":"Severe Diabetes","position":99,"relativeWeight":0},{"setId":4,"title":"Good heart","position":1,"relativeWeight":1},{"setId":4,"title":"Mild heart problems","position":2,"relativeWeight":.78},{"setId":4,"title":"Severe heart problems","position":99,"relativeWeight":0}];
            
            this.calculateTimeTradeOffCoefficient();
            
            function compare(a,b) {
            if (a.coefficient < b.coefficient)
            return 1;
            if (a.coefficient > b.coefficient)
            return -1;
            return 0;
            };
    
        timeTradeOffList.sort(compare);
        
        this.setCoefficientAttributeSetData = function(value)
        {
        
            for(var j=0;j<timeTradeOffList.length;j++)
            {
                var indices = [];

                for(var k = 0; k< attributeSetData.length; k++)
                {
                    if(attributeSetData[k].setId == timeTradeOffList[j].setId)
                    {
                        indices.push(k);
                    };
                };

                for(var i = 0; i<indices.length; i++)
                {
                    var index = indices[i];
                    attributeSetData[index].coefficient = timeTradeOffList[j].coefficient;
                };
            };
        };
            
        this.setCoefficientAttributeSetData();
    
    
        sortedAttributeData = [];
    
    
        for (var i = 0 ; i < timeTradeOffList.length ; i++)
        {
            var internalList = attributeSetData.filter(function( obj ) {
                                        return obj.setId == timeTradeOffList[i].setId;
                                        });
            internalList.sort(function(a,b) {
            if (a.relativeWeight < b.relativeWeight)
            return 1;
            if (a.relativeWeight > b.relativeWeight)
            return -1;
            return 0;
            });

            for(var j = 0 ; j < internalList.length ; j++)
            {
            internalList[j].coefficient = Math.round(internalList[j].coefficient * 100) / 100;
            internalList[j].setPositionId = i+1;
            sortedAttributeData.push(internalList[j]);
            };
        };
            
        return sortedAttributeData;
             
        };
        
        this.getSortedAttributeData = function()
        {
            return sortedAttributeData;
        };
        
        /** State management **/
        this.saveApplicationState = function(currentScreenName)
        {
        var variableData = new VariableData();
            
        variableData.currentScreen = currentScreenName;
        variableData.userName = userName;
        variableData.firstName = firstName;
        variableData.lastName = lastName;
        variableData.dateOfBirth = dateOfBirth;
        variableData.patientId = patientId;
        variableData.modelName = modelName;
        variableData.interviewLocation = interviewLocation;
        variableData.age = age ;
        variableData.gender = gender;
        variableData.errorMessage = errorMessage;
        variableData.errorFlag = errorFlag;
        variableData.relationships= relationships;
        variableData.maxRelationships = maxRelationships;
        variableData.usedRelationships = usedRelationships;
        variableData.currentRelationshipSet = currentRelationshipSet;
        variableData.attributeSetData = attributeSetData;
        variableData.attributeSetNum = attributeSetNum;
        variableData.attributeSets = attributeSets;
        variableData.currentDimensionSet = currentDimensionSet;
        variableData.currentHealthState = currentHealthState;
        variableData.step = step;
        variableData.start_top = start_top;
        variableData.prev_input = prev_input;
        variableData.solution_array = solution_array;
        variableData.solution_array_counter = solution_array_counter;
        variableData.hashTable = hashTable;
        variableData.timeTradeOffList = timeTradeOffList;
        variableData.currentTimeTradeOffList = currentTimeTradeOffList;
        variableData.selectedLifeTimeTradeOff = selectedLifeTimeTradeOff;
        variableData.sortedAttributeData = sortedAttributeData;
        
        console.log('JSON DATA: '+JSON.stringify(variableData));
        sessionStorage.setItem('applicationState', JSON.stringify(variableData));
        
            if(currentScreenName != '/intro_sessionId')
            {
            var res = $http.post(restUrl, JSON.stringify(variableData));
            res.success(function(data, status, headers, config) {
                console.log( "Success message: " + JSON.stringify({data: data}));
            });
            res.error(function(data, status, headers, config) {
                console.log( "failure message: " + JSON.stringify({data: data}));
            });
            };
            
        };
        
        this.loadApplicationState = function(){
            var temp = sessionStorage.getItem('applicationState');
            var variableData = $.parseJSON(temp);
            
        //currentScreen = variableData.currentScreenName;
        userName = variableData.userName;
        firstName = variableData.firstName;
        lastName = variableData.lastName;
        dateOfBirth = variableData.dateOfBirth;
        patientId = variableData.patientId;
        modelName = variableData.modelName;
        interviewLocation = variableData.interviewLocation;
        age = variableData.age ;
        gender = variableData.gender;
        errorMessage = variableData.errorMessage;
        errorFlag = variableData.errorFlag;
        relationships= variableData.relationships;
        maxRelationships = variableData.maxRelationships;
        usedRelationships = variableData.usedRelationships;
        currentRelationshipSet = variableData.currentRelationshipSet;
        attributeSetData = variableData.attributeSetData;
        attributeSetNum = variableData.attributeSetNum;
        attributeSets = variableData.attributeSets;
        currentDimensionSet = variableData.currentDimensionSet;
        currentHealthState = variableData.currentHealthState;
        step = variableData.step;
        start_top = variableData.start_top;
        prev_input = variableData.prev_input;
        solution_array = variableData.solution_array;
        solution_array_counter = variableData.solution_array_counter;
            hashTable = new HashTable();
            hashTable.length = variableData.hashTable.length;
            hashTable.items = variableData.hashTable.items;    
        timeTradeOffList = variableData.timeTradeOffList;
        currentTimeTradeOffList = variableData.currentTimeTradeOffList;
        selectedLifeTimeTradeOff = variableData.selectedLifeTimeTradeOff;
        sortedAttributeData = variableData.sortedAttributeData;
            
        }
        /** State management **/
                
        this.patientModels = function ()
        {
        var models = "";
            $http.get(patientModelUrl+'?patientId='+$rootScope.patientId).
        then(function(response) {
            console.log('Response:'+response.data);
            models = response.data;
        });
        return models;
        }
    
    });

app.factory('dataFactory', ['$http','$q', function($http,$q) {

    var dataFactory = {};
        
    var loginUrl = "http://localhost:8080/RestService/solomon/models/patientlogin";
    var patientModelUrl = "http://localhost:8080/RestService/solomon/models/patientModels";
    var modelDataUrl = "http://localhost:8080/RestService/solomon/models/modelJSON";
    
    //Get patientId from first name, last name , date of birth
    dataFactory.patientLogin = function (firstName,lastName,dateOfBirth){
//        alert("Input received: "+ firstName+" "+lastName+" "+dateOfBirth);
        var dataString = loginUrl+'?firstName='+firstName+'&lastName='+lastName+'&dateOfBirth='+dateOfBirth;
//        alert(dataString);
        return $http.get(loginUrl+'?firstName='+firstName+'&lastName='+lastName+'&dateOfBirth='+dateOfBirth).then(function(response){
            return response.data;})
    };
    
    //Get list of patient models from patientId
    dataFactory.patientModels = function(patientId){
        var dataString = patientModelUrl+'?patientId='+patientId;
        //alert(dataString);
//        console.log(dataString);
        return $http.get(patientModelUrl+'?patientId='+patientId).then(
            function(response){        
            return response.data;
            })
    };
    
    //Get data of model JSON string from modelId
    dataFactory.getModelJSON = function(modelId){
        var dataString = modelDataUrl+'?modelId='+modelId;
//        console.log(dataString);
        return $http.get(modelDataUrl+'?modelId='+modelId).then(
            function(response){        
            return response.data;
            })
    };

    return dataFactory;
}]);
                
app.config(function($routeProvider,$mdThemingProvider) {
//        $mdThemingProvider.theme('default')
//        .primaryPalette('pink')
//        .accentPalette('green');
        $routeProvider
        .when("/banana", {
            template : "<h1>Banana</h1><p>Bananas contain around 75% water.</p>"
        })
        .when("[#,/]", {
            controller: 'intro_nameCntrl',
            templateUrl : "./partials/intro/intro_name.html"
        })
        .when("/common_error", {
            controller: 'common_errorCntrl',
            templateUrl : "./partials/common/common_error.html"
        })
        .when("/intro_usedBefore", {
            controller: 'intro_usedBeforeCntrl',
            templateUrl : "./partials/intro/intro_usedBefore.html"
        })
        .when("/intro_sessionId", {
            controller: 'intro_sessionIdCntrl',
            templateUrl : "./partials/intro/intro_sessionId.html"
        })
        .when("/intro_genderAge", {
            controller: 'intro_genderAgeCntrl',
            templateUrl : "./partials/intro/intro_genderAge.html"
        })
        .when("/n1_relation_selectRel", {
            controller: 'n1_relation_selectRelCntrl',
            templateUrl : "./partials/n1_relation/n1_relation_selectRel.html"
        })
        .when("/n1_relation_nextRel1", {
            controller: 'n1_relation_nextRel1Cntrl',
            templateUrl : "./partials/n1_relation/n1_relation_nextRel1.html"
        })
        .when("/n1_relation_nextRel2", {
            controller: 'n1_relation_nextRel2Cntrl',
            templateUrl : "./partials/n1_relation/n1_relation_nextRel2.html"
        })
        .when("/n1_relation_removeRel", {
            controller: 'n1_relation_removeRelCntrl',
            templateUrl : "./partials/n1_relation/n1_relation_removeRel.html"
        })
        .when("/n2_poles_entry", {
            controller: 'n2_poles_entryCntrl',
            templateUrl : "./partials/n2_poles/n2_poles_entry.html"
        })
        .when("/n2_pole1", {
            controller: 'n2_pole1Cntrl',
            templateUrl : "./partials/n2_poles/n2_pole1.html"
        })
        .when("/n2_pole2", {
            controller: 'n2_pole2Cntrl',
            templateUrl : "./partials/n2_poles/n2_pole2.html"
        })
        .when("/n2_pole1_other", {
            controller: 'n2_pole1_otherCntrl',
            templateUrl : "./partials/n2_poles/n2_pole1_other.html"
        })
        .when("/n2_pole2_other", {
            controller: 'n2_pole2_otherCntrl',
            templateUrl : "./partials/n2_poles/n2_pole2_other.html"
        })
        .when("/n2_between", {
            controller: 'n2_betweenCntrl',
            templateUrl : "./partials/n2_poles/n2_between.html"
        })
        .when("/n2_reorder", {
            controller: 'n2_reorderCntrl',
            templateUrl : "./partials/n2_poles/n2_reorder.html"
        })
        .when("/n2_more", {
        controller: 'n2_moreCntrl',
        templateUrl : "./partials/n2_poles/n2_more.html"
        })
        .when("/n2_more_newRel", {
        controller: 'n2_more_newRelCntrl',
        templateUrl : "./partials/n2_poles/n2_more_newRel.html"
        })
        .when("/n3_stdGamble_entry", {
        controller: 'n3_stdGamble_entryCntrl',
        templateUrl : "./partials/n3_stdGamble/n3_stdGamble_entry.html"
        })
        .when("/n4_timeTradeOff_sort", {
        controller: 'n4_timeTradeOff_sortCntrl',
        templateUrl : "./partials/n4_timeTradeOff/n4_timeTradeOff_sort.html"
        })
        .when("/n4_timeTradeOff_sanityCheck", {
        controller: 'n4_timeTradeOff_sanityCheckCntrl',
        templateUrl : "./partials/n4_timeTradeOff/n4_timeTradeOff_sanityCheck.html"
        })
        .when("/n4_timeTradeOff_q1_noLoss", {
        controller: 'n4_timeTradeOff_q1_noLossCntrl',
        templateUrl : "./partials/n4_timeTradeOff/n4_timeTradeOff_q1_noLoss.html"
        })
        .when("/n4_timeTradeOff_q2_age", {
        controller: 'n4_timeTradeOff_q2_ageCntrl',
        templateUrl : "./partials/n4_timeTradeOff/n4_timeTradeOff_q2_age.html"
        })
        .when("/n4_timeTradeOff_q3_age_confirm", {
        controller: 'n4_timeTradeOff_q3_age_confirmCntrl',
        templateUrl : "./partials/n4_timeTradeOff/n4_timeTradeOff_q3_age_confirm.html"
        })
        .when("/n4_timeTradeOff_result", {
        controller: 'n4_timeTradeOff_resultCntrl',
        templateUrl : "./partials/n4_timeTradeOff/n4_timeTradeOff_result.html"
        })
        .otherwise({
            controller: 'intro_nameCntrl',
            templateUrl : "./partials/intro/intro_name.html"
        });
    });

app.controller('common_errorCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    $scope.errorMessage = appDataService.getErrorMessage();
}]);

app.controller('intro_nameCntrl', ['$scope', '$location','$filter','appDataService','dataFactory',function($scope, $location,$filter,appDataService,dataFactory) {
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.dateOfBirth = "";
    $scope.fromService = appDataService.getUserName();
    $scope.nextButtonClick = function () {
        $scope.dob = $filter('date')($scope.dateOfBirth, "yyyy-MM-dd", "UTC");
        appDataService.setUserName($scope.firstName);
        appDataService.setFirstName($scope.firstName);
        appDataService.setLastName($scope.lastName);
//        $scope.dateOfBirth.setUTCMilliseconds(0);
//        $scope.dateOfBirth.setUTCSeconds(0);
//        $scope.dateOfBirth.setUTCMinutes(0);
//        $scope.dateOfBirth.setUTCHours(0);
        appDataService.setDateOfBirth($scope.dob);
//        appDataService.patientLogin();
        var patientId = dataFactory.patientLogin($scope.firstName,$scope.lastName,$scope.dob);
        patientId.then(function(result){
        //alert("Patient result recived:"+result);
        appDataService.setPatientId(result);
        //alert("Go to Next page");
        $location.path('/intro_usedBefore');
//        $scope.generateModelList();
        });
//        dataFactory.patientLogin(function(response){
//        appDataService.setPatientId(response.data);
//        },$scope.firstName,$scope.lastName,$scope.dob);
        //appDataService.saveApplicationState('/intro_usedBefore');
//        $location.path('/intro_usedBefore');
    };
    
}]);

app.controller('intro_usedBeforeCntrl', ['$scope', '$location','appDataService','dataFactory',function($scope, $location,appDataService,dataFactory) {
//    appDataService.loadApplicationState();
    $scope.modelList = [];//appDataService.getPatientModels();
    //appDataService.setPatientId(48);
    $scope.patientId = appDataService.getPatientId();
    
    
    $scope.generateModelList = function(){        
        dataFactory.patientModels($scope.patientId).then(
        function(data){
            console.log("Patient result received:"+data);
            $scope.modelList = data;
        });
    };
    
    $scope.generateModelList();
    
//[
//  {
//    "id": "35",
//    "completed": 1,
//    "location": null,
//    "modelname": "Gaurav-733444365",
//    "creationdate": 1451714400000,
//    "updatedate": 1457071200000,
//    "completiondate": 1459832400000
//  },
//  {
//    "id": "36",
//    "completed": 0,
//    "location": null,
//    "modelname": "Gaurav-733443043",
//    "creationdate": 1456984800000,
//    "updatedate": null,
//    "completiondate": null
//  }
//];
    $scope.patientId = appDataService.getPatientId();
    $scope.firstName = appDataService.getUserName();
    //$scope.interviewLocation = appDataService.getInterviewLocation();
    $scope.newButtonClick = function () {
        appDataService.saveApplicationState('/intro_sessionId');
        $location.path('/intro_sessionId');
    };
    
    $scope.yesButtonClick = function () {
    $scope.generateModelList();   
        //appDataService.saveApplicationState('/intro_sessionId');
        //$location.path('/intro_sessionId');
    }; 
    $scope.noButtonClick = function () {
        appDataService.saveApplicationState('/intro_sessionId');
        $location.path('/intro_sessionId');
    };
    
    $scope.selectButtonClick = function(modelId) {
    console.log("Model Id received:"+modelId);
       dataFactory.getModelJSON(modelId).then(
        function(data){
            console.log("Model result received:"+data);
            $scope.modelJSON = data;
            sessionStorage.setItem('applicationState', JSON.stringify($scope.modelJSON));
            $location.path($scope.modelJSON.currentScreen);
        }); 
    };
    
    $scope.buttonClick = function (selModelId) {
        if(selModelId == -1)
        {
        //appDataService.saveApplicationState('/intro_sessionId');
        $location.path('/intro_sessionId');
        }
        else
        {
        
        }
    };
}]);

app.controller('intro_sessionIdCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.firstName = appDataService.getUserName();
    $scope.interviewLocation = "";
    $scope.sessionId = appDataService.getUserName()+(new Date() | 'yyyy-MM-dd');
    appDataService.setModelName($scope.sessionId);
    $scope.nextButtonClick = function () {
        appDataService.setInterviewLocation($scope.interviewLocation);
        appDataService.saveApplicationState('/intro_genderAge');
        $location.path('/intro_genderAge');
    };

}]);

app.controller('intro_genderAgeCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.firstName = appDataService.getUserName();
    $scope.interviewLocation = appDataService.getInterviewLocation();
    $scope.nextButtonClick = function () {
        appDataService.setGender($scope.gender);
        appDataService.setAge($scope.age);
        appDataService.saveApplicationState('/n1_relation_selectRel');
        $location.path('/n1_relation_selectRel');
    };
}]);

app.controller('n1_relation_selectRelCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.firstName = appDataService.getUserName();
    $scope.relationships = appDataService.getRelationships();
    $scope.interviewLocation = appDataService.getInterviewLocation();
    $scope.currentRelationshipSet = appDataService.getCurrentRelationshipSet();
    $scope.yesButtonClick = function () {
        appDataService.incrementUsedRelationships();
        appDataService.saveApplicationState('/n2_poles_entry');
        $location.path('/n2_poles_entry');
    };
    $scope.noButtonClick = function () {
        var temp = appDataService.getNextRelationshipSet();
        var maxRelationships = appDataService.getMaxRelationships();
        if(temp > maxRelationships)
        {
            appDataService.setErrorMessage("Maximum relationships exceeded.");
            appDataService.saveApplicationState('/common_error');
            $location.path('/common_error');
            return;
        }
        appDataService.saveApplicationState('/n1_relation_nextRel1');
        $location.path('/n1_relation_nextRel1');
    };
}]);

app.controller('n1_relation_nextRel1Cntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.relationships = appDataService.getRelationships();
    $scope.currentRelationshipSet = appDataService.getCurrentRelationshipSet();
    $scope.yesButtonClick = function () {
        appDataService.incrementUsedRelationships();
        appDataService.saveApplicationState('/n2_poles_entry');
        $location.path('/n2_poles_entry');
    };
    $scope.noButtonClick = function () {
        var temp = appDataService.getNextRelationshipSet();
        var maxRelationships = appDataService.getMaxRelationships();
        if(temp > maxRelationships)
        {
            appDataService.setErrorMessage("Maximum relationships exceeded.");
            appDataService.saveApplicationState('/common_error');
            $location.path('/common_error');
            return;
        }
        appDataService.saveApplicationState('/n1_relation_nextRel2');
        $location.path('/n1_relation_nextRel2');
    };
}]);

app.controller('n1_relation_nextRel2Cntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.relationships = appDataService.getRelationships();
    $scope.currentRelationshipSet = appDataService.getCurrentRelationshipSet();
    $scope.yesButtonClick = function () {
        appDataService.incrementUsedRelationships();
        appDataService.saveApplicationState('/n2_poles_entry');
        $location.path('/n2_poles_entry');
    };
    $scope.noButtonClick = function () {
        var temp = appDataService.getNextRelationshipSet();
        var maxRelationships = appDataService.getMaxRelationships();
//        console.log('Temp: '+temp+' Max: '+maxRelationships);
        if(temp > maxRelationships)
        {   
            appDataService.setErrorMessage("Maximum relationships exceeded.");
            appDataService.saveApplicationState('/common_error');
            $location.path('/common_error');
            return;
        }
        appDataService.saveApplicationState('/n1_relation_nextRel1');
        $location.path('/n1_relation_nextRel1');
    };
}]);

app.controller('n1_relation_removeRelCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.firstName = appDataService.getUserName();
    $scope.relationships = appDataService.getRelationships();
    $scope.interviewLocation = appDataService.getInterviewLocation();
    $scope.nextButtonClick = function () {
        //appDataService.setAcceptedRelationships();
        appDataService.saveApplicationState('/n2_poles_entry');
        $location.path('/n2_poles_entry');
    };
    $scope.removeRelationship = function (index) {
        $scope.relationships.splice(index, 1);
    };
}]);

app.controller('n2_poles_entryCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.relationships = appDataService.getRelationships();
    $scope.currentRelationshipSet = appDataService.getCurrentRelationshipSet();
    $scope.interviewLocation="Here";
    $scope.attributeSet = appDataService.getAttributeSet();
    $scope.yesButtonClick = function () {
        $scope.newSetId = appDataService.newAttributeSet();
        appDataService.saveApplicationState('/n2_pole1');
        $location.path('/n2_pole1');
    };
    $scope.noButtonClick = function () {
        appDataService.saveApplicationState('/n1_relation_selectRel');
        $location.path('/n1_relation_selectRel');
    };
}]);

app.controller('n2_pole1Cntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.attributeSet = appDataService.getAttributeSet();
    $scope.nextButtonClick = function () {
        appDataService.addAttribute(appDataService.getAttributeSetNum(), $scope.poleName, 40);
        $scope.attributeSet = appDataService.getAttributeSet();
        appDataService.saveApplicationState('/n2_pole2');
        $location.path('/n2_pole2');      
    };
}]);

app.controller('n2_pole2Cntrl', ['$scope', '$location','appDataService','filterFilter',function($scope, $location,appDataService,filterFilter) {
    appDataService.loadApplicationState();
    $scope.attributeSet = appDataService.getAttributeSet();
    $scope.attributeSetNum = appDataService.getAttributeSetNum();
    $scope.otherPole = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 40}, true);
    $scope.nextButtonClick = function () {
        appDataService.addAttribute(appDataService.getAttributeSetNum(), $scope.poleName, 60);
        $scope.attributeSet = appDataService.getAttributeSet();
        appDataService.saveApplicationState('/n2_pole1_other');
        $location.path('/n2_pole1_other');      
    };
}]);

app.controller('n2_pole1_otherCntrl', ['$scope', '$location','appDataService','filterFilter',function($scope, $location,appDataService,filterFilter) {
    appDataService.loadApplicationState();
    $scope.attributeSet = appDataService.getAttributeSet();
    $scope.attributeSetNum = appDataService.getAttributeSetNum();
    $scope.pole1 = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 40}, true);
    $scope.pole2 = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 60}, true);
    $scope.yesButtonClick = function () {
        appDataService.addAttribute(appDataService.getAttributeSetNum(), $scope.poleName, 30);
        $scope.attributeSet = appDataService.getAttributeSet();
        appDataService.saveApplicationState('/n2_pole2_other');
        $location.path('/n2_pole2_other');      
    };
    $scope.noButtonClick = function () {
        appDataService.saveApplicationState('/n2_pole2_other');
        $location.path('/n2_pole2_other');      
    };
}]);

app.controller('n2_pole2_otherCntrl', ['$scope', '$location','appDataService','filterFilter',function($scope, $location,appDataService,filterFilter) {
    appDataService.loadApplicationState();
    $scope.attributeSet = appDataService.getAttributeSet();
    $scope.attributeSetNum = appDataService.getAttributeSetNum();
    $scope.pole1 = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 40}, true);
    $scope.pole2 = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 60}, true);
    $scope.pole1_other = 
        filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 30}, true);
    $scope.yesButtonClick = function () {
        appDataService.addAttribute(appDataService.getAttributeSetNum(), $scope.poleName, 70);
        $scope.attributeSet = appDataService.getAttributeSet();
        appDataService.saveApplicationState('/n2_between');
        $location.path('/n2_between');      
    };
    $scope.noButtonClick = function () {
        appDataService.saveApplicationState('/n2_between');
        $location.path('/n2_between');      
    };
}]);

app.controller('n2_betweenCntrl', ['$scope', '$location','appDataService','filterFilter',function($scope, $location,appDataService,filterFilter) {
    appDataService.loadApplicationState();
    $scope.attributeSet = appDataService.getAttributeSet();
    $scope.attributeSetNum = appDataService.getAttributeSetNum();
    $scope.pole1 = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 40}, true);
    $scope.pole2 = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 60}, true);
    $scope.pole1_other = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 30}, true);
    $scope.pole2_other = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 70}, true);
    $scope.yesButtonClick = function () {
        appDataService.addAttribute(appDataService.getAttributeSetNum(), $scope.poleName, 50);
        $scope.attributeSet = appDataService.getAttributeSet();
        appDataService.saveApplicationState('/n2_reorder');
        $location.path('/n2_reorder');      
    };
    $scope.noButtonClick = function () {
        appDataService.saveApplicationState('/n2_reorder');
        $location.path('/n2_reorder');      
    };
}]);

app.controller('n2_reorderCntrl', ['$scope', '$location','appDataService','filterFilter', '$mdDialog', '$mdMedia',function($scope, $location,appDataService,filterFilter, $mdDialog, $mdMedia) {
    appDataService.loadApplicationState();
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.attributeSet = 
//        [{"setId":1,"title":"Healthy","position":0},{"setId":1,"title":"Unhealthy","position":90},{"setId":1,"title":"Terminally Ill","position":95},{"setId":1,"title":"Fir","position":85},{"setId":1,"title":"Sometimes illxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","position":50}];
    appDataService.getAttributeSet();
    $scope.attributeSetNum = appDataService.getAttributeSetNum();
    $scope.pole1 = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 40}, true);
    $scope.pole2 = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 60}, true);
    $scope.pole1_other = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 30}, true);
    $scope.pole2_other = filterFilter($scope.attributeSet, {setId: appDataService.getAttributeSetNum() , position : 70}, true);
    $scope.yesButtonClick = function () {
        appDataService.setAttributeSet($scope.attributeSet);
        appDataService.saveAttributeSetData();
        appDataService.saveApplicationState('/n2_more');
        $location.path('/n2_more');      
    };
    $scope.noButtonClick = function () {
        //$location.path('/n2_between');      
    };
    $scope.showConfirmDelete = function(ev,index) {
    //var  = 'Would you like to delete the "'+$scope.attributeSet[index].title+'" label?';
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Delete label?')
          .textContent('Would you like to delete the "'+$scope.attributeSet[index].title+'" label? It cannot be undone.')
          .ariaLabel('Delete label')
          .targetEvent(ev)
          .ok('Yes, remove it.')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() { //Accept action
    $scope.attributeSet.splice(index, 1);
    appDataService.setAttributeSetNum(attributeSet);
    $scope.status = 'You decided to delete an item.';
    }
    , function() { //Cancel action
      $scope.status = 'You decided to cancel.';
    });
  };
    $scope.showPrompt = function(ev,index) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('Rename label')
      .textContent('What would you rename "'+$scope.attributeSet[index].title+'" to?')
      .placeholder('New label')
      //.initialValue('Hi')
      .ariaLabel('New label')
      .targetEvent(ev)
      .ok('Okay, rename it.')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function(result) {
    var temp = $scope.attributeSet[index];
    temp.title = result;
    $scope.attributeSet.splice(index, 1, temp);
    $scope.status = 'You decided to rename an item.';
    }, function() {
      $scope.status = 'You didn\'t rename an item.';
    });
  };
    $scope.showAddLabel = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('Add new label')
      .textContent('How would you describe this health state?')
      .placeholder('New label')
      //.initialValue('Hi')
      .ariaLabel('New label')
      .targetEvent(ev)
      .ok('Okay, add it.')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function(result) {
    var currentSetId = $scope.attributeSet[0].setId;
    $scope.attributeSet.push({setId: currentSetId , title: result, position: 80});
    $scope.status = 'You decided to rename an item.';
    }, function() {
      $scope.status = 'You didn\'t rename an item.';
    });
  };
}]);

app.controller('n2_moreCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.relationships = appDataService.getRelationships();
    $scope.currentRelationshipSet = appDataService.getCurrentRelationshipSet();
    $scope.attributeSet = 
//        [{"setId":1,"title":"Healthy","position":0},{"setId":1,"title":"Unhealthy","position":90},{"setId":1,"title":"Terminally Ill","position":95},{"setId":1,"title":"Fir","position":85},{"setId":1,"title":"Sometimes illxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","position":50}];
    appDataService.getAttributeSet();
    appDataService.setAttributeSet($scope.attributeSet);
    $scope.attributeSetData = appDataService.getAttributeSetData();
    $scope.yesButtonClick = function () {
        $scope.newSetId = appDataService.newAttributeSet();
        appDataService.saveApplicationState('/n2_pole1');
        $location.path('/n2_pole1');
    };
    $scope.noButtonClick = function () {
        
        var temp = appDataService.getNextRelationshipSet();
        
        // If all relationships exhausted, go to standard gamble
        var maxRelationships = appDataService.getMaxRelationships();
        if(temp > maxRelationships)
        {   
            //Go to next Standard Gamble
//            appDataService.setErrorMessage("Go to standard gamble.");
//            appDataService.saveApplicationState('/common_error');
//            $location.path('/common_error');
            //Go to next Standard Gamble
            appDataService.saveApplicationState('/n3_stdGamble_entry');
            $location.path('/n3_stdGamble_entry')
            return;
        }
        
        // If cycle completed for at least 3 relationships, go to next exercise, Standard Gamble else check for new relationships
        var usedRelationships = appDataService.getUsedRelationships();
//        console.log('Used relationship sets:'+ usedRelationships);
        if (usedRelationships > 2)
        {
            //Go to next Standard Gamble
            appDataService.saveApplicationState('/n3_stdGamble_entry');
            $location.path('/n3_stdGamble_entry');
            return;
        }
        appDataService.saveApplicationState('/n2_more_newRel');
        $location.path('/n2_more_newRel');
    };
}]);

app.controller('n2_more_newRelCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.messageSet = ['Okay, we will leave that set of people behind and consider a new set.','Okay, how about a new set of relationships', 'How about this one then?', 'Not that too? Okay here is another one'];
    $scope.messageSetId = 0;
    $scope.message = $scope.messageSet[$scope.messageSetId];
    $scope.relationships = appDataService.getRelationships();
    $scope.currentRelationshipSet = appDataService.getCurrentRelationshipSet();
    $scope.yesButtonClick = function () {
        appDataService.incrementUsedRelationships();
        $scope.newSetId = appDataService.newAttributeSet();
        appDataService.saveApplicationState('/n2_pole1');
        $location.path('/n2_pole1');
    };
    $scope.noButtonClick = function () {
        
        var temp = appDataService.getNextRelationshipSet();
        
        // If all relationships exhausted, go to standard gamble
        var maxRelationships = appDataService.getMaxRelationships();
        if(temp > maxRelationships)
        {   
            //Go to next Standard Gamble
            //appDataService.setErrorMessage("Go to standard gamble.");
            appDataService.saveApplicationState('/n3_stdGamble_entry');
            $location.path('/n3_stdGamble_entry');
            return;
        }
        
        $scope.relationships = appDataService.getRelationships();
        $scope.currentRelationshipSet = appDataService.getCurrentRelationshipSet();
        
        $scope.messageSetId = $scope.messageSetId + 1;
        if ($scope.messageSetId > 3)
        {
           $scope.messageSetId = 0; 
        }
        $scope.message = $scope.messageSet[$scope.messageSetId];
//        $location.path('/n2_more_newRel);
    };
}]);

app.controller('n3_stdGamble_entryCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    appDataService.setPoleRelativeWeight();
    
    $scope.attributeSetData = appDataService.getAttributeSetData();
    
    appDataService.nextItemStandardGamble();
    $scope.pole1 = appDataService.getPole1();
    $scope.pole2 = appDataService.getPole2();
    $scope.currentLabel =appDataService.getCurrentLabel();
    $scope.currentDimensionList = appDataService.getCurrentDimensionList();
    
    var high1 = appDataService.calculateStandardGamble(1);
    
    $scope.currentHigh = high1;
    
    $scope.message = "Would you accept a potion which has a "
                    + high1 + " per cent chance of making you "+$scope.pole1+", and a " + (100 - high1) + " per cent probability of making you a "+$scope.pole2+" ?";
    $scope.messageNewLoop = "";
    
    
    
    
    // Bar graph display logic//
    $scope.graphptA = 100;
    $scope.graphptB = 100;
    $scope.graphptC = 100;
    $scope.graphptD = 0;
    $scope.graphptE = 0;
    $scope.graphptF = 0;
    
    $scope.prevInput = 1;
     
    $scope.rearrangeGraphPoints = function (input) {
        if(input == $scope.prevInput)
        {
            if(input == 1)
            {
            
                if($scope.currentHigh < $scope.graphptB)
                {
                // Point B shifts
                $scope.graphptB = $scope.currentHigh;
                // Point C, gray are moves too
                $scope.graphptC = $scope.graphptB;
                }
            }
            if(input == 0)
            {
                if($scope.currentHigh > $scope.graphptE)
                {
                //Point E shifts
                $scope.graphptE = $scope.currentHigh;
                //Point D, gray moves too
                $scope.graphptD = $scope.graphptE;
                }
            }
            
        }
        
        if(input != $scope.prevInput)
        {
            if(input == 0)
            {   
                if($scope.currentHigh > $scope.graphptE)
                {
                //Point E shifts
                $scope.graphptE = $scope.currentHigh;
                //Point D, gray moves too
                $scope.graphptD = $scope.graphptE;
                }
            }
            if(input == 1)
            {
                if($scope.currentHigh < $scope.graphptB)
                {
                // Point B shifts
                $scope.graphptB = $scope.currentHigh;
                // Point C, gray are moves too
                $scope.graphptC = $scope.graphptB;
                }
            }
        }
        
        if(input == 99) //reset graph
        {
        $scope.graphptA = 100;
        $scope.graphptB = 100;
        $scope.graphptC = 100;
        $scope.graphptD = 0;
        $scope.graphptE = 0;
        $scope.graphptF = 0;
    
        $scope.prevInput = 1;
        }
        else
        {
            $scope.prevInput = input;
        }
        
        
        console.log('Value: '+$scope.currentHigh+'| A:'+$scope.graphptA+'| B:'+$scope.graphptB+'| C:'+$scope.graphptC+'| D:'+$scope.graphptD+'| E:'+$scope.graphptE+'| F:'+$scope.graphptF);
        
//        $scope.prevInput = input;
        
        var green_region = $scope.graphptA - $scope.graphptB;
        var gray_top_region = $scope.graphptB - $scope.graphptC;
        var white_region = $scope.graphptC - $scope.graphptD;
        var gray_bottom_region = $scope.graphptD - $scope.graphptE;
        var red_region = $scope.graphptE - $scope.graphptF;
        
        var data = google.visualization.arrayToDataTable([
        ['Choice', 'Will not take', 'Unsure', 'Yet to determine', 'Unsure','Will Accept', { role: 'annotation' } ],
        ['', red_region, gray_bottom_region, white_region, gray_top_region, green_region,'']
        ]);

      var options= {
          isStacked: 'true',
          height: 400,
          width:75,
          legend:'none',
          colors: ['#800000', '#d9d9d9', '#e8e8e8', '#d9d9d9', '#004d00'],
          backgroundColor: "transparent",
          vAxis: {
            minValue: 0,
            maxValue:100,
            ticks: [0, 10, 20, 30, 40, 50, 60,70,80,90,100]
          }
        };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    };
    
    ////////////////////////////
    
    // User input actions//
    $scope.yesButtonClick = function () {
        
        var high = appDataService.calculateStandardGamble(1);
            
        if (high < 0)
        {
        appDataService.setRelativeWeight(high); // Save value
        
        
        appDataService.resetStandardGamble();
        appDataService.saveApplicationState('/n4_timeTradeOff_sort');
        appDataService.nextItemStandardGamble();
        
        //Check end of lists
        var errorFlag = appDataService.getErrorFlag();
        if(errorFlag == 1)
        {
            //Go to time trade off
            appDataService.saveApplicationState('/n4_timeTradeOff_sort');
            $location.path('/n4_timeTradeOff_sort');
            return;
        }
        
        $scope.pole1 = appDataService.getPole1();
        $scope.pole2 = appDataService.getPole2();
        $scope.currentLabel =appDataService.getCurrentLabel();
        $scope.currentDimensionList = appDataService.getCurrentDimensionList();
        high1 = appDataService.calculateStandardGamble(1);
        $scope.currentHigh = high1;
        $scope.generateGraphic(high1);
        $scope.rearrangeGraphPoints(99);
            
        $scope.messageNewLoop = "Very well! Let's consider a new list now.";
        $scope.message = "The probablity value is :" + high+"\n\n"+"Would you accept a potion which has a "
                    + high1 + " per cent chance of making you "+$scope.pole1+", and a " + (100 - high1) + " per cent probability of making you a "+$scope.pole2+" ?";
        
//        appDataService.saveApplicationState('/n3_stdGamble_entry');
        return;
        };
        
        $scope.messageNewLoop = "";
        $scope.message = "Would you accept a potion which has a "
                    + high + " per cent chance of making you "+$scope.pole1+", and a " + (100 - high) + " per cent probability of making you a "+$scope.pole2+" ?";
        
        $scope.generateGraphic(high);
        $scope.rearrangeGraphPoints(1);
        $scope.currentHigh = high;
//        appDataService.saveApplicationState('/n3_stdGamble_entry');
    };
    
    $scope.noButtonClick = function () {
        
        var high = appDataService.calculateStandardGamble(0);
            
        if (high < 0)
        {
        appDataService.setRelativeWeight(high); // Save value
            
        
        appDataService.resetStandardGamble();
        appDataService.saveApplicationState('/n4_timeTradeOff_sort');
        appDataService.nextItemStandardGamble();
            
        //Check end of lists
        var errorFlag = appDataService.getErrorFlag();
        if(errorFlag == 1)
        {
            //Go to time trade off
            appDataService.saveApplicationState('/n4_timeTradeOff_sort');
            $location.path('/n4_timeTradeOff_sort');
            return;
        }
            
        $scope.pole1 = appDataService.getPole1();
        $scope.pole2 = appDataService.getPole2();
        $scope.currentLabel =appDataService.getCurrentLabel();
        $scope.currentDimensionList = appDataService.getCurrentDimensionList();
        high1 = appDataService.calculateStandardGamble(1);
        $scope.currentHigh = high1;
        $scope.generateGraphic(high1);
        $scope.rearrangeGraphPoints(99);
        
        $scope.messageNewLoop = "Very well! Let's consider a new list now.";
        $scope.message = "The probablity value is :" + high+"\n\n"+"Would you accept a potion which has a "
                    + high1 + " per cent chance of making you "+$scope.pole1+", and a " + (100 - high1) + " per cent probability of making you a "+$scope.pole2+" ?";
        
//        appDataService.saveApplicationState('/n3_stdGamble_entry');
        return;
        };

        $scope.messageNewLoop = "";
        $scope.message = "Would you accept a potion which has a "
                    + high + " per cent chance of making you "+$scope.pole1+", and a " + (100 - high) + " per cent probability of making you a "+$scope.pole2+" ?";
        $scope.generateGraphic(high);
        $scope.rearrangeGraphPoints(0);
        $scope.currentHigh = high;
//        appDataService.saveApplicationState('/n3_stdGamble_entry');
    };
    
    $scope.cantButtonClick = function () {
        
        var high = appDataService.calculateStandardGamble(2);
            
        if (high < 0)
        {
        appDataService.setRelativeWeight(high); // Save value
            
        
        appDataService.resetStandardGamble();
        appDataService.saveApplicationState('/n4_timeTradeOff_sort');
        appDataService.nextItemStandardGamble();
            
        //Check end of lists
        var errorFlag = appDataService.getErrorFlag();
        if(errorFlag == 1)
        {
            //Go to time trade off
            appDataService.saveApplicationState('/n4_timeTradeOff_sort');
            $location.path('/n4_timeTradeOff_sort');
            return;
        }
            
        $scope.pole1 = appDataService.getPole1();
        $scope.pole2 = appDataService.getPole2();
        $scope.currentLabel =appDataService.getCurrentLabel();
        $scope.currentDimensionList = appDataService.getCurrentDimensionList();
        high1 = appDataService.calculateStandardGamble(1);
        $scope.currentHigh = high1;
        $scope.generateGraphic(high1);
        $scope.rearrangeGraphPoints(99);
        
        $scope.messageNewLoop = "Very well! Let's consider a new list now.";
        $scope.message = "The probablity value is :" + high+"\n\n"+"Would you accept a potion which has a "
                    + high1 + " per cent chance of making you "+$scope.pole1+", and a " + (100 - high1) + " per cent probability of making you a "+$scope.pole2+" ?";
//        appDataService.saveApplicationState('/n3_stdGamble_entry');
        return;
        };

        $scope.messageNewLoop = "";
        $scope.message = "Would you accept a potion which has a "
                    + high + " per cent chance of making you "+$scope.pole1+", and a " + (100 - high) + " per cent probability of making you a "+$scope.pole2+" ?";
        $scope.generateGraphic(high);
        $scope.currentHigh = high;
//        appDataService.saveApplicationState('/n3_stdGamble_entry');
    };
    
    // Per cent graphic genertor //
    
    $scope.listItems = [];
    
    $scope.generateGraphic = function (graphicInput) {
        $scope.listItems = [ 
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0            
        ];
        
        for (var j = 0; j < graphicInput ;)
        {
            var temp = Math.floor((Math.random() * 100) + 1);
            
            if($scope.listItems[temp] == 0)
            {
                $scope.listItems[temp] = 1;
                j = j+1;
            };
            
        };
        
        $scope.rows = [];
        
        var rowSpacer = 1;
        
            for (var i = 0; i < $scope.listItems.length; i++) {
                if (i % 10 == 0) {
                    $scope.rows.push([]);
                    
                    //Spacer: Inserting a space in every alternate row
                    if(rowSpacer < 0)
                    {
                      $scope.rows[$scope.rows.length-1].push(2);  
                    }
                    rowSpacer = rowSpacer * (-1);
                    // End spacer
                    
                }
                $scope.rows[$scope.rows.length-1].push($scope.listItems[i]);
            } 
        
    };
    
    $scope.generateGraphic(75);
    
    ///////////////////////////////
    
    //  Initial Bar Graph display //
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawGraph);

    function drawGraph() {
      var data = google.visualization.arrayToDataTable([
        ['Choice', 'Will not take', 'Unsure', 'Yet to determine', 'Unsure','Will Accept', { role: 'annotation' } ],
        ['', 0, 0, 100, 0, 0,'']
      ]);

      var options= {
          isStacked: 'true',
          height: 400,
          width:75,
          legend:'none',
          colors: ['#800000', '#d9d9d9', '#e8e8e8', '#d9d9d9', '#004d00'],
          backgroundColor: "transparent",
          vAxis: {
            minValue: 0,
            //maxValue:100,
            ticks: [0, 10, 20, 30, 40, 50, 60,70,80,90,100]
          }
        };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }

}]);

app.controller('n4_timeTradeOff_sortCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    appDataService.setUpTimeTradeOffArray();
    $scope.timeTradeOffList = appDataService.getTimeTradeOffList();
    $scope.proceedButtonClick = function () {
        appDataService.setSortedTimeTradeOffArray($scope.timeTradeOffList);
        $scope.timeTradeOffList = appDataService.getTimeTradeOffList();
        appDataService.saveApplicationState('/n4_timeTradeOff_sanityCheck');
        $location.path('/n4_timeTradeOff_sanityCheck');
    };
}]);

app.controller('n4_timeTradeOff_sanityCheckCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.timeTradeOffList = 
//        [{"position":1,"setId":3,"pole1":"No diabetes","pole2":"Severe diabetes","yearsTaken":0,"yearsAvailable":0,"coefficient":0},{"position":2,"setId":2,"pole1":"Good Heart","pole2":"Problematic heart","yearsTaken":0,"yearsAvailable":0,"coefficient":0},{"position":3,"setId":1,"pole1":"Athlete","pole2":"Couch potato","yearsTaken":0,"yearsAvailable":0,"coefficient":0}];
    appDataService.getTimeTradeOffList();
    $scope.workingList = []; //List with appropirate levels in the healt states
    $scope.generateWorkingList = function(){
      for(var i = 0 ; i < $scope.timeTradeOffList.length; i++)
        {
            if($scope.timeTradeOffList[i].position == 0)
            {
                $scope.workingList.push({title:$scope.timeTradeOffList[i].pole1,bold_flag:1});
            }
            else
            {
                $scope.workingList.push({title:$scope.timeTradeOffList[i].pole2,bold_flag:0});
            }
        }
    };
    
    $scope.styleFunction= function(value){
    return value == 1 ? {"font-weight": "bold"} : {}
    }
    
    $scope.generateWorkingList();
    
    $scope.yesButtonClick = function () {
            appDataService.setErrorMessage("Worse than death!");
        appDataService.saveApplicationState('/common_error');
            $location.path('/common_error');
            return;
    };
    $scope.noButtonClick = function () {
//        appDataService.setSortedTimeTradeOffArray($scope.timeTradeOffList);
//        $scope.timeTradeOffList = appDataService.getTimeTradeOffList();
        appDataService.saveApplicationState('/n4_timeTradeOff_q1_noLoss');
        $location.path('/n4_timeTradeOff_q1_noLoss');
    };
}]);

app.controller('n4_timeTradeOff_q1_noLossCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.applicationState = 1;
    //State 1: No side effect
    //State 2: No / Cant decide on State 1, with side effects, check if both are same
    //State 3: No on State 1, if yes, ask if will still take it if life shorteded.

    $scope.timeTradeOffList = 
//        [{"position":1,"setId":3,"pole1":"No diabetes","pole2":"Severe diabetes","yearsTaken":0,"yearsAvailable":0,"coefficient":0},{"position":2,"setId":2,"pole1":"Good Heart","pole2":"Problematic heart","yearsTaken":0,"yearsAvailable":0,"coefficient":0},{"position":3,"setId":1,"pole1":"Athlete","pole2":"Couch potato","yearsTaken":0,"yearsAvailable":0,"coefficient":0}];
    appDataService.getTimeTradeOffList();
    
    $scope.currentTimeTradeOffList = 
//        1;
        appDataService.getCurrentTimeTradeOffList();
    
    $scope.workingListS1 = []; //List with appropirate levels in the health states s1
    $scope.workingListS2 = []; //List with appropirate levels in the health states s2
    
    $scope.currentLabelPole1 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole1;
    $scope.currentLabelPole2 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole2;
    
    
    $scope.generateWorkingListS1 = function(){
      for(var i = 0 ; i < $scope.timeTradeOffList.length; i++)
    {
            if($scope.timeTradeOffList[i].position == 0)
            {
                $scope.workingListS1.push({title:$scope.timeTradeOffList[i].pole1,bold_flag:1});
            }
            else
            {
                $scope.workingListS1.push({title:$scope.timeTradeOffList[i].pole2,bold_flag:0});
            }
    }
    };
    
    $scope.generateWorkingListS2 = function(){
      for(var i = 0 ; i < $scope.timeTradeOffList.length; i++)
    {
            if(i == $scope.currentTimeTradeOffList)
            {
                $scope.workingListS2.push({title:$scope.timeTradeOffList[i].pole1,bold_flag:1});
            }
            else
            {
                $scope.workingListS2.push({title:$scope.timeTradeOffList[i].pole2,bold_flag:0});
            }
        }
    };
    
    $scope.styleFunction= function(value){
    return value == 1 ? {"font-weight": "bold"} : {}
    }
    
    $scope.setInitialValues = function()
    {
    $scope.currentLabelPole1 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole1;
    $scope.currentLabelPole2 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole2;
    $scope.workingListS1 = [];
    $scope.workingListS2 = [];
    $scope.generateWorkingListS1();
    $scope.generateWorkingListS2();
    };
    
    $scope.generateWorkingListS1();
    $scope.generateWorkingListS2();
    
    $scope.yesButtonClick = function () {
        if($scope.applicationState == 1)
        {
        $scope.applicationState = 3;
        return;
        };
        if($scope.applicationState == 2)
        {
        appDataService.setTimeTradeOffEqualImportance($scope.currentTimeTradeOffList);
        $scope.timeTradeOffList = appDataService.getTimeTradeOffList();
        $scope.currentTimeTradeOffList = appDataService.incrementCurrentTimeTradeOffList();
        
        if($scope.currentTimeTradeOffList == -1)
            {
            //appDataService.setErrorMessage("End of interview!");
            //$location.path('/common_error');
            appDataService.saveApplicationState('/n4_timeTradeOff_result');
            $location.path('/n4_timeTradeOff_result');
            return;
            }
        $scope.applicationState = 1;
        $scope.setInitialValues();
        return;
        };
        if($scope.applicationState == 3)
        {   console.log('appDataService.getCurrentTimeTradeOffList(): '+appDataService.getCurrentTimeTradeOffList());
            appDataService.saveApplicationState('/n4_timeTradeOff_q2_age');
            $location.path('/n4_timeTradeOff_q2_age');
        };
    };
    $scope.noButtonClick = function () {
        if($scope.applicationState == 1)
        {
        $scope.applicationState = 2;
        return;
        };
        if($scope.applicationState == 2)
        {
        appDataService.saveApplicationState('/n4_timeTradeOff_sort');
        $location.path('/n4_timeTradeOff_sort');
        return;
        };
        if($scope.applicationState == 3)
        {
        $scope.applicationState = 2;
        return;
        };
    };
    $scope.cantButtonClick = function () {
        if($scope.applicationState == 1)
        {
        $scope.applicationState = 2;
        return;
        };
        if($scope.applicationState == 2)
        {
        $scope.applicationState = 1;
        return;
        };
        if($scope.applicationState == 3)
        {
        $scope.applicationState = 2;
        return;
        };
        
    };
}]);

app.controller('n4_timeTradeOff_q2_ageCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.applicationState = 1;
    
    $scope.timeTradeOffList = 
//        [{"position":1,"setId":3,"pole1":"No diabetes","pole2":"Severe diabetes","yearsTaken":0,"yearsAvailable":0,"coefficient":0},{"position":2,"setId":2,"pole1":"Good Heart","pole2":"Problematic heart","yearsTaken":0,"yearsAvailable":0,"coefficient":0},{"position":3,"setId":1,"pole1":"Athlete","pole2":"Couch potato","yearsTaken":0,"yearsAvailable":0,"coefficient":0}];
//[{"position":0,"setId":2,"pole1":"Good Heart","pole2":"Problematic heart","yearsTaken":0,"yearsAvailable":0,"coefficient":0},{"position":1,"setId":3,"pole1":"No diabetes","pole2":"Severe diabetes","yearsTaken":60,"yearsAvailable":60,"coefficient":0},{"position":2,"setId":1,"pole1":"Athlete","pole2":"Couch potato","yearsTaken":0,"yearsAvailable":0,"coefficient":0}];
    appDataService.getTimeTradeOffList();
    
    $scope.currentTimeTradeOffList = 
//        3;
        appDataService.getCurrentTimeTradeOffList();
    
    $scope.maxAge = appDataService.calculateLifeRemaining();
    $scope.age = $scope.maxAge;
    
    $scope.workingListS1 = []; //List with appropirate levels in the health states s1
    $scope.workingListS2 = []; //List with appropirate levels in the health states s2
    
    $scope.currentLabelPole1 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole1;
    $scope.currentLabelPole2 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole2;
    
    
    $scope.generateWorkingListS1 = function(){
      for(var i = 0 ; i < $scope.timeTradeOffList.length; i++)
    {
            if($scope.timeTradeOffList[i].position == 0)
            {
                $scope.workingListS1.push({title:$scope.timeTradeOffList[i].pole1,bold_flag:1});
            }
            else
            {
                $scope.workingListS1.push({title:$scope.timeTradeOffList[i].pole2,bold_flag:0});
            }
    }
    };
    
    $scope.generateWorkingListS2 = function(){
      for(var i = 0 ; i < $scope.timeTradeOffList.length; i++)
    {
            if(i == $scope.currentTimeTradeOffList)
            {
                $scope.workingListS2.push({title:$scope.timeTradeOffList[i].pole1,bold_flag:1});
            }
            else
            {
                $scope.workingListS2.push({title:$scope.timeTradeOffList[i].pole2,bold_flag:0});
            }
        }
    };
    
    $scope.styleFunction= function(value){
    return value == 1 ? {"font-weight": "bold"} : {}
    };
    
    $scope.setInitialValues = function()
    {
    $scope.currentLabelPole1 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole1;
    $scope.currentLabelPole2 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole2;
    $scope.workingListS1 = [];
    $scope.workingListS2 = [];
    $scope.generateWorkingListS1();
    $scope.generateWorkingListS2();
    };
    
    $scope.generateWorkingListS1();
    $scope.generateWorkingListS2();
    
    $scope.yesButtonClick = function () {
        appDataService.setSelectedLifeTimeTradeOff($scope.age);
        appDataService.saveApplicationState('/n4_timeTradeOff_q3_age_confirm');
        $location.path('/n4_timeTradeOff_q3_age_confirm');
       };
    }]);


app.controller('n4_timeTradeOff_q3_age_confirmCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();    
    $scope.timeTradeOffList = 
//        [{"position":1,"setId":3,"pole1":"No diabetes","pole2":"Severe diabetes","yearsTaken":0,"yearsAvailable":0,"coefficient":0},{"position":2,"setId":2,"pole1":"Good Heart","pole2":"Problematic heart","yearsTaken":0,"yearsAvailable":0,"coefficient":0},{"position":3,"setId":1,"pole1":"Athlete","pole2":"Couch potato","yearsTaken":0,"yearsAvailable":0,"coefficient":0}];
//[{"position":0,"setId":2,"pole1":"Good Heart","pole2":"Problematic heart","yearsTaken":0,"yearsAvailable":0,"coefficient":0},{"position":1,"setId":3,"pole1":"No diabetes","pole2":"Severe diabetes","yearsTaken":60,"yearsAvailable":60,"coefficient":0},{"position":2,"setId":1,"pole1":"Athlete","pole2":"Couch potato","yearsTaken":0,"yearsAvailable":0,"coefficient":0}];
    appDataService.getTimeTradeOffList();
    
    $scope.currentTimeTradeOffList = 
//        1;
        appDataService.getCurrentTimeTradeOffList();
    
    $scope.maxAge = appDataService.calculateLifeRemaining();
    $scope.selectedYears = appDataService.getSelectedLifeTimeTradeOff();
    
    $scope.workingListS1 = []; //List with appropirate levels in the health states s1
    $scope.workingListS2 = []; //List with appropirate levels in the health states s2
    
    $scope.currentLabelPole1 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole1;
    $scope.currentLabelPole2 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole2;
    
    $scope.generateWorkingListS1 = function(){
      for(var i = 0 ; i < $scope.timeTradeOffList.length; i++)
    {
            if($scope.timeTradeOffList[i].position == 0)
            {
                $scope.workingListS1.push({title:$scope.timeTradeOffList[i].pole1,bold_flag:1});
            }
            else
            {
                $scope.workingListS1.push({title:$scope.timeTradeOffList[i].pole2,bold_flag:0});
            }
    }
    };
    
    $scope.generateWorkingListS2 = function(){
      for(var i = 0 ; i < $scope.timeTradeOffList.length; i++)
    {
            if(i == $scope.currentTimeTradeOffList)
            {
                $scope.workingListS2.push({title:$scope.timeTradeOffList[i].pole1,bold_flag:1});
            }
            else
            {
                $scope.workingListS2.push({title:$scope.timeTradeOffList[i].pole2,bold_flag:0});
            }
        }
    };
    
    $scope.styleFunction= function(value){
    return value == 1 ? {"font-weight": "bold"} : {}
    };
    
    $scope.setInitialValues = function()
    {
    $scope.currentLabelPole1 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole1;
    $scope.currentLabelPole2 = $scope.timeTradeOffList[$scope.currentTimeTradeOffList].pole2;
    $scope.workingListS1 = [];
    $scope.workingListS2 = [];
    $scope.generateWorkingListS1();
    $scope.generateWorkingListS2();
    };
    
    $scope.generateWorkingListS1();
    $scope.generateWorkingListS2();
    
    $scope.yesButtonClick = function () {
        appDataService.setTimeTradeOffYears($scope.currentTimeTradeOffList,$scope.selectedYears);
        $scope.timeTradeOffList = appDataService.getTimeTradeOffList();
        $scope.currentTimeTradeOffList = appDataService.incrementCurrentTimeTradeOffList();
        console.log('Next in list:'+ $scope.currentTimeTradeOffList);
        if($scope.currentTimeTradeOffList == -1)
            {
            //appDataService.setErrorMessage("End of interview!");
            $scope.sortedAttributeData = appDataService.prepareFinalList();
            console.log('Here123');
            appDataService.saveApplicationState('/n4_timeTradeOff_result');
            //$location.path('/n4_timeTradeOff_result');
            return;
            };
        appDataService.saveApplicationState('/n4_timeTradeOff_q1_noLoss');
        $location.path('/n4_timeTradeOff_q1_noLoss');
       };
    
    $scope.noButtonClick = function () {
        appDataService.setSelectedLifeTimeTradeOff($scope.maxAge);
        appDataService.saveApplicationState('/n4_timeTradeOff_q2_age');
        $location.path('/n4_timeTradeOff_q2_age');
       };
    }]);

app.controller('n4_timeTradeOff_resultCntrl', ['$scope', '$location','appDataService',function($scope, $location,appDataService) {
    appDataService.loadApplicationState();
    $scope.sortedAttributeData =  appDataService.getSortedAttributeData();
    $scope.styleFunction= function(value){
    return (value%2) == 1 ? {"background-color": "#f2f2f2"} : {"background-color": "#e6e6e6"}
    }
      
}]);
