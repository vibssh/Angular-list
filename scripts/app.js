
var app = angular.module("myApp", []);

// Factory
app.factory('dataFactory', [
    '$http', function ($http) {
        return {
            getData: function (url) {
                return $http.get(url);
            },
            getError: function (error) {
                return 'This error status code to api is ' + ": " + error.status;
            }
        };
    }]);

// Controller
app.controller("listCtrl", [
    '$scope', 'dataFactory', function ($scope, dataFactory) {

        $scope.singleInvitee = []; // adding / removing only 1 item at a time
        $scope.invitees = [];
        $scope.ShowMe = false;

        var endPoint = 'https://api.github.com/users';

        dataFactory.getData(endPoint).then(function (response) {
            $scope.guests = response.data;
        }, function (error) {
            console.log(dataFactory.getError(error));
        });

        //pushing to invitees list
        $scope.addInvities = function ($event, guest, $index) {
            $event.preventDefault();
            if ($scope.invitees.indexOf(guest) === -1) {
                $scope.invitees.push(guest);
            } else {
                alert('you are trying to click the same item again');
            }
            //$scope.ShowMe = true; The logic is put in the view
        };

        //Clear the Array and Add only 1 item to the array
        $scope.addSingleInvitee = function ($event, guest, $index) {
            $event.preventDefault();
            if ($scope.singleInvitee.indexOf(guest) === -1) {
                $scope.singleInvitee = [];
                $scope.singleInvitee.push(guest);
                console.info($index);
            } else {
                alert('you are trying to click the same item again');
            }
        };

        // Removing items from the list on click 
        $scope.removeMe = function($index) {
            $scope.invitees.splice($scope.invitees.indexOf($index), 1);
        }

    }]);
