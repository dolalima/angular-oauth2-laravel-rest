﻿(function () {
    'use strict';

    angular
        .module('sbAdminApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            //$timeout(function () {
            //    var response;
            //    UserService.GetByUsername(username)
            //        .then(function (user) {
            //            if (user !== null && user.password === password) {
            //                response = { success: true };
            //            } else {
            //                response = { success: false, message: 'Username or password is incorrect' };
            //            }
            //            callback(response);
            //        });
            //}, 1000);

            /* Use this for real authentication
             ----------------------------------------------*/
            $http.post('http://api.sisfit.customdevs.com.br/oauth/access_token', {
                username: username,
                password: password,
                client_id:"sisfit-frontend",
                client_secret: "452baf5a724dd60ca4bb7ff95b08bf14",
                grant_type:"password"

            })
                .success(function (response) {
                    callback(response);
                });

        }

        function SetCredentials(username, token) {
            var authdata = token

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = "Bearer "+authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = '';
        }
    }



})();