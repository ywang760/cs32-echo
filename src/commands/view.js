var haveHeader;
function displayData(parsedData) {
    var table = document.createElement("table");
    table.className = "history-content";
    if (haveHeader) {
        var header_1 = document.createElement("tr");
        parsedData[0].forEach(function (cell) {
            var cellElement = document.createElement("th");
            cellElement.innerHTML = cell;
            header_1.appendChild(cellElement);
        });
        table.appendChild(header_1);
        parsedData = parsedData.slice(1);
    }
    parsedData.forEach(function (row) {
        var rowElement = document.createElement("tr");
        row.forEach(function (cell) {
            var cellElement = document.createElement("td");
            cellElement.innerHTML = cell;
            rowElement.appendChild(cellElement);
        });
        table.appendChild(rowElement);
    });
    return table;
}
function viewF(parsedData) {
    var data = displayData(parsedData);
    return data;
}
export { viewF };
