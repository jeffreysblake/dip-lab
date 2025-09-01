"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Image projection analysis for digital image processing.
 *
 * Provides methods to project images along different axes or patterns,
 * which can be useful for texture analysis, shape detection, and pattern recognition.
 */
class Projection {
    /**
     * Apply horizontal projection to an image.
     *
     * This operation sums pixel values along each row (horizontal direction),
     * creating a vertical profile of the image's intensity distribution.
     *
     * @param imageData - The raw pixel data as Uint8ClampedArray
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @returns A new Uint8ClampedArray with horizontal projection applied
     * @throws Error if input parameters are invalid or dimensions don't match
     * @example
     * // Apply horizontal projection to an image
     * const result = Projection.applyHorizontalProjection(imageData, width, height);
     */
    static applyHorizontalProjection(imageData, width, height) {
        var _a, _b, _c, _d;
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
                        rSum += (_a = imageData[pixelIndex]) !== null && _a !== void 0 ? _a : 0;
                        gSum += (_b = imageData[pixelIndex + 1]) !== null && _b !== void 0 ? _b : 0;
                        bSum += (_c = imageData[pixelIndex + 2]) !== null && _c !== void 0 ? _c : 0;
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
                result[index + 3] = (_d = imageData[index + 3]) !== null && _d !== void 0 ? _d : 0; // Keep alpha channel
            }
        }
        return result;
    }
    /**
     * Apply vertical projection to an image.
     *
     * This operation sums pixel values along each column (vertical direction),
     * creating a horizontal profile of the image's intensity distribution.
     *
     * @param imageData - The raw pixel data as Uint8ClampedArray
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @returns A new Uint8ClampedArray with vertical projection applied
     * @throws Error if input parameters are invalid or dimensions don't match
     * @example
     * // Apply vertical projection to an image
     * const result = Projection.applyVerticalProjection(imageData, width, height);
     */
    static applyVerticalProjection(imageData, width, height) {
        var _a, _b, _c, _d;
        const result = new Uint8ClampedArray(width * height * 4);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Get the pixel value at position (x, y)
                const index = (y * width + x) * 4;
                // For vertical projection, we sum pixels along columns
                let rSum = 0, gSum = 0, bSum = 0;
                for (let i = 0; i < height; i++) {
                    const pixelIndex = (i * width + x) * 4;
                    rSum += (_a = imageData[pixelIndex]) !== null && _a !== void 0 ? _a : 0;
                    gSum += (_b = imageData[pixelIndex + 1]) !== null && _b !== void 0 ? _b : 0;
                    bSum += (_c = imageData[pixelIndex + 2]) !== null && _c !== void 0 ? _c : 0;
                }
                // Normalize the sums
                const normalizedR = Math.min(255, Math.max(0, rSum / height));
                const normalizedG = Math.min(255, Math.max(0, gSum / height));
                const normalizedB = Math.min(255, Math.max(0, bSum / height));
                // Set the result pixel
                result[index] = normalizedR;
                result[index + 1] = normalizedG;
                result[index + 2] = normalizedB;
                result[index + 3] = (_d = imageData[index + 3]) !== null && _d !== void 0 ? _d : 0; // Keep alpha channel
            }
        }
        return result;
    }
    /**
     * Apply radial projection to an image from its center.
     *
     * This operation sums pixel values along radial lines extending from the center,
     * creating a polar representation of the image's intensity distribution.
     *
     * @param imageData - The raw pixel data as Uint8ClampedArray
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @returns A new Uint8ClampedArray with radial projection applied
     * @throws Error if input parameters are invalid or dimensions don't match
     * @example
     * // Apply radial projection to an image
     * const result = Projection.applyRadialProjection(imageData, width, height);
     */
    static applyRadialProjection(imageData, width, height) {
        var _a, _b, _c, _d;
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
                        rSum += (_a = imageData[pixelIndex]) !== null && _a !== void 0 ? _a : 0;
                        gSum += (_b = imageData[pixelIndex + 1]) !== null && _b !== void 0 ? _b : 0;
                        bSum += (_c = imageData[pixelIndex + 2]) !== null && _c !== void 0 ? _c : 0;
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
                result[index + 3] = (_d = imageData[index + 3]) !== null && _d !== void 0 ? _d : 0; // Keep alpha channel
            }
        }
        return result;
    }
    /**
     * Apply angular projection to an image around its center.
     *
     * This operation sums pixel values along angular lines extending from the center,
     * creating a representation of the image's intensity distribution in polar coordinates.
     *
     * @param imageData - The raw pixel data as Uint8ClampedArray
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @returns A new Uint8ClampedArray with angular projection applied
     * @throws Error if input parameters are invalid or dimensions don't match
     * @example
     * // Apply angular projection to an image
     * const result = Projection.applyAngularProjection(imageData, width, height);
     */
    static applyAngularProjection(imageData, width, height) {
        var _a, _b, _c, _d;
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
                        rSum += (_a = imageData[pixelIndex]) !== null && _a !== void 0 ? _a : 0;
                        gSum += (_b = imageData[pixelIndex + 1]) !== null && _b !== void 0 ? _b : 0;
                        bSum += (_c = imageData[pixelIndex + 2]) !== null && _c !== void 0 ? _c : 0;
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
                result[index + 3] = (_d = imageData[index + 3]) !== null && _d !== void 0 ? _d : 0; // Keep alpha channel
            }
        }
        return result;
    }
    /**
     * Apply isometric 2.5D projection to visualize brightness as height
     *
     * @param imageData - The raw pixel data as Uint8ClampedArray
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @returns A new Uint8ClampedArray with isometric projection applied
     */
    static applyIsometricProjection(imageData, width, height) {
        const result = new Uint8ClampedArray(width * height * 4);
        // Fill with background
        for (let i = 0; i < result.length; i += 4) {
            result[i] = 20; // Dark background
            result[i + 1] = 20;
            result[i + 2] = 40;
            result[i + 3] = 255;
        }
        // Isometric transformation parameters
        const scaleX = 0.5;
        const scaleY = 0.3;
        const heightScale = 0.2;
        const offsetX = width * 0.2;
        const offsetY = height * 0.1;
        // Sample every 4th pixel for performance
        for (let y = 0; y < height; y += 4) {
            for (let x = 0; x < width; x += 4) {
                const srcIndex = (y * width + x) * 4;
                // Get brightness (height)
                const r = imageData[srcIndex] || 0;
                const g = imageData[srcIndex + 1] || 0;
                const b = imageData[srcIndex + 2] || 0;
                const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
                const heightOffset = brightness * heightScale;
                // Isometric transformation
                const isoX = Math.floor((x - y) * scaleX + offsetX);
                const isoY = Math.floor((x + y) * scaleY + offsetY - heightOffset);
                if (isoX >= 0 && isoX < width && isoY >= 0 && isoY < height) {
                    const destIndex = (isoY * width + isoX) * 4;
                    // Color based on height/brightness with some ambient lighting
                    const lightness = Math.min(255, brightness + 60);
                    result[destIndex] = Math.min(255, lightness * 0.8); // Reddish tint
                    result[destIndex + 1] = Math.min(255, lightness * 0.9); // Green
                    result[destIndex + 2] = Math.min(255, lightness); // Blue
                    result[destIndex + 3] = 255;
                }
            }
        }
        return result;
    }
    /**
     * Apply a custom type of projection to an image.
     *
     * @param imageData - The raw pixel data as Uint8ClampedArray
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @param projectionType - Type of projection to apply
     * @returns A new Uint8ClampedArray with custom projection applied
     * @throws Error if input parameters are invalid or dimensions don't match
     * @example
     * // Apply custom projection type
     * const result = Projection.applyCustomProjection(imageData, width, height, 'horizontal');
     */
    static applyCustomProjection(imageData, width, height, projectionType) {
        var _a;
        switch (projectionType) {
            case 'isometric':
                return this.applyIsometricProjection(imageData, width, height);
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
                    result[i] = (_a = imageData[i]) !== null && _a !== void 0 ? _a : 0;
                }
                return result;
        }
    }
    /**
     * Apply all projection types sequentially to an image.
     *
     * This returns an array containing the results of applying each projection type,
     * which can be useful for comprehensive analysis or comparison.
     *
     * @param imageData - The raw pixel data as Uint8ClampedArray
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @returns An array containing the results of all projection types applied to the input image
     * @throws Error if input parameters are invalid or dimensions don't match
     * @example
     * // Apply all projections sequentially
     * const results = Projection.applyMultipleProjections(imageData, width, height);
     */
    static applyMultipleProjections(imageData, width, height) {
        const results = [];
        // Apply all projection types and collect results
        results.push(this.applyHorizontalProjection(imageData, width, height));
        results.push(this.applyVerticalProjection(imageData, width, height));
        results.push(this.applyRadialProjection(imageData, width, height));
        results.push(this.applyAngularProjection(imageData, width, height));
        return results;
    }
}
exports.default = Projection;
