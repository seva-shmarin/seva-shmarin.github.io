import { BASE_URL, PROJECT_TITLE } from "#!/common/constants.js";
import { html } from "#!/common/utils/mark-template.js";
import { renderLayout } from "#!/components/layout/layout.js";
import { isDev } from "#!/server/constants.js";
import { renderAmpAssets } from "#!/server/lib/amp.js";

function renderAssets() {
	return isDev
		? html`
			<link rel="stylesheet" href="/client/critical.css">
			<script src="/client/dev.js" type="module"></script>
		`
		: html`
			<link rel="stylesheet" href="/bundles/critical.css">
		`;
}

/** @type {(pathname: string, isAmp: boolean) => string} */
function renderUrlMeta(pathname, isAmp) {
	const page = pathname === "/" ? "" : pathname;

	let ampTemplate = "";
	if (!isAmp) {
		const ampUrl = pathname === "/" ? "/amp" : `/amp${pathname}`;
		ampTemplate = html`<link rel="ampurl" href="${BASE_URL}${ampUrl}/">`;
	}

	return html`
		${ampTemplate}
		<link rel="canonical" href="${BASE_URL}${page}/">
		<meta property="og:url" content="${page}/">
	`;
}

/** @type {(data: LayoutData) => Promise<string>} */
export async function renderPage({
	isAmp = false,
	description = "",
	heading = "",
	next,
	pageTemplate = "",
	pathname = "",
	prev,
}) {
	const title = [heading, PROJECT_TITLE].filter(Boolean).join(" | ");
	const assetsTemplate = isAmp ? await renderAmpAssets() : renderAssets();
	const verificationsTemplate =
		pathname === "/"
			? html`
				<meta name="yandex-verification" content="07cc8aaaea008fa9">
				<meta name="google-site-verification" content="5FBzpuD4GpSmOypR46oFjuMdpdTsHJMbNtL_Z6vCXzk">
			`
			: "";

	return html`
		<!DOCTYPE html>
		<html lang="ru" prefix="og: http://ogp.me/ns#" ${isAmp ? "⚡" : ""}>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<meta name="apple-mobile-web-app-title" content="Сева Шмарин">

				<title>${title}</title>
				<meta name="description" content="${description}">
				${renderUrlMeta(pathname, isAmp)}
				<meta property="og:title" content="${title}">
				<meta property="og:description" content="${description}">
				<meta property="og:locale" content="ru_RU">
				<meta property="og:type" content="website">
				<meta property="og:site_name" content="${PROJECT_TITLE}">
				<meta property="og:image" content="/web-app-manifest-512x512.png">
				<meta property="og:image:width" content="512">
				<meta property="og:image:height" content="512">

				${verificationsTemplate}
				${assetsTemplate}

				<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
				<link rel="icon" type="image/svg+xml" href="/favicon.svg">
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
				<link rel="manifest" href="/site.webmanifest">

				<link rel="preload" href="/fonts/georgia-normal-400.woff2" as="font" crossorigin>
				<link rel="preload" href="/fonts/georgia-italic-400.woff2" as="font" crossorigin>
				<link rel="preload" href="/fonts/verdana-normal-400.woff2" as="font" crossorigin>
				<link rel="preload" href="/fonts/verdana-italic-400.woff2" as="font" crossorigin>
			</head>

			${renderLayout({ heading, isAmp, isDev, next, pathname, pageTemplate, prev })}

		</html>
	`;
}
