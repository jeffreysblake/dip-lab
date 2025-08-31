# Inter-Module Communication APIs - Technical Specifications

## Overview
This document specifies the Application Programming Interfaces (APIs) used for communication between different modules of the DIP Electron application, particularly focusing on the IPC (Inter-Process Communication) mechanisms that enable frontend-to-backend image processing operations.

## System Architecture

### Core Modules and Their Responsibilities

1. **Main Process** (`src/main/index.ts`)
   - Manages Electron's main process lifecycle
   - Handles window management and creation
   - Coordinates communication between renderer and backend processes

2. **Renderer Process** 
   - Provides user interface for image processing operations
   - Handles user interactions with controls
   - Displays processed images to users

3. **Backend Processing Modules**
   - `Spatial` class: Implements spatial filtering operations  
   - `Frequency` class: Implements frequency domain analysis
   - `Projection` class: Implements projection-based analysis
   - Data structure classes (`dipImage`, `ImageData`, `dipCanvas`)

## IPC API Specifications

### 1. Spatial Filtering Operations

#### Event Name: `apply-spatial-filter`

**Purpose**: Apply spatial filtering operations to image data from the renderer process.

**Parameters**:
```typescript
{
  imageData: number[] | Uint8ClampedArray, // Raw pixel data array  
  width: number,                      // Image width in pixels
  height: number,                     // Image height in pixels
  filterName: string                  // Name of predefined spatial filter to apply
}
```

**Return Value**:
```typescript
{
  success: boolean,                    // Operation status indicator
  data?: number[] | Uint8ClampedArray, // Processed image data (when successful)
  error?: string                     // Error message (when unsuccessful)
}
```

**Implementation Details**:
- Event handler located in `src/main/ipc-handlers.ts`
- Converts input array to `Uint8ClampedArray` for processing
- Calls `Spatial.applyFilter()` method with provided parameters  
- Returns processed data or error information through IPC

### 2. Frequency Domain Operations  

#### Event Name: `apply-frequency-filter`

**Purpose**: Apply frequency domain filtering operations to image data.

**Parameters**:
```typescript
{
  imageData: number[] | Uint8ClampedArray, // Raw pixel data array  
  width: number,                      // Image width in pixels
  height: number,                     // Image height in pixels
  filterType: string                  // Type of frequency filter ("lowpass", "highpass", "bandpass")
}
```

**Return Value**:
```typescript
{
  success: boolean,                    // Operation status indicator
  data?: number[] | Uint8ClampedArray, // Processed image data (when successful)
  error?: string                     // Error message (when unsuccessful)
}
```

### 3. Projection Analysis Operations

#### Event Name: `apply-projection-filter`

**Purpose**: Apply projection-based analysis to image data.

**Parameters**:
```typescript
{
  imageData: number[] | Uint8ClampedArray, // Raw pixel data array  
  width: number,                      // Image width in pixels
  height: number,                     // Image height in pixels
  projectionType: string              // Type of projection ("horizontal", "vertical", "radial", "angular")
}
```

**Return Value**:
```typescript
{
  success: boolean,                    // Operation status indicator
  data?: number[] | Uint8ClampedArray, // Processed image data (when successful)
  error?: string                     // Error message (when unsuccessful)
}
```

### 4. Image Data Retrieval

#### Event Name: `get-image-data`

**Purpose**: Retrieve raw image data from the backend.

**Parameters**:
```typescript
{
  width: number,                      // Image width in pixels  
  height: number                    // Image height in pixels
}
```

**Return Value**:
```typescript
{
  success: boolean,                    // Operation status indicator
  data?: number[] | Uint8ClampedArray, // Raw image data (when successful)
  error?: string                     // Error message (when unsuccessful)
}
```

## API Usage Patterns

### Typical Workflow for Image Processing

1. **Frontend Request**:
   - User selects an image or loads one from assets
   - Frontend sends image data to main process via IPC event `apply-spatial-filter`
   - Parameters include raw pixel data, dimensions, and filter type

2. **Backend Processing**:
   - Main process receives the IPC event 
   - Converts input array to appropriate format for processing
   - Calls relevant backend class method (e.g., `Spatial.applyFilter`)
   - Processes image using specified parameters

3. **Response**:
   - Backend returns processed data through IPC callback  
   - Frontend displays results in appropriate UI view

### Error Handling Protocol

All API endpoints follow a consistent error handling pattern:

```typescript
{
  success: false,
  error: "Error message describing the problem"
}
```

## Data Format Specifications

### Image Data Structure

- **Format**: `Uint8ClampedArray` or `number[]`
- **Layout**: RGBA format (4 components per pixel)
- **Value Range**: [0, 255] for each component
- **Memory Layout**: Row-major order with pixels arranged as [R, G, B, A, R, G, B, A...]

### Parameter Validation

All API endpoints perform parameter validation:
- Width and height must be positive integers  
- Image data array length must match width × height × 4
- Filter names must exist in predefined filter sets
- Projection types must be valid strings

## Performance Considerations

1. **Memory Management**:
   - All image processing operations use typed arrays for efficiency
   - Data serialization/deserialization is optimized through direct array handling
   - Memory allocation happens within backend processes to avoid renderer overhead

2. **Processing Efficiency**:
   - Operations are designed to minimize redundant calculations  
   - Boundary conditions are handled efficiently with clamping
   - Array access patterns follow cache-friendly memory layouts

## Security Considerations

1. **Input Sanitization**: 
   - All parameters undergo strict validation before processing
   - Image data arrays are checked for proper dimensions and format
   - Invalid or malformed inputs are rejected immediately

2. **Process Isolation**:
   - Backend image processing occurs in main process, separate from renderer  
   - Data flows through secure IPC channels with proper serialization

## Version Compatibility

API versions follow semantic versioning principles:
- Major version changes indicate breaking API changes
- Minor version updates add new features without breaking existing functionality
- Patch versions fix bugs while maintaining compatibility

Current API version: 1.0.0

## Example Usage Flow

```typescript
// Frontend (Renderer Process)
const imageData = await getSelectedImageData(); // Get image data from UI

// Send to main process for spatial filtering  
const result = await ipcRenderer.invoke('apply-spatial-filter', {
  imageData,
  width: selectedWidth, 
  height: selectedHeight,
  filterName: "Gaussian Blur"
});

if (result.success) {
  displayProcessedImage(result.data); // Display results in UI
} else {
  showErrorMessage(result.error); // Handle errors
}
```

```typescript
// Backend (Main Process)
ipcMain.handle('apply-spatial-filter', async (_, params) => {
  try {
    const imageArray = new Uint8ClampedArray(params.imageData);
    const resultData = Spatial.applyFilter(
      imageArray,
      params.width, 
      params.height,
      params.filterName
    );
    
    return {
      success: true,
      data: Array.from(resultData)
    };
  } catch (error) {
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