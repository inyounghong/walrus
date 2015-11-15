

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
	var categories = ["academics", "appropriation","city","diversity","elections", "environment", "health", "financial", "technology", "maintenance", "dining", "residential", "outreach"];
	var descriptions = 
		["Deals with projects to improve academic life for the student body.",
		"Deals with requests for SA funding as well as the policies and guidelines regarding the Student Activity Fee and organizations that receive funding.",
		"Deals with student interest at the city and county government levels as well as events that foster a sense of engagement in the Ithaca community for Cornell students.",
		"Deals with ideas, issues and concerns in the area of diversity and inclusion; works on implementable related policies.",
		"Deals with rules and fairness of the fall & spring elections.",
		"Deals with environmental legislation and outreach in order to better inform students and the campus community about the environment and relevant issues.",
		"Deals with initiatives and plan events on campus that promote student health and wellness as well as safety concerns.",
		"Deals with financial aid policies and allocation of the Students Helping Students grant.",
		"Deals with student technology needs on campus.",
		"Deals with an endowment meant to provide financial support to infrastructure projects that improve the undergraduate experience at Cornell.",
		"Deals with the policies, budgets and sustainability initiatives for Dining Services.",
		"Deals with matters of concern in residence halls and the cooperative residences.",
		"Deals with communications between campus and the Student Assembly."]
	for(i = 0; i < categories.length; i++ ){
		if (collection.find({name: categories[i]}).count() == 0){
			collection.insert({
				name : categories[i],
				description: descriptions[i] 
			});
		}
	}
}

