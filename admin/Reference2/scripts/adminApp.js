'use strict';

var app = angular.module("solomonAdminApp", ["ngRoute","ngMaterial","ng-sortable","angularUtils.directives.dirPagination","ngMessages"]);
    
app.service('appDataService', function($http){
});

app.factory('dataFactory', ['$http','$q', function($http,$q) {
    var dataFactory = {};
    
    return dataFactory;
}]);
                
app.config(function($routeProvider,$mdThemingProvider) {
        $routeProvider
        .when("/banana", {
            template : "<h1>Banana</h1><p>Bananas contain around 75% water.</p>"
        })
//        .when("[#,/]", {
//            controller: 'intro_nameCntrl',
//            templateUrl : "./partials/intro/intro_name.html"
//        })
        .when("/viewHS", {
            controller: 'viewHSCntrl',
            templateUrl : "./partials/viewHS.html"
        })
        .when("/addHS", {
            controller: 'addHSCntrl',
            templateUrl : "./partials/addHS.html"
        })
        .when("/assignHS", {
            controller: 'assignHSCntrl',
            templateUrl : "./partials/assignHS.html"
        })
        .when("/scoreModel", {
            controller: 'scoreModelCntrl',
            templateUrl : "./partials/scoreModel.html"
        })
        .otherwise({
            //controller: 'intro_nameCntrl',
//            templateUrl : "./partials/intro/intro_name.html"
            template : "<h1>Banana</h1><p>Bananas contain around 75% water.</p>"
        });
    });

app.controller('viewHSCntrl', ['$scope', '$location','appDataService','dataFactory',function($scope, $location,appDataService,dataFactory) {
    $scope.healthStateList =
        [
  {
    "id": "1",
    "cancelFlag": 0,
    "category": "",
    "description": "No symptoms at all",
    "version": 0
  },
  {
    "id": "2",
    "cancelFlag": 0,
    "category": "",
    "description": "No significant disability despite some symptoms, e.g., slurred speech, numbness in your face, or reduced strength in an arm or leg, but...Still able to carry out all your previous usual duties and activities",
    "version": 0
  },
  {
    "id": "3",
    "cancelFlag": 0,
    "category": "",
    "description": "Moderate disability requiring some help, but able to walk without assistance",
    "version": 0
  },
  {
    "id": "4",
    "cancelFlag": 0,
    "category": "",
    "description": "Moderate severe disability; unable to walk without assistance and unable to attend to own bodily needs",
    "version": 0
  },
  {
    "id": "5",
    "cancelFlag": 0,
    "category": "",
    "description": "Severe disability; bedridden, incontinent, requiring constant nursing care and attention",
    "version": 0
  }
];
    
    $scope.test = "TEST";
    $scope.searchHS   = '';
    
    $scope.buttonClick = function () {
        
    };
}]);

app.controller('addHSCntrl', ['$scope', '$location','appDataService','dataFactory',function($scope, $location,appDataService,dataFactory) {
    $scope.healthStateList =
        [
  {
    "id": "1",
    "cancelFlag": 0,
    "category": "",
    "description": "No symptoms at all",
    "version": 0
  },
  {
    "id": "2",
    "cancelFlag": 0,
    "category": "",
    "description": "No significant disability despite some symptoms, e.g., slurred speech, numbness in your face, or reduced strength in an arm or leg, but...Still able to carry out all your previous usual duties and activities",
    "version": 0
  },
  {
    "id": "3",
    "cancelFlag": 0,
    "category": "",
    "description": "Moderate disability requiring some help, but able to walk without assistance",
    "version": 0
  },
  {
    "id": "4",
    "cancelFlag": 0,
    "category": "",
    "description": "Moderate severe disability; unable to walk without assistance and unable to attend to own bodily needs",
    "version": 0
  },
  {
    "id": "5",
    "cancelFlag": 0,
    "category": "",
    "description": "Severe disability; bedridden, incontinent, requiring constant nursing care and attention",
    "version": 0
  }
];
    
    $scope.test = "TEST";
    $scope.searchHS   = '';
    
    $scope.buttonClick = function () {
        
    };
    
    

    
    
}]);

