// all exports from main will now be available as main.X
import * as main from "./main";
import { history } from "./main";
// Lets us use DTL's query library
import { screen } from '@testing-library/dom';
// Lets us send user events (like typing and clicking)
import userEvent from '@testing-library/user-event';
// Template HTML for test running.
// Notice that we don't need to include everything in the page.
// Also, notice that we've preserved the metadata...
var startHTML = "    <div class=\"repl\">\n      <!-- Prepare a region of the page to hold the command history -->\n      <div class=\"repl-history\"></div>\n      <hr />\n      <!-- Prepare a region of the page to hold the command input box -->\n      <div class=\"repl-input\">\n        <p id=\"mode\">Current mode: brief</p>\n        <label for=\"repl-command-box\">Enter command here</label>\n        <input\n          type=\"text\"\n          id=\"repl-command-box\"\n          placeholder=\"Enter command here\"\n        />\n        <button id=\"submit-button\">Submit</button>\n      </div>\n    </div>";
/////////////////////////////////////////////////////////////
var submitButton;
// Don't neglect to give the type for _every_ identifier.
var input;
// Setup! This runs /before every test function/
beforeEach(function () {
    // (1) Restore the program's history to empty
    main.clearHistory();
    // (2) Set up a mock document containing the skeleton that
    // index.html starts with. This is refreshed for every test.
    document.body.innerHTML = startHTML;
    // (3) Find the elements that should be present at the beginning
    // Using "getBy..." will throw an error if this element doesn't exist.
    submitButton = screen.getByText("Submit");
    input = screen.getByText("Enter command here");
});
/////////////////////////////////////////////////////////////
// Some example tests
/////////////////////////////////////////////////////////////
/**
 * Test that the history is updated when a command is submitted.
 */
test('unknown command', function () {
    userEvent.type(input, "random");
    submitButton.addEventListener("click", function () { return main.updateAndRenderHistory(); });
    userEvent.click(submitButton);
    var result = screen.getAllByText("Unknown command: random");
    expect(result.length).toBe(1);
    expect(history.length).toBe(1);
    expect(history.pop()).toBe("random");
});
/**
 * Test that the mode is changed when a valid mode command is submitted.
 */
test('mode command', function () {
    userEvent.type(input, "mode v");
    submitButton.addEventListener("click", function () { return main.updateAndRenderHistory(); });
    userEvent.click(submitButton);
    expect(screen.getAllByText("Current mode: verbose").length).toBe(1);
    expect(screen.getAllByText("Mode changed to verbose").length).toBe(1);
    expect(history.length).toBe(1);
    expect(history.pop()).toBe("mode v");
});
/**
 * Test that the data is loaded when a valid load command is submitted.
 */
test('load command', function () {
    userEvent.type(input, "load_csv data.csv");
    submitButton.addEventListener("click", function () { return main.updateAndRenderHistory(); });
    userEvent.click(submitButton);
    expect(screen.getAllByText("new data has been loaded").length).toBe(1);
    expect(history.length).toBe(1);
    expect(history.pop()).toBe("load_csv data.csv");
});
/**
 * Test that the data is displayed when a valid view command is submitted.
 */
test('view command', function () {
    submitButton.addEventListener("click", function () { return main.updateAndRenderHistory(); });
    userEvent.type(input, "load_csv data.csv");
    userEvent.click(submitButton);
    userEvent.type(input, "view");
    userEvent.click(submitButton);
    expect(screen.getAllByText("new data has been loaded").length).toBe(1);
    expect(screen.getAllByText("Name").length).toBe(1);
    expect(history.length).toBe(2);
    expect(history.pop()).toBe("view");
});
/**
 * Test that the data is searched when a valid search command is submitted.
 */
test('search command', function () {
    submitButton.addEventListener("click", function () { return main.updateAndRenderHistory(); });
    userEvent.type(input, "load_csv data.csv");
    userEvent.click(submitButton);
    userEvent.type(input, "search Name John");
    userEvent.click(submitButton);
    expect(screen.getAllByText("new data has been loaded").length).toBe(1);
    expect(screen.getAllByText("John").length).toBe(1);
    expect(screen.getAllByText("30").length).toBe(1);
    expect(history.length).toBe(2);
    expect(history.pop()).toBe("search Name John");
});
