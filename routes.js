// Main configuration
Router.configure({
    layoutTemplate: 'main'
});

// Define index route
Router.route('/', {
    template: 'index'
});

// POST ROUTES

// Individual
Router.route('/post/:_id', {
  template: 'post',
  waitOn: function() {
        return Meteor.subscribe('posts', this.params._id);
    },
	data: function(){
	    return Posts.findOne(this.params._id);
	}
});