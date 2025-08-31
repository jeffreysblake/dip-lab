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

  // Set pixel at x,y with RGBA values
  setPixel(x: number, y: number, r: number, g: number, b: number, a: number = 255): void {
    if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
      const index = (y * this._width + x) * 4;
      this._data[index] = r;     // Red
      this._data[index + 1] = g; // Green
      this._data[index + 2] = b; // Blue
      this._data[index + 3] = a; // Alpha
    }
  }

  // Get pixel at x,y as RGBA values
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

  // Clear image to black (all zeros)
  clear(): void {
    for (let i = 0; i < this._data.length; i++) {
      this._data[i] = 0;
    }
  }

  // Copy image data
  copyFrom(other: ImageData): void {
    if (this._width === other.width && this._height === other.height) {
      for (let i = 0; i < this._data.length; i++) {
        this._data[i] = other.data[i] ?? 0;
      }
    }
  }

  // Create a copy of this image data
  clone(): ImageData {
    const newImageData = new ImageData(this._width, this._height);
    for (let i = 0; i < this._data.length; i++) {
      newImageData.data[i] = this._data[i] ?? 0;
    }
    return newImageData;
  }

  // Convert to grayscale
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

  // Apply a simple spatial filter (e.g., averaging)
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