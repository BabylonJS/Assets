The [Box-draco.glb](Box-draco.glb) was created using glTF-Transform 3.7.0 with [Box.glb](https://github.com/KhronosGroup/glTF-Sample-Models/blob/master/2.0/Box/glTF-Binary/Box.glb) as the initial input. This version of glTF-Transform has [an issue](https://github.com/donmccurdy/glTF-Transform/issues/1098) that causes incorrect `normalized` flag to be set in the Draco payload.

The following commands were used to create the asset.
```
gltf-transform quantize Box.glb Box-quantized.glb
gltf-transform draco Box-quantized.glb Box-draco.glb
```
