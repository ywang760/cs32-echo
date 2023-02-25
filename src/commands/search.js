import { haveHeader, thisData } from "./load_csv.js";
import createErrorMessage from "../utils/errorMessage.js";
/**
 * This function searches for a query in a column and returns the first row that contains the query.
 * @param columnName
 * @param query
 */
export default function searchF(columnName, query) {
    console.log("Column is " + columnName);
    console.log("Query is " + query);
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
    var searchIndex = 0;
    if (parseInt(columnName)) {
        searchIndex = parseInt(columnName) - 1;
        if (searchIndex < 0 || searchIndex >= thisData[0].length) {
            return createErrorMessage("search error: Column index out of range");
        }
    }
    else {
        if (!haveHeader) {
            return createErrorMessage("search error: No header found");
        }
        var headers = thisData[0];
        searchIndex = headers.findIndex(function (header) { return header.toLowerCase() === columnName.toLowerCase(); });
        if (searchIndex == -1) {
            return createErrorMessage("search error: Column name not found");
        }
    }
    console.log("Search index is " + searchIndex);
    // search for query
    var data = haveHeader ? thisData.slice(1) : thisData;
    var _loop_1 = function (row) {
        if (row[searchIndex] === query) {
            var foundTable = document.createElement("table");
            foundTable.className = "history-content";
            var rowElement_1 = document.createElement("tr");
            row.forEach(function (cell) {
                var cellElement = document.createElement("td");
                cellElement.innerHTML = cell;
                rowElement_1.appendChild(cellElement);
            });
            foundTable.appendChild(rowElement_1);
            return { value: foundTable };
        }
    };
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var row = data_1[_i];
        var state_1 = _loop_1(row);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    // if not found, return message
    var message = document.createElement("p");
    message.className = "history-content";
    message.innerHTML = "Query not found";
    return message;
}
