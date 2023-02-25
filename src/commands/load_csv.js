import { exampleCSV2 } from "../mockedJson.js";
import createErrorMessage from "../utils/errorMessage.js";
var loadedData = new Map();
var haveHeader;
var thisData;
function mockParse(datapath) {
    // mock data
    var parsedData = exampleCSV2;
    haveHeader = true;
    return parsedData.map(function (row) { return row.map(function (cell) { return cell.toString(); }); });
}
function loadF(input) {
    var message = document.createElement("p");
    message.className = "history-content";
    if (typeof input == "undefined") {
        return createErrorMessage("load error: No datapath provided");
    }
    var data = loadedData.get(input);
    if (data == undefined) {
        thisData = mockParse(input);
        loadedData.set(input, thisData);
        message.innerHTML = "New data have been loaded";
    }
    else {
        thisData = data;
        message.innerHTML = "Old data have been loaded";
    }
    return message;
}
export { loadF, thisData, haveHeader };
