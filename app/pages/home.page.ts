import { PageHolder } from "../abstract";

export type Categories =
  | "MARKEN"
  | "PARFUM"
  | "MAKE-UP"
  | "GESICHT"
  | "KÖRPER"
  | "HAARE"
  | "HOME & LIFESTYLE"
  | "DOUGLAS COLLECTION"
  | "APOTHEKE¹ & GESUNDHEIT"
  | "OSTERN"
  | "SALE";

export class Home extends PageHolder {
  async open() {
    await this.page.goto("/");
  }

  async acceptCookies() {
    const cookieAcceptButton = this.page.getByRole("button", {
      name: "Alle erlauben",
    });
    // await page.addLocatorHandler(
    //     cookieAcceptButton,
    //   async () =>
    //     await cookieAcceptButton.click()
    // );

    await cookieAcceptButton.click();
  }

  openCategory(category: Categories) {
    return this.page.getByRole("link", { name: category, exact: true }).click();
  }
}
