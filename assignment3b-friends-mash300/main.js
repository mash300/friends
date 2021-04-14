(function(){
	
	//Choose an array method to implement for each of the incomplete functions.
	//You MUST only use a combination of MAP, FILTER, and REDUCE array functions in order to accomplish your goal.
	//No use of for loops of any kind or the forEach function is permitted.

	//Remember, you can chain together array function calls to attain your goals.
	// Ex: array.filter().map()

	//Get data for the TV Show "Friends"
	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
	    .then(function(response){
	        return response.json();
	    })
	    .then(function(json){


	        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

	        //1 - Implement the function called getGuntherCount which returns the total number of episodes 
	        // where the character Gunther is mentioned in the episode summary.
	        console.log('--------------------------------');
	        console.log(`Gunther Count: ${getGuntherCount(json)}`);

	        //2 - Implement the function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
	        console.log('--------------------------------');
	        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

	        //3 - Implement the function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
	        console.log('--------------------------------');
	        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, '2000')}`);

	        //4 - Implement the function called getFemaleCastMembers() that returns an array of the names of the female cast members.
	        console.log('--------------------------------');
	        console.log(`Female Cast Members:`);
	        console.log(getFemaleCastMembers(json));

	        //5 - Implement the function called getEpisodeTitles() which returns a list of episodes
	        //    where the argument string is found in the episode summary.
	        console.log('--------------------------------');
	        console.log(`Episodes that mention Ursula:`);
	        console.log(getEpisodeTitles(json, 'Ursula'));

	        //6 - Implement the function called getCastMembersOver55() which returns a list of cast members
	        //    who are currently 55 years of age or older.
	        console.log('--------------------------------');
	        console.log(`Cast Members who are currently 55 or older:`);
	        console.log(getCastMembers55OrOlder(json));

	        //7 - Implement the function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
	        //    runtime minutes for all episodes excluding episodes in season 6
	        console.log('--------------------------------');
	        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
	        //8 - Implement the function called getFirstFourSeasons that gets the episodes for the first four seasons 
	        //    but only return an array of JSON objects containing the season number and episode name
	        console.log('--------------------------------');
	        console.log(`Episode JSON for first four seasons:`)
	        console.log(getFirstFourSeasons(json));

	        //9 - Implement the function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
	        console.log('--------------------------------');
	        console.log(`Tally of episodes by season:`);
	        console.log(getEpisodeTallyBySeason(json)); 

	        //10 - Implement the function called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
	        //the name and summary of the episodes.
	        console.log('--------------------------------');
	        console.log(`Capitalized Friends:`);
	        console.log(capitalizeTheFriends(json));


			// console.log(json._embedded.episodes);  // This drills into the JSON object ==> targets the episodes!!!
			console.log(json);  // This drills into the JSON object ==> targets the episodes!!!

	    })  

	// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
	// (or a combination) ON THE PROVIDED JSON DATA

	// Complete the required ten functions below this line...

		
	function getGuntherCount(json) { // <- you may or may not need to define parameters for your function
		const getGunther = json._embedded.episodes.filter(function(nameIn){

					return nameIn.summary.includes("Gunther");
		})
		// console.log(filter.length);
		return getGunther.length + " episode only - SHAKABOOM!!!";
	}
	


	function getTotalRuntimeMinutes(json) { // <- you may or may not need to define parameters for your function
		const total = json._embedded.episodes.map(function(totalMins) {

					return totalMins.runtime;
		})
		// console.log(total);
		var sum = total.reduce(function(total, minutes){
			return total + minutes
		});
		return sum + " min";
	}
	


	function getTotalEpisodesInYear(json, year) { // <- you may or may not need to define parameters for your function
		const millennium = json._embedded.episodes.filter(function(year){

			// return (year.airdate.includes("2000") && year.airdate > 1);
			return year.airdate.includes("2000");
		})
		return millennium.length + " episodes";
		// console.log(millennium);
		// return `Function not yet implemented`; //remove this line when implementing the function
	}
	


	function getFemaleCastMembers(json) { // <- you may or may not need to define parameters for your function
		// Monica, Rachel, Pheobe, Gina, Alexis, Roberta
		// Rachel, Monica, Pheobe, Alex, Alexis, Roberta, Bobbie Morganstern,
		const theWomen = json._embedded.cast.filter(function(femaleName){
			
			return femaleName.person.gender.includes("Female")
		});
		// console.log(theWomen);

		// Now how the heck can I see only the names within these returns ???   Map the const?
		// This worked, take note of how the a seperate filter was set to a new variable!!!
		const mapped = theWomen.map(function(femaleName){
			return femaleName.person.name + "\n"
		})
		// console.log(mapped);
		let printDangit = mapped.toString().replace(/,/g, "");
		// console.log(printDangit);
		return printDangit;
	}
	
	

	function getEpisodeTitles(json, charName) { // <- you may or may not need to define parameters for your function
		const titles = json._embedded.episodes.filter(function(episodeNames) {

			return episodeNames.name.includes(charName) || episodeNames.summary.includes(charName);
		});
		// console.log(titles);
		const mapped = titles.map(function(episodeNames){
			return ("\"" + episodeNames.name + "\"" + " Season:" + episodeNames.season + " Episode:" + episodeNames.number + "\n")	
		})
		let printOut = mapped.toString();
		// console.log(printOut)
		let noComma = printOut.replace(/,/g, "");

		return noComma;
	}



	function getCastMembers55OrOlder(json) { // <- you may or may not need to define parameters for your function
		// let myBirthday = new Date('10/12/2021');  // My actual birthday
		// let todaysDate = new Date().toJSON().slice;   //Todays date

		// let convertedDate = todaysDate.slice(0,10);   //Todays date
		// console.log(todaysDate);
		let today = new Date().toJSON().slice(0,10).replace(/-/g, '/');
		// console.log(today);
		const geezersAndGeezerettes = json._embedded.cast.map(function(fiftyFiveOrOlder){
				let actorBirthday = fiftyFiveOrOlder.person.birthday; 
				let difference = parseInt(today.substr(0,4)) - parseInt(actorBirthday.substr(0,4));
				// console.log(difference)

				newArr = [];

				if(difference >= 55){
					newArr.push(fiftyFiveOrOlder.person.name)
				} else {
					newArr.push("young");
				}
				return newArr;

		// 	return fiftyFiveOrOlder.person.birthday
		});
		// console.log(geezersAndGeezerettes);
		let newerArray = geezersAndGeezerettes.filter(function(value){
			return value != "young";
		});
		// console.log(newerArray.toString());
		let bigGeezers = newerArray.toString();
		return bigGeezers


	}
	


	function getTotalRuntimeMinutesExcludingSeasonSix(json) { // <- you may or may not need to define parameters for your function

		// ***  A different but better way to narrow down the search to exclude season 6 from the query right from the start ***
		// const allButSeason6 = json._embedded.episodes.filter(function(notSeason6){
		// 	return notSeason6.season !== 6;
		// });
		// // console.log(findSeason6);
		// const mappedNew = allButSeason6.map(function(runtimeMins){
		// 	return runtimeMins.runtime + " Season: " + runtimeMins.season
		// })
		// console.log(mappedNew);
		
		const findSeason6 = json._embedded.episodes.filter(function(notSeason6){
			return notSeason6.season === 6;
		});
		// console.log(findSeason6);
		const mapped = findSeason6.map(function(runtimeMins){
			return runtimeMins.runtime;
		})
		// This is working Hurrah!!!!!
		// console.log(mapped);
		var season6Runtime = mapped.reduce(function(mapped, minutes){
			return mapped + minutes;
		// const mapped = findSeason6.map(function(totalMin){
		// 	return totalMin.runtime;
		})
		// console.log(season6Runtime);
		const total = json._embedded.episodes.map(function(totalMins) {

			return totalMins.runtime;
		})
		// console.log(total);
		var sum = total.reduce(function(total, minutes){
			return total + minutes
		});
		// console.log("Total series runtime excluding season 6: " + (sum - season6Runtime));
		return sum - season6Runtime + " min";
	}
	


	function getFirstFourSeasons(json) { // <- you may or may not need to define parameters for your function
		const findSeasons = json._embedded.episodes.filter(function(firstFour){
			return firstFour.season === 1 || firstFour.season === 2 || firstFour.season === 3 || firstFour.season === 4;
		});
		// console.log(findSeasons);
		const mapped = findSeasons.map(function(firstFour){
			return "Season: " + firstFour.season + " Episode: "+ firstFour.number + " \"" + firstFour.name + "\""; 
		})
		// console.log(mapped);
		return mapped;
	}
	


	function getEpisodeTallyBySeason(json) { // <- you may or may not need to define parameters for your function
	//9 - Implement the function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season   *** create an object with key value pairs : season name and total number of episodes ******
	const result = json._embedded.episodes.reduce(function(tally, episode) {
		const seasonName = episode.season;
		if(tally[episode.season] === undefined)
		{
			tally[episode.season] = 1
		}
		else{
			tally[episode.season] += 1
		}
		// (One Line if/else) if there is no season name, let it be 1 , otherwise add 1 to existing value because it's not "undefined"
		tally[episode.season] === (!tally[seasonName]) ? 1 : tally[seasonName] + 1
		return tally

		//  ?????? How can I get this to return the episode sum from each season and the season number as key value pairs ????
	});
	// console.log(result);
	return result
	// console.log(theTally);
	// return theTally;
	}


	// function getEpisodeTallyBySeason(json) { // <- you may or may not need to define parameters for your function
	// //9 - Implement the function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season   *** create an object with key value pairs : season name and total number of episodes ******
	// const theTally = json._embedded.episodes.reduce(function(getSeasons) {
	// 	// return getSeasons.length

	// 	return {
	// 		season: getSeasons.season,
	// 		episode: getSeasons.number
	// 	}
		
	// 	//  ?????? How can I get this to return the episode sum from each season and the season number as key value pairs ????
	// });
	// // console.log(theTally);
	// return theTally;
	// }
	

	function capitalizeTheFriends(json) { // <- you may or may not need to define parameters for your function
		// let people = ["Joey", "Chandler", "Monica", "Rachel", "Phoebe", "Ross"];
		const friends = json._embedded.cast.filter(function(friendNames){
			return friendNames.character;
		});
		const mapped = friends.map(function(friendNames){
			return friendNames.character.name + "\n"
		})
		let printDangit = mapped.toString().replace(/,/g, "");
		let capitalized = printDangit.toUpperCase();

		return capitalized;


		// return `Function not yet implemented`; //remove this line when implementing the function
		// let names = castMember.character.name.split(" ");
		// 	return  names[0].toUpperCase() + " "+ names[1];

	// console.log(friends);
	// console.log(mapped);

	}


})();
