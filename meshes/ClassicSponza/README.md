# Classic Sponza

`sponza-uastc-meshopt.glb` is a compressed glTF 2.0 conversion of
[Unity Technologies' Classic Sponza](https://github.com/Unity-Technologies/Classic-Sponza/tree/660b3d777515bf9d7eb3e671ff94da45c97b064b).
The original, uncompressed GLB was converted locally from that pinned source; it
was not downloaded as a GLB from the upstream repository. The `source.file` entry
in [`compression-report.json`](compression-report.json) refers to that local intermediate.

## Credits and license

The model and textures are licensed under **Creative Commons Attribution 3.0
Unported (CC BY 3.0)**, not this repository's default CC BY 4.0 or a code license.
Copyright 2010 Frank Meinl, Crytek. The earlier Sponza model was created by Marko
Dabrovic; subsequent revisions include Morgan McGuire's fixes and Kristijonas
Jalnionis' PBR remaster distributed by Unity.

The supplied [`model-copyright.txt`](model-copyright.txt) and
[`LICENSE-CC-BY-3.0.txt`](LICENSE-CC-BY-3.0.txt) are preserved unchanged. See the
[pinned upstream third-party notice](https://github.com/Unity-Technologies/Classic-Sponza/blob/660b3d777515bf9d7eb3e671ff94da45c97b064b/Third%20Party%20Notices.md)
and [CC BY 3.0 license](https://creativecommons.org/licenses/by/3.0/). Retain these
credits and identify the conversion and compression changes when redistributing.
No separate NoEmotion HDR environment is included.

## Conversion and compression

The local GLB conversion was modified for this distribution as follows:

- All 72 textures use high-quality **lossy** KTX2/UASTC, level 3, Zstandard 18,
  without RDO or resizing. Full mip chains have 11 levels; 69 textures are
  1024 x 1024 and 3 are 256 x 1024.
- Geometry uses **lossless** Meshopt compression (vertex codec version 0), without
  quantization or simplification. Decoded attributes, triangle topology and exact
  original node transforms are preserved.

The file is **73,312,556 bytes (69.9 MiB)**, down from 130,758,812 bytes
(124.7 MiB): **43.93% smaller**, below GitHub's ordinary 100 MiB file limit.

SHA-256: `b13330e6618dc1baeb078b98e4a30c78e826d0c34ad868b5a54067e078e201bb`.

## Loading and validation

Loading requires support for both `EXT_meshopt_compression` and
`KHR_texture_basisu`, including Meshopt decoding and KTX2/Basis transcoding.

The supplied compression report records completed NodeIO/Meshopt round-trip and
exact geometry, topology and transform audits. Babylon Lite WebGPU loading and
rendering produced 217 renderables, 24 materials and 72 native BC7 compressed
texture uploads, without GPU or page errors.

The validator reported zero errors, but does not support these two extensions:
it emitted KTX2 MIME and unused-object/resource warnings. This is not
warning-free validation or a measurement of total VRAM savings.
