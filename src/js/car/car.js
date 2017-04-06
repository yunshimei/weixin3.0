angular.module('car',['ui.router', 'ngAnimate'])
  .controller('carCtrl',['$scope','$http','$location',function ($scope,$http,$location) {
    $scope.state = 1;//菜单状态
    $scope.params = {};//最后提交给后台的数据
    $scope.validGoodsArr=[]; //接收到的有效商品
    $scope.invalidGoodsArr=[]; //接收到的无效商品
    $scope.vaildGoodsLists=[];//操作过的有效商品
    $scope.invalidGoodLists=[];//操作过的无效商品
    $scope.goodsPrice=[];//接收到的价格数据
    $scope.goods=[];//发送给后台的商品ID和数量
    $scope.goods_ids = [];//需要删除的商品ID
    $scope.invalidGoodsIsShow = true;//无效商品全选栏是否显示

    //进入该页面时向服务器请求该页面的购物车列表
    $http.get('./mock/carList.json').success(function (data) {
      $scope.goodsLists = data.data.goods;
      for(var i=0;i<$scope.goodsLists.length;i++){
        if($scope.goodsLists[i].available==true){
          $scope.validGoodsArr.push($scope.goodsLists[i]);
          $scope.vaildGoodsLists.push($scope.goodsLists[i].goods_id);
        }else {
          $scope.invalidGoodsArr.push($scope.goodsLists[i]);
        }
      }
    });
    //进入该页面时向服务器请求总价
    $http.get('./mock/totalPrice.json').success(function (data) {
      $scope.goodsPrice = data.data;
    });
    //选择单个有效商品或无效商品
    $scope.goodsChoseHandeler = function (id,available) {
      if(available=='validGoods'){
        var bool = false;
        for(var i=0;i<$scope.vaildGoodsLists.length;i++){
          if($scope.vaildGoodsLists[i]==id){
            $scope.vaildGoodsLists.splice(i,1);
            bool = true;
            break;
          }
        }
        if(!bool){
          $scope.vaildGoodsLists.push(id);
        }
        //组织向服务器发送的数据
        $scope.goods=[];
        for(var i=0;i<$scope.vaildGoodsLists.length;i++){
          for(var n=0;n<$scope.validGoodsArr.length;n++){
            if($scope.vaildGoodsLists[i] == $scope.validGoodsArr[n].goods_id){
              $scope.goods[i]={
                "goods_id":$scope.validGoodsArr[n].goods_id,
                "buy_num":$scope.validGoodsArr[n].buy_num
              }
            }
          }
        }
        var str = JSON.stringify($scope.goods);
        //把数据发给服务器
        $http.post('./mock/totalPrice.json',str).success(function (data) {
          if(data.code==0){
            $scope.goodsPrice = data.data;
          }
        })
      }else {
        $scope.index = $scope.invalidGoodLists.indexOf(id);
        if($scope.index<0){
          $scope.invalidGoodLists.push(id);
        }else {
          $scope.invalidGoodLists.splice($scope.index,1);
        }
      }
    };
    //有效商品和无效商品的全选
    $scope.allChoseHandler = function (available) {
      if(available=='vaildGoods'){
        if($scope.validGoodsArr.length==$scope.vaildGoodsLists.length){
          $scope.vaildGoodsLists=[];
          $scope.goods=$scope.vaildGoodsLists;
          str = JSON.stringify($scope.goods);
          $http.post('./mock/totalPrice.json',str).success(function (data) {
            if(data.code==0){
              $scope.goodsPrice = data.data;
            }
        })
        }else{
          $scope.vaildGoodsLists=[];
          for(var i=0;i<$scope.validGoodsArr.length;i++){
            $scope.vaildGoodsLists.push($scope.validGoodsArr[i].goods_id);
            $scope.goods[i] = {
              "goods_id":$scope.validGoodsArr[i].goods_id,
              "buy_num":$scope.validGoodsArr[i].buy_num
            }
          }
          str = JSON.stringify($scope.goods);
          $http.post('./mock/totalPrice.json',str).success(function (data) {
            if(data.code==0){
              $scope.goodsPrice = data.data;
            }
          })
        }
      }else{
        if($scope.invalidGoodsArr.length==$scope.invalidGoodLists.length){
          $scope.invalidGoodLists=[];
        }else{
          $scope.invalidGoodLists=[];
          for(var i=0;i<$scope.validGoodsArr.length;i++){
            $scope.invalidGoodLists.push($scope.invalidGoodsArr[i].goods_id);
          }
        }
      }
    };
    //删除选定全部无效商品
    $scope.delAllinvaldGoods = function () {
      //组织需要提交的数据
      // for(var i=0;i<$scope.invalidGoodLists.length;i++){
      //   $scope.goods_ids.push($scope.invalidGoodLists[i]);
      // }
      var goods_ids = JSON.stringify($scope.invalidGoodLists);
      $http.post('./mock/shoppingCartDel.json',goods_ids).success(function (data) {
        if(data.code==0){
          for(var i=0;i<$scope.invalidGoodLists.length;i++){
            for(var n=0;n<$scope.invalidGoodsArr.length;n++){
              if($scope.invalidGoodLists[i]==$scope.invalidGoodsArr[n].goods_id){
                $scope.invalidGoodsArr.splice(n,1);
                continue;
              }
            }
          }
          $scope.invalidGoodLists=[];
          console.log($scope.invalidGoodsArr);
          // $scope.invalidGoodsArr=[];
          // $scope.invalidGoodLists=[];
          // $scope.invalidGoodsIsShow = false;
        }
      })
    };
    //删除单个无效商品
    $scope.delSingleInvaldGoods = function (id) {
      //组织需要提交的数据
      // $scope.goods_ids.push(id);
      var goods_ids = JSON.stringify([id]);
      $http.post('./mock/shoppingCartDel.json',goods_ids).success(function (data) {
        if(data.code==0){
          for(var i=0;i<$scope.invalidGoodsArr.length;i++){
            if($scope.invalidGoodsArr[i].goods_id==id){
              $scope.invalidGoodsArr.splice(i,1);
            }
          }
          var m = $scope.invalidGoodLists.indexOf(id);
          if(m>=0){
            $scope.invalidGoodLists.splice(m,1);
          }
        }
      })
    }
    //跳转到确认订单页面
    $scope.jumpSureOrder = function (routeUrl) {
      // if($scope.vaildGoodsLists.length>0){
        // console.log($scope.vaildGoodsLists);
        $location.path(routeUrl);
      // }
    }
  }]);

