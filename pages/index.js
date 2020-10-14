import { useEffect, useState } from "react";

const IndexPage = () => {
	const [darkTheme, setDarkTheme] = useState(undefined);

	const handleToggle = (event) => {
		setDarkTheme(event.target.checked);
	};

	useEffect(() => {
		const root = window.document.documentElement;
		const initialColorValue = root.style.getPropertyValue(
			"--initial-color-mode",
		);
		console.log("init", initialColorValue);

		setDarkTheme(initialColorValue === "dark");
	}, []);
	useEffect(() => {
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
						onChange={handleToggle}
					/>{" "}
					Dark
				</label>
			)}
			<h1>Hello there</h1>
			<p style={{ color: "var(--color-primary-accent)" }}>
				General Kenobi!
			</p>
		</div>
	);
};

export default IndexPage;
