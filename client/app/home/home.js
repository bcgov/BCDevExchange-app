/*
Copyright 2015 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

'use strict';
angular.module('bcdevxApp.home', ['ngRoute'])

.factory('NumbersCountService', ['$resource', function($resource) {
    return $resource('/api/numbers');
}])

.controller('HomeCtrl', ['$scope', '$location', '$anchorScroll', 'NumbersCountService', function($scope, $location, $anchorScroll, NumbersCountService) {
    $scope.numbers = {
        isLoaded: false,
        accounts: '-',
        resources: '-',
        projects: '-',
        analytics: {
            users: '-'
        },
        tweet_count: '-',
        total_stars: '-'
    };

    NumbersCountService.get({}, function(data) {
        $scope.numbers.isLoaded = true;
        $scope.numbers.accounts = data.githubAccounts;
        $scope.numbers.resources = data.resources;
        $scope.numbers.projects = data.projects;
        $scope.numbers.analytics = data.analytics || $scope.numbers.analytics;
        $scope.numbers.tweet_count = data.twitter_bcdev.count;
        $scope.numbers.total_stars = data.bcdevx.stargazers + data.bcgov.stargazers;
    });
}]);
