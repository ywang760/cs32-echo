export default function modeF(input) {
  var mode = document.createElement("p");
  mode.className = "history-content";
  if (input == "brief" || input == "b") {
    mode.innerHTML = "Mode changed to brief";
    return mode;
  } else if (input == "verbose" || input == "v") {
    mode.innerHTML = "Mode changed to verbose";
    return mode;
  } else {
    mode.innerHTML = "Unknown mode: ".concat(input);
    return mode;
  }
}
