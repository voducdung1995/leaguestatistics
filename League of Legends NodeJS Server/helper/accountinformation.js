const axios = require('axios')
const URL = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"

class Accountinformation{

get = (name) => {


    return axios.get(`${URL}${name}`, {

        headers: {
            "X-Riot-Token": `${process.env.RIOT_API_TOKEN}`
        }

    })
}

}

module.exports = Accountinformation