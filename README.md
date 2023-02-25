# cs32 Echo project

## Project details

Project name: Echo

Team members and contributions: Yutong Wang (ywang760) and Raghav Puri (rpuri6)

Total estimated time: 12 hours

Link to repo: https://github.com/ywang760/cs32-echo

## Design Choices

The main.ts file includes the function to update and render repl history in the space.
If the input toggles mode, it will also render the mode in the space.
The executeCommand function will consider the first item in the input as command, and the remaining as arguments.
The arguments will be passed to the command function, which is stored in a dictionary containing all commands.
This ensures generality of the command function, and the command function can be easily added to the dictionary.

The commands package contains all the built-in commands, which currently includes mode, load_csv, view, and search.

## Errors/Bugs

There are not any known bugs or errors.

## Testing

The main.test.ts file contains the test cases for the main function.
It includes tests for the following cases:

- If the input is empty, the history should not be updated.
- If the input toggles mode, the mode should be updated.
- If the input is a load_csv command, the csv file should be loaded.
- If the input is a view command, the table should be rendered.
- If the input is a search command, the search result should be rendered.

## How to run

To run the project, open the index.html file in the browser.
Users can type in the command in the input box, and press enter or click the submit button to execute the command.
The command history will be rendered in the space.

### Command specifications:

### 1. ``mode <mode name>``

Toggles between the two modes, brief and verbose.
``<mode name>`` can be either ``brief``, ``b``, ``verbose``, or ``v``.

### 2. ``load_csv <file name>``

Loads the csv file with the given file name.
The file name should be a string without spaces.

### 3. ``view``

Renders the table loaded immediately before the view command.

### 4. ``search <column name> <search term>``

Renders the search result of the search term in the given column.
The column name should be a string without spaces or a column index.



