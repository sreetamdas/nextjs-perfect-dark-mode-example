import { useEffect, useState } from "react";

const IndexPage = () => {
	const [darkTheme, setDarkTheme] = useState(undefined);

	useEffect(() => {
		const root = window.document.documentElement;
		const initialColorValue = root.style.getPropertyValue(
			"--initial-color-mode"
		);
		console.log("init", initialColorValue);

		setDarkTheme(initialColorValue === "dark");
	}, []);

	useEffect(() => {
		console.log(">", darkTheme);
		if (darkTheme !== undefined) {
			if (darkTheme) {
				document.documentElement.setAttribute("data-theme", "dark");
				window.localStorage.setItem("theme", "dark");
			} else {
				document.documentElement.removeAttribute("data-theme");
				window.localStorage.setItem("theme", "light");
			}
		}
	}, [darkTheme]);

	return (
		<div>
			{darkTheme !== undefined && (
				<label>
					<input
						type="checkbox"
						checked={darkTheme}
						onChange={(ev) => {
							setDarkTheme(ev.target.checked ? true : false);
						}}
					/>{" "}
					Dark
				</label>
			)}
			<h1>Hello there!</h1>
			<p style={{ color: "var(--color-primary-accent)" }}>
				General Kenobi
			</p>
		</div>
	);
};

export default IndexPage;
