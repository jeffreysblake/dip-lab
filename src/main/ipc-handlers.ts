import { ipcMain } from 'electron';
import Spatial from './classes/Spatial';

// Set up IPC handlers for spatial filtering
ipcMain.handle('apply-spatial-filter', async (event, { imageData, width, height, filterName }) => {
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
    return {
      success: false,
      error: error.message || 'Unknown error'
    };
  }
});