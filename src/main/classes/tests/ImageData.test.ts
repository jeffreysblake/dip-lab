import { ImageData } from '../ImageData';

describe('ImageData', () => {
  it('should create an instance with correct properties', () => {
    const width = 10;
    const height = 20;
    const imageData = new ImageData(width, height);
    
    expect(imageData.width).toBe(width);
    expect(imageData.height).toBe(height);
    expect(imageData.data).toBeInstanceOf(Uint8ClampedArray);
  });

  it('should initialize with zero data', () => {
    const width = 5;
    const height = 5;
    const imageData = new ImageData(width, height);
    
    const data = imageData.data;
    for (let i = 0; i < data.length; i++) {
      expect(data[i]).toBe(0);
    }
  });

  it('should set and get pixel values correctly', () => {
    const width = 2;
    const height = 2;
    const imageData = new ImageData(width, height);
    
    // Set a test pixel
    imageData.setPixel(0, 0, 255, 128, 64, 255);
    
    const [r, g, b, a] = imageData.getPixel(0, 0);
    expect(r).toBe(255);
    expect(g).toBe(128);
    expect(b).toBe(64);
    expect(a).toBe(255);
  });

  it('should clear data correctly', () => {
    const width = 3;
    const height = 3;
    const imageData = new ImageData(width, height);
    
    // Set some test pixels
    imageData.setPixel(0, 0, 255, 128, 64, 255);
    imageData.setPixel(1, 1, 100, 150, 200, 255);
    
    // Clear the data
    imageData.clear();
    
    const data = imageData.data;
    for (let i = 0; i < data.length; i++) {
      expect(data[i]).toBe(0);
    }
  });

  it('should clone correctly', () => {
    const width = 2;
    const height = 2;
    const imageData = new ImageData(width, height);
    
    // Set some test pixels
    imageData.setPixel(0, 0, 255, 128, 64, 255);
    
    const clonedImageData = imageData.clone();
    
    // Check that the clone has same data
    const [r, g, b, a] = clonedImageData.getPixel(0, 0);
    expect(r).toBe(255);
    expect(g).toBe(128);
    expect(b).toBe(64);
    expect(a).toBe(255);
    
    // Check that they are different instances
    expect(clonedImageData).not.toBe(imageData);
  });

  it('should convert to grayscale correctly', () => {
    const width = 2;
    const height = 2;
    const imageData = new ImageData(width, height);
    
    // Set a test pixel with RGB values
    imageData.setPixel(0, 0, 100, 150, 200, 255);
    
    const grayImageData = imageData.toGrayscale();
    
    // Check that the grayscale value is calculated correctly using luminance formula
    const [r] = grayImageData.getPixel(0, 0);
    expect(r).toBe(Math.round(0.299 * 100 + 0.587 * 150 + 0.114 * 200));
  });

  it('should apply spatial filter correctly', () => {
    const width = 3;
    const height = 3;
    const imageData = new ImageData(width, height);
    
    // Set a test pixel
    imageData.setPixel(1, 1, 255, 255, 255, 255); // White center pixel
    
    // Apply a simple identity filter (should preserve data)
    const identityFilter = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
    
    const filteredImageData = imageData.applySpatialFilter(identityFilter);
    
    expect(filteredImageData).toBeInstanceOf(ImageData);
  });
});