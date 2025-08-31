# Projection Class - Technical Specifications

## Overview
The `Projection` class implements various projection-based image analysis techniques, including horizontal, vertical, radial, and angular projections of image data.

## Class Structure
- **Type**: Static class (all methods are static)
- **Module**: `src/main/classes/Projection.ts`

## Public Methods

### applyHorizontalProjection
**Signature**: `static applyHorizontalProjection(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray`

**Purpose**: Apply horizontal projection by summing pixel values along each row.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with horizontal projection applied

**Implementation Details**:
1. For each row, sums the pixel values across all columns
2. Normalizes the sum by dividing by width to get average value per column
3. Sets output pixels using normalized values for RGB channels
4. Preserves alpha channel from original data

### applyVerticalProjection
**Signature**: `static applyVerticalProjection(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray`

**Purpose**: Apply vertical projection by summing pixel values along each column.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with vertical projection applied

**Implementation Details**:
1. For each column, sums the pixel values across all rows  
2. Normalizes the sum by dividing by height to get average value per row
3. Sets output pixels using normalized values for RGB channels
4. Preserves alpha channel from original data

### applyRadialProjection
**Signature**: `static applyRadialProjection(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray`

**Purpose**: Apply radial projection by summing pixel values along radius from center.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with radial projection applied

**Implementation Details**:
1. Calculates distance from center for each pixel position
2. For each pixel, sums values along radius using angular sampling
3. Normalizes the sum by dividing by calculated distance to get average value per radius
4. Sets output pixels using normalized values for RGB channels
5. Preserves alpha channel from original data

### applyAngularProjection
**Signature**: `static applyAngularProjection(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray`

**Purpose**: Apply angular projection by summing pixel values around center.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with angular projection applied

**Implementation Details**:
1. For each pixel position, sums values along angle sampling around center  
2. Uses 360-degree sampling to capture angular distribution
3. Normalizes the sum by dividing by number of angles (360) 
4. Sets output pixels using normalized values for RGB channels
5. Preserves alpha channel from original data

### applyCustomProjection
**Signature**: `static applyCustomProjection(imageData: Uint8ClampedArray, width: number, height: number, projectionType: string): Uint8ClampedArray`

**Purpose**: Apply a specific type of projection based on parameter.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels  
- `projectionType`: Type of projection ("horizontal", "vertical", "radial", "angular")

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with specified projection applied

**Implementation Details**:
1. Switches based on projection type parameter
2. Calls appropriate specific projection method (horizontal, vertical, etc.)
3. Returns original image data if projection type is not recognized

### applyMultipleProjections
**Signature**: `static applyMultipleProjections(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray[]`

**Purpose**: Apply all available projections and return results as array.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Uint8ClampedArray[]`
- Description: Array containing results of all projection operations applied to input image data

**Implementation Details**:
1. Applies horizontal, vertical, radial, and angular projections sequentially  
2. Collects each result into an array
3. Returns the complete array of processed images

## Error Handling
- Implements proper error handling for undefined pixel values during processing
- Uses default (0) values when pixel data is not available
- Handles boundary conditions properly to prevent out-of-bounds access

## Performance Considerations
- Uses optimized row-major order iteration for efficient memory access
- Implements early exit conditions where possible  
- Processes pixels in batches to improve cache locality
- Minimizes redundant calculations through precomputed values

## Usage Examples
```typescript
// Apply horizontal projection
const horizontalProjection = Projection.applyHorizontalProjection(
  imageData, 
  width, 
  height
);

// Apply multiple projections
const allProjections = Projection.applyMultipleProjections(
  imageData,
  width, 
  height
);