app.controller('assignHSCntrl', ['$scope', '$location','appDataService','dataFactory',function($scope, $location,appDataService,dataFactory) {
    
$scope.sortType     = 'lastName'; // set the default sort type
$scope.sortReverse  = false;  // set the default sort order
$scope.searchFish   = '';     // set the default search/filter term
$scope.patientSelectVisible = false;
$scope.showHsSelection = false;
    
    $scope.healthStateList =
    [
  {
    "id": "1",
    "cancelFlag": 0,
    "category": "",
    "description": "No symptoms at all",
    "version": 0
  },
  {
    "id": "2",
    "cancelFlag": 0,
    "category": "",
    "description": "No significant disability despite some symptoms, e.g., slurred speech, numbness in your face, or reduced strength in an arm or leg, but...Still able to carry out all your previous usual duties and activities",
    "version": 0
  },
  {
    "id": "3",
    "cancelFlag": 0,
    "category": "",
    "description": "Moderate disability requiring some help, but able to walk without assistance",
    "version": 0
  },
  {
    "id": "4",
    "cancelFlag": 0,
    "category": "",
    "description": "Moderate severe disability; unable to walk without assistance and unable to attend to own bodily needs",
    "version": 0
  },
  {
    "id": "5",
    "cancelFlag": 0,
    "category": "",
    "description": "Severe disability; bedridden, incontinent, requiring constant nursing care and attention",
    "version": 0
  },
  {
    "id": "6",
    "cancelFlag": 0,
    "category": "",
    "description": "Current state of health as evaluated by the patient himself",
    "version": 0
  }
];
    
    $scope.patientList =
    [
    
        {"id":1,
        "firstName":"John",
        "lastName":"Doe"
        },
        {"id":2,
        "firstName":"John2",
        "lastName":"Doe2"
        },
        {"id":3,
        "firstName":"John3",
        "lastName":"Doe3"
        },
        {"id":4,
        "firstName":"John4",
        "lastName":"Doe4"
        },
        {"id":5,
        "firstName":"John5",
        "lastName":"Doe5"
        },
        {"id":6,
        "firstName":"John6",
        "lastName":"Doe6"
        },
    ];
    
    $scope.selectedPatient = 
    {
        "id":"",
        "firstName":"",
        "lastName":""
    };
    
    $scope.AssignmentList = [];
    
    $scope.generateAssignmentList = function()
    {
        $scope.AssignmentList = [];
        
        for(var i = 0 ; i< $scope.healthStateList.length ; i = i+1)
        {
            var listRow = {};
            listRow.patietId = $scope.selectedPatient.id;
            listRow.hsId = $scope.healthStateList[i].id;
            listRow.hsDescription = $scope.healthStateList[i].description;
            listRow.checkFlag = false;
        
            $scope.AssignmentList.push(listRow);     
        }
    };
    
    $scope.test = "TEST";
    $scope.searchHS   = '';
    
    $scope.selectPatientClick = function (patientId,firstName,lastName) {
//  console.log('Here'); 
    $scope.selectedPatient.id = patientId;
    $scope.selectedPatient.firstName = firstName;
    $scope.selectedPatient.lastName = lastName;
    $scope.patientSelectVisible = false;
    $scope.generateAssignmentList();
    $scope.showHsSelection = true;
//  console.log($scope.AssignmentList);
    };
    
    $scope.buttonClick = function () {
        
    };
}]);

