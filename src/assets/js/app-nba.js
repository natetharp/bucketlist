import { nba } from "./nba.js";

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
		"<strong>" + totalNumVisited + " of " + totalNum + "</strong> (" + percentVisited + "%) arenas visited.";
};

const cloneTemplate = () => {
	// Get the correct device template
	const template = document.getElementById("template-nba");

	// Clone the template content
	const clone = template.content.cloneNode(true);

	return clone;
};

const addStadiums = (data) => {
	const stadiumsListEl = document.getElementById("list-nba");
	// Add stadiums to the page
	data.forEach(function (stadium) {
		const stadiumTemplate = cloneTemplate();
		const teamName = stadium.team.replaceAll(" ", "-").replaceAll(".", "").toLowerCase();

		// populate the element
		stadiumTemplate.querySelector("h3").innerText = stadium.name;
		stadiumTemplate.querySelector(".location").innerText = stadium.location.city + ", " + stadium.location.state;
		stadiumTemplate.querySelector(".team-logo").src = "../assets/img/nba-team-logos/" + teamName + ".png";
		stadiumTemplate.querySelector(".team-logo").alt = stadium.team + " logo";
		stadiumTemplate.querySelector(".team-logo").title = stadium.team;

		// create the list item element and append it all to the document
		const stadiumsListItem = document.createElement("li");
		stadium.dateVisited ? stadiumsListItem.classList.add("visited") : "";

		stadiumsListItem.appendChild(stadiumTemplate);
		stadiumsListEl.appendChild(stadiumsListItem);
	});
};

addStadiums(nba);
addProgress(nba, document.getElementById("progress-nba"));
