import { html } from "#!/common/utils/mark-template.js";

/** @type {(payload: { ampPrefix?: string; tocUrl?: string; next: string; prev: string }) => string} */
export function renderFooter({ ampPrefix = "", tocUrl = "", next, prev }) {
	const tocTemplate = tocUrl
		? html`
				<li>
					<a class="nav-ring__link nav-ring__link--toc" rel="toc" href="${tocUrl}">
						Содержание
					</a>
				</li>
			`
		: "";

	return html`
		<footer>
			<nav>
				<ul class="nav-ring">
					<li>
						<a
							class="nav-ring__link nav-ring__link--prev"
							rel="prev"
							href="${ampPrefix}${prev}/"
							aria-label="Назад"
						></a>
					</li>
					${tocTemplate}
					<li>
						<a
							class="nav-ring__link nav-ring__link--next"
							rel="next"
							href="${ampPrefix}${next}/"
							aria-label="Далее"
						></a>
					</li>
				</ul>
			</nav>
		</footer>
	`;
}
