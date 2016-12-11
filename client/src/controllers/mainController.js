function mainController($scope, $http, api) {
  const scope = $scope;
  scope.message = 'This is a test screen';
  scope.user = {};
  scope.bankaccounts = [];
  api.get('/user').then((d) => {
    scope.user = d.data;
  }).catch((err) => console.log(err));
  api.get('/bank').then((d) => {
    scope.bankaccounts = d.data;
  });
}

module.exports = ['$scope', '$http', 'api', mainController];
