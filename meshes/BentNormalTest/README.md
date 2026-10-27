# Bent-normal test asset

A small trench-and-wall mesh for comparing ambient occlusion and directional
occlusion of environment reflections. The glTF includes positions, normals,
tangents, and one UV set.

| File | Contents |
| --- | --- |
| `bent_normal_test.gltf` | Mesh and standard glTF material |
| `bent_normal_test.bin` | Geometry buffer |
| `bent_normal_low_bent_normal_mat_BaseColor.png` | Base color, sRGB |
| `bent_normal_low_bent_normal_mat_Normal.png` | Tangent-space normal, linear data |
| `bent_normal_low_bent_normal_mat_ORM.png` | Ambient visibility in R, roughness in G, metallic in B; linear data |
| `bent_normal_low_bent_normal_mat_BentNormal_OpenGL.png` | Tangent-space bent normal, linear data |

The bent-normal texture is separate from the glTF material: glTF does not
automatically attach it. Assign it explicitly as the material's bent-normal
texture when using a Babylon.js version supporting `bentNormalTexture`.
Load it without gamma conversion or a vertical image flip, and use the same
UV set and normal-map orientation as the glTF normal texture.

Bent normals are encoded as RGB vectors mapped from `[-1, 1]` to `[0, 1]`.
The green channel has been inverted from the supplied bake to match the
glTF tangent-space convention. Use this corrected `OpenGL` map together with
the ambient-occlusion channel of the supplied ORM texture.

This sample uses the repository's default Creative Commons Attribution 4.0
International license.
