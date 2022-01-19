import React from "react";
import Shortener from "./Shortener";
import { render, fireEvent } from "@testing-library/react";

it("renders Shortner component without crashing", () => {
  render(<Shortener></Shortener>)

});

it("renders text input control for the original url", () => {
  const { getByTestId } = render(<Shortener></Shortener>)
  expect(getByTestId("inputOriginalUrl")).toBeInTheDocument();
});

it("renders Shorten Button", () => {
  const { getByTestId } = render(<Shortener></Shortener>)
  expect(getByTestId("btnShorten")).toBeInTheDocument();
});

it("disables Shorten button on providing invalid url", () => {

  const { getByTestId } = render(<Shortener></Shortener>)
  const btnShortener = getByTestId("btnShorten")
  const textInput = getByTestId("inputOriginalUrl")
  fireEvent.change(textInput, { target: { value: 'htt://ghghjg' } })
  expect(btnShortener).toBeDisabled();

});
it("enables Shorten button on providing valid url", () => {

  const { getByTestId } = render(<Shortener></Shortener>)
  const btnShortener = getByTestId("btnShorten")
  const textInput = getByTestId("inputOriginalUrl")
  fireEvent.change(textInput, { target: { value: 'https://google.com' } })
  expect(btnShortener).toBeEnabled();
});


