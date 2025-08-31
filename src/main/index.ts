import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// For ES modules, we need to use dynamic import or remove this line
// since electron-squirrel-startup is a CommonJS module

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
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
  const possiblePaths = [
    path.join(__dirname, '../renderer/index.html'),      // Correct location for main HTML file
    path.join(__dirname, '../../src/renderer/index.html'),    // Alternative location
    path.join(process.cwd(), 'src/renderer/index.html'),  // Absolute path to project root
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
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q.
  if (mainWindow === null) {
    createWindow();
  }
});