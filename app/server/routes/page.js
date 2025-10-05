import { html, sql } from "#!/common/utils/mark-template.js";
import { database } from "#!/server/lib/db.js";

const sqlQuery = database.prepare(sql`
	SELECT
		content,
		STRFTIME('%d.%m.%Y', writedAt ) AS formattedWritedAt,
		heading,
		id as rawId,
		writedAt,
		STRFTIME('%Y', writedAt ) AS year
	FROM pages WHERE id = ?;
`);
const sqlMaxQuery = database.prepare(sql`SELECT MAX(id) AS length FROM pages;`);

export const pageRoute = {
	/** @type {RouteMethod} */
	GET({ pathname }) {
		const { content, formattedWritedAt, heading, rawId, writedAt, year } =
			sqlQuery.get(Number(pathname.slice(1))) || {};
		const id = Number(rawId);
		const length = Number(sqlMaxQuery.get()?.length);

		const pageTemplate = content
			? html`
					<div class="poem">
						${content}
						<time class="_separated" datetime="${writedAt}">${formattedWritedAt}</time>
					</div>

					<p class="copyright">© Сева Шмарин, ${year}</p>
				`
			: "";

		return {
			page: {
				description: `Стихотворение Севы Шмарина «${heading}».`,
				heading: heading ? `${heading}` : "Страница не найдена",
				next: id === length ? "" : `/${id + 1}`,
				pageTemplate,
				prev: id === 1 ? "" : `/${id - 1}`,
			},
		};
	},
};
