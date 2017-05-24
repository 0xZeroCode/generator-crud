angular.module('<%= appName %>.<%= moduleName %>', ['ngRoute', 'ngCookies'])
  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/<%= moduleName %>', {
      templateUrl: '<%= moduleName %>/<%= moduleName %>.html',
      controller: '<%= controllerName %>'
    });

  }])

  .controller('<%= controllerName %>', ['$scope', '$rootScope', '<%= factoryName %>', '$mdDialog',
    function ($scope, $rootScope, <%= factoryName %>, $mdDialog) {




    }])

  .factory('<%= factoryName %>', ['$http', '$rootScope', '$cookies', function ($http, $rootScope, $cookies) {

    var service = {};

    service.createNew<%= moduleUpperName %> = function (<%= moduleName %>) {
      return $http.post('/api/<%= moduleUrlName %>', <%= moduleName %>, getAuthHeaderConfig($cookies.get(tokenKey)));
    };

    service.update<%= moduleUpperName %> = function (id, <%= moduleName %>) {
      var resourceUrl = '/api/<%= moduleUrlName %>/' + id;

      return $http.put(resourceUrl, <%= moduleName %>, getAuthHeaderConfig($cookies.get(tokenKey)));
    };

    service.search<%= moduleUpperName %> = function (searchString) {
      var resourceUrl = '/api/<%= moduleUrlName %>/fullTextSearch/' + searchString;

      return $http.get(resourceUrl, getAuthHeaderConfig($cookies.get(tokenKey)));
    };

    service.get<%= moduleUpperName %>ById = function (id) {
      var resourceUrl = '/api/<%= moduleUrlName %>/' + id;

      return $http.get(resourceUrl, getAuthHeaderConfig($cookies.get(tokenKey)));
    };

    service.get<%= moduleUpperName %>s = function () {
      var resourceUrl = '/api/<%= moduleUrlName %>';

      return $http.get(resourceUrl, getAuthHeaderConfig($cookies.get(tokenKey)));
    };

    service.delete<%= moduleUpperName %> = function (id) {
      var resourceUrl = '/api/<%= moduleUrlName %>/' + id;

      return $http.delete(resourceUrl, getAuthHeaderConfig($cookies.get(tokenKey)));
    };

    return service;

  }]);
