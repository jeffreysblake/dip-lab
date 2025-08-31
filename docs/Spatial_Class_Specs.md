# Spatial Class - Technical Specifications

## Overview
The `Spatial` class provides spatial filtering capabilities for digital image processing, implementing convolution operations using predefined and custom kernels.

## Class Structure
- **Type**: Static class (all methods are static)
- **Module**: `src/main/classes/Spatial.ts`

## Public Properties

### Filters (`static Filters: { [key: string]: number[][] }`)
Predefined spatial filters as kernel matrices:
- `"Gaussian Blur"`: [[1, 2, 1], [2, 4, 2], [1, 2, 1]]
- `"Sharpen"`: [[0, -2, 0], [-2, 11, -2], [0, -2, 0]]
- `"Mean Removal"`: [[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]]
- `"Emboss Laplascian"`: [[-1, 0, -1], [0, 4, 0], [-1, 0, -1]]
- `"Sobel"`: [[-1, -2, -1], [0, 0, 0], [1, 2, 1]]
- `"Edge Detect"`: [[1, 1, 1], [0, 0, 0], [-1, -1, -1]]
- `"Identity"`: [[0, 0, 0], [0, 1, 0], [0, 0, 0]]

## Public Methods

### applyFilter
**Signature**: `static applyFilter(imageData: Uint8ClampedArray, width: number, height: number, kernelName: string): Uint8ClampedArray`

**Purpose**: Apply a predefined spatial filter to image data.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels  
- `kernelName`: Name of the predefined filter to apply

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with applied spatial filter

**Implementation Details**:
1. Validates that the specified kernel exists
2. Applies convolution using the selected kernel matrix
3. Handles boundary conditions by clamping pixel coordinates
4. Normalizes output values to valid 0-255 range
5. Preserves alpha channel during processing

## Error Handling
- Throws `Error` with message "Filter "${kernelName}" not found" when an invalid filter name is provided

## Performance Considerations
- Uses optimized array access patterns for pixel manipulation
- Implements boundary clamping to prevent out-of-bounds memory access
- Processes pixels in row-major order for cache efficiency

## Usage Example
```typescript
const result = Spatial.applyFilter(
  imageData, 
  width, 
  height, 
  "Gaussian Blur"
);