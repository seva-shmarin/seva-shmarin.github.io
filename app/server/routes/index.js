import { mainRoute } from "#!/server/routes/main.js";
import { pageRoute } from "#!/server/routes/page.js";
import { sitemapXmlRoute } from "#!/server/routes/sitemap-xml.js";

/** @type {{ [name: string]: Route }} */
export const routes = {
	"/": mainRoute,
	"/:page": pageRoute,
	"/sitemap-main.xml": sitemapXmlRoute,
};
