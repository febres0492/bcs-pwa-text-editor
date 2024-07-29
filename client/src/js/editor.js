// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
    constructor() {
        const localData = localStorage.getItem('content');

        // check if CodeMirror is loaded
        if (typeof CodeMirror === 'undefined') {
            throw new Error('CodeMirror is not loaded');
        }

        this.editor = CodeMirror(document.querySelector('#main'), {
            value: '',
            mode: 'javascript',
            theme: 'monokai',
            lineNumbers: true,
            lineWrapping: true,
            autofocus: true,
            indentUnit: 2,
            tabSize: 2,
        });

        // When the editor is ready, set the value to whatever is stored in indexeddb.
        // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
        getDb().then((data) => {
            // fix for when data is an array
            let dt = data[0].content || localData || header;
            console.info('Loaded data from IndexedDB, injecting into editor', )
            console.log('data',dt)
            this.editor.setValue(dt)
        });

        // debouncer function
        const debounce = (func, wait) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        };

        //  putDb debouncer
        const debouncedPutDb = debounce(() => {
            putDb(localStorage.getItem('content'));
        }, 1000);

        this.editor.on('change', () => {
            console.log('The editor content has changed');
            localStorage.setItem('content', this.editor.getValue());

            // the changes would not save if the user clicked refresh right after typing
            // the event editor.on('blur') did not trigger when the user clicked refresh
            // so i added a debounce function to save the data after a second
            debouncedPutDb()
        });

        // Save the content of the editor when the editor itself loses focus
        this.editor.on('blur', () => {
            console.log('The editor has lost focus');
            putDb(localStorage.getItem('content'));
        });
    }
}