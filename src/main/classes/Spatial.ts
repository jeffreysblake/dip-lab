class Spatial {
  // Predefined filters as constants for easy access
  static Filters: { [key: string]: number[][] } = {
    "Gaussian Blur": [[1, 2, 1], [2, 4, 2], [1, 2, 1]],
    "Sharpen": [[0, -2, 0], [-2, 11, -2], [0, -2, 0]],
    "Mean Removal": [[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]],
    "Emboss Laplascian": [[-1, 0, -1], [0, 4, 0], [-1, 0, -1]],
    "Sobel": [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
    "Edge Detect": [[1, 1, 1], [0, 0, 0], [-1, -1, -1]],
    "Identity": [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
  };

  // Apply custom filter (generic) - this is the default method
  static applyFilter(imageData: Uint8ClampedArray, width: number, height: number, kernelName: string): Uint8ClampedArray {
    let kernel = this.Filters["Identity"];

    const filter = this.Filters[kernelName];
    if (!filter) {
      throw new Error(`Filter "${kernelName}" not found`);
    }
    kernel = filter;
    
    const kernelSize = kernel.length;
    const halfKernel = Math.floor(kernelSize / 2);
    
    const result = new Uint8ClampedArray(imageData.length);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let sumR = 0, sumG = 0, sumB = 0;
        
        // Apply kernel
        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const px = 
            Math.max(0, Math.min(width - 1, x + kx - halfKernel));
            const py = 
            Math.max(0, Math.min(height - 1, y + ky - halfKernel));
            
            if (px >= 0 && px < width && py >= 0 && py < height) {
              const index = (py * width + px) * 4;
              
              // Direct access to pixel data with proper checks
              const r = imageData[index] ?? 0;
              const g = imageData[index + 1] ?? 0; 
              const b = imageData[index + 2] ?? 0;
          
              // Properly extract kernel value - this was the main bug!
              let kernelValue = 0;
              if (kernel && Array.isArray(kernel) && kernel.length > ky && Array.isArray(kernel[ky])) {
                kernelValue = kernel[ky][kx];
              }
              
              sumR += r * kernelValue;
              sumG += g * kernelValue;
              sumB += b * kernelValue;
            }
          }
        }
        
        // Normalize and set pixel
        const normalizedR = Math.min(255, Math.max(0, sumR));
        const normalizedG = Math.min(255, Math.max(0, sumG));
        const normalizedB = Math.min(255, Math.max(0, sumB));
        
        const index = (y * width + x) * 4;
        result[index] = normalizedR;
        result[index + 1] = normalizedG;
        result[index + 2] = normalizedB;
      }
    }
    
    return result;
  }
}

export default Spatial;