// Main configuration
Router.configure({
    layoutTemplate: 'main'
});

// Define index route
Router.route('/', {
    template: 'index'
});

// POST ROUTES

// Add post page
Router.route('/post_form', {
    template: 'post_form'
});

// Individual
Router.route('/:subject', {
	name: 'academic',
	template: 'tab',
	waitOn: function() {
		return Meteor.subscribe('categories');
	},
	data: function() {
		 posts: Posts.find({category: this.params.subject});
	}, 

});

Router.route('/post/:_id', {
  template: 'post',
  waitOn: function() {
        return Meteor.subscribe('posts', this.params._id);
    },
	data: function(){
	    return Posts.findOne(this.params._id);
	}
});