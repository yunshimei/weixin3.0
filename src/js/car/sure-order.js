/**
 * Created by pu-as on 2017/4/4.
 */
angular.module('sure.order',['ui.router', 'ngAnimate'])
  .controller('sureOrderCtrl',['$scope','$http',function ($scope,$http){
    $scope.orderArrs = [];//确认订单页面显示的订单
    $scope.defaltAddr =[];//默认地址
    $scope.payments=[];//支付方式
    $scope.deliver;//配送方式
    // $scope.payMethd='';
    // $scope.selDelivery='';

    //进入页面后显示前一页选中的订单
    for(var i=0;i<$scope.vaildGoodsLists.length;i++){
      for(var n=$scope.validGoodsArr.length-1;n>=0;n--){
        if($scope.vaildGoodsLists[i]==$scope.validGoodsArr[n].goods_id){
          $scope.orderArrs.push($scope.validGoodsArr[n]);
        }
      }
    }
    //请求收货地址
    $http.get('./mock/addrList.json').success(function (data) {
      $scope.defaltAddr=data.data.addresses[0];
    });
    //请求支付方式
    $http.get('./mock/payments.json').success(function (data) {
      if(data.code==0){
        $scope.payments = data.data;
        $scope.payMethd = $scope.payments[0];
      }
    });
    //请求配送方式
    $http.get('./mock/delivery.json').success(function (data) {
      if(data.code==0){
        $scope.deliver = data.data;
        $scope.selDelivery = $scope.deliver["1"];
      }
    });
    //创建订单
    $scope.parmer = {};
    $scope.$watch('payMethd',function () {
      if($scope.payMethd!=undefined){
        $scope.parmer.payment = $scope.payMethd.id;
      }
    });
    $scope.$watch('selDelivery',function () {
      if($scope.selDelivery!=undefined){
        for(var key in $scope.deliver){
          if($scope.deliver[key]==$scope.selDelivery){
            $scope.parmer.delivery = key;
          }
        }
      }
    });
    $scope.createOrder = function () {
      $scope.parmer.address_id = $scope.defaltAddr.id;
      for(var i=0;i<$scope.orderArrs.length;i++){
        $scope.goods[i] = {
          "goods_id" : $scope.orderArrs[i].goods_id,
          "buy_num" :$scope.orderArrs[i].buy_num
        }
      }
      $scope.parmer.goods = $scope.goods;
      var str = JSON.stringify($scope.parmer);
      $http.post('./mock/createOrder.json',str).success(function (data) {
        console.log(data);
      })
    }
  }]);