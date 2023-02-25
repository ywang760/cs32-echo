import modeF from "./commands/mode.js";
import {loadF} from "./commands/load_csv.js";
import searchF from "./commands/search.js";
import viewF from "./commands/view.js";
import createErrorMessage from "./utils/errorMessage.js";

let m = "brief"; // mode, initially set to brief
let history: Array<String> = []; // history of commands, only for testing purposes
let maybeInput: HTMLElement | null;
let commands: Map<String, Function> = new Map();
commands.set("mode", modeF);
commands.set("load_csv", loadF);
commands.set("load", loadF);
commands.set("view", viewF);
commands.set("search", searchF);

/**
 * This function is called when the page is loaded. It sets up the event listeners for the input box and submit button.
 */
window.onload = () => {
  maybeInput = document.getElementById("repl-command-box");
  if (maybeInput == null) {
    console.log("Couldn't find input element");
  } else if (!(maybeInput instanceof HTMLInputElement)) {
    console.log(`Found element ${maybeInput}, but it wasn't an input`);
  } else {
    maybeInput.focus();
    maybeInput.addEventListener("keypress", (event: KeyboardEvent) => {
      if (event.key == "Enter") {
        updateAndRenderHistory(); // submit on enter
      }
    });
  }
  // listen for submit event
  const submitButton: HTMLElement | null = document.getElementById(
      "submit-button"
  );
  if (submitButton == null) {
    console.log("Couldn't find submit button");
  } else if (!(submitButton instanceof HTMLButtonElement)) {
    console.log(`Found element ${submitButton}, but it wasn't a button`);
  } else {
    submitButton.addEventListener("click", () => updateAndRenderHistory());
  }

  // renders command instructions

};


/**
 * This function updates the history and renders the history, called when the submit button is clicked or enter is pressed.
 * If the input is a mode command, it will also update the mode.
 */
function updateAndRenderHistory() {
  const input: string = updateHistory();
  const modePattern = /^mode\s+(b(?:rief)?|v(?:erbose)?)$/i; // check if input is mode command
  if (modePattern.test(input)) {
    renderMode(input);
  }
  if (input !== "") {
    renderHistory(input);
  }
}

/**
 * This function updates the history and returns the input.
 */
function updateHistory(): string {
  maybeInput = document.getElementById("repl-command-box");
  if (maybeInput == null) {
    console.log("Couldn't find input element");
    return "";
  } else if (!(maybeInput instanceof HTMLInputElement)) {
    console.log(`Found element ${maybeInput}, but it wasn't an input`);
    return "";
  } else {
    const input: string = maybeInput.value;
    if (input !== "") {
      console.log(`Submitting command: ${input}`);
      history.push(input);
      console.log(history);
      maybeInput.value = "";
    } else {
      console.log("No input.");
    }
    return input;
  }
}

/**
 * This function updates and renders the mode if the input is "mode [b|brief|v|verbose]".
 * @param input The input string.
 */
function renderMode(input: string) {
  const mode: HTMLElement | null = document.getElementById("mode");
  if (mode == null) {
    console.log("Couldn't find mode element");
  } else if (!(mode instanceof HTMLParagraphElement)) {
    console.log(`Found element ${mode}, but it wasn't a paragraph`);
  } else {

    const tempMode: string = input.split(" ")[1].toLowerCase();
    if (tempMode == "b" || tempMode == "brief") {
      m = "brief";
    } else if (tempMode == "v" || tempMode == "verbose") {
      m = "verbose";
    } else {
      console.log(`Unknown mode ${tempMode}`);
    }
    mode.innerHTML = `Mode: ${m}`;
    console.log(`Mode set to ${m}`);

  }
}

/**
 * This function executes the command and returns the output. It tries to fetch the function associated with the command and executes that function.
 * @param input The input string.
 */
function executeCommand(input: string): HTMLElement {
  const parsedInput: Array<string> = input.split(/\s/);
  const command: string = parsedInput[0].toLowerCase();
  const args: Array<string> = parsedInput.slice(1);
  const foo: Function | undefined = commands.get(command);
  if (foo == undefined) {
    return createErrorMessage(`Unknown command: ${input}`)
  } else {
    console.log("Arguments are " + args);
    return foo(...args);
  }
}

/**
 * This function renders the history. It calls executeCommand to get the output.
 * @param input A non-empty input string.
 */
function renderHistory(input: string) {
  const oldHistory = document.getElementsByClassName("repl-history")[0] as HTMLElement;
  if (input === "clear") {
    oldHistory.innerHTML = "";
    return;
  }

  const newElement: HTMLElement = executeCommand(input);
  if (m == "brief") {
    oldHistory.appendChild(newElement);
    oldHistory.appendChild(document.createElement("hr"));
  } else if (m == "verbose") {
    const command: HTMLElement = document.createElement("p");
    command.className = "history-content";
    command.innerHTML = "Command: " + input;
    oldHistory.appendChild(command);
    const output: HTMLElement = document.createElement("p");
    output.className = "history-content";
    output.innerHTML = "Output: ";
    output.appendChild(newElement);
    oldHistory.appendChild(output);
    oldHistory.appendChild(document.createElement("hr"));
  }
  oldHistory.scrollTop = oldHistory.scrollHeight;
}

/**
 * This function clears the history.
 */
function clearHistory() {
  history = [];
}

export {history, clearHistory, updateAndRenderHistory};
