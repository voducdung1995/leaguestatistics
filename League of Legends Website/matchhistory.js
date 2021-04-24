const matchIdListURL = "http://localhost:3000/matchlist?accid=";

const matchInformationURL = "http://localhost:3000/match?id=";

var matchIdHistory = [];
var matchInformationHistory = [];
var championIdHistory = [];
var matchHistoryContent = "";


//async function getAMatchHistory(accId){ or function getAMatchHistory(accId)
// this function gets called when a button is clicked

async function getAMatchHistory(accId){    

   await getMatchIdList(testid);
   displayHistoryContent();

}

async function getMatchIdList(accId){

    let tempmatchIdHistory = null;

    const response = await fetch(`${matchIdListURL}${accId}`);

    const data = await response.json();

    tempmatchIdHistory = data.matches;

    for(let i=0; i<tempmatchIdHistory.length; i++){

        matchIdHistory[i] = tempmatchIdHistory[i].gameId;
        championIdHistory[i] = tempmatchIdHistory[i].champion;

    }

    let promises = []

    for(let i=0; i<matchIdHistory.length; i++){

        const promise = new Promise((resolve, reject) => {
            fetch(`${matchInformationURL}${matchIdHistory[i]}`).then(resp => {
                resp.json().then(secondData => {
                    matchInformationHistory[i] = secondData;
                    resolve();
                })
            })
        })

        promises.push(promise)
    }   
    

    await Promise.all(promises)

}

displayHistoryContent = () => {


    console.log(matchInformationHistory.length);

    for(let i=0; i<matchInformationHistory.length; i++){
       
        let participantsArray = matchInformationHistory[i].participants;

        

            for(let participant of participantsArray){
                if(participant.championId === championIdHistory[i]){
                     console.log(participant.stats);
                     console.log(championIdHistory[i]);

                     let matchKills = participant.stats.kills;
                     let matchDeaths = participant.stats.deaths;
                     let matchAssists = participant.stats.assists;
                     let matchResult = "";

                     if(participant.stats.win === true){

                        matchResult = "win";

                     }else{

                        matchResult = "lose";
                     }



                     matchHistoryContent += `


                    <div class="match-container">

                     <div id="championsid">
                    ${championIdHistory[i]}
                    </div>

                    <div id="killdeathassist">

                    <span id="kda-kill">${matchKills}</span> /
                    <span id="kda-death">${matchDeaths}</span> /
                    <span id="kda-assist">${matchAssists}</span>

                    </div>

                    <div id="win-lose">

                    ${matchResult}

                    </div>

                    </div>

                        `

                }


            }

    }

    if(matchHistoryContent){
        console.log(matchHistoryContent);
        document.getElementById('league-matchlist-id').innerHTML = matchHistoryContent;
    }

}










