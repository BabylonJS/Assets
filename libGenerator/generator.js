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
        /**
         * The full path of the asset
         */
        path: string;
        /**
         * The filename of the assets
         */
        filename: string;
        /**
         * The base URL of the asset
         */
        rootUrl: string;
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
        path: "https://assets.babylonjs.com/${file.path}",
        rootUrl: "https://assets.babylonjs.com/${file.rootUrl}/",
        filename: "${file.filename}"
    },`;
  });
  source += `},`;

  // generate declaration
  declaration += `
    const ${dir}: {
`;
  structure[dir].forEach((file) => {
    // save the thumbnail on the disk
    const extensionMatch = /image\/(.*);/.exec(file.thumbnail || "");
    if (file.thumbnail) {
      const extension = extensionMatch[1];
      var base64Data = file.thumbnail.replace(/^data:image\/(.*);base64,/, "");

      require("fs").writeFile(
        `${baseDirectory}/generated/${file.filename + "." + extension}`,
        base64Data,
        "base64",
        function (err) {
          err && console.log(err);
        }
      );
    }
    const description = file.thumbnail
      ? `![${file.name}](https://assets.babylonjs.com/generated/${
          file.filename + "." + extensionMatch[1]
        })`
      : `${file.name} (${dir})`;
    declaration += `
    /**
     * ${description}
     */
    "${file.name}": Asset,`;
  });
  declaration += `},`;
});

source += "};";
declaration += "}";

fs.writeFileSync(`${baseDirectory}/generated/Assets.js`, source);
fs.writeFileSync(`${baseDirectory}/generated/Assets.d.ts`, declaration);
