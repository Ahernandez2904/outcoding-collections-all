const { removeHtmlTags, replaceCodes, MapApiDataToReplaceCodes, parseHtmlElements } = require("../utils/SeoContentUtils.js");
const { getSEOXML } = require("../api-requests/SEO-requests.js");
import { environment } from "../env";
const { test, expect } = require("@playwright/test");

export class SearchResultPage {

  constructor(page) {
    this.page = page;
    this.homeTab = page.locator('a[data-result-type="homes"]');
    this.communityTab = page.locator('[data-qa="filters-result-type-communities"]');
    this.typeahead = page.locator('[data-qa="typeahead-search-input"]');
    this.typeaheadFirstSuggestion = page.locator('[data-qa="typeahead-search-suggestions1"]');
    this.resultInfoCard = page.locator('div.result__info');
    this.footerContent = page.locator('[data-footer-content]');
    this.heading = page.locator('h1.title__type');
    this.canonicalLink = page.locator('link[rel="canonical"]');
    this.metaRobotsTag = page.locator('meta[name="robots"]');
    this.NoodpNoydir = 'noodp, noydir';
    this.NoIndex = 'noindex, nofollow';
    //All filter
    this.allFiltersTab = page.locator('div.filters--full label.label--all-filters');
    this.AllApplyFilter = page.locator('div.panel--full  button[data-apply]');

    //amenities
    this.natureAreasAmenitiesLabel = page.locator('label[for="chk-nature-areas"]');
  }

  async SearchForMarket(location) {
    await this.typeahead.type(location);
    await this.typeaheadFirstSuggestion.click();
    await this.page.waitForSelector('div.result__info');
  }

  async GetSEOContent(testData) {
    const SEOContent = await getSEOXML(environment.SEO_URL + testData.SEOUrl);
    const codes = await MapApiDataToReplaceCodes(environment.API_URL + testData.ApiUrl);
    const footer = await replaceCodes(
      removeHtmlTags(SEOContent.content.footer[0]),
      //Spread replace codes that doesn{t show up on API so we add it in the testData json
      {...testData.ReplaceCodes, ...codes } 
    );
    const heading = await replaceCodes(await replaceCodes(
      removeHtmlTags(SEOContent.content.heading1[0]),
      {...testData.ReplaceCodes, ...codes } 
    ));
    return { footer: parseHtmlElements(footer), heading: parseHtmlElements(heading) };
  }

  async CompareSEOContent(data) {
    const SEOContent = await this.GetSEOContent(data);
  
    const footerText = await this.footerContent.innerText();
    expect(footerText.replace(/\s*\n\s*/g, " ")).toContain(SEOContent.footer);

    const headingText = await this.heading.innerText();
    expect(headingText.replace(/\s*\n\s*/g, " ")).toContain(SEOContent.heading);
  }

  async ValidateCanonicalLink(data) {
    const SEOContent = await getSEOXML(environment.SEO_URL + data.SEOUrl);

    const codes = await MapApiDataToReplaceCodes(environment.API_URL + data.ApiUrl);
    const canonical = await replaceCodes(
      removeHtmlTags(SEOContent.content.canonical[0]),
      {...data.ReplaceCodes, ...codes } 
    );
    const expectedText = canonical === '' ? environment.WEB_URL + data.PageUrl : canonical;
    const canonicalUrl = await this.canonicalLink.getAttribute('href');
    expect(canonicalUrl).toContain(expectedText);
  }
  
}