import {haveHeader, thisData} from "./load_csv.js";
import createErrorMessage from "../utils/errorMessage.js";

/**
 * This function searches for a query in a column and returns the first row that contains the query.
 * @param columnName
 * @param query
 */
export default function searchF(columnName: string, query: string): HTMLElement {
  console.log(`Column is ` + columnName);
  console.log(`Query is ` + query);

  // error check for empty data
  if (typeof thisData == "undefined") {
    return createErrorMessage("search error: No data loaded");
  }

  // error check for missing arguments
  if (typeof columnName == "undefined" || typeof query == "undefined") {
    return createErrorMessage("search error: Missing arguments");
  }

  // parse column name into index
  // if column name is a number, use it as index
  // if column name is a string, find the index of the column name, ignore case
  let searchIndex: number = 0;
  if (parseInt(columnName)) {
    searchIndex = parseInt(columnName) - 1;
    if (searchIndex < 0 || searchIndex >= thisData[0].length) {
      return createErrorMessage("search error: Column index out of range");
    }
  } else {
    if (!haveHeader) {
      return createErrorMessage("search error: No header found");
    }
    const headers: Array<string> = thisData[0];
    searchIndex = headers.findIndex((header) => header.toLowerCase() === columnName.toLowerCase());
    if (searchIndex == -1) {
      return createErrorMessage("search error: Column name not found");
    }
  }
  console.log(`Search index is ` + searchIndex);

  // search for query
  let data: Array<Array<string>> = haveHeader ? thisData.slice(1) : thisData;
  for (let row of data) {
    if (row[searchIndex] === query) {
      const foundTable: HTMLElement = document.createElement("table");
      foundTable.className = "history-content";
      const rowElement: HTMLElement = document.createElement("tr");
      row.forEach((cell) => {
        const cellElement: HTMLElement = document.createElement("td");
        cellElement.innerHTML = cell;
        rowElement.appendChild(cellElement);
      });
      foundTable.appendChild(rowElement);
      return foundTable;
    }
  }

  // if not found, return message
  const message = document.createElement("p");
  message.className = "history-content";
  message.innerHTML = "Query not found";
  return message;
}
