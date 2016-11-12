import fetch from 'isomorphic-fetch'
import md5 from 'blueimp-md5'
import config from '../config'

const callApi = (endpoint) => {
  const fullUrl = (-1 === endpoint.indexOf(config.apiUrl)) ? config.apiUrl + endpoint : endpoint
  const ts = new Date().getTime()
  const hash = md5(ts + config.apiPrivateKey + config.apiPublicKey)

  return new Promise((resolve, reject) => {
    fetch(`${fullUrl}?ts=${ts}&apikey=${config.apiPublicKey}&hash=${hash}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json'
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// API services
export const getHeroes = () => { return callApi('/characters') }
export const getHeroDetails = (id) => { return callApi(`/characters/${id}`) }
