# dipCanvas Class - Technical Specifications

## Overview
The `dipCanvas` class provides a canvas-like interface for image operations, integrating with the dipImage data structure to offer a simplified API for common image manipulation tasks.

## Class Structure
- **Type**: Instance class 
- **Module**: `src/main/classes/dipCanvas.ts`
- **Parent Classes**: None
- **Interfaces**: None

## Constructor

### constructor(width: number, height: number)
**Purpose**: Initialize a new dipCanvas instance with specified dimensions.

**Parameters**:
- `width`: Canvas width in pixels  
- `height`: Canvas height in pixels

**Implementation Details**:
1. Sets internal canvas properties
2. Creates underlying dipImage instance for data storage
3. Initializes the image with specified dimensions

## Public Properties

### image
**Type**: `dipImage`
**Access**: Getter only
**Purpose**: Provides access to the underlying dipImage instance.

**Implementation Details**:
- Returns internal dipImage instance used for canvas operations
- Allows direct access to image data and methods

## Public Methods

### setPixel
**Signature**: `setPixel(x: number, y: number, r: number, g: number, b: number, a: number = 255): void`

**Purpose**: Set the color values of a specific pixel on the canvas.

**Parameters**:
- `x`: Pixel X coordinate  
- `y`: Pixel Y coordinate
- `r`: Red component value (0-255)
- `g`: Green component value (0-255) 
- `b`: Blue component value (0-255)
- `a`: Alpha component value (0-255, default 255)

**Implementation Details**:
1. Delegates to underlying dipImage.setPixel method
2. Validates that coordinates are within canvas bounds  
3. Sets RGBA values at specified position

### getPixel  
**Signature**: `getPixel(x: number, y: number): [number, number, number, number]`

**Purpose**: Get the color values of a specific pixel on the canvas.

**Parameters**:
- `x`: Pixel X coordinate
- `y`: Pixel Y coordinate  

**Return Value**:
- Type: `[number, number, number, number]`
- Description: Array containing [R, G, B, A] values for specified pixel

**Implementation Details**:
1. Delegates to underlying dipImage.getPixel method  
2. Validates that coordinates are within canvas bounds
3. Returns RGBA values as tuple (default 0 if out of bounds)

### clear
**Signature**: `clear(): void`

**Purpose**: Clear the entire canvas to black color.

**Implementation Details**:
1. Delegates to underlying dipImage.clear method
2. Sets all pixels in data array to zero value (black)
3. Preserves original dimensions and structure

## Error Handling
- Implements bounds checking for pixel operations  
- Handles undefined pixel values gracefully
- Provides default (black) color values when out of bounds
- Delegates error handling to underlying dipImage methods

## Performance Considerations
- Uses delegation pattern to minimize code duplication
- Leverages optimized dipImage implementation for core functionality
- Processes pixels through established array access patterns

## Usage Examples
```typescript
// Create new canvas
const myCanvas = new dipCanvas(800, 600);

// Set a pixel 
myCanvas.setPixel(100, 150, 255, 0, 0); // Red pixel at (100, 150)

// Get pixel values
const [r, g, b, a] = myCanvas.getPixel(100, 150);

// Clear canvas to black
myCanvas.clear();