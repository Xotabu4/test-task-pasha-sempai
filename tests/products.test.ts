import { baseFixture } from "../fixtures";

const testDataSet = [
  {
    testName: "Sale",
    filtersToSelect: {
      Marke: null,
      Produktart: null,
      "Fur Wen": null,
    },
  },
  {
    testName: "Neu",
    filtersToSelect: {
      Produktart: null,
      "Fur Wen": null,
    },
  },
  {
    testName: "Limitiert",
    filtersToSelect: {
      "Geschenk fur": "+ Geschenk",
      Marke: null,
      Produktart: null,
      "Fur Wen": null,
    },
  },
];

for (const testData of testDataSet) {
  baseFixture(
    `products based on filters: ${testData.testName}`,
    async ({ app: { home, category } }) => {
      await home.open();
      await home.acceptCookies();
      await home.openCategory("PARFUM");

      const selectedFilters: string[] = [];

      for (const [filter, value] of Object.entries(testData.filtersToSelect)) {
        selectedFilters.push(await category.selectFilterValue(filter, value));
      }

      console.log(selectedFilters);
      await category.expectSelectedSearchFilters(selectedFilters);
      await category.expectSearchResultsNotEmpty();
    }
  );
}
