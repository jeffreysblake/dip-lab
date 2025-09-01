import { contextBridge, ipcRenderer } from 'electron';

// Expose IPC functionality to renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  applySpatialFilter: async (data: any) => {
    try {
      const result = await ipcRenderer.invoke('apply-spatial-filter', data);
      return result;
    } catch (error) {
      console.error('Error in applySpatialFilter:', error);
      throw new Error(`Failed to process spatial filter: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  applyFrequencyFilter: async (data: any) => {
    try {
      const result = await ipcRenderer.invoke('apply-frequency-filter', data);
      return result;
    } catch (error) {
      console.error('Error in applyFrequencyFilter:', error);
      throw new Error(`Failed to process frequency filter: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  applyProjection: async (data: any) => {
    try {
      const result = await ipcRenderer.invoke('apply-projection', data);
      return result;
    } catch (error) {
      console.error('Error in applyProjection:', error);
      throw new Error(`Failed to process projection: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  getFrequencyDomain: async (data: any) => {
    try {
      const result = await ipcRenderer.invoke('get-frequency-domain', data);
      return result;
    } catch (error) {
      console.error('Error in getFrequencyDomain:', error);
      throw new Error(`Failed to get frequency domain: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
});