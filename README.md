# lcav25
website for the Signal Processing and Friends event (aka LCAV@25)


## Prerequisites

Before you can run the website, ensure that you have the following software installed on your machine:

- Node.js: You can download and install Node.js from the official website: https://nodejs.org
- npm (Node Package Manager): npm is included with Node.js, so once you have Node.js installed, npm will be available as well.

## Building:

```
npm run build
```
This will run build.js. This script essentially takes the data from talks_data.json, and fill up the templates with the data. 
The directory to serve will be dist/

## Serve 
``` 
npm run serve
```
This command will launch a development server that hosts the website on a local URL, usually http://localhost:8080 or http://127.0.0.1:8080. Open your web browser and visit this URL to view the website.
