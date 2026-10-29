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
- Original `COLOR_0` vertex colors are preserved with a white non-metallic PBR base factor; no textures were added
  and the original Hydrogent materials were not converted.
- No normals are authored (the source has none).

## Usage

Used by the Babylon Lite SSAO comparison demo to compare its ambient occlusion with native DiligentFX on the same scene.

SHA-256 of `kitchen.glb`: `45ea88ad7d914098c082f3bc9bb8d70109d1efd26b7b654949b0b00bcf675e8f` (12,979,300 bytes).