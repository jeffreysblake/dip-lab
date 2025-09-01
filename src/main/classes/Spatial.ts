/**
 * Spatial filtering operations for digital image processing.
 * 
 * This class provides methods for applying various spatial filters to images,
 * including convolution-based operations using predefined kernels or custom filters.
 */
export default class Spatial {
  /**
   * Predefined filters as constants for easy access.
   * Each filter is represented as a 2D array of numbers.
   */
  static Filters: { [key: string]: number[][] } = {
    "Gaussian Blur": [
      [1/273, 4/273, 7/273, 4/273, 1/273], 
      [4/273, 16/273, 26/273, 16/273, 4/273], 
      [7/273, 26/273, 41/273, 26/273, 7/273], 
      [4/273, 16/273, 26/273, 16/273, 4/273], 
      [1/273, 4/273, 7/273, 4/273, 1/273]
    ],
    "Sharpen": [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
    "Mean Removal": [[-1/9, -1/9, -1/9], [-1/9, 8/9, -1/9], [-1/9, -1/9, -1/9]],
    "Emboss Laplascian": [[-1, 0, -1], [0, 4, 0], [-1, 0, -1]],
    "Sobel": [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
    "Horizontal Edge": [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
    "Vertical Edge": [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
    "Identity": [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
  };

  /**
   * Apply a custom filter to image data.
   * 
   * @param imageData - The raw pixel data as Uint8ClampedArray
   * @param width - Width of the image in pixels
   * @param height - Height of the image in pixels
   * @param kernelName - Name of predefined kernel to apply (e.g. "Gaussian Blur")
   * @returns A new Uint8ClampedArray with the filter applied
   * @throws Error if specified kernel is not found
   * @example
   * // Apply Gaussian blur filter
   * const result = Spatial.applyFilter(imageData, width, height, "Gaussian Blur");
   */
  static applyFilter(imageData: Uint8ClampedArray, width: number, height: number, kernelName: string): Uint8ClampedArray {
    let kernel = this.Filters["Identity"];

    const filter = this.Filters[kernelName];
    if (!filter) {
      throw new Error(`Filter "${kernelName}" not found`);
    }
    kernel = filter;
    
    const kernelSize = kernel.length;
    const halfKernel = Math.floor(kernelSize / 2);
    
    // Kernels are now pre-normalized, so no additional normalization needed
    const normalizeFactor = 1;
    
    const result = new Uint8ClampedArray(imageData.length);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let sumR = 0, sumG = 0, sumB = 0;
        
        // Apply kernel
        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const px = Math.max(0, Math.min(width - 1, x + kx - halfKernel));
            const py = Math.max(0, Math.min(height - 1, y + ky - halfKernel));
            
            if (px >= 0 && px < width && py >= 0 && py < height) {
              const index = (py * width + px) * 4;
              
              // Direct access to pixel data with proper checks
              const r = imageData[index] ?? 0;
              const g = imageData[index + 1] ?? 0; 
              const b = imageData[index + 2] ?? 0;
            
              // Properly extract kernel value
              let kernelValue = 0;
              if (kernel && Array.isArray(kernel) && ky < kernel.length && Array.isArray(kernel[ky]) && kx < kernel[ky]!.length) {
                const kernelElement = kernel[ky]![kx];
                kernelValue = kernelElement !== undefined ? kernelElement : 0;
              }
              
              sumR += r * kernelValue;
              sumG += g * kernelValue;
              sumB += b * kernelValue;
            }
          }
        }
        
        // Handle filters that can produce negative values (like Mean Removal)
        let normalizedR, normalizedG, normalizedB;
        
        if (kernelName === "Mean Removal") {
          // For Mean Removal, use proper contrast enhancement
          const scaleR = (sumR / normalizeFactor) * 2 + 128;
          const scaleG = (sumG / normalizeFactor) * 2 + 128;  
          const scaleB = (sumB / normalizeFactor) * 2 + 128;
          
          normalizedR = Math.min(255, Math.max(0, scaleR));
          normalizedG = Math.min(255, Math.max(0, scaleG));
          normalizedB = Math.min(255, Math.max(0, scaleB));
        } else {
          // Standard normalization for other filters
          normalizedR = Math.min(255, Math.max(0, sumR / normalizeFactor));
          normalizedG = Math.min(255, Math.max(0, sumG / normalizeFactor));
          normalizedB = Math.min(255, Math.max(0, sumB / normalizeFactor));
        }
        
        const index = (y * width + x) * 4;
        result[index] = normalizedR;
        result[index + 1] = normalizedG;
        result[index + 2] = normalizedB;
        result[index + 3] = imageData[index + 3] || 255; // Preserve alpha channel
      }
    }
    
    return result;
  }
}