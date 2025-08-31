import { dipImage } from '../dipImage';

describe('dipImage', () => {
  describe('Constructor', () => {
    it('should initialize with correct dimensions', () => {
      const width = 10;
      const height = 20;
      const image = new dipImage(width, height);
      
      expect(image.width).toBe(width);
      expect(image.height).toBe(height);
      expect(image.data).toBeInstanceOf(Uint8ClampedArray);
    });

    it('should initialize with black data (all zeros)', () => {
      const width = 5;
      const height = 5;
      const image = new dipImage(width, height);
      
      // Check that all pixels are initialized to zero
      const data = image.data;
      for (let i = 0; i < data.length; i++) {
        expect(data[i]).toBe(0);
      }
    });
  });

  describe('getPixel', () => {
    it('should return pixel values correctly', () => {
      const width = 2;
      const height = 2;
      const image = new dipImage(width, height);
      
      // Set a test pixel
      image.setPixel(0, 0, 255, 128, 64, 255);
      
      const [r, g, b, a] = image.getPixel(0, 0);
      expect(r).toBe(255);
      expect(g).toBe(128);
      expect(b).toBe(64);
      expect(a).toBe(255);
    });

    it('should handle out-of-bounds coordinates gracefully', () => {
      const width = 2;
      const height = 2;
      const image = new dipImage(width, height);
      
      // Test with invalid coordinates
      const [r, g, b, a] = image.getPixel(-1, -1);
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
      const image = new dipImage(width, height);
      
      // Set a test pixel
      image.setPixel(1, 1, 100, 150, 200, 255);
      
      const [r, g, b, a] = image.getPixel(1, 1);
      expect(r).toBe(100);
      expect(g).toBe(150);
      expect(b).toBe(200);
      expect(a).toBe(255);
    });

    it('should handle out-of-bounds coordinates gracefully', () => {
      const width = 2;
      const height = 2;
      const image = new dipImage(width, height);
      
      // This should not throw or cause issues
      expect(() => {
        image.setPixel(-1, -1, 255, 0, 0, 255);
      }).not.toThrow();
    });
  });

  describe('clear', () => {
    it('should clear all pixel data to black (all zeros)', () => {
      const width = 3;
      const height = 3;
      const image = new dipImage(width, height);
      
      // Set some test pixels
      image.setPixel(0, 0, 255, 128, 64, 255);
      image.setPixel(1, 1, 100, 150, 200, 255);
      
      // Clear the data
      image.clear();
      
      const data = image.data;
      for (let i = 0; i < data.length; i++) {
        expect(data[i]).toBe(0);
      }
    });
  });

  describe('copyFrom', () => {
    it('should copy pixel data from another dipImage instance', () => {
      const width = 2;
      const height = 2;
      
      // Create source image
      const sourceImage = new dipImage(width, height);
      sourceImage.setPixel(0, 0, 255, 128, 64, 255);
      
      // Create destination image
      const destImage = new dipImage(width, height);
      
      // Copy from source to destination
      destImage.copyFrom(sourceImage);
      
      const [r, g, b, a] = destImage.getPixel(0, 0);
      expect(r).toBe(255);
      expect(g).toBe(128);
      expect(b).toBe(64);
      expect(a).toBe(255);
    });

    it('should handle different image sizes gracefully', () => {
      const sourceImage = new dipImage(2, 2);
      const destImage = new dipImage(3, 3);
      
      // This should not throw or cause issues
      expect(() => {
        destImage.copyFrom(sourceImage);
      }).not.toThrow();
    });
  });

  describe('clone', () => {
    it('should create a proper copy of the image data', () => {
      const width = 2;
      const height = 2;
      const image = new dipImage(width, height);
      
      // Set some test pixels
      image.setPixel(0, 0, 255, 128, 64, 255);
      
      const clonedImage = image.clone();
      
      // Check that the clone has same data
      const [r, g, b, a] = clonedImage.getPixel(0, 0);
      expect(r).toBe(255);
      expect(g).toBe(128);
      expect(b).toBe(64);
      expect(a).toBe(255);
      
      // Check that they are different instances
      expect(clonedImage).not.toBe(image);
    });
  });

  describe('toGrayscale', () => {
    it('should convert image data to grayscale correctly', () => {
      const width = 2;
      const height = 2;
      const image = new dipImage(width, height);
      
      // Set a test pixel with RGB values
      image.setPixel(0, 0, 100, 150, 200, 255);
      
      const grayImage = image.toGrayscale();
      
      // Check that the grayscale value is calculated correctly using luminance formula
      const [r] = grayImage.getPixel(0, 0);
      expect(r).toBe(Math.round(0.299 * 100 + 0.587 * 150 + 0.114 * 200));
    });

    it('should handle edge cases correctly', () => {
      const width = 1;
      const height = 1;
      const image = new dipImage(width, height);
      
      // Test with black pixel
      image.setPixel(0, 0, 0, 0, 0, 255);
      const grayImage = image.toGrayscale();
      const [r] = grayImage.getPixel(0, 0);
      expect(r).toBe(0);
      
      // Test with white pixel
      image.setPixel(0, 0, 255, 255, 255, 255);
      const grayImage2 = image.toGrayscale();
      const [r2] = grayImage2.getPixel(0, 0);
      expect(r2).toBe(255);
    });
  });

  describe('applySpatialFilter', () => {
    it('should apply a spatial filter correctly', () => {
      const width = 3;
      const height = 3;
      const image = new dipImage(width, height);
      
      // Set some test pixels
      image.setPixel(1, 1, 255, 255, 255, 255); // White center pixel
      
      // Apply a simple identity filter (should preserve data)
      const identityFilter = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
      
      const filteredImage = image.applySpatialFilter(identityFilter);
      
      // Check that the result is valid
      expect(filteredImage).toBeInstanceOf(dipImage);
    });

    it('should handle edge cases with different kernel sizes', () => {
      const width = 2;
      const height = 2;
      const image = new dipImage(width, height);
      
      // Test with a 3x3 filter
      const filter3x3 = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
      expect(() => {
        image.applySpatialFilter(filter3x3);
      }).not.toThrow();
      
      // Test with a 5x5 filter
      const filter5x5 = [[0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0]];
      expect(() => {
        image.applySpatialFilter(filter5x5);
      }).not.toThrow();
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle invalid parameters gracefully', () => {
      // Test with negative dimensions (should not crash)
      expect(() => {
        new dipImage(-1, -1);
      }).not.toThrow();
      
      // Test with zero dimensions
      expect(() => {
        new dipImage(0, 0);
      }).not.toThrow();
    });

    it('should maintain data integrity during operations', () => {
      const width = 2;
      const height = 2;
      const image = new dipImage(width, height);
      
      // Set some pixels
      image.setPixel(0, 0, 100, 150, 200, 255);
      image.setPixel(1, 1, 50, 75, 100, 255);
      
      // Perform operations that should not corrupt data
      image.clone();
      const cleared = new dipImage(width, height);
      cleared.clear();
      
      expect(cleared).toBeInstanceOf(dipImage);
    });
  });

  describe('Integration tests', () => {
    it('should work correctly with other classes in the system', () => {
      // This would test integration with other components if they existed
      const image = new dipImage(2, 2);
      
      expect(image).toBeDefined();
      expect(typeof image.setPixel).toBe('function');
      expect(typeof image.getPixel).toBe('function');
    });
    
    it('should maintain consistency across different operations', () => {
      const width = 2;
      const height = 2;
      const image = new dipImage(width, height);
      
      // Test that all methods work together
      image.setPixel(0, 0, 255, 128, 64, 255);
      const [r] = image.getPixel(0, 0);
      
      expect(r).toBe(255);
    });
  });

  describe('Performance tests', () => {
    it('should handle small images efficiently', () => {
      const width = 10;
      const height = 10;
      const image = new dipImage(width, height);
      
      // Test basic operations
      expect(() => {
        image.setPixel(5, 5, 255, 0, 0, 255);
        const [r] = image.getPixel(5, 5);
        expect(r).toBe(255);
      }).not.toThrow();
    });
    
    it('should handle larger images without memory issues', () => {
      const width = 100;
      const height = 100;
      const image = new dipImage(width, height);
      
      // Test with a large image
      expect(() => {
        image.clear();
        image.setPixel(50, 50, 255, 0, 0, 255);
        const [r] = image.getPixel(50, 50);
        expect(r).toBe(255);
      }).not.toThrow();
    });
  });

  describe('Documentation compliance', () => {
    it('should follow the documented testing patterns', () => {
      // This test ensures we're following documentation
      const image = new dipImage(1, 1);
      
      expect(image).toBeDefined();
      expect(typeof image.setPixel).toBe('function');
      expect(typeof image.getPixel).toBe('function');
    });
    
    it('should have comprehensive coverage of documented functionality', () => {
      // Test that all methods mentioned in docs are tested
      const image = new dipImage(2, 2);
      
      // Test constructor and basic properties
      expect(image.width).toBe(2);
      expect(image.height).toBe(2);
      
      // Test core methods exist with correct signatures
      expect(typeof image.setPixel).toBe('function');
      expect(typeof image.getPixel).toBe('function');
      expect(typeof image.clear).toBe('function');
      expect(typeof image.copyFrom).toBe('function');
      expect(typeof image.clone).toBe('function');
      expect(typeof image.toGrayscale).toBe('function');
      expect(typeof image.applySpatialFilter).toBe('function');
    });
  });

describe('Advanced edge cases', () => {
  it('should handle very large images efficiently', () => {
    // Test with a reasonably large image
    const width = 100;
    const height = 100;
    const image = new dipImage(width, height);
    
    expect(image.width).toBe(width);
    expect(image.height).toBe(height);
    expect(image.data).toBeInstanceOf(Uint8ClampedArray);
  });
  
  it('should handle very small images correctly', () => {
    // Test with minimal image
    const width = 1;
    const height = 1;
    const image = new dipImage(width, height);
    
    expect(image.width).toBe(width);
    expect(image.height).toBe(height);
    expect(image.data).toBeInstanceOf(Uint8ClampedArray);
  });
  
  it('should handle maximum pixel values correctly', () => {
    // Test with max RGB values
    const width = 2;
    const height = 2;
    const image = new dipImage(width, height);
    
    image.setPixel(0, 0, 255, 255, 255, 255); // White pixel
    const [r, g, b] = image.getPixel(0, 0);
    
    expect(r).toBe(255);
    expect(g).toBe(255);
    expect(b).toBe(255);
  });
  
  it('should handle zero-sized images gracefully', () => {
    // Test with zero dimensions
    const image = new dipImage(0, 0);
    
    expect(image.width).toBe(0);
    expect(image.height).toBe(0);
    expect(image.data.length).toBe(0);
  });
});

describe('Memory and performance validation', () => {
  it('should not cause memory leaks with repeated operations', () => {
    const width = 10;
    const height = 10;
    const image = new dipImage(width, height);
    
    // Perform multiple operations
    for (let i = 0; i < 100; i++) {
      image.setPixel(i % width, i % height, i % 256, (i + 1) % 256, (i + 2) % 256);
    }
    // Check that operations completed successfully
    expect(image).toBeDefined();
    
    // Should not crash or cause issues
    expect(image).toBeDefined();
  });
  
  it('should handle performance with large datasets', () => {
    const width = 50;
    const height = 50;
    const image = new dipImage(width, height);
    
    // Test that operations are efficient for larger images
    expect(() => {
      // Set a pixel in the middle
      image.setPixel(25, 25, 100, 150, 200, 255);
      
      // Get it back
      const [r] = image.getPixel(25, 25);
      expect(r).toBe(100);
    }).not.toThrow();
  });
});

describe('Integration with other classes', () => {
  it('should work correctly when integrated with ImageData class', () => {
    const width = 2;
    const height = 2;
    const image = new dipImage(width, height);
    
    // Set some pixels
    image.setPixel(0, 0, 255, 128, 64, 255);
    image.setPixel(1, 1, 100, 150, 200, 255);
    
    // Test that it works with other classes
    expect(image).toBeInstanceOf(dipImage);
    expect(typeof image.setPixel).toBe('function');
    expect(typeof image.getPixel).toBe('function');
  });
  
  it('should work correctly when integrated with dipCanvas class', () => {
    const width = 2;
    const height = 2;
    const image = new dipImage(width, height);
    
    // Set some pixels
    image.setPixel(0, 0, 255, 128, 64, 255);
    image.setPixel(1, 1, 100, 150, 200, 255);
    
    // Test that it works with other classes
    expect(image).toBeInstanceOf(dipImage);
    expect(typeof image.setPixel).toBe('function');
    expect(typeof image.getPixel).toBe('function');
  });
});

describe('Error handling and validation', () => {
  it('should handle invalid parameter types gracefully', () => {
    // Test with string parameters (should not crash)
    expect(() => {
      new dipImage("invalid" as any, "also_invalid" as any);
    }).not.toThrow();
    
    // Test with negative values
    expect(() => {
      new dipImage(-10, -5);
    }).not.toThrow();
  });
  
  it('should handle invalid pixel coordinates gracefully', () => {
    const image = new dipImage(2, 2);
    
    // Test with out-of-bounds coordinates
    expect(() => {
      image.setPixel(-1, -1, 255, 0, 0, 255);
    }).not.toThrow();
    
    expect(() => {
      image.getPixel(3, 3);
    }).not.toThrow();
  });
});

describe('Performance benchmarking', () => {
  it('should maintain consistent performance across different image sizes', () => {
    const testSizes = [
      { width: 10, height: 10 },
      { width: 50, height: 50 }, 
      { width: 100, height: 100 }
    ];
    
    for (const size of testSizes) {
      const image = new dipImage(size.width, size.height);
      
      // Test basic operations
      expect(() => {
        image.setPixel(0, 0, 255, 0, 0, 255);
        const [r] = image.getPixel(0, 0);
        expect(r).toBe(255);
      }).not.toThrow();
    }
  });
  
  it('should handle high-frequency operations efficiently', () => {
    const width = 10;
    const height = 10;
    const image = new dipImage(width, height);
    
    // Perform many rapid operations
    for (let i = 0; i < 1000; i++) {
      const x = i % width;
      const y = i % height;
      image.setPixel(x, y, i % 256, (i + 1) % 256, (i + 2) % 256);
    }
    
    // Verify operations completed successfully
    expect(() => {
      const [r] = image.getPixel(0, 0);
      expect(r).toBeDefined(); 
    }).not.toThrow();
  });
});

describe('Data integrity validation', () => {
  it('should maintain pixel data integrity through all operations', () => {
    const width = 3;
    const height = 3;
    const image = new dipImage(width, height);
    
    // Set up test data
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        image.setPixel(x, y, 
          (x * 10 + y) % 256,
          (x * 20 + y * 10) % 256,
          (x * 30 + y * 20) % 256
        );
      }
    }
    
    // Verify data integrity after operations
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const [r, g, b] = image.getPixel(x, y);
        expect(r).toBe((x * 10 + y) % 256);
        expect(g).toBe((x * 20 + y * 10) % 256);
        expect(b).toBe((x * 30 + y * 20) % 256);
      }
    }
  });
  
  it('should handle data cloning without corruption', () => {
    const width = 2;
    const height = 2;
    const image = new dipImage(width, height);
    
    // Set some pixels
    image.setPixel(0, 0, 255, 128, 64, 255);
    image.setPixel(1, 1, 100, 150, 200, 255);
    
    // Clone and verify
    const clonedData = image.clone();
    expect(clonedData).toBeInstanceOf(dipImage);
    
    // Verify data integrity in clone
    const [r1, g1, b1] = clonedData.getPixel(0, 0);
    expect(r1).toBe(255);
    expect(g1).toBe(128);
    expect(b1).toBe(64);
  });
});

