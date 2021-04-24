const accInformationURL = "http://localhost:3000/account?name=";
const rankInformationURL = "http://localhost:3000/rank?id=";


// Name vom Input-Feld => ButtonClick();
getSummonersName = () => {

    let summonersName = document.getElementById('inputfield').value;

    getAccountInformation(summonersName);


}

// Fetch für ID, AccountID, PUUID
getAccountInformation = (summonersName) => {

    fetch(`${accInformationURL}${summonersName}`).then((response)=>{

        return response.json();

    }).then((data)=>{

        getAMatchHistory(data.accountId);
        getRankInformation(data.id);
        displayAccountInformation(data);

    }).catch((error)=>{

        alert("Account not found");

    })



}

// Fetch für Rank Information
getRankInformation = (ID) => {

fetch(`${rankInformationURL}${ID}`).then((response)=>{

        return response.json();

}).then((data) =>{

    displayRankInformation(data);
})


}


// Anzeige von Account Informationen
displayAccountInformation = (data) =>{

    document.getElementById('account-name').innerText = data.name;

    document.getElementById('account-id').innerText = data.id;

    document.getElementById('account-accountid').innerText = data.accountId;

    document.getElementById('account-puuid').innerText = data.puuid;

    

}

// Anzeige von Rank Informationen
displayRankInformation = (data) =>{

    if(data.length === 0){
 

        document.getElementById('rank-span').innerText = " Unranked"


        displayRankIcon("unranked");
        
    }else{

        document.getElementById('rank-span').innerText = data[0].tier;

        document.getElementById('tier-span').innerText = data[0].rank;
    
        calculateWinRate(data[0].wins, data[0].losses);

        displayRankIcon(data[0].tier);

    }



}


calculateWinRate = (win, losses) => {




    let winrateUnround = win/(win+losses)*100;

    let winrate = Math.round(winrateUnround*100)/100;

    

    if(winrate < 50){
        document.getElementById('winrate-span').style.color = "red";
    } else {
        document.getElementById('winrate-span').style.color = "green";
    }

    document.getElementById('winrate-span').innerText = winrate;


}


var rankIconDatabase = {
    

    "unranked": "/Users/dungvoduc/Desktop/League of Legends JS Project/League of Legends APP/assets/base-icons/provisional.png",
    "iron": "/Users/dungvoduc/Desktop/League of Legends JS Project/League of Legends APP/assets/base-icons/iron.png", 
    "bronze": "/Users/dungvoduc/Desktop/League of Legends JS Project/League of Legends APP/assets/base-icons/bronze.png",
    "silver": "/Users/dungvoduc/Desktop/League of Legends JS Project/League of Legends APP/assets/base-icons/silver.png",
    "gold": "/Users/dungvoduc/Desktop/League of Legends JS Project/League of Legends APP/assets/base-icons/gold.png",
    "platinum": "/Users/dungvoduc/Desktop/League of Legends JS Project/League of Legends APP/assets/base-icons/platinum.png",
    "diamond": "/Users/dungvoduc/Desktop/League of Legends JS Project/League of Legends APP/assets/base-icons/diamond.png",
    "master": "/Users/dungvoduc/Desktop/League of Legends JS Project/League of Legends APP/assets/base-icons/master.png",
    "challenger": "/Users/dungvoduc/Desktop/League of Legends JS Project/League of Legends APP/assets/base-icons/challenger.png"



}

displayRankIcon = (rank) => {

    let imageLocation = rankIconDatabase[`${rank.toLowerCase()}`]

    let image = document.createElement('img');

    image.setAttribute('src', `${imageLocation}`);

    document.getElementById('ranked-icon').appendChild(image);

}







