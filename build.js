const Mustache = require('mustache');
const fs = require('fs-extra');
const path = require('path');

const BUILD_DIR = 'dist';

// Create the build directory if it doesn't exist
if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR);
}

const index_template = fs.readFileSync('index.html', 'utf-8')
const template_card = fs.readFileSync('templates/card_talk.mustache', 'utf-8')
const talks_data = fs.readJsonSync("talks_data.json")

function getTalkDataFromID(talk_id) {
    return talks_data.filter(d => d.id === talk_id)[0]
}

function renderSection(talks_ids) {
    return talks_ids.map(getTalkDataFromID).map(data =>
        Mustache.render(template_card, data)
    )
}

let rendered_index = Mustache.render(index_template,
    {
        "section_1_talks": renderSection([0, 1]).map(e => ({"card_talk": e})),
        "section_2_talks": renderSection([2]).map(e => ({"card_talk": e})),
    }
)

fs.writeFileSync(`${BUILD_DIR}/index.html`, rendered_index, 'utf-8')

// Copy the assets/vendors into the build directory.
// Define the source directories and the destination directory
const sourceDirs = ['assets', 'vendors'];
const destinationDir = BUILD_DIR;

// Create the destination directory if it doesn't exist
fs.ensureDirSync(destinationDir);

// Copy the source directories to the destination directory
sourceDirs.forEach((dir) => {
    const sourcePath = path.join(__dirname, dir);
    const destinationPath = path.join(__dirname, destinationDir, dir);

    // Copy the directory recursively
    fs.copySync(sourcePath, destinationPath);
});


console.log('Build complete.');