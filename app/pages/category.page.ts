import { Locator, expect } from "@playwright/test";
import { PageHolder } from "../abstract";

    //   const filterNameToTestId = {
    //     Marke: "brand",
    //     Produktart: "classificationClassName",
    //     "Fur Wen": "gender",
    //     "Geschenk fur": "flags",
    //   };

export class Category extends PageHolder {
  private productTile = this.page.locator(".product-tile");
  private itemsInFilterMenu = this.page.locator(".facet__menu a");

  private getFilterByTitle(filterTitle: string): Locator {
    return this.page.locator(".facet-wrapper .facet__title", { hasText: filterTitle })
  }

  /**
   * 
   * @param filterTitle 
   * @param value if undefined, first value will be selected
   * @returns selected value in filter
   */
  async selectFilterValue(filterTitle, value?: string ) {
    await this.getFilterByTitle(filterTitle).click();
    
    let selectedValue: string;
    if (value === undefined) {
        selectedValue = await this.itemsInFilterMenu.first().innerText();
        await this.itemsInFilterMenu.first().click();
      } else {
        const filterItem = this.itemsInFilterMenu.filter({ hasText: value });
        selectedValue = await filterItem.innerText();
        await filterItem.click();
      }
      await this.getFilterByTitle(filterTitle).click();

      return selectedValue;
  }
  /**
   * Expecting atleast one product to be visible
   */
  async expectSearchResultsNotEmpty() {
    await expect(this.productTile).not.toHaveCount(0);
    await expect(this.productTile.first()).toBeVisible();
  }

  /**
   * Expecting selected filters to be visible
   * @param selectedFilters - array of selected filters
   */
  async expectSelectedSearchFilters(selectedFilters: string[]) {
    await expect(this.page.locator(".selected-facets__value")).toHaveText(
      selectedFilters
    );
  }
}
