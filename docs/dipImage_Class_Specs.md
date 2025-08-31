# dipImage Class - Technical Specifications

## Overview
The `dipImage` class provides a structured representation of digital image data with methods for pixel manipulation, cloning, and conversion operations.

## Class Structure
- **Type**: Instance class 
- **Module**: `src/main/classes/dipImage.ts`
- **Parent Classes**: None
- **Interfaces**: None

## Constructor

### constructor(width: number, height: number)
**Purpose**: Initialize a new dipImage instance with specified dimensions.

**Parameters**:
- `width`: Image width in pixels  
- `height`: Image height in pixels

**Implementation Details**:
1. Sets internal width and height properties
2. Initializes pixel data array with RGBA format (4 components per pixel)
3. Fills all pixels with black color (0 values for R, G, B, A)

## Public Properties

### data
**Type**: `Uint8ClampedArray`
**Access**: Getter only
**Purpose**: Provides access to raw image pixel data.

**Implementation Details**:
- Returns internal Uint8ClampedArray containing RGBA pixel values
- Each pixel is represented by 4 consecutive elements (R, G, B, A)
- Values are in range [0, 255]

### width  
**Type**: `number`
**Access**: Getter only
**Purpose**: Provides access to image width.

**Implementation Details**:
- Returns internal stored width value

### height
**Type**: `number` 
**Access**: Getter only
**Purpose**: Provides access to image height.

**Implementation Details**:
- Returns internal stored height value

## Public Methods

### setPixel
**Signature**: `setPixel(x: number, y: number, r: number, g: number, b: number, a: number = 255): void`

**Purpose**: Set the color values of a specific pixel.

**Parameters**:
- `x`: Pixel X coordinate  
- `y`: Pixel Y coordinate
- `r`: Red component value (0-255)
- `g`: Green component value (0-255) 
- `b`: Blue component value (0-255)
- `a`: Alpha component value (0-255, default 255)

**Implementation Details**:
1. Validates that coordinates are within image bounds
2. Calculates pixel index in array using row-major order
3. Sets RGBA values at calculated position
4. Handles out-of-bounds coordinates gracefully

### getPixel  
**Signature**: `getPixel(x: number, y: number): [number, number, number, number]`

**Purpose**: Get the color values of a specific pixel.

**Parameters**:
- `x`: Pixel X coordinate
- `y`: Pixel Y coordinate  

**Return Value**:
- Type: `[number, number, number, number]`
- Description: Array containing [R, G, B, A] values for specified pixel

**Implementation Details**:
1. Validates that coordinates are within image bounds  
2. Calculates pixel index in array using row-major order
3. Returns RGBA values as tuple (default 0 if out of bounds)

### clear
**Signature**: `clear(): void`

**Purpose**: Clear the entire image to black color.

**Implementation Details**:
1. Sets all pixels in data array to zero value (black)
2. Preserves original dimensions and structure

### copyFrom
**Signature**: `copyFrom(other: dipImage): void`

**Purpose**: Copy pixel data from another dipImage instance.

**Parameters**:
- `other`: Source dipImage instance  

**Implementation Details**:
1. Validates that source image has same dimensions as target  
2. Copies all pixel data from other to this instance
3. Handles dimension mismatch gracefully

### clone
**Signature**: `clone(): dipImage`

**Purpose**: Create a copy of the current image.

**Return Value**:
- Type: `dipImage`
- Description: New dipImage instance with identical pixel data  

**Implementation Details**:
1. Creates new dipImage with same dimensions as this instance  
2. Copies all pixel data to new instance
3. Returns cloned image

### toGrayscale
**Signature**: `toGrayscale(): dipImage`

**Purpose**: Convert the current image to grayscale representation.

**Return Value**:
- Type: `dipImage`
- Description: New dipImage instance with grayscale conversion applied  

**Implementation Details**:
1. Creates new dipImage with same dimensions  
2. Applies luminance formula for each pixel: 0.299*R + 0.587*G + 0.114*B
3. Sets all channels to the calculated grayscale value

### applySpatialFilter
**Signature**: `applySpatialFilter(filter: number[][]): dipImage`

**Purpose**: Apply a spatial filter kernel to the image.

**Parameters**:
- `filter`: 2D array representing convolution kernel  

**Return Value**:
- Type: `dipImage`
- Description: New dipImage instance with spatial filtering applied

**Implementation Details**:
1. Validates that filter is properly formatted
2. Applies convolution using provided kernel  
3. Handles boundary conditions by clamping coordinates
4. Normalizes output values to valid 0-255 range
5. Returns new image with filtered data

## Error Handling
- Implements bounds checking for pixel operations
- Handles undefined pixel values gracefully 
- Provides default (black) color values when out of bounds
- Validates filter dimensions during spatial filtering

## Performance Considerations
- Uses optimized array access patterns for pixel manipulation  
- Implements early exit conditions where possible
- Processes pixels in row-major order for cache efficiency
- Minimizes redundant calculations through precomputed values

## Usage Examples
```typescript
// Create new image
const myImage = new dipImage(800, 600);

// Set a pixel 
myImage.setPixel(100, 150, 255, 0, 0); // Red pixel at (100, 150)

// Get pixel values
const [r, g, b, a] = myImage.getPixel(100, 150);

// Clear image to black
myImage.clear();

// Clone an image  
const newImage = myImage.clone();