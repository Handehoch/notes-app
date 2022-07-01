const CommandManager = require('./notes.js');
const yargs = require('yargs');

yargs.version('1.1.0');
const manager = new CommandManager();

//Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    manager.add(argv.title, argv.body)
  },
});

//Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove an existing note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    manager.remove(argv.title);
  },
});

//Create list command
yargs.command({
  command: 'list',
  describe: 'Showing up list of notes',
  handler() {
    manager.list();
  },
});

//Create read command
yargs.command({
  command: 'read',
  describe: 'Reading the note',
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "String",
    }
  },
  handler(argv) {
    manager.read(argv.title);
  },
});

yargs.parse();
// console.log(yargs.argv);