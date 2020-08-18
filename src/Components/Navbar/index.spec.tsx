import * as React from "react";

import { render } from "../../../tests";
import { Navbar } from "./index";

describe("Navbar", () => {
    it("should render without fail", () => {
        const { getByText } = render(<Navbar />);

        expect(getByText("Navbar")).toBeTruthy();
    });

    it("should match snapshot", () => {
        const { container } = render(<Navbar />);

        expect(container).toMatchSnapshot();
    });
});
