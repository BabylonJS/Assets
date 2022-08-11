# Babylon.js Assets

A place for storing all the assets that are used by Babylon.js website, core engine or official playgrounds.

[![CC BY 4.0][cc-by-shield]][cc-by]

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg

The list of available assets can be found at [Assets page](Assets.md).

## Adding new assets and updating the file structure

Please add assets in the right directory, according to the assets type (textures, sounds, meshes, etc.).

When adding assets make sure to update the file structure. To do that please run the following command in the `libGenerator` directory:

```bash
npm run update-structure
```

After that please run

```bash
npm run generate
```

To update the Assets.md file (if needed)

Note that this is optional but recommended.
