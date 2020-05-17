// Global Variables to use.
var destFolder, sourceFolder, files, sourceDoc, targetFile, doc, layers, vertScale, horzScale, width, height;

sourceFolder = Folder.selectDialog('Select Folders with Illustrator files you want to convert to PNG', '~');

function init() {
    if (sourceFolder != null) {
        files = new Array();
        fileType = "*.ai";
        files = sourceFolder.getFiles(fileType);

        if (files.length > 0) {
            destFolder = Folder.selectDialog('Select the folder you want to export your files to', '~');

            for (var i = 0; i < files.length; i++) {
                sourceDoc = app.open(files[i])
                doc = app.activeDocument;
                exportArtboard();
                sourceDoc.close(SaveOptions.DONOTSAVECHANGES);
            }
        } else {
            alert('There are no files here')
        }
    } else {
        alert('There is no folder here')
    }
}

function exportArtboard() {
    targetFile = new File(destFolder + '/' + sourceDoc.name);
    pngSaveOpts = getPNGOptions();
    doc.artboards.setActiveArtboardIndex(0)
    sourceDoc.exportFile(targetFile, ExportType.PNG24, pngSaveOpts);
}

function getPNGOptions() {
    var pngSaveOpts = new ExportOptionsPNG24();
    pngSaveOpts.antiAliasing = true;
    pngSaveOpts.transparency = true;
    pngSaveOpts.artBoardClipping = true;
    return pngSaveOpts;
}

init();