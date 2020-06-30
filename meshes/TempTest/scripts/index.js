var config = {
    extends: 'extended',
    // configuration: "./assets/environment/config.json",
    model: {
        url: "./assets/models/FlightHelmet.glb",
    },
    templates: {
        main: {
            params: {
                fillScreen: true
            }
        }
    },
    lab: {
        assetsRootURL: "./assets/environment/"
    }
}
// create viewer
var viewerElement = document.getElementById("viewport");
var viewer = new BabylonViewer.DefaultViewer(viewerElement, config);
viewer.onModelLoadedObservable.add(() => {
    //viewer.engine.setHardwareScalingLevel(0.5);
    var canvas = viewer.engine.getRenderingCanvas();

    var filesInput = new BABYLON.FilesInput(viewer.engine, null, canvas, null);
    filesInput._onReloadCallback = function (modelFile) {
        viewer.loadModel(modelFile, true);
    };
    filesInput.monitorElementForDragNDrop(canvas);
});