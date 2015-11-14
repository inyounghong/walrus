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
Router.route('/:subject', function(){
	var name= 'academic';
	var template= 'tab';
	var waitOn = function() {
		return Meteor.subscribe('categories');
	};
	var posts = Posts.find({category: this.params.subject});
	this.render('tab'); //{data: {posts: posts}});

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

Router.route('/post/edit/:_id',{
  name: 'edit-post',
  template: 'post_form',
  data: function(){
    return Posts.findOne(this.params._id);
  }
});