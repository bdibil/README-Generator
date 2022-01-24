const inquirer = require('inquirer');
const fs = require('fs');


// Genearate OUTPUT_README.md structure
const genReadme = ({title, desc}) => {
    return `# ${title} \n\n## Description  \n${desc} \n\n## Table of Contents    \n\n## Installation     \n\n## Usage    \n\n## License  \n\n## Contributing     \n\n## Tests     \n\n## Questions `
}


// Ask User info about their project and write the OUTPUT_README.md
const askInfo = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your project Title?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Briefly describe your project:',
            name: 'desc',
        },
    ])
        .then((response) => {
            fs.writeFile('OUTPUT_README.md', genReadme(response), (err) => {
                if (err) throw err
            })
        });
    };
    
// Call askInfo function 
askInfo()

