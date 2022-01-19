import React from "react";
import { render } from "@testing-library/react";
import Shortened from "./Shortened";
import Shortener from "../shortener/Shortener";
import { getFirstNCharacters } from "../../Utilities";

it("renders Shortned component without crashing", () => {
    render(<Shortened urlItem={ {originalUrl: 'https://www.google.com/search?q=ci%2Fcd&rlz=1C1BYYL_svSE972SE972&sxsrf=AOaemvLUPirFzZ5ESL1OAbu2JP6K2dbqxw%3A1633779436798&ei=7H5hYY-QMOKCxc8PjoGFoAY&oq=ci%2Fcd&gs_lcp=Cgdnd3Mtd2l6EAEYADIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BAgAEEM6CwguEIAEEMcBENEDOg0ILhDHARDRAxBDEJMCOgsILhCABBDHARCjAjoFCC4QgAQ6BwgAEIAEEApKBAhBGABQ-_qeAVjum58BYI63nwFoAXACeACAAa0BiAGSBJIBAzAuNJgBAKABAcABAQ&sclient=gws-wiz', slug: '4e207ad4'}} />)
  
  });

  it("displays original url", () => {
    const data = {originalUrl: 'https://www.google.com/search?q=ci%2Fcd&rlz=1C1BYYL_svSE972SE972&sxsrf=AOaemvLUPirFzZ5ESL1OAbu2JP6K2dbqxw%3A1633779436798&ei=7H5hYY-QMOKCxc8PjoGFoAY&oq=ci%2Fcd&gs_lcp=Cgdnd3Mtd2l6EAEYADIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BAgAEEM6CwguEIAEEMcBENEDOg0ILhDHARDRAxBDEJMCOgsILhCABBDHARCjAjoFCC4QgAQ6BwgAEIAEEApKBAhBGABQ-_qeAVjum58BYI63nwFoAXACeACAAa0BiAGSBJIBAzAuNJgBAKABAcABAQ&sclient=gws-wiz', slug: '4e207ad4'}
    const { getByTestId } = render(<Shortened urlItem={ data} />)
    const divOriginalUrl = getByTestId("divOriginalUrl")
    const urlData = data.originalUrl;
    const encodedVal = `${getFirstNCharacters(urlData, 50).replace(/&/g, '&amp;')}...`
    expect(divOriginalUrl.innerHTML).toBe(encodedVal);
  })

  it("displays shortened url", () => {
    const data = {originalUrl: 'https://www.google.com/search?q=ci%2Fcd&rlz=1C1BYYL_svSE972SE972&sxsrf=AOaemvLUPirFzZ5ESL1OAbu2JP6K2dbqxw%3A1633779436798&ei=7H5hYY-QMOKCxc8PjoGFoAY&oq=ci%2Fcd&gs_lcp=Cgdnd3Mtd2l6EAEYADIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BAgAEEM6CwguEIAEEMcBENEDOg0ILhDHARDRAxBDEJMCOgsILhCABBDHARCjAjoFCC4QgAQ6BwgAEIAEEApKBAhBGABQ-_qeAVjum58BYI63nwFoAXACeACAAa0BiAGSBJIBAzAuNJgBAKABAcABAQ&sclient=gws-wiz', slug: '4e207ad4'}
    const { getByTestId } = render(<Shortened urlItem={ data} />)
    const anchorShortenedUrl = getByTestId("anchorShortenedUrl")
    const urlData = `${window.location.href}${data.slug}`;
    const encodedVal = urlData.replace(/&/g, '&amp;')
    expect(anchorShortenedUrl.innerHTML).toBe(encodedVal);
  });

  it("displays shortened url with link (href)", () => {
    const data = {originalUrl: 'https://www.google.com/search?q=ci%2Fcd&rlz=1C1BYYL_svSE972SE972&sxsrf=AOaemvLUPirFzZ5ESL1OAbu2JP6K2dbqxw%3A1633779436798&ei=7H5hYY-QMOKCxc8PjoGFoAY&oq=ci%2Fcd&gs_lcp=Cgdnd3Mtd2l6EAEYADIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BAgAEEM6CwguEIAEEMcBENEDOg0ILhDHARDRAxBDEJMCOgsILhCABBDHARCjAjoFCC4QgAQ6BwgAEIAEEApKBAhBGABQ-_qeAVjum58BYI63nwFoAXACeACAAa0BiAGSBJIBAzAuNJgBAKABAcABAQ&sclient=gws-wiz', slug: '4e207ad4'}
    const { getByTestId } = render(<Shortened urlItem={ data} />)
    const anchorShortenedUrl = getByTestId("anchorShortenedUrl")
    const urlData = `${window.location.href}${data.slug}`;
    const encodedVal = urlData.replace(/&/g, '&amp;')
    expect(anchorShortenedUrl.href).toBe(encodedVal);
  });
  
  it("renders Copy button", () => {
    const { getByTestId } = render(<Shortener></Shortener>)
    expect(getByTestId("btnShorten")).toBeInTheDocument();
  });