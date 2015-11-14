// Form for adding a post

Template.post_form.helpers({
	isLogged: function(){
	    return !(Meteor.userId() === null);
	},

	tabs: function() {
	    return Categories.find();
	  }
});

Template.post_form.events({
	"submit .new-post": function (event) {
	    // Prevent default browser form submit
	    event.preventDefault();
	    var text = event.target.text.value;
	    Meteor.call("addPost", text);
	    event.target.text.value = "";
	    console.log("adding post");
	  },
})