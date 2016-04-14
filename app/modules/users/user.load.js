'use strict';

angular.module('sbAdminApp').controller('UserTableCtrl',['UserService',function(UserService){
    var vm = this;
    vm.users = [];

    vm.loadUsers =  function loadAllUsers() {
        UserService.GetAll()
            .then(function (users) {
                vm.users = users;
            }).error;
    }

    vm.init = function(){
        vm.loadUsers();
    }

    vm.init();
}]);
angular.module('sbAdminApp').controller('UserFormCtrl',['$stateParams','UserService',function($stateParams,UserService){
    var vm = this;
    vm.loadUser =  function loadUser() {
        UserService.GetById($stateParams.userId)
            .then(function (user) {
                vm.user = user;
            });
    }

    vm.init = function(){
        vm.loadUser();
        console.debug($stateParams);
    }

    vm.init();
}]);

angular.module('sbAdminApp')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider){

    $stateProvider
        .state('users', {
            url: '/users',
            templateUrl: 'views/dashboard/main.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'services/flash.service.js',
                            'services/user.service.js',
                            'services/authentication.service.js'
                        ]
                    })
                }
            }
        })
        .state('users.list', {
            url: '/list',
            templateUrl: 'modules/users/user.table.html',
            controller:'UserTableCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'services/flash.service.js',
                            'services/user.service.js',
                            'services/authentication.service.js'
                        ]
                    })
                }
            }
        })
        .state('users.edit', {
            url: '/:userId',
            templateUrl: 'modules/users/user.form.html',
            controller:'UserFormCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'services/flash.service.js',
                            'services/user.service.js',
                            'services/authentication.service.js'
                        ]
                    })
                }
            }
        })
}]);

