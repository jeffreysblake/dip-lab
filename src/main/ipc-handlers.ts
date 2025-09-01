import { ipcMain } from 'electron';
import Spatial from './classes/Spatial';
import Frequency from './classes/Frequency';
import Projection from './classes/Projection';
import BlurDetection from './classes/blurDetection';

// Set up IPC handlers for spatial filtering
ipcMain.handle('apply-spatial-filter', async (_, { imageData, width, height, filterName }) => {
  try {
    // Convert array to Uint8ClampedArray as expected by Spatial class
    const imageArray = new Uint8ClampedArray(imageData);
    
    // Process image data using Spatial class
    const resultData = Spatial.applyFilter(
      imageArray,
      width,
      height,
      filterName
    );
    
    return {
      success: true,
      data: Array.from(resultData)
    };
  } catch (error) {
    console.error('Error applying spatial filter:', error);
    // Properly handle the error type
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message
      };
    } else {
      return {
        success: false,
        error: 'Unknown error'
      };
    }
  }
});

// Set up IPC handlers for frequency filtering
ipcMain.handle('apply-frequency-filter', async (_, { imageData, width, height, filterType }) => {
  try {
    const imageArray = new Uint8ClampedArray(imageData);
    
    const resultData = Frequency.applyFrequencyFilter(
      imageArray,
      width,
      height,
      filterType
    );
    
    return {
      success: true,
      data: Array.from(resultData)
    };
  } catch (error) {
    console.error('Error applying frequency filter:', error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message
      };
    } else {
      return {
        success: false,
        error: 'Unknown error'
      };
    }
  }
});

// Set up IPC handlers for getting frequency domain representation
ipcMain.handle('get-frequency-domain', async (_, { imageData, width, height }) => {
  try {
    const imageArray = new Uint8ClampedArray(imageData);
    
    // Get FFT data and convert to visualizable format
    const fftResult = Frequency.applyFFT(imageArray, width, height);
    const visualData = Frequency.inverseFFT(fftResult, width, height);
    
    return {
      success: true,
      data: Array.from(visualData)
    };
  } catch (error) {
    console.error('Error getting frequency domain:', error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message
      };
    } else {
      return {
        success: false,
        error: 'Unknown error'
      };
    }
  }
});

// Set up IPC handlers for projection analysis
ipcMain.handle('apply-projection', async (_, { imageData, width, height, projectionType }) => {
  try {
    const imageArray = new Uint8ClampedArray(imageData);
    
    const resultData = Projection.applyCustomProjection(
      imageArray,
      width,
      height,
      projectionType
    );
    
    return {
      success: true,
      data: Array.from(resultData)
    };
  } catch (error) {
    console.error('Error applying projection:', error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message
      };
    } else {
      return {
        success: false,
        error: 'Unknown error'
      };
    }
  }
});

// Set up IPC handlers for blur detection analysis
ipcMain.handle('apply-blur-detection', async (_, { imageData, width, height }) => {
  try {
    const imageArray = new Uint8ClampedArray(imageData);
    
    // Process image data using BlurDetection class - apply edge detection to get heatmap
    const resultData = BlurDetection.detectBlur(
      imageArray,
      width,
      height
    );
    
    return {
      success: true,
      data: Array.from(resultData)
    };
  } catch (error) {
    console.error('Error applying blur detection:', error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message
      };
    } else {
      return {
        success: false,
        error: 'Unknown error'
      };
    }
  }
});