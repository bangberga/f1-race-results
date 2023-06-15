import fs from "fs";
import { fetchHTML, scrapInformation } from "../crawl";
import { years } from "./constants";

async function writeData(links: string[], outputFile: string) {
  try {
    const htmlBodies = await Promise.all(links.map((link) => fetchHTML(link)));
    const data = htmlBodies.map((htmlBody, i) => ({
      year: years[i],
      data: scrapInformation(htmlBody),
    }));
    const content = `const data = ${JSON.stringify(
      data
    )}; export default data;`;

    fs.writeFile(outputFile, content, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("Get data and write successully");
    });
  } catch (error) {
    console.log(error);
  }
}

function getData(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      const startIndex = data.indexOf("[");
      const endIndex = data.lastIndexOf("]");
      const jsonData = data.substring(startIndex, endIndex + 1);
      const parsedData = JSON.parse(jsonData);
      resolve(parsedData);
    });
  });
}

export { writeData, getData };
