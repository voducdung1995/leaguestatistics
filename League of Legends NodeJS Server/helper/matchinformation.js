const axios = require('axios')

const matchIdListURL = "https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/"
const matchInformationURL = "https://euw1.api.riotgames.com/lol/match/v4/matches/"


class Matchinformation{

    getMatchIdList = (accountId) => {

        return axios.get(`${matchIdListURL}${accountId}?endIndex=10&beginIndex=0`,{

            headers:{

                "X-Riot-Token": `${process.env.RIOT_API_TOKEN}`

            }

        })


    }

    getMatchInformation = (matchId) => {


        return axios.get(`${matchInformationURL}${matchId}`,{

            headers: {

                "X-Riot-Token": `${process.env.RIOT_API_TOKEN}`

            }



        })

    }



}

module.exports = Matchinformation