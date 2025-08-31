/**
 * Digital Image Processing Image Class.
 * 
 * This class provides core functionality for handling image data including:
 * - Pixel manipulation with RGBA support  
 * - Image dimension management (width/height)
 * - Data storage using Typed Arrays
 */
export class dipImage {
  private _data: Uint8ClampedArray;
  private _width: number;
  private _height: number;

  /**
   * Create a new image instance
   * @param width - Width of the image in pixels  
   * @param height - Height of the image in pixels
   */
  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    // Initialize with black image (all zeros)
    this._data = new Uint8ClampedArray(width * height * 4);
  }

  /**
   * Get the width of the image
   * @returns Width in pixels
   */
  get width(): number {
    return this._width;
  }

  /**
   * Get the height of the image  
   * @returns Height in pixels
   */
  get height(): number {
    return this._height;
  }

  /**
   * Get the raw pixel data array
   * @returns Uint8ClampedArray containing RGBA values for all pixels
   */
  get data(): Uint8ClampedArray {
    return this._data;
  }

  /**
   * Set the color value of a specific pixel.
   * @param x - X coordinate of the pixel (0-based)
   * @param y - Y coordinate of the pixel (0-based) 
   * @param r - Red component value (0-255)
   * @param g - Green component value (0-255)
   * @param b - Blue component value (0-255)
   * @param a - Alpha component value (0-255, default 255)
   */
  setPixel(x: number, y: number, r: number, g: number, b: number, a: number = 255): void {
    if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
      const index = (y * this._width + x) * 4;
      this._data[index] = r;     // Red
      this._data[index + 1] = g;   // Green
      this._data[index + 2] = b;   // Blue
      this._data[index + 3] = a;   // Alpha
    }
  }

  /**
   * Get the color value of a specific pixel.
   * @param x - X coordinate of the pixel (0-based)
   * @param y - Y coordinate of the pixel (0-based) 
   * @returns An array containing [red, green, blue, alpha] values
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
   * Clear the image data to black (all zeros)
   */
  clear(): void {
    for (let i = 0; i < this._data.length; i++) {
      this._data[i] = 0;
    }
  }

  /**
   * Copy pixel data from another dipImage instance
   * @param other - The source image to copy from
   */
  copyFrom(other: dipImage): void {
    if (this._width === other.width && this._height === other.height) {
      for (let i = 0; i < this._data.length; i++) {
        this._data[i] = other.data[i] ?? 0;
      }
    }
  }

  /**
   * Create a copy of this image
   * @returns A new dipImage instance with identical data
   */
  clone(): dipImage {
    const newImage = new dipImage(this._width, this._height);
    for (let i = 0; i < this._data.length; i++) {
      newImage.data[i] = this._data[i] ?? 0;
    }
    return newImage;
  }

  /**
   * Convert the image to grayscale
   * @returns A new dipImage instance with grayscale values
   */
  toGrayscale(): dipImage {
    const grayImage = new dipImage(this._width, this._height);
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const [r, g, b] = this.getPixel(x, y);
        // Simple luminance formula
        const grayValue = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        grayImage.setPixel(x, y, grayValue, grayValue, grayValue);
      }
    }
    return grayImage;
  }

  /**
   * Apply a simple spatial filter to the image
   * @param filter - A 2D array representing the convolution kernel
   * @returns A new dipImage instance with the filter applied
   */
  applySpatialFilter(filter: number[][]): dipImage {
    const kernelSize = filter.length;
    const halfKernel = Math.floor(kernelSize / 2);
    
    const result = new dipImage(this._width, this._height);

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
              const filterColumn = filter[ky] ?? [];
              sumR += r * (filterColumn[kx] ?? 0);
              sumG += g * (filterColumn[kx] ?? 0);
              sumB += b * (filterColumn[kx] ?? 0);
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