/**
 * Running this script will update the structure file with newly added files.
 */

const path = require("path");
const fs = require("fs");
const glob = require("glob");
const imageGenerator = require("image-thumbnail");
const puppeteer = require("puppeteer");

const generateMissingThumbnails = false;

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const thumbnailOptions = {
  width: 100,
  height: 100,
  responseType: "base64",
  jpegOptions: { force: true, quality: 80 },
};

const baseDirectory = path.resolve(__dirname, "../");

directoriesToFilter = [
  "libGenerator",
  "node_modules",
  "generated",
  "environments",
  "ibl",
];

const mainDirectories = getDirectories(baseDirectory).filter(
  (dir) => !directoriesToFilter.includes(dir) && dir[0] !== "."
);

const texturesExtensions = [
  "jpg",
  "png",
  "dds",
  "env",
  "hdr",
  "3dl",
  "basis",
  "ktx",
];

const structure = require("../structure.json");
const fileTypes = {
  // environments: ["jpg", "png", "dds", "env", "hdr"],
  textures: texturesExtensions,
  luts: texturesExtensions,
  photoDomes: texturesExtensions,
  skyboxes: texturesExtensions,
  sprites: texturesExtensions,
  // materials: ["jpg", "png"],
  meshes: ["babylon", "obj", "stl", "gltf", "glb"],
  nme: ["json"],
  particles: ["json"],
  sound: ["ac3", "mp3", "ogg", "wav"],
};
const process = async () => {
  const generateModelThumbnails =
    (process.env && process.env.GENERATE_THUMBNAILS === "true") || false;
  // 1. Launch the browser
  const browser = generateModelThumbnails
    ? await puppeteer.launch({
        headless: false, //process.env && process.env.HEADLESS === "true",
      })
    : undefined;

  const page = generateModelThumbnails ? await browser.newPage() : undefined;
  // 2. Open a new page
  if (generateModelThumbnails) {
    await page.setViewport({ width: 200, height: 200 });
  }

  for (const dir of mainDirectories) {
    if (!structure[dir] || !Array.isArray(structure[dir])) {
      structure[dir] = [];
    }
    if (fileTypes[dir]) {
      const files = glob.sync(
        `${baseDirectory}/${dir}/**/*.+(${fileTypes[dir].join("|")})`
      );
      for (const file of files) {
        // relative path
        const relativePath = path
          .relative(baseDirectory, file)
          .replace(/\\/g, "/");
        let index = structure[dir].findIndex(
          (item) => item.path === relativePath
        );
        const extension = path.extname(file).replace(".", "");
        const newAsset = {
          path: relativePath,
          rootUrl: path.dirname(relativePath).replace(/\\/g, "/"),
          filename: path.basename(file),
          name:
            path.basename(file, path.extname(file)) +
            "_" +
            path.extname(file).substring(1),
        };
        if (index === -1) console.log(index, newAsset);

        if (["png", "jpg"].includes(extension)) {
          try {
            newAsset.thumbnail =
              "data:image/jpeg;base64," +
              (await imageGenerator(
                path.resolve("../", relativePath),
                thumbnailOptions
              ));
          } catch (err) {
            console.error(err);
          }
        } else if (
          (generateModelThumbnails ||
            (generateMissingThumbnails &&
              (!structure[dir] ||
                !structure[dir][index] ||
                !structure[dir][index].thumbnail))) &&
          ["babylon", "obj", "stl", "gltf", "glb"].includes(extension)
        ) {
          console.log("generating", relativePath);

          // 3. Navigate to URL
          await page.goto(
            "https://sandbox.babylonjs.com/?assetUrl=https://assets.babylonjs.com/" +
              relativePath,
            {
              waitUntil: "networkidle0",
            }
          );
          await page.evaluate(
            (sel) => {
              const element = document.querySelector("#canvasZone");
              element.style.height = "100%";
              var elements = document.querySelectorAll(sel);
              for (var i = 0; i < elements.length; i++) {
                elements[i].remove();
              }
            },
            [
              "#babylonjsLoadingDiv",
              "#footer",
              "#scene-explorer-host",
              "#inspector-host",
            ]
          );
          await page.evaluate(() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            });
          });

          // 4. Take screenshot
          const canvas = await page.waitForSelector("#renderCanvas");
          if (!canvas) {
            console.error("Canvas not found");
            continue;
          }
          // check that canvas has a width and height
          const width = await page.evaluate((canvas) => {
            return canvas.width;
          }, canvas);
          const height = await page.evaluate((canvas) => {
            return canvas.height;
          }, canvas);
          if (width === 0 || height === 0) {
            console.error("Canvas has no width or height");
            continue;
          }
          try {
            newAsset.thumbnail =
              "data:image/jpeg;base64," +
              (await canvas.screenshot({
                encoding: "base64",
                type: "jpeg",
                // clip: { x: 200, y: 200, width: 200, height: 200 },
              }));
          } catch (err) {
            console.error("Error taking screenshot", err);
          }
        }
        if (index !== -1) {
          structure[dir][index] = {
            ...newAsset,
            ...structure[dir][index],
          };
        } else {
          structure[dir].push(newAsset);
        }
      }
    }
  }
  if (generateModelThumbnails) {
    await page.close();
    await browser.close();
  }
};
process().then(() => {
  fs.writeFileSync(
    "../structure.json",
    JSON.stringify(structure, null, 2) + "\n"
  );
});
