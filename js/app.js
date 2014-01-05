App = Ember.Application.create();

App.Router.map(function() {
  this.resource('books');
  this.route('signin');
  this.route('library');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    return this.transitionTo('library');
  }
});

App.LibraryRoute = Ember.Route.extend({
  authRedirectable: true,
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.BooksRoute = Ember.Route.extend({
  model: function() {
    return ['Book1', 'Book2', 'Book3']
  }
});

DS.RESTAdapter.reopen({
  host: 'http://localhost:3000'
});


App.Auth = Em.Auth.extend({
  request: 'jquery',
  response: 'json',
  strategy: 'token',
  session: 'cookie',
  modules: ['emberData', 'authRedirectable', 'actionRedirectable'],
  signInEndPoint: '/signin',
  signOutEndPoint: '/signout',
  tokenKey: 'auth_token',
  tokenIdKey: 'user_id',
  tokenLocation: 'param',
  emberData: {
    userModel: 'user'
  },
  authRedirectable: {
    route: 'signin'
  },
  actionRedirectable: {
    signInRoute: 'library',
    signOutRoute: 'index'
  }
});

App.Auth.reopen({
  baseUrl: 'http://localhost:3000'
});


App.SigninController = Em.Controller.extend({
  email: null,
  password: null,
  actions: {
    signIn: function() {
      return this.auth.signIn({
        data: {
          email: this.get('email'),
          password: this.get('password')
        }
      });
    }
  }
});

App.SignoutController = Em.Controller.extend({
  actions: {
    signOut: function() {
      return this.auth.signOut();
    }
  }
});

App.User = DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  admin: DS.attr('string'),
  param: DS.attr('string')
});
