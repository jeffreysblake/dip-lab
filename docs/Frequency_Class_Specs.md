# Frequency Class - Technical Specifications

## Overview
The `Frequency` class implements frequency domain image processing operations, including Fast Fourier Transform (FFT) capabilities and various frequency domain filters.

## Class Structure
- **Type**: Static class (all methods are static)
- **Module**: `src/main/classes/Frequency.ts`

## Public Methods

### applyFFT
**Signature**: `static applyFFT(imageData: Uint8ClampedArray, width: number, height: number): Float32Array`

**Purpose**: Convert spatial image data to frequency domain representation using a simplified FFT approach.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Float32Array`
- Description: Frequency domain representation with real and imaginary components for each frequency bin

**Implementation Details**:
1. Converts input image to grayscale format
2. Implements simplified frequency domain processing (placeholder)
3. Returns array of complex numbers (real/imaginary pairs)

### applyLowPassFilter
**Signature**: `static applyLowPassFilter(imageData: Uint8ClampedArray, width: number, height: number, cutoff: number): Uint8ClampedArray`

**Purpose**: Apply a low-pass filter in the frequency domain to remove high-frequency components.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels
- `cutoff`: Frequency cutoff value

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with low-frequency components preserved

### applyHighPassFilter
**Signature**: `static applyHighPassFilter(imageData: Uint8ClampedArray, width: number, height: number, cutoff: number): Uint8ClampedArray`

**Purpose**: Apply a high-pass filter in the frequency domain to enhance edges and fine details.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels
- `cutoff`: Frequency cutoff value

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with high-frequency components preserved

### applyBandPassFilter
**Signature**: `static applyBandPassFilter(imageData: Uint8ClampedArray, width: number, height: number, lowCutoff: number, highCutoff: number): Uint8ClampedArray`

**Purpose**: Apply a band-pass filter to preserve specific frequency ranges.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels
- `lowCutoff`: Lower frequency cutoff value
- `highCutoff`: Upper frequency cutoff value

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with band frequencies preserved

### applyFrequencyFilter
**Signature**: `static applyFrequencyFilter(imageData: Uint8ClampedArray, width: number, height: number, filterType: string): Uint8ClampedArray`

**Purpose**: Apply a frequency domain filter based on specified type.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels
- `filterType`: Type of filter ("lowpass", "highpass", "bandpass")

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with specified frequency domain filtering applied

### inverseFFT
**Signature**: `static inverseFFT(fftData: Float32Array, width: number, height: number): Uint8ClampedArray`

**Purpose**: Convert frequency domain data back to spatial domain.

**Parameters**:
- `fftData`: Frequency domain representation (Float32Array)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Spatial domain image data reconstructed from frequency domain

### processFrequencyDomain
**Signature**: `static processFrequencyDomain(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray`

**Purpose**: Apply placeholder processing in the frequency domain.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with frequency domain processing applied

### applyCustomFrequencyFilter
**Signature**: `static applyCustomFrequencyFilter(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray`

**Purpose**: Apply a custom frequency domain filter (placeholder implementation).

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with custom frequency filtering applied

### getFrequencySpectrum
**Signature**: `static getFrequencySpectrum(imageData: Uint8ClampedArray, width: number, height: number): Float32Array`

**Purpose**: Extract the magnitude spectrum from frequency domain representation.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Float32Array`
- Description: Frequency magnitude spectrum values

### applyFrequencyConvolution
**Signature**: `static applyFrequencyConvolution(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray`

**Purpose**: Apply frequency domain convolution (placeholder).

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with frequency domain convolution applied

### applyAdvancedFrequencyFilter
**Signature**: `static applyAdvancedFrequencyFilter(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray`

**Purpose**: Apply advanced frequency domain filtering (placeholder).

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Uint8ClampedArray`
- Description: Processed image data with advanced frequency filtering applied

### getFrequencyDomainRepresentation
**Signature**: `static getFrequencyDomainRepresentation(imageData: Uint8ClampedArray, width: number, height: number): Float32Array`

**Purpose**: Get the frequency domain representation of an image.

**Parameters**:
- `imageData`: Raw pixel data in RGBA format (Uint8ClampedArray)
- `width`: Image width in pixels
- `height`: Image height in pixels

**Return Value**: 
- Type: `Float32Array`
- Description: Frequency domain representation with real and imaginary components

## Error Handling
- Implements proper error handling for undefined values during processing
- Returns original image data when filter type is not recognized

## Performance Considerations
- Uses optimized array access patterns for frequency domain operations  
- Implements boundary checking to prevent out-of-bounds memory access
- Processes pixels in row-major order for cache efficiency

## Usage Examples
```typescript
// Apply low-pass filtering
const filteredData = Frequency.applyLowPassFilter(
  imageData, 
  width, 
  height, 
  cutoffValue
);

// Get frequency spectrum  
const spectrum = Frequency.getFrequencySpectrum(imageData, width, height);