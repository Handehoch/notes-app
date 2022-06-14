const fs = require('fs');
const chalk = require('chalk');

class CommandManager {

  add(title, body) {
    const notes = this.#loadNotes();
    const duplicate = notes.find(note => note.title === title);

    if(!duplicate) {
      notes.push({
        title,
        body
      });

      this.#saveNotes(notes);
      console.log(chalk.green.inverse('New note!'));
    } else {
      console.log(chalk.red.inverse('Duplicate!'));
    }
  }

  remove(title) {
    const notes = this.#loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if(notes.length === 0 || notes.length === notesToKeep.length){
      console.log(chalk.red.inverse('No note found!'));
      return;
    }

    this.#saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note removed!'));
  }

  list() {
    const notes = this.#loadNotes();

    console.log(chalk.green.inverse('Your notes:'));

    notes.forEach(note => console.log(this.#getOutput(note)));
  }

  read(title) {
    const notes = this.#loadNotes();
    const current = notes.find(note => note.title === title);

    if(!current) {
      console.log(chalk.red.inverse('No such note.'));
      return;
    }

    console.log(this.#getOutput(current));

  }

  #loadNotes() {
    try {
      return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch (e) {
      return [];
    }
  }

  #saveNotes(notes) {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
  }

  #getOutput(note) {
    return chalk.blue.inverse(`Title: ${note.title}`) + ` Content: ${note.body}`;
  }
}

module.exports = CommandManager;