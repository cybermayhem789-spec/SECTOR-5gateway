// scripts.js

// Interactive terminal functionality
class InteractiveTerminal {
    constructor() {
        this.commandHistory = [];
        this.currentCommandIndex = -1;
        this.commands = {
            help: this.help,
            status: this.status,
            modules: this.modules,
            start: this.start,
            progress: this.progress,
            achievement: this.achievement,
            clear: this.clear
        };
        this.init();
    }

    init() {
        this.renderBootSequence();
        this.loadFromLocalStorage();
    }

    renderBootSequence() {
        const terminal = document.getElementById('terminal');
        terminal.innerHTML = '<p>Booting up...</p>';
        setTimeout(() => {
            terminal.innerHTML += '<p>Loading modules...</p>';
            this.showPrompt();
        }, 2000);
    }

    showPrompt() {
        const terminal = document.getElementById('terminal');
        terminal.innerHTML += '<p> Type your command: <input type="text" id="userInput" autofocus /></p>';
        document.getElementById('userInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(e.target.value);
                e.target.value = '';
            }
        });
    }

    executeCommand(command) {
        this.commandHistory.push(command);
        this.currentCommandIndex = this.commandHistory.length;
        if (this.commands[command]) {
            this.commands[command].call(this);
        } else {
            this.showMessage('Command not found. Type "help" for a list of commands.');
        }
        this.showPrompt();
    }

    help() {
        this.showMessage('Available commands: help, status, modules, start, progress, achievement, clear');
    }

    status() {
        this.showMessage('System Status: Running');
    }

    modules() {
        this.showMessage('Modules loaded: Module1, Module2');
    }

    start() {
        this.showMessage('Starting the system...');
    }

    progress() {
        this.showMessage('Progress: 50%');
    }

    achievement() {
        this.showMessage('Achievements: None yet!');
    }

    clear() {
        document.getElementById('terminal').innerHTML = '';
    }

    showMessage(message) {
        const terminal = document.getElementById('terminal');
        terminal.innerHTML += `<p>${message}</p>`;
    }

    saveToLocalStorage() {
        localStorage.setItem('commandHistory', JSON.stringify(this.commandHistory));
    }

    loadFromLocalStorage() {
        const history = JSON.parse(localStorage.getItem('commandHistory')) || [];
        this.commandHistory = history;
    }
}

// Initialize the terminal
const terminal = new InteractiveTerminal();
// CSS and animations can be added separately for smooth effects and typing animations.

