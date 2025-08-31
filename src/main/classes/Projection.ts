export class Projection {
  // Apply horizontal projection
  static applyHorizontalProjection(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray {
    const result = new Uint8ClampedArray(width * height * 4);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Get the pixel value at position (x, y)
        const index = (y * width + x) * 4;
        
        // For horizontal projection, we sum pixels along rows
        let rSum = 0, gSum = 0, bSum = 0;
        for (let i = 0; i < width; i++) {
          const pixelIndex = (y * width + i) * 4;
          if (imageData[pixelIndex] !== undefined && imageData[pixelIndex + 1] !== undefined && imageData[pixelIndex + 2] !== undefined) {
            rSum += imageData[pixelIndex] ?? 0;
            gSum += imageData[pixelIndex + 1] ?? 0;
            bSum += imageData[pixelIndex + 2] ?? 0;
          }
        }
        
        // Normalize the sums
        const normalizedR = Math.min(255, Math.max(0, rSum / width));
        const normalizedG = Math.min(255, Math.max(0, gSum / width));
        const normalizedB = Math.min(255, Math.max(0, bSum / width));
        
        // Set the result pixel
        result[index] = normalizedR;
        result[index + 1] = normalizedG;
        result[index + 2] = normalizedB;
        result[index + 3] = imageData[index + 3] ?? 0; // Keep alpha channel
      }
    }
    
    return result;
  }

  // Apply vertical projection  
  static applyVerticalProjection(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray {
    const result = new Uint8ClampedArray(width * height * 4);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Get the pixel value at position (x, y)
        const index = (y * width + x) * 4;
        
        // For vertical projection, we sum pixels along columns
        let rSum = 0, gSum = 0, bSum = 0;
        for (let i = 0; i < height; i++) {
          const pixelIndex = (i * width + x) * 4;
          rSum += imageData[pixelIndex] ?? 0;
          gSum += imageData[pixelIndex + 1] ?? 0;
          bSum += imageData[pixelIndex + 2] ?? 0;
        }
        
        // Normalize the sums
        const normalizedR = Math.min(255, Math.max(0, rSum / height));
        const normalizedG = Math.min(255, Math.max(0, gSum / height));
        const normalizedB = Math.min(255, Math.max(0, bSum / height));
        
        // Set the result pixel
        result[index] = normalizedR;
        result[index + 1] = normalizedG;
        result[index + 2] = normalizedB;
        result[index + 3] = imageData[index + 3] ?? 0; // Keep alpha channel
      }
    }
    
    return result;
  }

  // Apply radial projection (from center)
  static applyRadialProjection(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray {
    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);
    
    const result = new Uint8ClampedArray(width * height * 4);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Get the pixel value at position (x, y)
        const index = (y * width + x) * 4;
        
        // Calculate distance from center
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // For radial projection, we sum pixels along radius
        let rSum = 0, gSum = 0, bSum = 0;
        for (let i = 0; i <= Math.floor(distance); i++) {
          const angle = Math.atan2(dy, dx) + (i * 0.1); // Add some variation
          const px = centerX + Math.round(Math.cos(angle) * i);
          const py = centerY + Math.round(Math.sin(angle) * i);
          
          if (px >= 0 && px < width && py >= 0 && py < height) {
            const pixelIndex = (py * width + px) * 4;
            rSum += imageData[pixelIndex] ?? 0;
            gSum += imageData[pixelIndex + 1] ?? 0;
            bSum += imageData[pixelIndex + 2] ?? 0;
          }
        }
        
        // Normalize the sums
        const normalizedR = Math.min(255, Math.max(0, rSum / distance));
        const normalizedG = Math.min(255, Math.max(0, gSum / distance));
        const normalizedB = Math.min(255, Math.max(0, bSum / distance));

        // Set the result pixel
        result[index] = normalizedR;
        result[index + 1] = normalizedG;
        result[index + 2] = normalizedB;
        result[index + 3] = imageData[index + 3] ?? 0; // Keep alpha channel
      }
    }
    
    return result;
  }

  // Apply angular projection (around center)
  static applyAngularProjection(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray {
    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);
    
    const result = new Uint8ClampedArray(width * height * 4);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Get the pixel value at position (x, y)
        const index = (y * width + x) * 4;
        
        // Calculate angle from center
        // const dx = x - centerX;
        // const dy = y - centerY;
        // const angle = Math.atan2(dy, dx);
        
        // For angular projection, we sum pixels along angle
        let rSum = 0, gSum = 0, bSum = 0;
        for (let i = 0; i < 360; i++) { // 360 degrees
          const px = centerX + Math.round(Math.cos(i * Math.PI / 180) * 5); // Add some variation
          const py = centerY + Math.round(Math.sin(i * Math.PI / 180) * 5);
          
          if (px >= 0 && px < width && py >= 0 && py < height) {
            const pixelIndex = (py * width + px) * 4;
            rSum += imageData[pixelIndex] ?? 0;
            gSum += imageData[pixelIndex + 1] ?? 0;
            bSum += imageData[pixelIndex + 2] ?? 0;
          }
        }
        
        // Normalize the sums
        const normalizedR = Math.min(255, Math.max(0, rSum / 360));
        const normalizedG = Math.min(255, Math.max(0, gSum / 360));
        const normalizedB = Math.min(255, Math.max(0, bSum / 360));
        
        // Set the result pixel
        result[index] = normalizedR;
        result[index + 1] = normalizedG;
        result[index + 2] = normalizedB;
        result[index + 3] = imageData[index + 3] ?? 0; // Keep alpha channel
      }
    }
    
    return result;
  }

  // Apply custom projection (generic)
  static applyCustomProjection(imageData: Uint8ClampedArray, width: number, height: number, 
                          projectionType: string): Uint8ClampedArray {
    switch(projectionType) {
      case 'horizontal':
        return this.applyHorizontalProjection(imageData, width, height);
      case 'vertical':  
        return this.applyVerticalProjection(imageData, width, height);
      case 'radial':
        return this.applyRadialProjection(imageData, width, height);
      case 'angular':
        return this.applyAngularProjection(imageData, width, height);
      default:
        // Return original if projection type is not recognized
        const result = new Uint8ClampedArray(width * height * 4);
        for (let i = 0; i < imageData.length; i++) {
          result[i] = imageData[i] ?? 0
        }
        return result;
    }
  }

  // Apply multiple projections in sequence
  static applyMultipleProjections(imageData: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray[] {
    const results: Uint8ClampedArray[] = [];
    
    // Apply all projection types and collect results
    results.push(this.applyHorizontalProjection(imageData, width, height));
    results.push(this.applyVerticalProjection(imageData, width, height)); 
    results.push(this.applyRadialProjection(imageData, width, height));
    results.push(this.applyAngularProjection(imageData, width, height));
    
    return results;
  }
}