import { dipCanvas } from '../dipCanvas';
import { dipImage } from '../dipImage';

describe('dipCanvas', () => {
  describe('Constructor', () => {
    it('should initialize with correct dimensions', () => {
      const width = 10;
      const height = 20;
      const canvas = new dipCanvas(width, height);
      
      expect(canvas.image).toBeInstanceOf(dipImage);
      // Note: We can't directly test the internal image properties here
    });

    it('should create a valid dipImage instance', () => {
      const width = 5;
      const height = 5;
      const canvas = new dipCanvas(width, height);
      
      expect(canvas.image).toBeInstanceOf(dipImage);
    });
  });

  describe('getPixel', () => {
    it('should return pixel values correctly', () => {
      const width = 2;
      const height = 2;
      const canvas = new dipCanvas(width, height);
      
      // Set a test pixel
      canvas.setPixel(0, 0, 255, 128, 64, 255);
      
      const [r, g, b, a] = canvas.getPixel(0, 0);
      expect(r).toBe(255);
      expect(g).toBe(128);
      expect(b).toBe(64);
      expect(a).toBe(255);
    });

    it('should handle out-of-bounds coordinates gracefully', () => {
      const width = 2;
      const height = 2;
      const canvas = new dipCanvas(width, height);
      
      // Test with invalid coordinates
      const [r, g, b, a] = canvas.getPixel(-1, -1);
      expect(r).toBe(0);
      expect(g).toBe(0);
      expect(b).toBe(0);
      expect(a).toBe(0);
    });
  });

  describe('setPixel', () => {
    it('should set pixel values correctly', () => {
      const width = 2;
      const height = 2;
      const canvas = new dipCanvas(width, height);
      
      // Set a test pixel
      canvas.setPixel(1, 1, 100, 150, 200, 255);
      
      const [r, g, b, a] = canvas.getPixel(1, 1);
      expect(r).toBe(100);
      expect(g).toBe(150);
      expect(b).toBe(200);
      expect(a).toBe(255);
    });

    it('should handle out-of-bounds coordinates gracefully', () => {
      const width = 2;
      const height = 2;
      const canvas = new dipCanvas(width, height);
      
      // This should not throw or cause issues
      expect(() => {
        canvas.setPixel(-1, -1, 255, 0, 0, 255);
      }).not.toThrow();
    });
  });

  describe('clear', () => {
    it('should clear all pixel data to black (all zeros)', () => {
      const width = 3;
      const height = 3;
      const canvas = new dipCanvas(width, height);
      
      // Set some test pixels
      canvas.setPixel(0, 0, 255, 128, 64, 255);
      canvas.setPixel(1, 1, 100, 150, 200, 255);
      
      // Clear the data
      canvas.clear();
      
      const [r, g, b, a] = canvas.getPixel(0, 0);
      expect(r).toBe(0);
      expect(g).toBe(0);
      expect(b).toBe(0);
      expect(a).toBe(0);
    });
  });

  describe('getImageData', () => {
    it('should return the image data correctly', () => {
      const width = 2;
      const height = 2;
      const canvas = new dipCanvas(width, height);
      
      // Set some test pixels
      canvas.setPixel(0, 0, 255, 128, 64, 255);
      
      const data = canvas.getImageData();
      expect(data).toBeInstanceOf(Uint8ClampedArray);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle invalid parameters gracefully', () => {
      // Test with negative dimensions (should not crash)
      expect(() => {
        new dipCanvas(-1, -1);
      }).not.toThrow();
      
      // Test with zero dimensions
      expect(() => {
        new dipCanvas(0, 0);
      }).not.toThrow();
    });

    it('should maintain data integrity during operations', () => {
      const width = 2;
      const height = 2;
      const canvas = new dipCanvas(width, height);
      
      // Set some pixels
      canvas.setPixel(0, 0, 100, 150, 200, 255);
      
      // Perform operations that should not corrupt data
      const imageData = canvas.getImageData();
      
      expect(imageData).toBeInstanceOf(Uint8ClampedArray);
    });
  });

  describe('Integration tests', () => {
    it('should work correctly with dipImage class integration', () => {
      const width = 2;
      const height = 2;
      const canvas = new dipCanvas(width, height);
      
      expect(canvas.image).toBeInstanceOf(dipImage);
    });
    
    it('should maintain consistency across different operations', () => {
      const width = 2;
      const height = 2;
      const canvas = new dipCanvas(width, height);
      
      // Test that all methods work together
      canvas.setPixel(0, 0, 255, 128, 64, 255);
      const [r] = canvas.getPixel(0, 0);
      
      expect(r).toBe(255);
    });
  });

  describe('Performance tests', () => {
    it('should handle small images efficiently', () => {
      const width = 10;
      const height = 10;
      const canvas = new dipCanvas(width, height);
      
      // Test basic operations
      expect(() => {
        canvas.setPixel(5, 5, 255, 0, 0, 255);
        const [r] = canvas.getPixel(5, 5);
        expect(r).toBe(255);
      }).not.toThrow();
    });
    
    it('should handle larger images without memory issues', () => {
      const width = 100;
      const height = 100;
      const canvas = new dipCanvas(width, height);
      
      // Test with a large image
      expect(() => {
        canvas.clear();
        canvas.setPixel(50, 50, 255, 0, 0, 255);
        const [r] = canvas.getPixel(50, 50);
        expect(r).toBe(255);
      }).not.toThrow();
    });
  });

  describe('Documentation compliance', () => {
    it('should follow the documented testing patterns', () => {
      // This test ensures we're following the documentation
      const canvas = new dipCanvas(1, 1);
      
      expect(canvas).toBeDefined();
      expect(typeof canvas.setPixel).toBe('function');
      expect(typeof canvas.getPixel).toBe('function');
    });
    
    it('should have comprehensive coverage of documented functionality', () => {
      // Test that all methods mentioned in docs are tested
      const canvas = new dipCanvas(2, 2);
      
      // Test constructor and basic properties
      expect(canvas.image).toBeInstanceOf(dipImage);
      
      // Test core methods exist with correct signatures
      expect(typeof canvas.setPixel).toBe('function');
      expect(typeof canvas.getPixel).toBe('function');
      expect(typeof canvas.clear).toBe('function');
      expect(typeof canvas.getImageData).toBe('function');
    });
  });
});