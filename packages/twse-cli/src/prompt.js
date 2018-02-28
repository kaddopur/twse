import inquirer from 'inquirer';
import autocompletePrompt from 'inquirer-autocomplete-prompt';

inquirer.registerPrompt('autocomplete', autocompletePrompt);
inquirer.ask = inquirer.prompt.bind(inquirer);

export default inquirer;
