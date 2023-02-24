function searchF(column, value, parsedData) {
    console.log(value);
    console.log(column);
    if (typeof parsedData === "undefined") {
        var retRow = document.createElement("tr");
        retRow.innerHTML = "Data not loaded";
        return retRow;
    }
    var sText = value.join(" ");
    var firstRow = parsedData[0];
    var foundTable = document.createElement("table");
    foundTable.className = "history-content";
    var index = 0;
    var searchIndex = 0;
    console.log(parsedData);
    console.log(typeof column);
    if (parseInt(column)) {
        searchIndex = parseInt(column) - 1;
        console.log("SIndex");
        console.log(searchIndex);
    }
    else {
        firstRow.forEach(function (cell) {
            if (cell == column) {
                searchIndex = index;
            }
            index = index + 1;
        });
    }
    console.log(searchIndex);
    parsedData.forEach(function (row) {
        var i = 0;
        var foundFlag = 0;
        var rowElement = document.createElement("tr");
        row.forEach(function (cell) {
            var cellElement = document.createElement("td");
            if (i == searchIndex) {
                if (cell == sText) {
                    foundFlag = 1;
                }
            }
            cellElement.innerHTML = cell;
            rowElement.appendChild(cellElement);
            i = i + 1;
        });
        if (foundFlag == 1) {
            foundTable.appendChild(rowElement);
        }
    });
    return foundTable;
}
export { searchF };
