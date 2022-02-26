import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router";

it("renders Home component without crashing", () => {
    render(<MemoryRouter><Home></Home></MemoryRouter>)
});