import modeF from "./commands/mode.js";
import { loadF } from "./commands/load_csv.js";
import searchF from "./commands/search.js";
import viewF from "./commands/view.js";
import createErrorMessage from "./utils/errorMessage.js";
var m = "brief"; // mode, initially set to brief
var history = []; // history of commands, only for testing purposes
var maybeInput;
var commands = new Map();
commands.set("mode", modeF);
commands.set("load_csv", loadF);
commands.set("load", loadF);
commands.set("view", viewF);
commands.set("search", searchF);
/**
 * This function is called when the page is loaded. It sets up the event listeners for the input box and submit button.
 */
window.onload = function () {
    maybeInput = document.getElementById("repl-command-box");
    if (maybeInput == null) {
        console.log("Couldn't find input element");
    }
    else if (!(maybeInput instanceof HTMLInputElement)) {
        console.log("Found element ".concat(maybeInput, ", but it wasn't an input"));
    }
    else {
        maybeInput.focus();
        maybeInput.addEventListener("keypress", function (event) {
            if (event.key == "Enter") {
                updateAndRenderHistory(); // submit on enter
            }
        });
    }
    // listen for submit event
    var submitButton = document.getElementById("submit-button");
    if (submitButton == null) {
        console.log("Couldn't find submit button");
    }
    else if (!(submitButton instanceof HTMLButtonElement)) {
        console.log("Found element ".concat(submitButton, ", but it wasn't a button"));
    }
    else {
        submitButton.addEventListener("click", function () { return updateAndRenderHistory(); });
    }
    // renders command instructions
};
/**
 * This function updates the history and renders the history, called when the submit button is clicked or enter is pressed.
 * If the input is a mode command, it will also update the mode.
 */
function updateAndRenderHistory() {
    var input = updateHistory();
    var modePattern = /^mode\s+(b(?:rief)?|v(?:erbose)?)$/i; // check if input is mode command
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
function updateHistory() {
    maybeInput = document.getElementById("repl-command-box");
    if (maybeInput == null) {
        console.log("Couldn't find input element");
        return "";
    }
    else if (!(maybeInput instanceof HTMLInputElement)) {
        console.log("Found element ".concat(maybeInput, ", but it wasn't an input"));
        return "";
    }
    else {
        var input = maybeInput.value;
        if (input !== "") {
            console.log("Submitting command: ".concat(input));
            history.push(input);
            console.log(history);
            maybeInput.value = "";
        }
        else {
            console.log("No input.");
        }
        return input;
    }
}
/**
 * This function updates and renders the mode if the input is "mode [b|brief|v|verbose]".
 * @param input The input string.
 */
function renderMode(input) {
    var mode = document.getElementById("mode");
    if (mode == null) {
        console.log("Couldn't find mode element");
    }
    else if (!(mode instanceof HTMLParagraphElement)) {
        console.log("Found element ".concat(mode, ", but it wasn't a paragraph"));
    }
    else {
        var tempMode = input.split(" ")[1].toLowerCase();
        if (tempMode == "b" || tempMode == "brief") {
            m = "brief";
        }
        else if (tempMode == "v" || tempMode == "verbose") {
            m = "verbose";
        }
        else {
            console.log("Unknown mode ".concat(tempMode));
        }
        mode.innerHTML = "Mode: ".concat(m);
        console.log("Mode set to ".concat(m));
    }
}
/**
 * This function executes the command and returns the output. It tries to fetch the function associated with the command and executes that function.
 * @param input The input string.
 */
function executeCommand(input) {
    var parsedInput = input.split(/\s/);
    var command = parsedInput[0].toLowerCase();
    var args = parsedInput.slice(1);
    var foo = commands.get(command);
    if (foo == undefined) {
        return createErrorMessage("Unknown command: ".concat(input));
    }
    else {
        console.log("Arguments are " + args);
        return foo.apply(void 0, args);
    }
}
/**
 * This function renders the history. It calls executeCommand to get the output.
 * @param input A non-empty input string.
 */
function renderHistory(input) {
    var oldHistory = document.getElementsByClassName("repl-history")[0];
    if (input === "clear") {
        oldHistory.innerHTML = "";
        return;
    }
    var newElement = executeCommand(input);
    if (m == "brief") {
        oldHistory.appendChild(newElement);
        oldHistory.appendChild(document.createElement("hr"));
    }
    else if (m == "verbose") {
        var command = document.createElement("p");
        command.className = "history-content";
        command.innerHTML = "Command: " + input;
        oldHistory.appendChild(command);
        var output = document.createElement("p");
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
export { history, clearHistory, updateAndRenderHistory };
