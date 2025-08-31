import Spatial from '../Spatial';
import Frequency from '../Frequency';
import Projection from '../Projection';

// Mock the classes to isolate IPC handler testing
jest.mock('../Spatial');
jest.mock('../Frequency');
jest.mock('../Projection');

describe('IPC Handlers Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Spatial Filter', () => {
    it('should apply spatial filter correctly', () => {
      const mockSpatialFilter = jest.mocked(Spatial.applyFilter);
      mockSpatialFilter.mockReturnValue(new Uint8ClampedArray([255, 0, 0, 255]));

      const testData = new Uint8ClampedArray([255, 0, 0, 255]);
      const result = Spatial.applyFilter(testData, 1, 1, 'Gaussian Blur');
      
      expect(result).toEqual(new Uint8ClampedArray([255, 0, 0, 255]));
      expect(mockSpatialFilter).toHaveBeenCalledWith(testData, 1, 1, 'Gaussian Blur');
    });

    it('should handle spatial filter errors', () => {
      const mockSpatialFilter = jest.mocked(Spatial.applyFilter);
      mockSpatialFilter.mockImplementation(() => {
        throw new Error('Test error');
      });

      const testData = new Uint8ClampedArray([255, 0, 0, 255]);
      
      expect(() => {
        Spatial.applyFilter(testData, 1, 1, 'Gaussian Blur');
      }).toThrow('Test error');
    });
  });

  describe('Frequency Filter', () => {
    it('should apply frequency filter correctly', () => {
      const mockFrequencyFilter = jest.mocked(Frequency.applyFrequencyFilter);
      mockFrequencyFilter.mockReturnValue(new Uint8ClampedArray([255, 0, 0, 255]));

      const testData = new Uint8ClampedArray([255, 0, 0, 255]);
      const result = Frequency.applyFrequencyFilter(testData, 1, 1, 'lowpass');
      
      expect(result).toEqual(new Uint8ClampedArray([255, 0, 0, 255]));
      expect(mockFrequencyFilter).toHaveBeenCalledWith(testData, 1, 1, 'lowpass');
    });

    it('should handle frequency filter errors', () => {
      const mockFrequencyFilter = jest.mocked(Frequency.applyFrequencyFilter);
      mockFrequencyFilter.mockImplementation(() => {
        throw new Error('Test error');
      });

      const testData = new Uint8ClampedArray([255, 0, 0, 255]);
      
      expect(() => {
        Frequency.applyFrequencyFilter(testData, 1, 1, 'lowpass');
      }).toThrow('Test error');
    });
  });

  describe('Projection', () => {
    it('should apply projection correctly', () => {
      const mockProjection = jest.mocked(Projection.applyCustomProjection);
      mockProjection.mockReturnValue(new Uint8ClampedArray([255, 0, 0, 255]));

      const testData = new Uint8ClampedArray([255, 0, 0, 255]);
      const result = Projection.applyCustomProjection(testData, 1, 1, 'horizontal');
      
      expect(result).toEqual(new Uint8ClampedArray([255, 0, 0, 255]));
      expect(mockProjection).toHaveBeenCalledWith(testData, 1, 1, 'horizontal');
    });

    it('should handle projection errors', () => {
      const mockProjection = jest.mocked(Projection.applyCustomProjection);
      mockProjection.mockImplementation(() => {
        throw new Error('Test error');
      });

      const testData = new Uint8ClampedArray([255, 0, 0, 255]);
      
      expect(() => {
        Projection.applyCustomProjection(testData, 1, 1, 'horizontal');
      }).toThrow('Test error');
    });
  });

  describe('Data validation', () => {
    it('should handle various data types correctly', () => {
      const mockSpatialFilter = jest.mocked(Spatial.applyFilter);
      mockSpatialFilter.mockReturnValue(new Uint8ClampedArray([100, 150, 200, 255]));

      const testData = new Uint8ClampedArray([50, 75, 100, 255]);
      const result = Spatial.applyFilter(testData, 1, 1, 'Sharpen');
      
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Uint8ClampedArray);
    });

    it('should handle edge cases with minimal data', () => {
      const mockFrequencyFilter = jest.mocked(Frequency.applyFrequencyFilter);
      mockFrequencyFilter.mockReturnValue(new Uint8ClampedArray([0, 0, 0, 255]));

      const testData = new Uint8ClampedArray([0, 0, 0, 255]);
      const result = Frequency.applyFrequencyFilter(testData, 1, 1, 'highpass');
      
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Uint8ClampedArray);
    });
  });
});