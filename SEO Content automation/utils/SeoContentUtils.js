const xml2js = require("xml2js");
const axios = require("axios");
const {JSONPath} = require('jsonpath-plus');
const he = require('he');

export async function getSRPInformation(apiUrl) {
  const response = await axios.get(apiUrl);
  return response.data;
}

export function xmlStringToJson(xmlString) {
  let jsonData;
  xml2js.parseString(xmlString.data, (err, result) => {
    if (err) {
      console.error("Error parsing XML:", err);
    } else {
      const jsonString = JSON.stringify(result, null, 2);
      jsonData = JSON.parse(jsonString);
    }
  });
  return jsonData;
}

export function removeHtmlTags(inputString) {
  return inputString.replace(/<[^>]*>/g, "");
}

export function GetReplaceCodesFromContent(content) {
  return content.match(/\[.+?\]/g || []).map(function (str) {
    return str.slice(1, -1);
  });
}

export function parseHtmlElements(content) {
  return he.decode(content);
}

export function replaceCodes(content, replaceCodes) {
  let newContent = content;
  for (var replaceCode in replaceCodes) {
    if (replaceCodes.hasOwnProperty(replaceCode)) {
      newContent = newContent
        .replace(
          new RegExp("\\[" + replaceCode + "\\]", "g"),
          replaceCodes[replaceCode]
        )
        .trim()
        .replace(/\s+/g, " ");
    }
  }
  return newContent;
}

const jsonPathReplaceCodeDictionary = {
  CommunityCount: "x",
  HomeCount: "x",
  BuilderCount: "x",
  SquareFtRangeLow: "x",
  SquareFtRangeHigh: "x",
  BedroomRangeLow: "x",
  BedroomRangeHigh: "x",
  BathroomRangeLow: "x",
  BathroomRangeHigh: "x",
  SpecCount: "x",
  PriceRangeLow: "x",
  PriceRangeHigh: "x",
  PlanCount: "x"
  // StateID: "",
  // ProductTypeName: "",
  // CityName: ""
};

export async function MapApiDataToReplaceCodes(apiUrl) {
  const response = await getSRPInformation(apiUrl);

  jsonPathReplaceCodeDictionary.CommunityCount = JSONPath({path: "$..CommCount", json: response})[0];
  jsonPathReplaceCodeDictionary.HomeCount = JSONPath({path: "$..HomeCount", json: response})[0];
  jsonPathReplaceCodeDictionary.BuilderCount = JSONPath({path: "$..TotalBrands", json: response})[0];
  jsonPathReplaceCodeDictionary.SpecCount = JSONPath({path: "$..QmiCount", json: response})[0];
  jsonPathReplaceCodeDictionary.PlanCount = parseInt(JSONPath({path: "$..HomeCount", json: response})[0]) - parseInt(JSONPath({path: "$..QmiCount", json: response})[0]);

  const BedroomRange = JSONPath({path: "$..Facets.BrRange", json: response})[0].split("-");
  jsonPathReplaceCodeDictionary.BedroomRangeLow = BedroomRange[0];
  jsonPathReplaceCodeDictionary.BedroomRangeHigh = BedroomRange[1];

  const BathroomRange = JSONPath({path: "$..Facets.BaRange", json: response})[0].split("-");
  jsonPathReplaceCodeDictionary.BathroomRangeLow = BathroomRange[0];
  jsonPathReplaceCodeDictionary.BathroomRangeHigh = BathroomRange[1];

  const SquareFtRange = JSONPath({path: "$..Facets.SftRange", json: response})[0].split("-");
  jsonPathReplaceCodeDictionary.SquareFtRangeLow = new Intl.NumberFormat().format(SquareFtRange[0]);
  jsonPathReplaceCodeDictionary.SquareFtRangeHigh = new Intl.NumberFormat().format(SquareFtRange[1]);

  const PriceRange = JSONPath({path: "$..Facets.PrRange", json: response})[0].split("-");
  jsonPathReplaceCodeDictionary.PriceRangeLow = new Intl.NumberFormat().format(PriceRange[0]);
  jsonPathReplaceCodeDictionary.PriceRangeHigh = new Intl.NumberFormat().format(PriceRange[1]);

  return jsonPathReplaceCodeDictionary;

}
