function loginController($scope, api) {
  const scope = $scope;
  scope.message = '';
  scope.username = '';
  scope.password = '';
  scope.onLoginClick = () => {
    api.post('/login', {
      phone: scope.username,
      password: scope.password
    }).then((d) => {
      scope.message = d;
      window.location = '/#!/main';
    }).catch((err) => {
      scope.message = err;
    });
  };
}

module.exports = ['$scope', 'api', loginController];
