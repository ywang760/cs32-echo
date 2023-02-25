export default function createErrorMessage(message) {
    var error = document.createElement("p");
    error.className = "history-content";
    error.style.color = "red";
    error.innerHTML = message;
    return error;
}
