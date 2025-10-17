import { readFile } from "node:fs/promises";
import { html } from "#!/common/utils/mark-template.js";
import { cwd, isDev } from "#!/server/constants.js";

const APM_ASSETS_TEMPLATE = html`
	<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
`;

let cssCache = "";

export async function renderAmpAssets() {
	if (!cssCache) {
		if (isDev) {
			cssCache = await (await import("./css.js")).getCss("critical.css");
		} else {
			cssCache = await readFile(`${cwd}/public/bundles/critical.css`, "utf-8");
		}
	}

	return html`
		<style amp-custom>${cssCache}html{scrollbar-gutter:stable}main{min-height:100dvh}</style>
		${APM_ASSETS_TEMPLATE}
	`;
}
