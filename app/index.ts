import { PageHolder } from "./abstract";
import { Category } from "./pages/category.page";
import { Home } from "./pages/home.page";

export class Application extends PageHolder {
    public readonly home = new Home(this.page);
    public readonly category = new Category(this.page);
}
