const axios = require('axios')
const URL = "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/"


class Rankinformation{

get = (id) => {

return axios.get(`${URL}${id}`, {

    headers: {
        "X-Riot-Token": `${process.env.RIOT_API_TOKEN}`

        
        }


    })

}


}


module.exports = Rankinformation
