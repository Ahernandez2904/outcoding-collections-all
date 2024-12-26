import { expect } from '@playwright/test';

export class HomePage {

  constructor(page) {
    this.page = page;
    this.typeaheadInput = page.locator('input#HeaderSearchText');
    this.submitButton = page.locator('input[data-ga-event-action="Search Action"]');
    this.SRPHeader = page.locator('h1#nhs_PageTitle');
  }
  async NavigateToSRP(Location) {
    await this.typeaheadInput.fill(Location);
    await this.submitButton.click();
    await expect(this.SRPHeader).toBeVisible();
  }
}