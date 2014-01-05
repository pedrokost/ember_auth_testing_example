module('Authentication: visiting restricted page as non authenticated user', function() {
  return setup(function() {
    return Em.run(App, App.advanceReadiness);
  });
});

test('should redirect to signin page', function() {
  visit('/library');
  return andThen(function() {
    return equal(testing().path(), 'signin', "Should redirect to signin (was " + (testing().path()) + ")");
  });
});

test("after signin, should redirect user back to previous page", function() {
  var response_signin, response_user;
  response_signin = {
    user_id: 2,
    auth_token: 'wVveiyDLuXBXu69pQ2XQwg'
  };
  response_user = {
    "user": {
      "id": 2,
      "email": "user@example.com",
      "name": "Example user",
      "admin": false,
      "param": "2-example-user"
    }
  };
  $.mockjax({
    type: 'POST',
    url: 'http://localhost:3000/signin',
    responseText: response_signin
  });
  $.mockjax({
    type: 'GET',
    url: 'http://localhost:3000/users/2',
    responseText: response_user
  });
  visit('/library');
  fillIn('.signin-email', 'user@example.com');
  fillIn('.signin-password', 'foobargaz');
  click('.signin-btn');
  stop();
  return Ember.run.later(this, (function() {
    start();
    visit('/library');
    return andThen(function() {
      return equal(testing().path(), "library", "Should redirect back to library (was " + (testing().path()) + ")");
    });
  }), 5000);
});

test("after signin, TEST", function() {
  visit('/library');
  fillIn('.signin-email', 'user@example.com');
  fillIn('.signin-password', 'foobargaz');
  click('.signin-btn');
  return andThen(function() {
    return ok(exists('.menu-signout'), "signout button exists");
  });
});