const { test, expect } = require("@playwright/test");
import { SearchResultPage } from "../pages/SearchResultPage";
import { environment } from "../env";
import testData from "../data/SEOCityCommunity.data.json";

let searchResultPage;

test.beforeEach(async ({ page }, testInfo) => {
  searchResultPage = new SearchResultPage(page);
  const data = testData[testInfo.title];
  await page.goto(environment.WEB_URL + data.PageUrl);
});

test("TC-001: SEO Content - communities - Validate footer and heading City with Nature area amenity", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoIndex);
});

test("TC-002: SEO Content - communities - Validate footer and heading City with Green amenity", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  await searchResultPage.ValidateCanonicalLink(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
});

test("TC-003: SEO Content - communities - Validate footer and heading City with View amenity", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoIndex);
});

test("TC-004: SEO Content - communities - Validate footer and heading City with Pool amenity", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  await searchResultPage.ValidateCanonicalLink(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
});

test("TC-005: SEO Content - communities - Validate footer and heading City with Waterfront amenity", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  await searchResultPage.ValidateCanonicalLink(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
});

test("TC-006: SEO Content - communities - Validate footer and heading City with Sport amenity", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoIndex);
});

test("TC-007: SEO Content - communities - Validate footer and heading City with Golf amenity", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  await searchResultPage.ValidateCanonicalLink(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
});

test("TC-008: SEO Content - communities - Validate footer and heading City with Gated amenity", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  await searchResultPage.ValidateCanonicalLink(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
});

test("TC-009: SEO Content - communities - Validate footer and heading City with Park amenity", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  await searchResultPage.ValidateCanonicalLink(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
});

test("TC-010: SEO Content - communities - Validate footer and heading City Single Family", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
});

test("TC-011: SEO Content - communities - Validate footer and heading City Luxury", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  await searchResultPage.ValidateCanonicalLink(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
}); //data

test("TC-012: SEO Content - communities - Validate footer and heading City Condos and Towncommunities", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  await searchResultPage.ValidateCanonicalLink(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
}); //different data between api and actual page

test("TC-013: SEO Content - communities - Validate footer and heading City Custom communities", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  await searchResultPage.ValidateCanonicalLink(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
}); //wrong data in stage

test("TC-014: SEO Content - communities - Validate footer and heading City Adult", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  await searchResultPage.ValidateCanonicalLink(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
}); //data

test("TC-015: SEO Content - communities - Validate footer and heading City Hot deals", async ({}, testInfo) => {
  await searchResultPage.CompareSEOContent(testData[testInfo.title]);
  await searchResultPage.ValidateCanonicalLink(testData[testInfo.title]);
  const metaRobots = await searchResultPage.metaRobotsTag.getAttribute('content');
  expect(metaRobots).toContain(searchResultPage.NoodpNoydir);
});