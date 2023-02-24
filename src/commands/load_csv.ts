import {exampleCSV1, exampleCSV2} from "../mockedJson.js";

let loadedData: Map<string, HTMLElement> = new Map();
let haveHeader: boolean;

function mockParse(datapath: string): Array<Array<string>> {
  // mock data
  let parsedData = exampleCSV2;
  haveHeader = true;
  return parsedData.map((row) => row.map((cell) => cell.toString()));
}

let data: HTMLElement | undefined;
let parsedData: Array<Array<string>> | undefined;

function loadF(input: string): HTMLElement {
  data = loadedData.get(input);
  const message = document.createElement("p");
  message.className = "history-content";
  if (data == undefined) {
    parsedData = mockParse(input);
    // const data: HTMLElement = displayData(parsedData);
    // loadedData.set(input, data);
    message.innerHTML = "new data has been loaded";
  }
  else{
    message.innerHTML = "old data has been loaded";
  }
  return message;
}

export {loadF, loadedData, parsedData};
