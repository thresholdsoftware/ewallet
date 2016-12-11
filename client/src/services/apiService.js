function api($http) {
  const vm = this;
  const baseUrl = (__DEV__)
    ? '/api'
    : '';
  vm.get = (url, headers) => {
    return $http({
      method: 'GET',
      headers: headers || {},
      url: baseUrl + url
    });
  };
  vm.post = (url, body, headers) => {
    return $http({
      method: 'POST',
      headers: headers || {},
      data: body,
      url: baseUrl + url
    });
  };
}

module.exports = ['$http', api];
