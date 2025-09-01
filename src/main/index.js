"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
// Import IPC handlers to set up communication with renderer
require("./ipc-handlers");
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// For ES modules, we need to use dynamic import or remove this line
// since electron-squirrel-startup is a CommonJS module
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
const createWindow = () => {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        height: 768,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js') // Add preload script
        },
        width: 1024,
    });
    // and load the index.html of the app.
    // For ES modules, we need to handle paths differently
    // In CommonJS modules, __dirname points to where the compiled file lives
    // Load index.html from renderer folder (corrected path)
    const possiblePaths = [
        path.join(__dirname, '../renderer/index.html'), // Correct location for main HTML file
        path.join(__dirname, '../../src/renderer/index.html'), // Alternative location
        path.join(process.cwd(), 'src/renderer/index.html'), // Absolute path to project root
    ];
    let indexPath = '';
    for (const possiblePath of possiblePaths) {
        if (fs.existsSync(possiblePath)) {
            indexPath = possiblePath;
            break;
        }
    }
    if (!indexPath) {
        console.error('Could not find index.html at any expected location');
        throw new Error('index.html file not found - please ensure it exists in the project root or renderer directory');
    }
    console.log('Loading HTML from:', indexPath);
    mainWindow.loadFile(indexPath);
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object.
        mainWindow = null;
    });
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
electron_1.app.whenReady().then(createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q.
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q.
    if (mainWindow === null) {
        createWindow();
    }
});
