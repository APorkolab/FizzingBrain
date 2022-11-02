// const fsp = require('fs').promises;
// const movie = require('../models/movie');
// const mongoose = require('mongoose');
// const director = require('../models/director');
// const FamilyMember = require('../models/family-member');
// const MainActor = require('../models/main-actor');
// const WatchedMovies = require('../models/watched-movies');
// const familyMember = require('../models/family-member');
// const familyMembersList = require('./familyMembers.json');
// const {
// 	once
// } = require('events');


// // mongoose.connection.dropDatabase();


// const AtlasUploader = async (model, fileName) => {
// 	try {
// 		const exists = await model.find().count();
// 		if (!exists) {
// 			throw new Error();
// 		}
// 	} catch (e) {
// 		const source = await fsp.readFile(
// 			`./src/seed/${fileName}.json`,
// 			'utf8'
// 		);
// 		const list = JSON.parse(source);
// 		if (model && model.insertMany) {
// 			await model.insertMany(list, {
// 				limit: 100
// 			});
// 		}

// 	}
// };

// (async () => {
// 	AtlasUploader(movie, 'plannedMovies');
// 	AtlasUploader(director, 'directors');
// 	AtlasUploader(MainActor, 'mainActors');
// 	AtlasUploader(WatchedMovies, 'watchedMovies');

// 	// Save with 100 items at a time, but no Mongo-bycrypt call has been made. 
// 	// These passwords are not encrypted, 
// 	// hence the password verification of Mongo-bycrypt and the login form does not work.
// 	// AtlasUploader(FamilyMember, 'familyMembers');


// 	// And here is the list of family members with encrypted passwords,
// 	// but the MongoDB Atlas will timeout on 100 insertOne methods fired at once.
// 	// If you are forced to load the data into your own database,
// 	// rather than pushing out the entire JSON all at once, cut it into 4 batches of 25 items.

// 	familyMembersList.forEach(async familyMem => {
// 		const newFamilyMember = new familyMember(familyMem);
// 		await newFamilyMember.save();
// 	})
// 	console.log("Every file has been processed by the seeder!");

// })();