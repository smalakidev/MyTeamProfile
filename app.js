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

//* Blank array to be filled in with pushed constructors classes.
const teamMembersArray = [];

//* Introduction Question to open the applicaiton
const cliIntroQuestion = {
	type: 'list',
	message: `
        Welcome to the Team Profile Generator Application. 
        This program will allow the user to create an HTML based team profile display that will outline the team members as well as some brief information on each team member. 
        
        The user will be prompted to submit information on the team manager as well as select how many team members other than the manager are in the team. 
        The user will then submit information for each team member, choosing if they are an engineer or intern and submit additional information based on the team member role selection. 
        Do you wish to continue with this application?`,
	choices: ['Yes, Start Building Team', 'No, Close Application'],
	name: 'cliIntroQ',
};

//* Questions to be answered to fill in the manager constructor
const managerQuestions = [
	{
		type: 'input',
		message: "What is the Manager's name?",
		name: 'managerName',
	},
	{
		type: 'input',
		message: "What is the Manager's ID number?",
		name: 'managerId',
		validate: function (num) {
			numbers = /^[0-9]+$/.test(num);

			if (numbers) {
				log.green(`        ----------Number Formatting Accepted----------`);
				return true;
			} else {
				log.red(`        ----------Please enter a valid ID Number that does not include anything other than numbers (No letters or symbols)----------`);
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is the Manager's email?",
		name: 'manageEmail',
		validate: function (emailInput) {
			emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput);

			if (emailFormat) {
				log.green(`        ----------Email Formatting Accepted----------`);
				return true;
			} else {
				log.red(`        ----------Please enter a valid email----------`);
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is the Manager's office number?",
		name: 'managerOfficeNumber',
	},
];

//* questions that prompts the user if they want to add another team member.
const endManagerQuestions = {
	type: 'list',
	message: 'Would you like to add another team member to this team? Select Yes to add an Engineer or Intern team member or select No if no additional team members need to be added.',
	choices: ['Yes', 'No'],
	name: 'teamSize',
};

//* Question to ask which role the new team member should be mapped to.
const teamMemberRolePick = {
	type: 'list',
	message: 'Is this team member an Engineer or an Intern?',
	choices: ['Engineer', 'Intern'],
	name: 'teamMemberRoleType',
};

//* Questions for the engineer profile
const engineerQuestions = [
	{
		type: 'input',
		message: "What is this Engineer's name?",
		name: 'enginnerName',
	},
	{
		type: 'input',
		message: "What is this Engineer's ID number?",
		name: 'engineerId',
		validate: function (num) {
			numbers = /^[0-9]+$/.test(num);

			if (numbers) {
				log.green(`        ----------Number Formatting Accepted----------`);
				return true;
			} else {
				log.red(`        ----------Please enter a valid ID Number that does not include anything other than numbers (No letters or symbols)----------`);
				return false;
			}
		},
	},