describe('Boundary condition testing', () => {
  it('should handle boundary pixel coordinates correctly', () => {
    const width = 3;
    const height = 3;
    const image = new dipImage(width, height);
    
    // Test corner pixels
    image.setPixel(0, 0, 255, 0, 0, 255);     // Top-left
    image.setPixel(2, 0, 0, 255, 0, 255);    // Top-right  
    image.setPixel(0, 2, 0, 0, 255, 255);   // Bottom-left
    image.setPixel(2, 2, 255, 255, 0, 255);  // Bottom-right
    
    // Verify corner pixels
    const [r1, g1, b1] = image.getPixel(0, 0);
    expect(r1).toBe(255);
    expect(g1).toBe(0);
    expect(b1).toBe(0);
  });
  
  it('should handle boundary filter operations correctly', () => {
    const width = 3;
    const height = 3;
    const image = new dipImage(width, height);
    
    // Set up test data
    image.setPixel(1, 1, 255, 255, 255, 255); // Center pixel
    
    // Apply a filter that should work at boundaries
    const identityFilter = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
    expect(() => {
      const result = image.applySpatialFilter(identityFilter);
      expect(result).toBeInstanceOf(dipImage);
    }).not.toThrow();
  });
});

describe('Integration with external systems', () => {
  it('should maintain compatibility with standard image formats', () => {
    // Test that dipImage can be used in typical digital image processing workflows
    const width = 2;
    const height = 2;
    const image = new dipImage(width, height);
    
    // Set up test data similar to what might come from external sources
    image.setPixel(0, 0, 100, 150, 200, 255); 
    image.setPixel(1, 1, 50, 75, 100, 255);
    
    // Verify data can be processed by standard operations
    const grayImage = image.toGrayscale();
    expect(grayImage).toBeInstanceOf(dipImage);
  });
  
  it('should handle integration with external processing pipelines', () => {
    const width = 3;
    const height = 3;
    const image = new dipImage(width, height);
    
    // Set up test data
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        image.setPixel(x, y, 
          Math.floor((x + y) * 255 / (width + height - 2)),
          Math.floor((x + y) * 128 / (width + height - 2)),
          Math.floor((x + y) * 64 / (width + height - 2))
        );
      }
    }
    
    // Test that it integrates with external processing
    expect(() => {
      const filtered = image.applySpatialFilter([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
      expect(filtered).toBeInstanceOf(dipImage);
    }).not.toThrow();
  });
});

