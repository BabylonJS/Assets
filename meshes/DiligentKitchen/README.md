# Diligent Kitchen

`kitchen.glb` is a glTF 2.0 conversion of `Kitchen.usd` from
[DiligentGraphics/USDAssets](https://github.com/DiligentGraphics/USDAssets) at commit
`c823af8961047f4642c985c37338b18a35b6b017` (source Git blob `f0cddb55f5f7b2c246f32978ddde4d0cf797160a`).

## License

Unlike the default CC BY 4.0 license of this repository, this folder is distributed under the
**Apache License 2.0** of the original repository. See [`LICENSE`](LICENSE).

## Modifications

The original USD scene was converted and modified as follows:

- USD to glTF conversion with usd2gltf 0.3.5 and usd-core 26.11, then optimized with glTF Transform 4.3.0.
- Rescaled from centimetres (`metersPerUnit = 0.01`) to metres.
- All 536,949 source triangles are kept; the 1,788 source meshes are merged into 2 meshes.
- Original `COLOR_0` vertex colors are preserved. Every primitive uses one explicit glTF material with a white base
  color, `metallicFactor` 0 and `roughnessFactor` 0.9, instead of glTF's metallic default material. No textures
  were added and the original Hydrogent materials were not converted.
- No normals are authored (the source has none).

## Usage

Used by the Babylon Lite SSAO comparison demo to compare its ambient occlusion with native DiligentFX on the same scene.

SHA-256 of `kitchen.glb`: `5ac98e9c1e2ebfd06fbafcfe15fe0d7f85f71bfbac0383113cf27dbf85bd208c` (12,979,440 bytes).
