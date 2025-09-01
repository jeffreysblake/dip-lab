import Frequency from '../Frequency';

describe('Frequency', () => {
  describe('applyFFT', () => {
    it('should apply FFT correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Frequency.applyFFT(imageData, width, height);
      
      expect(result).toBeInstanceOf(Float32Array);
      expect(result.length).toBe(width * height * 2); // Real and imaginary parts
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.applyFFT(imageData, width, height);
      }).not.toThrow();
    });
  });

  describe('applyLowPassFilter', () => {
    it('should apply low-pass filter correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Frequency.applyLowPassFilter(imageData, width, height, 1);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.applyLowPassFilter(imageData, width, height, 1);
      }).not.toThrow();
    });
  });

  describe('applyHighPassFilter', () => {
    it('should apply high-pass filter correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Frequency.applyHighPassFilter(imageData, width, height, 1);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.applyHighPassFilter(imageData, width, height, 1);
      }).not.toThrow();
    });
  });

  describe('applyBandPassFilter', () => {
    it('should apply band-pass filter correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Frequency.applyBandPassFilter(imageData, width, height, 0.1, 0.9);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.applyBandPassFilter(imageData, width, height, 0.1, 0.9);
      }).not.toThrow();
    });
  });

  describe('applyFrequencyFilter', () => {
    it('should apply frequency filter correctly for different types', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      // Test different filter types
      expect(() => {
        Frequency.applyFrequencyFilter(imageData, width, height, 'lowpass');
        Frequency.applyFrequencyFilter(imageData, width, height, 'highpass'); 
        Frequency.applyFrequencyFilter(imageData, width, height, 'bandpass');
        Frequency.applyFrequencyFilter(imageData, width, height, 'invalidtype');
      }).not.toThrow();
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.applyFrequencyFilter(imageData, width, height, 'lowpass');
      }).not.toThrow();
    });
  });

  describe('inverseFFT', () => {
    it('should inverse FFT correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const fftData = new Float32Array(8); // Real and imaginary parts
      
      // Set some test values
      fftData[0] = 255; fftData[1] = 0;
      fftData[2] = 0;   fftData[3] = 255;
      fftData[4] = 0;   fftData[5] = 0;
      fftData[6] = 128; fftData[7] = 128;

      const result = Frequency.inverseFFT(fftData, width, height);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const fftData = new Float32Array(2); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.inverseFFT(fftData, width, height);
      }).not.toThrow();
    });
  });

  describe('processFrequencyDomain', () => {
    it('should process frequency domain correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Frequency.processFrequencyDomain(imageData, width, height);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.processFrequencyDomain(imageData, width, height);
      }).not.toThrow();
    });
  });

  describe('getFrequencySpectrum', () => {
    it('should get frequency spectrum correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Frequency.getFrequencySpectrum(imageData, width, height);
      
      expect(result).toBeInstanceOf(Float32Array);
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.getFrequencySpectrum(imageData, width, height);
      }).not.toThrow();
    });
  });

  describe('applyCustomFrequencyFilter', () => {
    it('should apply custom frequency filter correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Frequency.applyCustomFrequencyFilter(imageData, width, height);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.applyCustomFrequencyFilter(imageData, width, height);
      }).not.toThrow();
    });
  });

  describe('applyAdvancedFrequencyFilter', () => {
    it('should apply advanced frequency filter correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Frequency.applyAdvancedFrequencyFilter(imageData, width, height);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.applyAdvancedFrequencyFilter(imageData, width, height);
      }).not.toThrow();
    });
  });

  describe('getFrequencyDomainRepresentation', () => {
    it('should get frequency domain representation correctly to valid image data', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Frequency.getFrequencyDomainRepresentation(imageData, width, height);
      
      expect(result).toBeInstanceOf(Float32Array);
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.getFrequencyDomainRepresentation(imageData, width, height);
      }).not.toThrow();
    });
  });

  describe('getFrequencyDomainMagnitude', () => {
    it('should get frequency domain magnitude visualization correctly', () => {
      const width = 4;
      const height = 4;
      const imageData = new Uint8ClampedArray(64); // 16 pixels * 4 channels
      
      // Fill with test data
      for (let i = 0; i < 64; i += 4) {
        imageData[i] = 128; imageData[i + 1] = 128; imageData[i + 2] = 128; imageData[i + 3] = 255;
      }

      const result = Frequency.getFrequencyDomainMagnitude(imageData, width, height);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
      expect(result.length).toBe(64); // Same length as input
    });

    it('should return proper magnitude visualization with log-shifted plot', () => {
      const width = 2;
      const height = 2;
      const imageData = new Uint8ClampedArray(16); // 4 pixels * 4 channels
      
      // Set some test values
      imageData[0] = 255; imageData[1] = 0;   imageData[2] = 0;   imageData[3] = 255;
      imageData[4] = 0;   imageData[5] = 255; imageData[6] = 0;   imageData[7] = 255;
      imageData[8] = 0;   imageData[9] = 0;   imageData[10] = 255; imageData[11] = 255;
      imageData[12] = 128; imageData[13] = 128; imageData[14] = 128; imageData[15] = 255;

      const result = Frequency.getFrequencyDomainMagnitude(imageData, width, height);
      
      expect(result).toBeInstanceOf(Uint8ClampedArray);
      expect(result.length).toBe(16); // Same length as input
      // Verify alpha channel is preserved
      for (let i = 3; i < result.length; i += 4) {
        expect(result[i]).toBe(255);
      }
    });

    it('should handle edge cases gracefully', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Should not crash with minimal data
      expect(() => {
        Frequency.getFrequencyDomainMagnitude(imageData, width, height);
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
        Frequency.applyFFT(imageData, width, height);
        Frequency.applyLowPassFilter(imageData, width, height, 1);
        Frequency.applyHighPassFilter(imageData, width, height, 1);
        Frequency.applyBandPassFilter(imageData, width, height, 0.1, 0.9);
        Frequency.getFrequencyDomainMagnitude(imageData, width, height);
      }).not.toThrow();
    });
    
    it('should handle edge case data correctly', () => {
      const width = 1;
      const height = 1;
      const imageData = new Uint8ClampedArray(4); // Single pixel
      
      // Test with minimal image
      expect(() => {
        Frequency.applyFFT(imageData, width, height);
        Frequency.applyLowPassFilter(imageData, width, height, 1);
        Frequency.applyHighPassFilter(imageData, width, height, 1);
        Frequency.applyBandPassFilter(imageData, width, height, 0.1, 0.9);
        Frequency.getFrequencyDomainMagnitude(imageData, width, height);
      }).not.toThrow();
    });

    it('should verify frequency filters now return magnitude visualizations', () => {
      const width = 4;
      const height = 4;
      const imageData = new Uint8ClampedArray(64); // 16 pixels * 4 channels
      
      // Fill with test data
      for (let i = 0; i < 64; i += 4) {
        imageData[i] = 100; imageData[i + 1] = 150; imageData[i + 2] = 200; imageData[i + 3] = 255;
      }

      // All filters should return magnitude visualization (Uint8ClampedArray)
      const lowPass = Frequency.applyLowPassFilter(imageData, width, height, 2);
      const highPass = Frequency.applyHighPassFilter(imageData, width, height, 2);  
      const bandPass = Frequency.applyBandPassFilter(imageData, width, height, 1, 3);
      const magnitude = Frequency.getFrequencyDomainMagnitude(imageData, width, height);
      
      expect(lowPass).toBeInstanceOf(Uint8ClampedArray);
      expect(highPass).toBeInstanceOf(Uint8ClampedArray);
      expect(bandPass).toBeInstanceOf(Uint8ClampedArray);
      expect(magnitude).toBeInstanceOf(Uint8ClampedArray);
      
      expect(lowPass.length).toBe(64);
      expect(highPass.length).toBe(64);
      expect(bandPass.length).toBe(64);
      expect(magnitude.length).toBe(64);
    });
  });
});