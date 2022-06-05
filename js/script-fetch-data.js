
const today = new Date();
const yesterday = new Date(today);
const month = today.getMonth() + 1;
yesterday.setDate(today.getDate() - 1);
const currentYear = today.getFullYear();
let currentSeason;

if (month < 11) {
    currentSeason = currentYear - 1;
} else {
    currentSeason = currentYear;
}

console.log({month});

// const zeroMonth = ('0' + day.getMonth()).slice(-2);
// const zeroDate = ('0' + day.getDate()).slice(-2);

const logoArr = ["ATL.svg", "BOS.svg", "BKN.svg", "CHA.svg", "CHI.svg",
                "CLE.svg", "DAL.svg", "DEN.svg", "DET.svg", "GSW.svg",
                "HOU.svg", "IND.svg", "LAC.svg", "LAL.svg", "MEM.svg",
                "MIA.svg", "MIL.svg", "MIN.svg", "NOP.svg", "NYK.svg",
                "OKC.svg", "ORL.svg", "PHI.svg", "PHX.svg", "POR.svg",
                "SAC.svg", "SAS.svg", "TOR.svg", "UTA.svg", "WAS.svg"];

// 
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

const urlYesterday = "https://www.balldontlie.io/api/v1/games?seasons[]=" + currentSeason + "&dates[]=" + fullDate(yesterday);
const urlToday = "https://www.balldontlie.io/api/v1/games?seasons[]=" + currentSeason + "&dates[]=" + fullDate(today);
console.log(urlToday);
console.log(fullDate(today));


const containerYesterday = document.querySelector(".results-table-yesterday");
const containerToday = document.querySelector(".results-table-today");

const tableToday = document.querySelector("#tableToday");
const tableYesterday = document.querySelector("#tableYesterday");

// let gamesArr = [];

function getArr(arr, data) {
    arr.push(data);
}

function sortArr(arr) {
    arr.sort((a, b) => {
    
        a.status.localeCompare(b.status);
    });
}

function getResults(url, container, day, btn) {

    fetch(url, {
        "method": "GET",
        "headers": {
            "content-type": "application/json"
        }

    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(responseData => {

        // for (let i = 0; i < responseData.data.length; i++) {

        //     gamesArr.push(responseData.data[i]);
        // }

        // responseData.data.forEach(element => {
        //     gamesArr.push(element);
        // });

        // gamesArr = responseData.data.slice();

        // console.log(JSON.stringify(gamesArr));
        
        // sort responseData.data array by time (responseData.data[i].status)
        responseData.data.sort((a, b) => {
            
            let t1 = get24HrFormat(a.status);
            let t2 = get24HrFormat(b.status);
            return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
        });

        // convert to 24 hour format to compare strings
        function get24HrFormat(str) {
            let _t = str.split(/[^0-9]/g);
            _t[0] =+_t[0] + (str.indexOf("pm")>-1 && +_t[0]!==12 ? 12: 0);
            return _t.join("");
        }

        // convert time to CEST timezone
        function parseDate(strDate) {
            return new Date(Date.parse(strDate));
        }

        const strDate = getStatus(responseData.data);
        const localeDate = parseDate(strDate);
        console.log(strDate);
        
        // get status value from responseData
        function getStatus(arr) {

            for (let i = 0; i < arr.length; i++) {
                
                return arr[i].status;
                
            }
        }

        responseData.data.sort((a, b) => parseFloat(a.status) - parseFloat(b.status));
        // console.log("Games array sorted: " + responseData);
        
        let htmlString =
            `<thead>
                <tr>
                    <td class="date" colspan="5">${btn}${monthName(day)} ${day.getDate()}, ${day.getFullYear()}</td>
                </tr>
            </thead>`;

        for (i = 0; i < responseData.data.length; i++) {

            htmlString +=
            `<tr>
                <td class="game-time" colspan="5">${responseData.data[i].status}</td>
            </tr>
            <tr>
                <td class="team-name visitor-team-name"><span>${responseData.data[i].visitor_team.full_name}</span><img src="img/${logoArr[responseData.data[i].visitor_team.id-1]}" class="team-logo visitor-team-logo" alt="${responseData.data[i].visitor_team.full_name} Logo"></td>
                
                <td class="score visitor-team-score">${responseData.data[i].visitor_team_score}</td>
                <td class="colon">:</td>
                <td class="score home-team-score">${responseData.data[i].home_team_score}</td>
                <td class="team-name home-team-name"><img src="img/${logoArr[responseData.data[i].home_team.id-1]}" class="team-logo home-team-logo" alt="${responseData.data[i].home_team.full_name} Logo">${responseData.data[i].home_team.full_name}</td>
            </tr>`;
            // console.log(responseData.data[i].home_team.full_name);

        }

        container.innerHTML = htmlString;

        function createBtn(className, id, tableTd) {

            let emptyBtn = document.createElement("a");
            emptyBtn.className = className;
            emptyBtn.id = id;
            tableTd.append(emptyBtn);
        }

        // createBtn("link-prev", "btnPrev", tableDateT);
        // createBtn("link-next", "btnNext", tableDateY);
        
        const btnPrev = document.querySelector("#btnPrev");
        const btnNext = document.querySelector("#btnNext");
        
        btnPrev.addEventListener("click", () => {
    
            tableToday.classList.add("hide");
            tableYesterday.classList.remove("hide");
        });
        
        btnNext.addEventListener("click", () => {
    
            tableYesterday.classList.add("hide");
            tableToday.classList.remove("hide");
        });

        // set results color
        let visitorTeamScoreArr = document.querySelectorAll(".visitor-team-score");
        let homeTeamScoreArr = document.querySelectorAll(".home-team-score");
        // Set winning score color to green and losing to red
        function setResultsColor(arrVisitor, arrHome) {
        
            console.log(arrVisitor.classList);
            console.log(arrHome);
        
            for (let i = 0; i < arrVisitor.length; i++) {
                if (parseInt(arrVisitor[i].innerHTML) > parseInt(arrHome[i].innerHTML)) {
                    // arrVisitor[i].style.color = "#4CAF50";
                    arrVisitor[i].style.color = "#43A047";
                    arrHome[i].style.color = "#F44336";
                } else if (parseInt(arrVisitor[i].innerHTML) < parseInt(arrHome[i].innerHTML)) {
                    arrVisitor[i].style.color = "#F44336";
                    // arrHome[i].style.color = "#4CAF50";
                    arrHome[i].style.color = "#43A047";
                } else if (parseInt(arrVisitor[i].innerHTML) == parseInt(arrHome[i].innerHTML)) {
                    arrVisitor[i].style.color = "hsl(210, 10.8%, 14.5%)";
                    arrHome[i].style.color = "hsl(210, 10.8%, 14.5%)";
                }
            }
        }
        setResultsColor(visitorTeamScoreArr, homeTeamScoreArr);
    })
    .catch(error => {
        console.error("Error:", error)
    });
}



getResults(urlToday, containerToday, today, '<a id="btnPrev" class="link link-prev">Previous Day</a>');
getResults(urlYesterday, containerYesterday, yesterday, '<a id="btnNext" class="link link-next">Next Day</a>');