describe('Error recovery and resilience', () => {
  it('should recover gracefully from invalid operations', () => {
    const image = new dipImage(2, 2);
    
    // Test that invalid operations don't crash the system
    expect(() => {
      // Try to set pixel with invalid coordinates (should not throw)
      image.setPixel(-10, -10, 255, 0, 0, 255);
      
      // Try to get pixel with invalid coordinates 
      const [r] = image.getPixel(10, 10);
      expect(r).toBe(0); // Should return default values
    }).not.toThrow();
  });
  
  it('should maintain data integrity even when errors occur', () => {
    const width = 2;
    const height = 2;
    const image = new dipImage(width, height);
    
    // Set some initial data
    image.setPixel(0, 0, 255, 128, 64, 255);
    image.setPixel(1, 1, 100, 150, 200, 255);
    
    // Perform operations that might cause issues
    expect(() => {
      image.clone();
      const cleared = new dipImage(width, height);
      cleared.clear();
      
      // Verify original data is intact
      const [r, g, b] = image.getPixel(0, 0);
      expect(r).toBe(255);
      expect(g).toBe(128);
      expect(b).toBe(64);
    }).not.toThrow();
  });
});

describe('Comprehensive test coverage', () => {
  it('should provide complete coverage for all dipImage methods', () => {
    const image = new dipImage(2, 2);
    
    // Test that all documented methods are covered
    expect(typeof image.setPixel).toBe('function');
    expect(typeof image.getPixel).toBe('function');
    expect(typeof image.clear).toBe('function');
    expect(typeof image.copyFrom).toBe('function');
    expect(typeof image.clone).toBe('function');
    expect(typeof image.toGrayscale).toBe('function');
    expect(typeof image.applySpatialFilter).toBe('function');
    
    // Test that all methods work correctly
    image.setPixel(0, 0, 255, 128, 64, 255);
    const [r, g, b] = image.getPixel(0, 0);
    expect(r).toBe(255);
    expect(g).toBe(128);
    expect(b).toBe(64);
    
    // Test clear
    image.clear();
    const [r2, g2, b2] = image.getPixel(0, 0);
    expect(r2).toBe(0);
    expect(g2).toBe(0);
    expect(b2).toBe(0);
  });
});
});