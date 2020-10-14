import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<script
						dangerouslySetInnerHTML={{
							__html: blockingSetInitialColorMode
						}}
					></script>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

// our function needs to be a string
const blockingSetInitialColorMode = `(function() {
	${setInitialColorMode.toString()}
	setInitialColorMode();
})()
`;

function setInitialColorMode() {
	function getInitialColorMode() {
		const persistedColorPreference = window.localStorage.getItem("theme");
		const hasPersistedPreference =
			typeof persistedColorPreference === "string";

		/**
		 * If the user has explicitly chosen light or dark,
		 * use it. Otherwise, this value will be null.
		 */
		if (hasPersistedPreference) {
			return persistedColorPreference;
		}

		// If there is no saved preference, use a media query
		const mql = window.matchMedia("(prefers-color-scheme: dark)");
		const hasMediaQueryPreference = typeof mql.matches === "boolean";

		if (hasMediaQueryPreference) {
			return mql.matches ? "dark" : "light";
		}

		// default to 'light'.
		return "light";
	}

	const colorMode = getInitialColorMode();
	const root = document.documentElement;
	root.style.setProperty("--initial-color-mode", colorMode);

	// add HTML attribute if dark mode
	if (colorMode === "dark")
		document.documentElement.setAttribute("data-theme", "dark");
}
