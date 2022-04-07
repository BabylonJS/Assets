const fs = require("fs");
const path = require("path");

const structure = require("../structure.json");

const baseDirectory = path.resolve(__dirname, "../");

if (!fs.existsSync(`${baseDirectory}/generated`)) {
  fs.mkdirSync(`${baseDirectory}/generated`);
}

let markdown = `
# Assets
`

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
  declaration += `
    const ${dir}: {
`;
  markdown += `
## ${dir}

| Asset | Path | Preview |
| ------------- |:-------------:| -----:|
`;
  structure[dir].forEach((file) => {
    // do nothing if the file doesn't start with a letter
    if (!/^[a-zA-Z]/.test(file.name)) {
      return;
    }

    source += `
  "${file.name}": {
    path: "https://assets.babylonjs.com/${file.path}",
    rootUrl: "https://assets.babylonjs.com/${file.rootUrl}/",
    filename: "${file.filename}"
  },`;
    const thumbnailNotBase64 =
      file.thumbnail && file.thumbnail.indexOf("base64") === -1;
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
    const thumbnailLink =
      file.thumbnail && thumbnailNotBase64
        ? file.thumbnail
        : extensionMatch
        ? `https://assets.babylonjs.com/generated/${
            file.filename + "." + extensionMatch[1]
          }`
        : "";
    const description = file.thumbnail
      ? `![${file.name}](${thumbnailLink})`
      : `${file.name} (${dir})`;
    declaration += `
    /**
     * ${description}
     */
    "${file.name}": Asset,`;
    markdown += `| ${file.name} | ${file.path} | ![${file.name}](${thumbnailLink}) |
`;
  });
  source += `},`;
  declaration += `},`;
});

source += "};";
declaration += "}";

fs.writeFileSync(`${baseDirectory}/generated/Assets.js`, source);
fs.writeFileSync(`${baseDirectory}/generated/Assets.d.ts`, declaration);
fs.writeFileSync(`${baseDirectory}/Assets.md`, markdown);
