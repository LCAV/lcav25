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

function getTalkDataFromSpeaker(speaker) {
    let ret = talks_data.filter(d => d.talker_name === speaker)[0]
    if (ret === undefined){
        console.warn("⚠ " +speaker + "is missing their talk infos.")
        return null
    }
    return ret
}

function renderSection(speakers) {
    // filters out null values, talks with missing data entry.
    return speakers.map(getTalkDataFromSpeaker).filter(x => !!x).map(data =>
        Mustache.render(template_card, data)
    )
}

let rendered_index = Mustache.render(index_template, {
    "section_1_talks": renderSection(["Richard Baraniuk", "Pierre Dillenbourg", "Gunnar Karlsson", "Marta Martinez-Camara", "Miranda Krekovic", "Andrea Ridolfi"]).map(e => ({"card_talk": e})),
    "section_2_talks": renderSection(["Ivan Dokmanic", "Pier Luigi Dragotti", "Patrick Van de Walle", "Thierry Blu", "Michael Gastpar"]).map(e => ({"card_talk": e})),
    "section_3_talks": renderSection(["Olivier Roy", "Henri Dubois-Ferriere", "Michalina Pacholska", "Loïc Baboulaz"]).map(e => ({"card_talk": e})),
    "section_4_talks": renderSection(["Minh Do", "Vivek Goyal", "Antonio Ortega", "Yue M. Lu", "Amin Karbasi"]).map(e => ({"card_talk": e})),
    "section_5_talks": renderSection(["Robert-Jan Smits", "Angelika Kalt", "Sabine Süsstrunk", "Alan Park"]).map(e => ({"card_talk": e})),
    "section_6_talks": renderSection(["Stéphane Mallat"]).map(e => ({"card_talk": e})),
});

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