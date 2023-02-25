import {haveHeader, thisData} from "./load_csv.js";
import createErrorMessage from "../utils/errorMessage.js";

function convertRow(row: Array<string>, headerRow: boolean): HTMLElement {
  const rowElement: HTMLElement = document.createElement("tr");
  row.forEach((cell: string) => {
    const cellElement: HTMLElement = document.createElement("td");
    cellElement.innerHTML = cell;
    cellElement.style.fontWeight = headerRow ? "bold" : "normal";
    rowElement.appendChild(cellElement);
  });
  return rowElement;
}

export default function viewF(): HTMLElement {
  // error check for empty data
  if (typeof thisData == "undefined") {
    return createErrorMessage("view error: Data not loaded");
  }

  let data: Array<Array<string>> = thisData;
  const table: HTMLElement = document.createElement("table");
  table.className = "history-content";
  if (haveHeader) {
    table.append(convertRow(data[0], true))
    data = data.slice(1);
  }
  data.forEach((row: Array<string>) => {
        table.appendChild(convertRow(row, false))
      }
  );
  return table;

}
