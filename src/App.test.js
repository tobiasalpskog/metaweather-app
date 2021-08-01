import { render, screen } from "@testing-library/react";
import App from "./App";

// Sanity check
test("renders learn react link", () => {
	render(<App />);
	const linkElement = screen.getByText(/main/i);
	expect(linkElement).toBeInTheDocument();
});
