import { createServer } from "node:http";
import { host, port } from "#!/server/constants.js";
import { renderPage } from "#!/server/lib/page.js";
import { routes } from "#!/server/routes/index.js";

/** @type {ServerMiddleware} */
async function next(req, res) {
	const url = new URL(`${host}${req.url?.replace(/\/$/, "")}`);
	const isAmp = url.pathname === "/amp" || /^\/amp\//.test(url.pathname);
	const pathname = url.pathname === "" || url.pathname === "/amp" ? "/" : url.pathname.replace(/^\/amp\//, "/");
	const routeKey = pathname === "/" || pathname.includes(".") ? pathname : "/:page";

	let contentType = "text/html";
	let template = "";

	try {
		const routeData = routes[routeKey].GET({ isAmp, pathname });
		({ contentType = "text/html; charset=utf-8", template = "" } = routeData);

		if (routeData.page) {
			template = await renderPage({ ...routeData.page, isAmp, pathname });
		}
	} catch (error) {
		console.error(req.url, error);
	}

	res.setHeader("Content-Type", contentType);
	res.end(template ? template.trim() : "");
}

/** @type {(middleware?: ServerMiddleware) => import("node:http").Server} */
export function createApp(middleware) {
	const server = createServer((req, res) => {
		if (middleware) {
			middleware(req, res, next);
		} else {
			next(req, res);
		}
	});

	server.listen(port, "localhost", () => {
		console.info(`Сервер запущен по адресу: ${host}/`);
	});

	return server;
}
