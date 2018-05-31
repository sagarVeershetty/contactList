var myApp = angular.module('myApp', ['ngRoute'])

//ng-route config
.config(function ($routeProvider, $locationProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'default.html',
    })
    .when('/contact-info/:contact_index', {
      templateUrl: 'contact_info.html',
      controller: 'contactInfoCtrl'
    })
    .when('/add', {
      templateUrl: 'contact_form.html',
      controller: 'addContactCtrl'
    })
    .when('/edit/:contact_index', {
      templateUrl: 'contact_form.html',
      controller: 'editContactCtrl'
    })
    .otherwise({redirectTo: '/home'});
})

// controllers
.controller('navCtrl', function ($scope) {
  $scope.nav = {
    navItems: ['home', 'add'],
    selectedIndex: 0,
    navClick: function ($index) {
      $scope.nav.selectedIndex = $index;
    }
  };
})

.controller('homeCtrl', function ($scope, ContactService){
  $scope.contacts = ContactService.getContacts();

  $scope.removeContact = function (item) {
    var index = $scope.contacts.indexOf(item);
    $scope.contacts.splice(index, 1);
    $scope.removed = 'Contact successfully removed.';
  };

})

.controller('contactInfoCtrl', function ($scope, $routeParams){
  var index = $routeParams.contact_index;
  $scope.currentContact = $scope.contacts[index];
})

.controller('addContactCtrl', function ($scope, $location) {
  //needed to show the correct button on the contact form
  $scope.path = $location.path();

  $scope.addContact = function () {
    var contact = $scope.currentContact;
    contact.id = $scope.contacts.length;
    $scope.contacts.push(contact);
  };

})

.controller('editContactCtrl', function ($scope, $routeParams){
  $scope.index = $routeParams.contact_index;
  $scope.currentContact = $scope.contacts[$scope.index];
})

// directives
.directive('contact', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'contact.html'
  }
})

// services

.factory('ContactService', [function () {
  var factory = {};

  factory.getContacts = function () {
    return contactList;
  }

  // contact list, usually would be a separate database
  var contactList = [
    {id: 0, name: 'Sagar',lastName: 'Auradkar',email :'sagar@gmail.com', phone: '7411348926', status: "active"},
    {id: 0, name: 'Jay', lastName: 'Mehta', email :'jay@gmail.com', phone: '9876543567', status: "inActive"},
    {id: 0, name: 'Amar', lastName: 'Siddi',email :'amar@gmail.com', phone: '8765456787', status: "active"},
    {id: 0, name: 'Sanjay', lastName: 'mishra', email :'sanjay@gmail.com', phone: '7411348926',status: "inActive"},
    {id: 0, name: 'Rahul', lastName: 'Kiran', email :'kiran@gmail.com', phone: '8765678765', status: "inActive"},
    {id: 0,  name: 'Anuj', lastName: 'Gupta',email :'anuj@gmail.com', phone: '8987656654', status: "active"},
    {id: 0, name: 'Rahulraj', lastName: 'Lohagavkar',email :'rahul@gmail.com', phone: '9878780987', status: "inActive"},
    {id: 0, name: 'Vaibhav', lastName: 'Vichare',email :'vaibhav@gmail.com', phone: '7411348926', status: "active"},
  ];

  return factory;
}]);
