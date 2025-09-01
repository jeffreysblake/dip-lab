"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Spatial_1 = require("./classes/Spatial");
const Frequency_1 = require("./classes/Frequency");
const Projection_1 = require("./classes/Projection");
const blurDetection_1 = require("./classes/blurDetection");
// Set up IPC handlers for spatial filtering
electron_1.ipcMain.handle('apply-spatial-filter', async (_, { imageData, width, height, filterName }) => {
    try {
        // Convert array to Uint8ClampedArray as expected by Spatial class
        const imageArray = new Uint8ClampedArray(imageData);
        // Process image data using Spatial class
        const resultData = Spatial_1.default.applyFilter(imageArray, width, height, filterName);
        return {
            success: true,
            data: Array.from(resultData)
        };
    }
    catch (error) {
        console.error('Error applying spatial filter:', error);
        // Properly handle the error type
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message
            };
        }
        else {
            return {
                success: false,
                error: 'Unknown error'
            };
        }
    }
});
// Set up IPC handlers for frequency filtering
electron_1.ipcMain.handle('apply-frequency-filter', async (_, { imageData, width, height, filterType }) => {
    try {
        const imageArray = new Uint8ClampedArray(imageData);
        const resultData = Frequency_1.default.applyFrequencyFilter(imageArray, width, height, filterType);
        return {
            success: true,
            data: Array.from(resultData)
        };
    }
    catch (error) {
        console.error('Error applying frequency filter:', error);
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message
            };
        }
        else {
            return {
                success: false,
                error: 'Unknown error'
            };
        }
    }
});
// Set up IPC handlers for getting frequency domain representation
electron_1.ipcMain.handle('get-frequency-domain', async (_, { imageData, width, height }) => {
    try {
        const imageArray = new Uint8ClampedArray(imageData);
        // Get FFT data and convert to visualizable format
        const fftResult = Frequency_1.default.applyFFT(imageArray, width, height);
        const visualData = Frequency_1.default.inverseFFT(fftResult, width, height);
        return {
            success: true,
            data: Array.from(visualData)
        };
    }
    catch (error) {
        console.error('Error getting frequency domain:', error);
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message
            };
        }
        else {
            return {
                success: false,
                error: 'Unknown error'
            };
        }
    }
});
// Set up IPC handlers for projection analysis
electron_1.ipcMain.handle('apply-projection', async (_, { imageData, width, height, projectionType }) => {
    try {
        const imageArray = new Uint8ClampedArray(imageData);
        const resultData = Projection_1.default.applyCustomProjection(imageArray, width, height, projectionType);
        return {
            success: true,
            data: Array.from(resultData)
        };
    }
    catch (error) {
        console.error('Error applying projection:', error);
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message
            };
        }
        else {
            return {
                success: false,
                error: 'Unknown error'
            };
        }
    }
});
// Set up IPC handlers for blur detection analysis
electron_1.ipcMain.handle('apply-blur-detection', async (_, { imageData, width, height }) => {
    try {
        const imageArray = new Uint8ClampedArray(imageData);
        // Process image data using BlurDetection class - apply edge detection to get heatmap
        const resultData = blurDetection_1.default.detectBlur(imageArray, width, height);
        return {
            success: true,
            data: Array.from(resultData)
        };
    }
    catch (error) {
        console.error('Error applying blur detection:', error);
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message
            };
        }
        else {
            return {
                success: false,
                error: 'Unknown error'
            };
        }
    }
});
