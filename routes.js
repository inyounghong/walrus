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
Router.route('/:subject', function(){
	var name= 'academic';
	var template= 'tab';
	var waitOn = function() {
		return Meteor.subscribe('categories');
	};
	var posts = Posts.find({category: this.params.subject});
	this.render('tab', {data: {posts: posts}});

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