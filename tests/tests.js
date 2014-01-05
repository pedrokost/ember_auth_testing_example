
App.rootElement = '#ember-testing';

App.setupForTesting();

App.injectTestHelpers();

// QUnit.config.autostart = false;

// Em.testing = true;


// QUnit.testStart(function() {
//   // FIXME: this below made it fail every time
//   // Ember.run(function() {
//   //   return App.reset();
//   // });
//   Ember.testing = true;
// });

// QUnit.testDone(function() {
//   Ember.testing = false;
// });

// QUnit.done(function() {
//   return Ember.run(function() {
//     return App.reset();
//   });
// });

// window.setTimeout(function() {
//   return QUnit.start();
// }, 2000);

module('Authentication: visiting restricted page as non authenticated user', {
  setup: function() {
    Ember.run(App, App.advanceReadiness);
  },
  teardown: function() {
    App.reset();
  }
});

test('should redirect to signin page', function() {
  visit('/library');
  return andThen(function() {
    return equal(testing().path(), 'signin', "Should redirect to signin (was " + (testing().path()) + ")");
  });
});

// FIXME: This test still fails every second time 
test("after signin, should redirect user back to previous page", function() {
  expect(2);
  var response_signin, response_user;
  response_signin = {"user_id":2,"auth_token":"wVveiyDLuXBXu69pQ2XQwg"};
  response_user = {"user":{"id":2,"email":"user@example.com","name":"Example user","admin":false,"param":"2-example-user"}};
  $.mockjax({
    type: 'POST',
    url: 'http://localhost:3000/signin',
    responseText: response_signin
  });
  $.mockjax({
    type: 'GET',
    url: 'http://localhost:3000/users/2?auth_token=wVveiyDLuXBXu69pQ2XQwg',
    responseText: response_user
  });
  visit('/library');
  fillIn('.signin-email', 'user@example.com');
  fillIn('.signin-password', 'foobargaz');
  click('.signin-btn');
  andThen(function() {
    equal(testing().path(), "library", "Should redirect back to library (was " + (testing().path()) + ")");
    ok(exists('.signout-btn'), "signout button exists");
  });
});