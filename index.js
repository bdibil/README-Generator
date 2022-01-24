// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// Array of questions for user input
const questions = ['What is your project Title? ', 'Briefly Describe your project: ', 'Describe how to Install the project: ', 'How do you Use your application? ', 'What are the Contribution guidelines? ', 'Describe the Tests used: ', 'What is your Github username? ', 'What is your Email address ? ', 'Please choose one of the following licenses:'];

// Constructor function for questions
function Question(type, message, name, choices) {
    this.type = type;
    this.message = message;
    this.name = name;
    this.choices = choices;
}

// Define all questions
const userTitle = new Question('input', questions[0], 'title')
const userDescription = new Question('input', questions[1], 'desc')
const userInstall = new Question('input', questions[2], 'inst')
const userUsage = new Question('input', questions[3], 'usage')
const userContribute = new Question('input', questions[4], 'contribute')
const userTests = new Question('input', questions[5], 'tests')
const userGithub = new Question('input', questions[6], 'git')
const userEmail = new Question('input', questions[7], 'email')

// Define all variables related to Licenses 
const licenseChoice = ['MIT', 'BSL-1.0', 'The Unlicense']
const userLicense = new Question('list', questions[8], 'license', licenseChoice)
let badge = ''
let licenseText = ['MIT', 'Boost 1.0', 'The Unlicense']
let licenseString = ''
let licenseTypes = ['mit.txt', 'boost.txt', 'unlicense.txt']


//    Function   to    Read   license's text
const readLicense = () =>{
    for (let i = 0; i < licenseTypes.length; i++) {
        fs.readFile(licenseTypes[i], 'utf8', (error, data) => 
            error ? console.error(error) : licenseText[i]=data
        );
    }
}


//   Function   to    Generate    OUTPUT_README.md    structure
const genReadme = ({ title, desc, inst, usage, license, contribute, tests, git, email }) => {
    switch (license) {
        case 'MIT':
            badge = '![GitHub](https://img.shields.io/github/license/bdibil/README-Generator?style=plastic)'
            let preLicense = `MIT License\n\nCopyright (c)  2022   [${git}](https://github.com/${git})\n\n`
            licenseString = preLicense+licenseText[0]
            break;
        case 'BSL-1.0':
            badge = '![GitHub](https://img.shields.io/github/license/bdibil/first-repos?style=plastic)'
            licenseString = licenseText[1]
            break;
        case 'The Unlicense':
            badge = '![GitHub](https://img.shields.io/github/license/bdibil/fakexcuse?style=plastic)'
            licenseString = licenseText[2]
            break;
        default:
            break;
    }

    return `# ${title} <${title}>

## Description  
${desc}

## Table of Contents 
- [Installation](#installation)
- [Usage](#usage)
- [License](#license) ${badge}
- [Contributing](#contributing)
- [Tests](#Tests)
- [Questions](#Questions)

## Installation
${inst}

## Usage    
${usage}

## License 
${licenseString}

## Contributing  
${contribute}

## Tests     
${tests}


## Questions 
If you have any questions about this application, 
you can find more information on my GitHub: [${git}](https://github.com/${git})  
or you can email me at: [${email}](mailto:${email})  

`
}


// Function   to    Ask User info about their project and call  >>  genReadme
const askInfo = () => {
    inquirer.prompt([userTitle, userDescription, userInstall, userUsage, userLicense, userContribute, userTests, userGithub, userEmail])
        .then((response) => {
            fs.writeFile('OUTPUT_README.md', genReadme(response), (err) => {
                if (err) throw err
            })
        });
};

// Call  >>  readLicense  &  askInfo   functions 
readLicense()
askInfo()