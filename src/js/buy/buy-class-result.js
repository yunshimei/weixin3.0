/**
 * 搜索结果页面.
 */
angular.module('buy.class.result',['ui.router','ngAnimate'])
  .controller('buyClassResult',['$scope','$http','$location',function ($scope,$http,$location) {
    $scope.isShowChosePop = false; //筛选弹框显示状态
    // $scope.type_ids = [].concat($scope.typeIdArr);//需要提交的分类参数
    $scope.type_ids = JSON.parse(JSON.stringify($scope.typeIdArr));//需要提交的分类参数
    $scope.order = [0,false];//排序状态
    $scope.brand_ids=[];//品牌数组
    $scope.xinghaos=[];//型号状态
    $scope.halal = -1;//清真状态
    $scope.brands=[];//品牌数据
    $scope.xinghaoData=[];//型号数据

    //点击筛选按钮
    $scope.filterHandler = function () {
      $scope.isShowChosePop = true;
      $http.get('./mock/filter.json').success(function (data) {
        $scope.brands = data.data.brands;
        $scope.xinghaoData = data.data.xinghaos;
      })
    };
    //筛选下的品牌
    $scope.brandHandler = function (brandId,key) {
      if(brandId==0){
        $scope[key]=[];
      }else{
        var num = $scope[key].indexOf(brandId);
        if(num==-1){
          $scope[key].push(brandId);
        }else{
          $scope[key].splice(num,1);
        }
      }
    };
    //筛选弹出框中的取消按钮
    $scope.closeFilter = function () {
      $scope.isShowChosePop = false;
    }
    // 点击分类页面子分类
    $scope.subClassHandler = function (id) {
      $scope.type_ids[0] = id;
      $http.get('./mock/goodsList.json?type_ids='+$scope.type_ids).success(function (data) {
        $scope.goodsList = data.data.goods;
      })
    }
    //排序
    $scope.orderHandler = function (n) {
      $scope.order[0] = n;
      if(n!=0){
        $scope.order[1] = !($scope.order[1]);
      }
      $http.get('./mock/goodsList.json?order='+$scope.order).success(function (data) {
        $scope.goodsList = data.data.goods;
      })
    }
    //点击商品进入商品详情页面
    $scope.goodsInfoHandler = function (goodsId,routeUrl) {
      $location.path(routeUrl);
      $http.get('./mock/goodsInfo.json?id='+goodsId).success(function (data) {
        $scope.goodsInfo = data.data;
        $scope.goods_picture = $scope.goodsInfo.goods_picture;
      })
    }
    //清真
    $scope.$watch('chose',function () {
      switch ($scope.chose){
        case 'all':
          $scope.halal = -1;
          break;
        case 'yes':
          $scope.halal = true;
          break;
        case 'no':
          $scope.halal = false;
          break;
      }
    })
    //筛选完成按钮
    $scope.finishHandler = function () {
      $scope.isShowChosePop = false;
      var param = {
        search : $scope.keyWords,
        type_ids : $scope.typeIdArr,
        brand_ids : $scope.brand_ids,
        xinghaos : $scope.xinghaos,
        halal : $scope.halal
      };
      var str = JSON.stringify(param);
      $http.post('./mock/goodsList.json',str).success(function (data) {
        $scope.goodsList = data.data.goods;
      })
    }
  }]);