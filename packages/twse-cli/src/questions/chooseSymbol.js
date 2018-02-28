import prompt from '../prompt';
import { SYMBOLLIST_ADD, SYMBOLLIST_BACK } from '../locales/en';

export default symbols => {
    const questions = [
        {
            type: 'list',
            name: 'symbol',
            message: 'Add/remove your symbol',
            pageSize: 50,
            choices: [SYMBOLLIST_ADD, ...symbols.map(s => `${s.code} ${s.name}`), SYMBOLLIST_BACK]
        }
    ];
    return prompt.ask(questions);
};
