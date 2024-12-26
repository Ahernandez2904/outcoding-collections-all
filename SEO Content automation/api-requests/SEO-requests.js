const axios = require("axios");

const { xmlStringToJson } = require("../utils/SeoContentUtils");

export async function getSEOXML(apiUrl) {
  const response = await axios.get(apiUrl);
  return xmlStringToJson(response);
}
