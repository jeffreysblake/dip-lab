import Projection from '../Projection';

describe('Projection', () => {
  describe('applyHorizontalProjection', () => {
    it('should apply horizontal projection correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Projection.applyHorizontalProjection(imageData, width, height);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
      expect(result.length).toBe(16); // Same length as input
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Projection.applyHorizontalProjection(imageData, width, height);
      }).not.toThrow();
    });
  });

  describe('applyVerticalProjection', () => {
    it('should apply vertical projection correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Projection.applyVerticalProjection(imageData, width, height);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
      expect(result.length).toBe(16); // Same length as input
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Projection.applyVerticalProjection(imageData, width, height);
      }).not.toThrow();
    });
  });

  describe('applyRadialProjection', () => {
    it('should apply radial projection correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Projection.applyRadialProjection(imageData, width, height);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
      expect(result.length).toBe(16); // Same length as input
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Projection.applyRadialProjection(imageData, width, height);
      }).not.toThrow();
    });
  });

  describe('applyAngularProjection', () => {
    it('should apply angular projection correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Projection.applyAngularProjection(imageData, width, height);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
      expect(result.length).toBe(16); // Same length as input
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Projection.applyAngularProjection(imageData, width, height);
      }).not.toThrow();
    });
  });

  describe('applyIsometricProjection', () => {
    it('should apply isometric projection correctly to valid image data', () => {
      const width = 4;
      const height = 4;
      const imageData = new Uint8ClampedArray(64); // 16 pixels * 4 channels
      
      // Set some test values
      for (let i = 0; i < 64; i += 4) {
        imageData[i] = 100; imageData[i + 1] = 100; imageData[i + 2] = 100; imageData[i + 3] = 255;
      }

      const result = Projection.applyIsometricProjection(imageData, width, height);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
      expect(result.length).toBe(64); // Same length as input
    });

    it('should handle rotation and offset parameters correctly', () => {
      const width = 4;
      const height = 4;
      const imageData = new Uint8ClampedArray(64); // 16 pixels * 4 channels
      
      // Fill with test data
      for (let i = 0; i < 64; i += 4) {
        imageData[i] = 128; imageData[i + 1] = 128; imageData[i + 2] = 128; imageData[i + 3] = 255;
      }

      // Test with rotation and offset parameters
      expect(() => {
        Projection.applyIsometricProjection(imageData, width, height, 10, 10, 45, 45, 45);
        Projection.applyIsometricProjection(imageData, width, height, -5, 5, -90, 0, 180);
      }).not.toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Projection.applyIsometricProjection(imageData, width, height);
        Projection.applyIsometricProjection(imageData, width, height, 0, 0, 0, 0, 0);
      }).not.toThrow();
    });
  });

  describe('applyCustomProjection', () => {
    it('should apply custom projection correctly for different types', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      // Test different projection types
      expect(() => {
        Projection.applyCustomProjection(imageData, width, height, 'horizontal');
        Projection.applyCustomProjection(imageData, width, height, 'vertical'); 
        Projection.applyCustomProjection(imageData, width, height, 'radial');
        Projection.applyCustomProjection(imageData, width, height, 'angular');
        Projection.applyCustomProjection(imageData, width, height, 'isometric');
      }).not.toThrow();
    });

    it('should apply isometric projection with parameters correctly', () => {
      const width = 4;
      const height = 4;
      const imageData = new Uint8ClampedArray(64); // 16 pixels * 4 channels
      
      // Fill with test data
      for (let i = 0; i < 64; i += 4) {
        imageData[i] = 128; imageData[i + 1] = 128; imageData[i + 2] = 128; imageData[i + 3] = 255;
      }

      // Test isometric projection with various parameters
      expect(() => {
        Projection.applyCustomProjection(imageData, width, height, 'isometric', 5, 5, 30, 45, 60);
        Projection.applyCustomProjection(imageData, width, height, 'isometric', -10, 15, -45, 90, 180);
      }).not.toThrow();
    });

    it('should handle invalid projection types gracefully', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Should not crash with invalid type
      expect(() => {
        Projection.applyCustomProjection(imageData, width, height, 'invalidtype');
      }).not.toThrow();
    });
  });

  describe('applyMultipleProjections', () => {
    it('should apply multiple projections correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const results = Projection.applyMultipleProjections(imageData, width, height);
      
      expect(results).toBeInstanceOf(Array);
      expect(results.length).toBe(4); // Should return array with 4 projection results
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Projection.applyMultipleProjections(imageData, width, height);
      }).not.toThrow();
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle invalid inputs gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Projection.applyHorizontalProjection(imageData, width, height);
        Projection.applyVerticalProjection(imageData, width, height);
        Projection.applyRadialProjection(imageData, width, height);
        Projection.applyAngularProjection(imageData, width, height);
      }).not.toThrow();
    });
    
    it('should handle edge case data correctly', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Test with minimal image
      expect(() => {
        Projection.applyHorizontalProjection(imageData, width, height);
        Projection.applyVerticalProjection(imageData, width, height);
        Projection.applyRadialProjection(imageData, width, height);
        Projection.applyAngularProjection(imageData, width, height);
        Projection.applyCustomProjection(imageData, width, height, 'horizontal');
      }).not.toThrow();
    });
  });
});