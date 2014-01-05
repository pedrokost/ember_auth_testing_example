if (window.location.search === "?test") {
  document.write(
    '<div id="qunit"></div>' +
    '<div id="qunit-fixture"></div>' +
    '<div id="ember-testing-container">' +
    '  <div id="ember-testing"></div>' +
    '</div>' +
    '<link rel="stylesheet" href="tests/runner.css">' +
    '<link rel="stylesheet" href="tests/vendor/qunit-1.12.0.css">' +
    '<script src="tests/vendor/qunit-1.12.0.js"></script>' +
    '<script src="js/libs/jquery.mockjax.js"></script>' + 
    '<script src="tests/tests.js"></script>'
  )
}

window.exists = function(selector) {
  return !!find(selector).length;
};

window.testing = function() {
  var helper;
  helper = {
    container: function() {
      return App.__container__;
    },
    controller: function(name) {
      return helper.container().lookup('controller:' + name);
    },
    path: function() {
      return helper.controller('application').get('currentPath');
    }
  };
  return helper;
};