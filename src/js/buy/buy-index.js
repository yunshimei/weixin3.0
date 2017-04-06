angular.module('buy.index',['ui.router','ngAnimate'])
  // .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
  //   $stateProvider.state('buy-index',{
  //     url:'/buy-index',
  //     templateUrl:'./tpl/buy/buy-index/buy-index.html',
  //     controller:'buyIndexCtrl'
  //   })
  // }])
  .controller('buyIndexCtrl',['$scope','$http','$location',function ($scope,$http,$location) {
    $scope.state = 0;//菜单显示状态
    $scope.isShow = true;//搜索状态
    $scope.leftTypeArr = [];//左边分类数据
    $scope.rightTypeArr = [];//右边分类数据
    $scope.keyWords = '';//搜索关键字
    $scope.typeIdArr = [];//被点击的右侧分类ID
    $scope.goodsList = [];//商品列表数据
    //显示当前是否搜索状态
    $scope.searchState = function (bool) {
      $scope.isShow = bool;
    };
    // 获取分类数据
    $http.get('./mock/type.json').success(function (data) {
      $scope.typeData = data.data[1];
      for(var key in $scope.typeData){
        if(typeof $scope.typeData[key]=='object'){
          $scope.leftTypeArr.push($scope.typeData[key]);
        }
      }
      $scope.leftState = $scope.leftTypeArr[0].type_id;
      $scope.rightTypeArr = $scope.typeData[$scope.leftState];
    });
    // 点击左边分类，设置当前分类状态并且获取右边分类数据
    $scope.leftHandler = function (id) {
      $scope.leftState = id;
      $scope.rightTypeArr = $scope.typeData[id];
    };
    // 点击搜索按钮
    $scope.searchHandler = function () {
      $scope.typeIdArr = [];
      $location.path('buy-index/buy-class-result');
      $http.get('./mock/goodsList.json?search='+$scope.keyWords).success(function (data) {
        $scope.goodsList = data.data.goods;
      })
    }
    // 首页点击分类
    $scope.classHandler = function (typeId) {
      $location.path('buy-index/buy-class-result');
      $scope.typeIdArr[0] = typeId;
      $http.get('./mock/goodsList.json?search='+$scope.typeIdArr[0]).success(function (data) {
        $scope.goodsList = data.data.goods;
      })
      $http.get('./mock/filter.json').success(function (data) {
        $scope.subTypeList = data.data.categories;
      })
    }
  }]);
