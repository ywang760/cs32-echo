export default function createErrorMessage(message: string): HTMLElement {
  const error = document.createElement("p");
  error.className = "history-content";
  error.style.color = "red";
  error.innerHTML = message;
  return error;
}