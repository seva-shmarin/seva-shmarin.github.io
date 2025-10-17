import { html } from "#!/common/utils/mark-template.js";

/** @type {(item: DbItem, ampPrefix: string) => string} */
function renderItem({ heading, id }, ampPrefix) {
	return html`
		<li class="toc__item">
			<a class="toc__link" href="${ampPrefix}/${id}/">${heading}</a>
		</li>
	`;
}

/** @type {(items: DbItem[], isAmp?: boolean) => string} */
export function renderToc(items, isAmp = false) {
	const template = items.map((item) => renderItem(item, isAmp ? "/amp" : "")).join("");

	return html`<ol class="toc">${template}</ol>`;
}
