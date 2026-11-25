# Pine Forest (Montaigle ruins)

Asset of the Babylon Lite volumetric fog demo (`forest` scene): Poly Haven's
[Pine Forest](https://polyhaven.com/collections/pine_forest) scene, converted to glTF 2.0 and
cropped around the Montaigle ruins.

## Credits and license

The source scene, its models, textures and sky HDRI are by [Poly Haven](https://polyhaven.com)
and released under **CC0 1.0** (public domain), not this repository's default CC BY 4.0. See
[`LICENSE.txt`](LICENSE.txt). No attribution is required; credit to Poly Haven is appreciated.

## Files

| File | Bytes | Content |
| --- | ---: | --- |
| `pine-forest-ruins-f35-b10.glb` | 50,734,832 | Visible scene: 162 instanced models, 188,788 instances, 803,104 unique triangles |
| `pine-forest-ruins-f35-b10-casters.glb` | 3,034,272 | Dedicated shadow-caster models: 106 models, 18,412 instances, 94,710 unique triangles |
| `terrain/` | 8,090,293 | Tiled terrain: control mask, three 1K color and normal-roughness layers, `terrain-layers.json` |
| `evening-road-1k.hdr` | 1,309,270 | Sky HDRI (`evening_road_01_puresky`), 1024 x 512 Radiance HDR |
| `conversion-report.json` | 548,518 | Conversion and crop report (prototypes, instance counts, textures, rules) |
| `demo-settings.json` | 434 | Default demo camera |

Both GLBs require `EXT_mesh_gpu_instancing`, `EXT_meshopt_compression`, `KHR_mesh_quantization`
and `KHR_texture_basisu`. Every model is a prototype node carrying all its instances; the demo
reads instance counts and prototype roles from `conversion-report.json`.

SHA-256:

- `pine-forest-ruins-f35-b10.glb`: `3c0a7ff763a8d63341d2dea9de1bec1106ed92445666306f3b83ef6a3ac642a5`
- `pine-forest-ruins-f35-b10-casters.glb`: `d44a903eb7f3ffc29beef93238be24489bc47e0865c7a872f6b5bb21e44b55aa`

## Conversion

1. The full scene (1,114,999 instances of 243 models) was exported from Blender, decimated per
   material, GPU-instanced and given dedicated shadow-caster models.
2. **Crop.** Distances are horizontal, from the ruins' footprint: 35 m on the side facing the
   demo camera, 10 m behind the ruins, varying linearly along their depth in between. The ruins
   are kept whole, other instances by their pivot, the silver firs (built from a trunk and
   branch instances) as whole trees, and the terrain per triangle. The river mesh is removed.
   The kept outline is stored in `conversion-report.json` (`crop.outline`).
3. **Textures.** KTX2 UASTC (level 3, Zstandard 18, full mip chains). Textures used only by
   trees and ground vegetation are downscaled to 512 (47 textures); the ruins, rocks and terrain
   keep 1024. Duplicates are merged: 65 textures, 29.0 MB.
4. **Geometry.** gltf-transform `meshopt` (level high): positions quantized to 14 bits per mesh
   volume (the dequantization folded into each instance transform), UVs within [0, 1] to 12 bits
   (tiling UVs stay float), 8-bit octahedral normals and 8-bit colors; instance rotations as
   normalized 16-bit quaternions, instance translations and scales rounded to 15 mantissa bits.
   Unused extra vertex color sets were dropped. Geometry: 21.8 MB.

The full conversion before cropping was 147.1 MB (visible) and 13.8 MB (casters).
