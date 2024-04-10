import { mlb } from "./mlb.js";

const addProgress = (data, el) => {
	const totalNum = data.length;

	let counter = 0;
	for (const visited of data) {
		if (visited.dateVisited) {
			counter++;
		}
	}

	const totalNumVisited = counter;
	const percentVisited = Math.round((totalNumVisited / totalNum) * 100);

	// Create a new element to display this data
	el.innerHTML =
		"<strong>" + totalNumVisited + " of " + totalNum + "</strong> (" + percentVisited + "%) ballparks visited.";
};

const cloneTemplate = () => {
	// Get the correct device template
	const template = document.getElementById("template-mlb");

	// Clone the template content
	const clone = template.content.cloneNode(true);

	return clone;
};

const addBallparks = (data) => {
	const ballparksListEl = document.getElementById("list-mlb");
	// Add ballparks to the page
	data.forEach(function (ballpark) {
		const ballparkTemplate = cloneTemplate();
		const teamName = ballpark.team.replaceAll(" ", "-").replaceAll(".", "").toLowerCase();

		// populate the element
		ballparkTemplate.querySelector("h3").innerText = ballpark.name;
		ballparkTemplate.querySelector(".location").innerText = ballpark.location.city + ", " + ballpark.location.state;
		ballparkTemplate.querySelector(".team-logo").src = "./assets/img/mlb-team-logos/" + teamName + ".png";
		ballparkTemplate.querySelector(".team-logo").alt = ballpark.team + " logo";
		ballparkTemplate.querySelector(".team-logo").title = ballpark.team;

		// create the list item element and append it all to the document
		const ballparksListItem = document.createElement("li");
		ballpark.dateVisited ? ballparksListItem.classList.add("visited") : "";

		ballparksListItem.appendChild(ballparkTemplate);
		ballparksListEl.appendChild(ballparksListItem);
	});
};

addBallparks(mlb);
addProgress(mlb, document.getElementById("progress-mlb"));
