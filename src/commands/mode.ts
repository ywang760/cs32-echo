import createErrorMessage from "../utils/errorMessage.js";

export default function modeF(input: string): HTMLElement {
  const mode: HTMLElement = document.createElement("p");
  mode.className = "history-content";
  if (input == undefined) {
    return createErrorMessage("mode error: No mode provided");
  }
  if (input == "brief" || input == "b") {
    mode.innerHTML = "Mode changed to brief";
    return mode;
  } else if (input == "verbose" || input == "v") {
    mode.innerHTML = "Mode changed to verbose";
    return mode;
  } else {
    return createErrorMessage(`Unknown mode: ${input}`);
  }
}
