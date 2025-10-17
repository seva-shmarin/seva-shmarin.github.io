import { sql } from "#!/common/utils/mark-template.js";
import { database } from "#!/server/lib/db.js";

const sqlQuery = database.prepare(sql`SELECT MAX(id) AS length FROM pages;`);

export function getPages() {
	const payload = sqlQuery.get();

	return Array.from({ length: Number(payload?.length) + 1 }, (_item, i) => `/${i || ""}`);
}
