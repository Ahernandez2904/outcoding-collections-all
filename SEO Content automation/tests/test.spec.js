// test("Segment test", async ({ page }) => {
//   await page.goto("https://www.newhomesource.com/homes/tx/austin-area/austin");
//   await page.locator('[data-variation="freeBrochure"]').first().click();
//   const request = await page.waitForRequest("https://api.segment.io/v1/t");

//   console.log("Request URL:", request.postData());
//   console.log("Request Method:", request.method());

//   await page.route("**/*", (route) => {
//     if (route.request().url().includes("api.segment.io/v1/t")) {
//       const requestBody = route.request().postData();
//       console.log("Request Payload:", requestBody);
//     }
//   });
// });