let haveHeader: boolean;

function displayData(parsedData: Array<Array<string>>) {
    const table: HTMLElement = document.createElement("table");
    table.className = "history-content";
    if (haveHeader) {
      const header: HTMLElement = document.createElement("tr");
      parsedData[0].forEach((cell) => {
        const cellElement: HTMLElement = document.createElement("th");
        cellElement.innerHTML = cell;
        header.appendChild(cellElement);
      });
      table.appendChild(header);
      parsedData = parsedData.slice(1);
    }
    parsedData.forEach((row) => {
          const rowElement: HTMLElement = document.createElement("tr");
          row.forEach((cell) => {
            const cellElement: HTMLElement = document.createElement("td");
            cellElement.innerHTML = cell;
            rowElement.appendChild(cellElement);
          });
          table.appendChild(rowElement);
        }
    );
    return table;
}

function viewF(parsedData:Array<Array<string>>) :HTMLElement{
    const data: HTMLElement = displayData(parsedData);  
    return data
}

export {viewF};