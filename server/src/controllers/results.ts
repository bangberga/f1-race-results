import { RequestHandler } from "express";
import { baseUrl, scrapedPageUrl, tempLink } from "../utils/constants";
import {
  filterLinks,
  getURLsFromHTML,
  scrapInformation,
  fetchHTML,
} from "../crawl";

const getAllResults: RequestHandler = async (req, res) => {
  try {
    const htmlBody = await fetchHTML(scrapedPageUrl);
    const nextURLs = getURLsFromHTML(htmlBody, baseUrl);
    const filteredLinks = filterLinks(nextURLs, tempLink);

    const htmlBodies = await Promise.all(
      filteredLinks.map((link) => fetchHTML(link))
    );

    res.json(htmlBodies.map((htmlBody) => scrapInformation(htmlBody)));
  } catch (error) {
    console.log(error);
  }
};
export { getAllResults };
