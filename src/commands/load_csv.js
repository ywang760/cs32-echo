import { exampleCSV2 } from "../mockedJson.js";
var loadedData = new Map();
var haveHeader;
function mockParse(datapath) {
    // mock data
    var parsedData = exampleCSV2;
    haveHeader = true;
    return parsedData.map(function (row) { return row.map(function (cell) { return cell.toString(); }); });
}
var data;
var parsedData;
function loadF(input) {
    data = loadedData.get(input);
    var message = document.createElement("p");
    message.className = "history-content";
    if (data == undefined) {
        parsedData = mockParse(input);
        // const data: HTMLElement = displayData(parsedData);
        // loadedData.set(input, data);
        message.innerHTML = "new data has been loaded";
    }
    else {
        message.innerHTML = "old data has been loaded";
    }
    return message;
}
export { loadF, loadedData, parsedData };
