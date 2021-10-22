const getData = async function() {
    const containerEast = document.querySelector(".standings-table-east");
    const containerWest = document.querySelector(".standings-table-west");
    const url = "https://api.sportsdata.io/v3/nba/scores/json/Standings/2021?key=5a44027feee84914b126350cc82ed893";

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
                    <tr class="date">
                        <td colspan="6">Eastern Conference</td>
                    </tr>
                    <tr class="date">
                        <td>Rank</td>
                        <td>Team</td>
                        <td>Win</td>
                        <td>Loss</td>
                        <td>Percentage</td>
                        <td>Last Ten</td>
                    </tr>
                </thead>`;
            let htmlStringWest = 
                `<thead>
                    <tr class="date">
                        <td colspan="6">Western Conference</td>
                    </tr>
                    <tr class="date">
                        <td>Rank</td>
                        <td>Team</td>
                        <td>Win</td>
                        <td>Loss</td>
                        <td>Percentage</td>
                        <td>Last Ten</td>
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