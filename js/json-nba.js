
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);


function fullDate(day) {
    return `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`;
}

function monthName(day) {
    return day.toLocaleString('default', { month: 'long' });
}

// fullDate(today);

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const urlYesterday = "https://www.balldontlie.io/api/v1/games?seasons[]=2019&dates[]=" + fullDate(yesterday);
const urlToday = "https://www.balldontlie.io/api/v1/games?seasons[]=2019&dates[]=" + fullDate(today);
console.log(urlToday);

const containerYesterday = document.querySelector(".results-table-yesterday");
const containerToday = document.querySelector(".results-table-today");

function getResults(url, container, day) {

    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function() {

        if (this.status == 200) {

            let response = JSON.parse(xhr.responseText);
            console.log(response);

            let htmlString =
                `<thead>
                    <tr>
                        <td class="date" colspan="5">${monthName(day)} ${day.getDate()}, ${day.getFullYear()}</td>
                    </tr>
                </thead>`;

            for (i = 0; i < response.data.length; i++) {

                htmlString +=
                `<tr>
                    <td class="team-name visitor-team-name">${response.data[i].visitor_team.full_name}</td>
                    <td class="score visitor-team-score">${response.data[i].visitor_team_score}</td>
                    <td class="colon">:</td>
                    <td class="score home-team-score">${response.data[i].home_team_score}</td>
                    <td class="team-name home-team-name">${response.data[i].home_team.full_name}</td>
                </tr>`;
                // console.log(response.data[i].home_team.full_name);
            }

            container.innerHTML = htmlString;
        }
    };

    xhr.onerror = function() {

        console.log("Request error...");
    };

    xhr.send();
}

getResults(urlToday, containerToday, today);
getResults(urlYesterday, containerYesterday, yesterday);