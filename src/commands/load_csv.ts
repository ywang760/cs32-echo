import {exampleCSV1, exampleCSV2} from "../mockedJson.js";
import createErrorMessage from "../utils/errorMessage.js";

let loadedData: Map<string, Array<Array<string>>> = new Map();
let haveHeader: boolean;
let thisData: Array<Array<string>>;

function mockParse(datapath: string): Array<Array<string>> {
  // mock data
  let parsedData = exampleCSV2;
  haveHeader = true;
  return parsedData.map((row) => row.map((cell) => cell.toString()));
}

function loadF(input: string): HTMLElement {
  const message = document.createElement("p");
  message.className = "history-content";
  if (typeof input == "undefined") {
    return createErrorMessage("load error: No datapath provided");
  }
  let data: Array<Array<string>> | undefined = loadedData.get(input);

  if (data == undefined) {
    thisData = mockParse(input);
    loadedData.set(input, thisData);
    message.innerHTML = "New data have been loaded";
  } else {
    thisData = data;
    message.innerHTML = "Old data have been loaded";
  }
  return message;
}

export {loadF, thisData, haveHeader};
