const Mustache = require('mustache')
const fs = require('fs-extra')
const path = require('path')

const BUILD_DIR = 'dist'

// Create the build directory if it doesn't exist
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR)
}

let index_template = fs.readFileSync('index.html', 'utf-8')
const template_card = fs.readFileSync('templates/card_talk.mustache', 'utf-8')
const talks_data = fs.readJsonSync('talks_data.json')

let speakers_missing = []
let speakers_used = []
let id_used = []

function getTalkDataFromSpeaker (speaker) {
  let ret = talks_data.filter(d => d.talker_name === speaker)[0]
  if (ret === undefined) {
    speakers_missing.push(speaker)
    console.warn('' + speaker + '')
    return null
  }
  speakers_used.push(speaker)
  id_used.push(ret['id'])
  return ret
}

function renderSection (speakers) {
  // filters out null values, talks with missing data entry.
  return speakers
    .map(getTalkDataFromSpeaker)
    .filter(x => !!x)
    .map(data => Mustache.render(template_card, data))
}

function render_time(starting_time_hour, starting_time_min, index) {
  let minutes = (starting_time_min + 20 * index)
  let hour = starting_time_hour
  if (minutes >= 60) {
    hour += 1
  }
  minutes = minutes % 60
  if (minutes === 0) {
    minutes = "00"
  }
    return `${hour}:${minutes}`
}

let speakers_session_1 = [
  'Pierre Dillenbourg',
  'Gunnar Karlsson',
  'Marta Martinez-Camara and Miranda Kreković',
  'Andrea Ridolfi'
];
let speakers_session_2 = [
  'Ivan Dokmanić',
  'Pier Luigi Dragotti',
  'Patrick Vandewalle',
  'Thierry Blu',
  'Michael Gastpar',
];
let speakers_session_3 = [
  'Michalina Pacholska',
  'Loïc Baboulaz',
  'Juri Ranieri',
  'Laurent Daudet',
  'Olivier Roy',
];
let speakers_session_4 = [
  'Frederike Dümbgen',
  'Vivek Goyal',
  'Minh N. Do',
  'Antonio Ortega',
  'Yue M. Lu',
  'Amin Karbasi'
];
let speakers_session_5 = [
  'Hyungju Alan Park',
  'Angelika Kalt',
  'Robert-Jan Smits',
  'Sabine Süsstrunk',
];
let speakers_section_6 = ['Stéphane Mallat'];
let rendered_index = Mustache.render(index_template, {
  section_1_speakers: speakers_session_1.map((e,i) => ({ name: e , time: `${render_time(10, 10, i)}`})),
  section_1_talks: renderSection(speakers_session_1).map(e => ({ card_talk: e })),
  section_2_speakers: speakers_session_2.map((e,i) => ({ name: e , time: `${render_time(13, 30, i)}`})),
  section_2_talks: renderSection(speakers_session_2).map(e => ({ card_talk: e })),
  section_3_speakers: speakers_session_3.map((e,i) => ({ name: e , time: `${render_time(16, 0, i)}`})),
  section_3_talks: renderSection(speakers_session_3).map(e => ({ card_talk: e })),
  section_4_speakers: speakers_session_4.map((e,i) => ({ name: e , time: `${render_time(10, 0, i)}`})),
  section_4_talks: renderSection(speakers_session_4).map(e => ({ card_talk: e })),
  section_5_speakers : speakers_session_5.map((e,i) => ({ name: e , time: `${render_time(14, 0, i)}`})),
  section_5_talks: renderSection(speakers_session_5).map(e => ({ card_talk: e })),
  section_6_speakers: speakers_section_6.map((e,i) => ({ name: e , time: `${render_time(16, 0, i)}`})),
  section_6_talks: renderSection(speakers_section_6).map(e => ({
    card_talk: e
  }))
})
// NOTE / There are 26 databse entries. Pacholska is a duplicate !!
console.log('List of missing speakers :')
console.log(speakers_missing)
console.log("Total : " + speakers_missing.length)
console.log('List of speakers entries used :')
console.log(speakers_used)
console.log("Total : " + speakers_used.length)
console.log('ID used :')
console.log(
  id_used.sort(function (a, b) {
    return a - b
  })
)
fs.writeFileSync(`${BUILD_DIR}/index.html`, rendered_index, 'utf-8')

// Copy the assets/vendors into the build directory.
// Define the source directories and the destination directory
const sourceDirs = ['assets', 'vendors']
const destinationDir = BUILD_DIR

// Create the destination directory if it doesn't exist
fs.ensureDirSync(destinationDir)

// Copy the source directories to the destination directory
sourceDirs.forEach(dir => {
  const sourcePath = path.join(__dirname, dir)
  const destinationPath = path.join(__dirname, destinationDir, dir)

  // Copy the directory recursively
  fs.copySync(sourcePath, destinationPath)
})

console.log('Build complete.')
