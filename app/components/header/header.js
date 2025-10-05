import { html } from "#!/common/utils/mark-template.js";

/** @type {(tocUrl: string) => string} */
export function renderHeader(tocUrl) {
	return html`
		<header>
			<a href="${tocUrl}" aria-label="К содержанию"></a>
		</header>
	`;
}
