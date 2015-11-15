

if (Meteor.isServer) {
	Meteor.startup(function() {
		initialize(Categories);
	})
}

if (Meteor.isClient){
	Template.registerHelper('prettyDate', function(date){
		return moment(new Date(date)).format('MMM DD, YYYY');
	});

}

function initialize(collection) {
	var categories = ["academics","athletics","maintenance"];
	for(i = 0; i < categories.length; i++ ){
		if (collection.find({name: categories[i]}).count() == 0){
			collection.insert({
				name : categories[i]
			});
		}
	}
}

