const axios = require("axios");

const { xmlStringToJson } = require("../utils/SeoContentUtils");

export async function getSRPInformation() {
  const response = await axios.get("https://api.newhomesource.com/api/V2/search/homes?algorithm=md5&alpharesults=True&client=NewHomeSource&includempc=True&marketid=48&noboyl=1&page=1&pagesize=40&partnerid=1&sessiontoken=NHSSessionToken&sortby=City&sortorder=false&sortsecondby=Random&sortsecondorder=False&Green=true&CountsOnly=true&sortfirstby=Aurora&originlat=39.729401&originlng=-104.831398");
  return response.data;
}