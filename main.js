

if (Meteor.isServer) {
	Meteor.startup(function() {
		initialize(Categories);
	})
}

function initialize(collection) {
	var categories = ["Academics","Athletics","Maintenance"];
	for(i = 0; i < categories.length; i++ ){
		if (collection.find({name: categories[i]}).count() == 0){
			collection.insert({
				name : categories[i]
			});
		}
	}
}