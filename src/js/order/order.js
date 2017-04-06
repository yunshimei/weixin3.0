angular.module('order',['ui.router', 'ngAnimate'])
  .controller('orderCtrl',['$scope','$http',function ($scope,$http) {
    $scope.state = 2;//菜单状态
    $scope.orderArr=[];//订单列表数据
    $scope.status = '';//订单状态


    //请求订单列表数据
    $http.get('./mock/orderDate.json').success(function (data) {
      $scope.orderArr = data.data.orders;
    });
    //点击查看对应状态的订单
    $scope.switchOrderStatu = function (s) {
      $scope.status = s;
      $http.get('./mock/orderDate.json?status='+s).success(function (data) {
        $scope.orderArr = data.data.orders;
      })
    }
    //订单操作
    $scope.orderOperate = function (id,index,status) {
      $http.get('./mock/orderDate.json?id='+id+'&'+'status='+status).success(function (data) {
        if(data.code==0){
          if(status==1){
            $scope.orderArr[index].status = 5;
          }else if(status==3){
            $scope.orderArr[index].status = 4;
          }
        }
      })
    }
  }])
  .filter('statusFilter',function () {
    return function (data) {
      var out = '';
      switch (data){
        case 1:
          out = '待确认';
          break;
        case 2:
          out = '待发货';
          break;
        case 3:
          out = '待收货';
          break;
        case 4:
          out = '已收货';
          break;
        case 5:
          out = '已取消';
          break;
      }
      return out;
    }
  });
