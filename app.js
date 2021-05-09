//variables
const Manager = require('./jsfiles/Manager');
const Engineer = require('./jsfiles/Engineer');
const Intern = require('./jsfiles/Intern');
const inquirer = require('inquirer');
const path = require('path');
const util = require('util');
const fs = require('fs');
const Logger = require('./logger');
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./jsfiles/htmlRenderer');

const log = new Logger(); 