declare global {
	import type { IncomingMessage, ServerResponse } from "node:http";
	import type { SQLOutputValue } from "node:sqlite";

	namespace NodeJS {
		interface ProcessEnv {
			DEV?: string;
			PORT?: string;
		}
	}

	type Changefreq = "daily" | "weekly" | "monthly" | "yearly" | undefined;

	type DbItem = Record<string, SQLOutputValue>;

	type LayoutData = {
		description?: string;
		heading?: string;
		isAmp?: boolean;
		isDev?: boolean;
		next: string;
		pageTemplate?: string;
		pathname?: string;
		prev: string;
	};

	type Route = {
		GET: RouteMethod;
	};

	type RouteData = {
		contentType?: string;
		page?: LayoutData;
		template?: string;
	};

	type RouteMethod = (params: RouteParams) => RouteData;

	type RouteParams = {
		isAmp: boolean;
		pathname: string;
	};

	type RouteRequest = IncomingMessage;

	type RouteResponse = ServerResponse<IncomingMessage> & { req: IncomingMessage };

	type ServerMiddleware = (req: IncomingMessage, res: RouteResponse, next?: ServerMiddleware) => Promise<void>;

	type SitemapPage = {
		lastmod?: string;
		loc: string;
	};
}

export {};
