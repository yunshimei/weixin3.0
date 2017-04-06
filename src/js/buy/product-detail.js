angular.module('product.detail',['ui.router','ngAnimate']).
  controller('detailCtrl',['$scope',function ($scope) {
    $scope.navSwitch = true;//商品介绍和型号规格切换状态
    $scope.detailSwitch = function (n) {
      switch (n){
        case 0:
          $scope.navSwitch = true;
          break;
        case 1:
          $scope.navSwitch = false;
          break;
      }
    }
    $scope.addCar = function () {
      alert('已添加到购物车');
    }
}]);
