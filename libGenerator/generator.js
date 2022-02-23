const fs = require("fs");
const path = require("path");

const structure = require("../structure.json");

const baseDirectory = path.resolve(__dirname, "../");

if (!fs.existsSync(`${baseDirectory}/generated`)) {
  fs.mkdirSync(`${baseDirectory}/generated`);
}

let declaration = `
declare namespace Assets {
    interface Asset {
        description: string;
        thumbnail: string;
        fullPath: string;
        filename: string;
        baseDirectory: string;
    }
`;
let source = `
window.Assets = {`;
Object.keys(structure).forEach((dir) => {
  // generate source
  source += `${dir}: {`;
  structure[dir].forEach((file) => {
    source += `
    "${file.name}": {
        fullPath: "https://assets.babylonjs.com/${file.fullPath}",
        baseDirectory: "https://assets.babylonjs.com/${file.baseDirectory}",
        description: "${file.description}",
        thumbnail: "${file.thumbnail}",
        filename: "${file.filename}"
    },`;
  });
  source += `},`;

  // generate declaration
  declaration += `
    const ${dir}: {
`;
  structure[dir].forEach((file) => {
    if (!file.name) {
      console.log(file);
    }
    declaration += `
    /**
     * ${file.description}
     * @thumbnail ${file.thumbnail}
     */
    "${file.name}": Asset,`;
  });
  declaration += `},`;
});

source += "};";
declaration += "}";

fs.writeFileSync(`${baseDirectory}/generated/Assets.js`, source);
fs.writeFileSync(`${baseDirectory}/generated/Assets.d.ts`, declaration);
