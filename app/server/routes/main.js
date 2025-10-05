import { PROJECT_DESCRIPTION } from "#!/common/constants.js";
import { html, sql } from "#!/common/utils/mark-template.js";
import { renderToc } from "#!/components/toc/toc.js";
import { database } from "#!/server/lib/db.js";

const sqlQuery = database.prepare(sql`SELECT id, heading FROM pages ORDER BY id;`);
const sqlMaxQuery = database.prepare(sql`SELECT MAX(id) AS length FROM pages;`);

export const mainRoute = {
	/** @type {RouteMethod} */
	GET({ isAmp }) {
		const pages = sqlQuery.all();

		return {
			page: {
				description: PROJECT_DESCRIPTION,
				heading: "Содержание",
				next: "/1",
				pageTemplate: html`
					${renderToc(pages, isAmp)}
					<p class="copyright">© <a href="https://efiand.ru">efiand</a>, разработка сайта, 2025</p>
				`,
				prev: `/${sqlMaxQuery.get()?.length}`,
			},
		};
	},
};
