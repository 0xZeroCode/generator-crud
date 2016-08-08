var app = angular.module('<%= appName %>', [
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'ngMaterial',
    'ngCookies',
    'angular-jwt'
  ])
    .config(['$routeProvider', '$mdThemingProvider', function ($routeProvider, $mdThemingProvider) {

      $routeProvider.otherwise({
        redirectTo: '/'
      });


    }])

    .run(['$rootScope', '$mdSidenav',
      function ($rootScope, $mdSidenav) {

        $rootScope.toggleLeft = function () {
          $mdSidenav('left').toggle();
        };

        $rootScope.closeSideBar = function () {
          $mdSidenav('left').close();
        };

      }
    ])

  ;
