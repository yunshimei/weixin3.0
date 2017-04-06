require('./js/buy/buy-class-result');
require('./js/buy/buy-index');
require('./js/buy/product-detail');
require('./js/car/car');
require('./js/car/sure-order');
require('./js/order/order');
require('./js/footer/footer');
var v = '?v='+Math.random();
angular.module('myApp',[
  'ui.router',
  'ngAnimate',
  'buy.index',
  'buy.class.result',
  'car',
  'order',
  'product.detail',
  'sure.order'
]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/buy-index');
  $stateProvider.state('buy-index',{
    url:'/buy-index',
    templateUrl:'/weixin3.0/build/tpl/buy/buy-index.html'+v,
    controller:'buyIndexCtrl'
  }).state('buy-index.buy-class-result', {
    url:'/buy-class-result',
    templateUrl:'/weixin3.0/build/tpl/buy/buy-class-result.html'+v,
    controller:'buyClassResult'
  }).state('car', {
    url:'/car',
    templateUrl:'/weixin3.0/build/tpl/car/car.html'+v,
    controller:'carCtrl'
  }).state('order', {
    url:'/order',
    templateUrl:'/weixin3.0/build/tpl/order/order.html'+v,
    controller:'orderCtrl'
  }).state('car.sure-order', {
    url:'/sure-order',
    templateUrl:'/weixin3.0/build/tpl/order/sure-order.html'+v,
    controller:'sureOrderCtrl'
  }).state('buy-index.buy-class-result.product-detail', {
    url:'/product-detail',
    templateUrl:'/weixin3.0/build/tpl/buy/product-detail.html'+v,
    controller:'detailCtrl'
  })
}]).controller('parentCtrl',['$scope','$location',function ($scope,$location) {
  $scope.jump = function (routeUrl) {
    $location.path(routeUrl);
  }
}]);
