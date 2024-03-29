const today = new Date();
const currentYear = today.getFullYear();
const nextYear = today.getFullYear() + 1;

const getData = async function() {
    const containerEast = document.querySelector(".standings-table-east");
    const containerWest = document.querySelector(".standings-table-west");
    const url = "https://api.sportsdata.io/v3/nba/scores/json/Standings/" + currentYear + "?key=5a44027feee84914b126350cc82ed893";
console.log("next year: "+nextYear);
    try {
        // Send request
        const response = await fetch(url);

        // Handle response if successful
        if (response.ok === true) {
            const jsonResponse = await response.json();

            // Code to execute with jsonResponse
            console.log(jsonResponse);

            jsonResponse.sort((a, b) => parseFloat(b.Percentage) - parseFloat(a.Percentage));

            let htmlStringEast = 
                `<thead>
                    <tr>
                        <td colspan="6" class="date">Eastern Conference</td>
                    </tr>
                    <tr class="date">
                        <td>Rank</td>
                        <td>Team</td>
                        <td>Win</td>
                        <td>Loss</td>
                        <td>Percentage</td>
                        <td class="last-ten">Last Ten</td>
                    </tr>
                </thead>`;
            let htmlStringWest = 
                `<thead>
                    <tr>
                        <td colspan="6" class="date">Western Conference</td>
                    </tr>
                    <tr class="date">
                        <td>Rank</td>
                        <td>Team</td>
                        <td>Win</td>
                        <td>Loss</td>
                        <td>Percentage</td>
                        <td class="last-ten">Last Ten</td>
                    </tr>
                </thead>`;
            let j = 1;
            let k = 1;
            
            for(let i = 0; i < jsonResponse.length; i++) {
                if (jsonResponse[i].Conference === "Eastern") {

                    htmlStringEast +=
                    `<tr class="team-row">
                        <td>${j++}</td>
                        <td class="team-name"><img src="img/${jsonResponse[i].Key}.svg" class="team-logo visitor-team-logo">${jsonResponse[i].City} ${jsonResponse[i].Name}</td>
                        <td>${jsonResponse[i].Wins}</td>
                        <td>${jsonResponse[i].Losses}</td>
                        <td>${jsonResponse[i].Percentage}</td>
                        <td>${jsonResponse[i].LastTenWins} - ${jsonResponse[i].LastTenLosses}</td>
                    </tr>`;
                }
            }

            containerEast.innerHTML = htmlStringEast;
            
            for(let i = 0; i < jsonResponse.length; i++) {
                if (jsonResponse[i].Conference === "Western") {

                    htmlStringWest +=
                    `<tr class="team-row">
                        <td>${k++}</td>
                        <td class="team-name"><img src="img/${jsonResponse[i].Key}.svg" class="team-logo visitor-team-logo">${jsonResponse[i].City} ${jsonResponse[i].Name}</td>
                        <td>${jsonResponse[i].Wins}</td>
                        <td>${jsonResponse[i].Losses}</td>
                        <td>${jsonResponse[i].Percentage}</td>
                        <td>${jsonResponse[i].LastTenWins} - ${jsonResponse[i].LastTenLosses}</td>
                    </tr>`;
                }
            }

            containerWest.innerHTML = htmlStringWest;

    // Handles response if unsuccessful
        } else {            
            
            throw new Error("Request Failed!");
        }
    } catch (error) {
        console.log(error);
    }
}

getData();