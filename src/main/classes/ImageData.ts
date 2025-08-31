/**
 * Image data handling class for digital image processing.
 * 
 * This class provides functionality for managing and manipulating
 * raw pixel data including setting/getting individual pixels,
 * copying data, converting to grayscale, and applying spatial filters.
 */
export class ImageData {
  private _data: Uint8ClampedArray;
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    // Initialize with black image (all zeros)
    this._data = new Uint8ClampedArray(width * height * 4);
  }

  get data(): Uint8ClampedArray {
    return this._data;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  /**
   * Set the color value of a specific pixel.
   * 
   * @param x - X coordinate of the pixel (0-based)
   * @param y - Y coordinate of the pixel (0-based) 
   * @param r - Red component value (0-255)
   * @param g - Green component value (0-255)
   * @param b - Blue component value (0-255)
   * @param a - Alpha component value (0-255, default 255)
   * @throws Error if coordinates are out of bounds
   * @example
   * // Set pixel at position (10, 20) to red color
   * imageData.setPixel(10, 20, 255, 0, 0, 255);
   */
  setPixel(x: number, y: number, r: number, g: number, b: number, a: number = 255): void {
    if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
      const index = (y * this._width + x) * 4;
      this._data[index] = r;     // Red
      this._data[index + 1] = g; // Green
      this._data[index + 2] = b; // Blue
      this._data[index + 3] = a; // Alpha
    }
  }

  /**
   * Get the color value of a specific pixel.
   * 
   * @param x - X coordinate of the pixel (0-based)
   * @param y - Y coordinate of the pixel (0-based) 
   * @returns An array containing [red, green, blue, alpha] values
   * @throws Error if coordinates are out of bounds
   * @example
   * // Get pixel color at position (10, 20)
   * const [r, g, b, a] = imageData.getPixel(10, 20);
   */
  getPixel(x: number, y: number): [number, number, number, number] {
    if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
      const index = (y * this._width + x) * 4;
      return [
        this._data[index] ?? 0,     // Red
        this._data[index + 1] ?? 0, // Green
        this._data[index + 2] ?? 0, // Blue
        this._data[index + 3] ?? 0  // Alpha
      ];
    }
    return [0, 0, 0, 0];
  }

  /**
   * Clear the image data to black (all zeros).
   * 
   * @throws Error if operation fails
   * @example
   * // Clear image data to black
   * imageData.clear();
   */
  clear(): void {
    for (let i = 0; i < this._data.length; i++) {
      this._data[i] = 0;
    }
  }

  /**
   * Copy pixel data from another ImageData instance.
   * 
   * @param other - The source image data to copy from
   * @throws Error if dimensions don't match or operation fails
   * @example
   * // Copy image data from another source
   * imageData.copyFrom(otherImageData);
   */
  copyFrom(other: ImageData): void {
    if (this._width === other.width && this._height === other.height) {
      for (let i = 0; i < this._data.length; i++) {
        this._data[i] = other.data[i] ?? 0;
      }
    }
  }

  /**
   * Create a copy of this image data.
   * 
   * @returns A new ImageData instance with identical data
   * @throws Error if operation fails
   * @example
   * // Clone the image data
   * const clonedData = imageData.clone();
   */
  clone(): ImageData {
    const newImageData = new ImageData(this._width, this._height);
    for (let i = 0; i < this._data.length; i++) {
      newImageData.data[i] = this._data[i] ?? 0;
    }
    return newImageData;
  }

  /**
   * Convert the image data to grayscale.
   * 
   * @returns A new ImageData instance with grayscale values
   * @throws Error if operation fails
   * @example
   * // Convert image data to grayscale
   * const grayData = imageData.toGrayscale();
   */
  toGrayscale(): ImageData {
    const grayImageData = new ImageData(this._width, this._height);
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const [r, g, b] = this.getPixel(x, y);
        // Simple luminance formula
        const grayValue = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        grayImageData.setPixel(x, y, grayValue, grayValue, grayValue);
      }
    }
    return grayImageData;
  }

  /**
   * Apply a simple spatial filter to the image data.
   * 
   * @param filter - A 2D array representing the convolution kernel
   * @returns A new ImageData instance with the filter applied
   * @throws Error if operation fails or invalid parameters
   * @example
   * // Apply a Gaussian blur filter
   * const filteredData = imageData.applySpatialFilter(gaussianKernel);
   */
  applySpatialFilter(filter: number[][]): ImageData {
    const kernelSize = filter.length;
    const halfKernel = Math.floor(kernelSize / 2);
    
    const result = new ImageData(this._width, this._height);

    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;

        // Apply kernel
        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const px = x + kx - halfKernel;
            const py = y + ky - halfKernel;

            if (px >= 0 && px < this._width && py >= 0 && py < this._height) {
              const [r, g, b] = this.getPixel(px, py);
              const filter_column = filter[ky] ?? [];
              sumR += r * (filter_column[kx] ?? 0);
              sumG += g * (filter_column[kx] ?? 0);
              sumB += b * (filter_column[kx] ?? 0);
            }
          }
        }

        // Normalize and set pixel
        const normalizedR = Math.min(255, Math.max(0, sumR));
        const normalizedG = Math.min(255, Math.max(0, sumG));
        const normalizedB = Math.min(255, Math.max(0, sumB));

        result.setPixel(x, y, normalizedR, normalizedG, normalizedB);
      }
    }

    return result;
  }
}