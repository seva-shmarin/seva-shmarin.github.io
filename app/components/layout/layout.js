import { YANDEX_METRIKA_TEMPLATE } from "#!/common/lib/yandex-metrika.js";
import { html } from "#!/common/utils/mark-template.js";
import { renderFooter } from "#!/components/footer/footer.js";
import { renderHeader } from "#!/components/header/header.js";

/** @type {(data: LayoutData) => string} */
export function renderLayout({ heading, isAmp, isDev, next, pathname, pageTemplate, prev }) {
	const ampPrefix = isAmp ? "/amp" : "";
	const tocUrl = `${ampPrefix}/`;

	return html`
		<body>
      ${isAmp || isDev ? "" : YANDEX_METRIKA_TEMPLATE}

			${renderHeader(tocUrl)}

      <main>
        <h1>Стихотворения</h1>
        <p class="author">Сева Шмарин</p>
        <h2>${heading}</h2>
        ${pageTemplate}
      </main>

			${renderFooter({ ampPrefix, next, prev, tocUrl: pathname === "/" ? "" : tocUrl })}
		</body>
	`;
}
