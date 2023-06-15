import { JSDOM } from "jsdom";

function getURLsFromHTML(htmlBody: string, baseURL: string): string[] {
  const urls: string[] = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {}
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {}
    }
  }
  return urls;
}

function filterLinks(links: string[], template: string): string[] {
  const filteredLinks: string[] = [];
  const regex = new RegExp(template);
  for (const link of links) {
    if (!regex.test(link)) continue;
    filteredLinks.push(link);
  }
  return filteredLinks;
}

function scrapInformation(htmlBody: string) {
  const dom = new JSDOM(htmlBody);
  const table = dom.window.document.querySelector(".resultsarchive-table");
  const data: Record<string, string>[] = [];
  if (table) {
    const ths = table.querySelectorAll("th");
    const titles: string[] = [];
    for (const th of ths) {
      const title = (th.textContent || "").trim();
      titles.push(title);
    }
    const trs = table.querySelectorAll("tr");
    for (const tr of trs) {
      const obj: Record<string, string> = {};
      const cells = tr.querySelectorAll("td");
      for (let j = 0; j < cells.length; j++) {
        obj[titles[j]] = (cells[j].textContent || "")
          .replace(/(\n\s+)/g, " ")
          .trim();
      }
      delete obj[""];
      if (cells.length) data.push(obj);
    }
  }
  return data;
}

async function fetchHTML(link: string): Promise<string> {
  try {
    const response = await fetch(link);
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("text/html")) return "";
    const htmlBody = await response.text();
    return htmlBody;
  } catch (error) {
    return "";
  }
}

export { getURLsFromHTML, filterLinks, scrapInformation, fetchHTML };
