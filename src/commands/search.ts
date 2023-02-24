function searchF(column:string, value:string[], parsedData:Array<Array<string>>): HTMLElement{
    console.log(value);
    console.log(column);
    if (typeof parsedData === "undefined"){
        const retRow = document.createElement("tr");
        retRow.innerHTML = "Data not loaded";
        return retRow;
    }
    const sText = value.join(" ");
    const firstRow = parsedData[0];
    const foundTable: HTMLElement | string = document.createElement("table");
    foundTable.className = "history-content";
    let index = 0;
    let searchIndex = 0;
    console.log(parsedData)
    console.log(typeof column);
    if(parseInt(column)){
        searchIndex = parseInt(column) - 1;
        console.log("SIndex");
        console.log(searchIndex)
    }
    else{
        firstRow.forEach((cell) => {
            if(cell == column){
                searchIndex = index;
            }
            index = index + 1;
        });
    }
    console.log(searchIndex);
    parsedData.forEach((row) => {
        let i = 0;
        let foundFlag = 0;
        const rowElement: HTMLElement = document.createElement("tr");
        row.forEach((cell) => {
            const cellElement: HTMLElement = document.createElement("td")
            if(i == searchIndex){
                if(cell == sText){
                    foundFlag = 1;
                }
            }
            cellElement.innerHTML = cell;
            rowElement.appendChild(cellElement)
            i = i + 1;
        });
        if(foundFlag==1){
            foundTable.appendChild(rowElement);
        }
    })
    return foundTable;
}

export {searchF}