app.controller('scoreModelCntrl', ['$scope', '$location','appDataService','dataFactory',function($scope, $location,appDataService,dataFactory) {

$scope.sortedAttributeData = 
[  
   {  
      "setId":1,
    "coefficient":0.35,
      "title":"Normal blood pressure",
      "position":1,
      "relativeWeight":1
   },
   {  
      "setId":1,
       "coefficient":0.35,
      "title":"Low Blood Pressure",
      "position":2,
      "relativeWeight":0.4
   },
   {  
      "setId":1,
       "coefficient":0.35,
      "title":"High Blood Pressure",
      "position":3,
      "relativeWeight":0.5
   },
   {  
      "setId":1,
       "coefficient":0.35,
      "title":"Very High Blood Pressure",
      "position":99,
      "relativeWeight":0
   },
   {  
      "setId":2,
       "coefficient":0.30,
      "title":"Very Fit",
      "position":1,
      "relativeWeight":1
   },
   {  
      "setId":2,
       "coefficient":0.30,
      "title":"Joint Pain",
      "position":2,
      "relativeWeight":0.47
   },
   {  
      "setId":2,
       "coefficient":0.30,
      "title":"Severe Joint Pain",
      "position":3,
      "relativeWeight":.91
   },
   {  
      "setId":2,
       "coefficient":0.30,
      "title":"Cant walk",
      "position":99,
      "relativeWeight":0
   },
   {  
      "setId":3,
       "coefficient":0.20,
      "title":"No diabetes",
      "position":1,
      "relativeWeight":1
   },
   {  
      "setId":3,
       "coefficient":0.20,
      "title":"Diabetes",
      "position":2,
      "relativeWeight":.43
   },
   {  
      "setId":3,
       "coefficient":0.20,
      "title":"Severe Diabetes",
      "position":99,
      "relativeWeight":0
   },
   {  
      "setId":4,
       "coefficient":0.15,
      "title":"Good heart",
      "position":1,
      "relativeWeight":1
   },
   {  
      "setId":4,
       "coefficient":0.15,
      "title":"Mild heart problems",
      "position":2,
      "relativeWeight":.78
   },
   {  
      "setId":4,
       "coefficient":0.15,
      "title":"Severe heart problems",
      "position":99,
      "relativeWeight":0
   }
];
    
$scope.modelData =
{
  "id": "47",
  "modelname": "Gaurav1099806616",
  "completed": 1,
  "location": "Home",
  "scales": [
    {
      "id": "5",
      "label": "1",
      "relativeWeight": 0.35,
      "oaLevels": [
        {
          "id": "16",
          "label": "Restricted Movement",
          "weight": 0,
          "position": 99
        },
        {
          "id": "26",
          "label": "Active",
          "weight": 0.96,
          "position": 2
        },
        {
          "id": "27",
          "label": "Very Active",
          "weight": 1,
          "position": 1
        },
        {
          "id": "30",
          "label": "Moderately active",
          "weight": 0.85,
          "position": 3
        },
        {
          "id": "31",
          "label": "Lazy",
          "weight": 0.79,
          "position": 4
        }
      ]
    },
    {
      "id": "6",
      "label": "2",
      "relativeWeight": 0.32,
      "oaLevels": [
        {
          "id": "18",
          "label": "Cant walk",
          "weight": 0,
          "position": 99
        },
        {
          "id": "29",
          "label": "Very Fit",
          "weight": 1,
          "position": 1
        },
        {
          "id": "32",
          "label": "Joint pain",
          "weight": 0.73,
          "position": 2
        },
        {
          "id": "33",
          "label": "Severe Joint Pain",
          "weight": 0.69,
          "position": 3
        }
      ]
    },
    {
      "id": "7",
      "label": "3",
      "relativeWeight": 0.33,
      "oaLevels": [
        {
          "id": "24",
          "label": "Always eats junk food",
          "weight": 0,
          "position": 99
        },
        {
          "id": "28",
          "label": "Eats a balanced diet",
          "weight": 1,
          "position": 1
        },
        {
          "id": "34",
          "label": "Eats healthy",
          "weight": 0.6,
          "position": 2
        },
        {
          "id": "35",
          "label": "Occasionally eats junk food",
          "weight": 0.54,
          "position": 3
        }
      ]
    }
  ]
};
    
  
$scope.styleFunction= function(value){
    return (value%2) == 1 ? {"background-color": "#f2f2f2"} : {"background-color": "#32CD32"}
    };

}]);