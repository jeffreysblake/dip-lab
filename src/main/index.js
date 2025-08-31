"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var fs = require("fs");
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// For ES modules, we need to use dynamic import or remove this line
// since electron-squirrel-startup is a CommonJS module
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var createWindow = function () {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: 800,
    });
    // and load the index.html of the app.
    // For ES modules, we need to handle paths differently
    // In CommonJS modules, __dirname points to where the compiled file lives
    // Load index.html from renderer folder (corrected path)
    // Try multiple possible locations for better compatibility with build processes
    var possiblePaths = [
        path.join(__dirname, '../renderer/index.html'), // Correct location for main HTML file
        path.join(__dirname, '../../src/renderer/index.html'), // Alternative location
        './src/renderer/index.html', // Relative to current working directory
    ];
    var indexPath = '';
    for (var _i = 0, possiblePaths_1 = possiblePaths; _i < possiblePaths_1.length; _i++) {
        var possiblePath = possiblePaths_1[_i];
        if (fs.existsSync(possiblePath)) {
            indexPath = possiblePath;
            break;
        }
    }
    if (!indexPath) {
        console.error('Could not find index.html at any expected location');
        throw new Error('index.html file not found - please ensure it exists in the project root');
    } // Try multiple locations for better compatibility
    console.log('Loading HTML from:', indexPath);
    mainWindow.loadFile(indexPath);
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object.
        mainWindow = null;
    });
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
electron_1.app.whenReady().then(createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q.
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q.
    if (mainWindow === null) {
        createWindow();
    }
});
