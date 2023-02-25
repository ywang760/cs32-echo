import { haveHeader, thisData } from "./load_csv.js";
import createErrorMessage from "../utils/errorMessage.js";
function convertRow(row, headerRow) {
    var rowElement = document.createElement("tr");
    row.forEach(function (cell) {
        var cellElement = document.createElement("td");
        cellElement.innerHTML = cell;
        cellElement.style.fontWeight = headerRow ? "bold" : "normal";
        rowElement.appendChild(cellElement);
    });
    return rowElement;
}
export default function viewF() {
    // error check for empty data
    if (typeof thisData == "undefined") {
        return createErrorMessage("view error: Data not loaded");
    }
    var data = thisData;
    var table = document.createElement("table");
    table.className = "history-content";
    if (haveHeader) {
        table.append(convertRow(data[0], true));
        data = data.slice(1);
    }
    data.forEach(function (row) {
        table.appendChild(convertRow(row, false));
    });
    return table;
}
