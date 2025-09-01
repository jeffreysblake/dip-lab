"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Spatial_1 = require("./Spatial");
/**
 * Blur detection functionality for digital image processing.
 *
 * This class provides methods for detecting blur in images using edge detection
 * techniques. It uses the Spatial class's edge detection filters to identify
 * edges, then combines the results into vectors to calculate magnitude for heatmap display.
 */
class BlurDetection {
    /**
     * Apply vertical edge detection to image data using Spatial class.
     *
     * @param imageData - The raw pixel data as Uint8ClampedArray
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @returns A new Uint8ClampedArray with vertical edge detection applied
     */
    static applyVerticalEdgeDetection(imageData, width, height) {
        return Spatial_1.default.applyFilter(imageData, width, height, "Vertical Edge");
    }
    /**
     * Apply horizontal edge detection to image data using Spatial class.
     *
     * @param imageData - The raw pixel data as Uint8ClampedArray
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @returns A new Uint8ClampedArray with horizontal edge detection applied
     */
    static applyHorizontalEdgeDetection(imageData, width, height) {
        return Spatial_1.default.applyFilter(imageData, width, height, "Horizontal Edge");
    }
    /**
     * Apply both vertical and horizontal filters to image data and return single channel magnitude.
     *
     * @param imageData - The raw pixel data as Uint8ClampedArray
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @returns A new Uint8ClampedArray with single-channel magnitude visualization (red channel)
     */
    static applyBothFilters(imageData, width, height) {
        // Apply vertical and horizontal edge detection separately
        const verticalResult = this.applyVerticalEdgeDetection(imageData, width, height);
        const horizontalResult = this.applyHorizontalEdgeDetection(imageData, width, height);
        // Combine results into vectors and calculate magnitude for single channel display
        return this.combineResultsIntoMagnitude(verticalResult, horizontalResult, width, height);
    }
    /**
     * Combine vertical and horizontal edge detection results into magnitude values
     * and display as single channel (red) with proper normalization.
     *
     * @param verticalResult - Result from vertical edge detection
     * @param horizontalResult - Result from horizontal edge detection
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @returns A new Uint8ClampedArray with single-channel magnitude in red channel
     */
    static combineResultsIntoMagnitude(verticalResult, horizontalResult, width, height) {
        // Create result array with same length as input
        const result = new Uint8ClampedArray(verticalResult.length);
        const magnitudes = new Float32Array(width * height);
        let maxMagnitude = 0;
        let minMagnitude = Infinity;
        // First pass: calculate all magnitudes and find min/max for normalization
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const pixelIndex = y * width + x;
                // Convert to grayscale for magnitude calculation
                const vGray = ((verticalResult[index] || 0) + (verticalResult[index + 1] || 0) + (verticalResult[index + 2] || 0)) / 3;
                const hGray = ((horizontalResult[index] || 0) + (horizontalResult[index + 1] || 0) + (horizontalResult[index + 2] || 0)) / 3;
                // Calculate magnitude of gradient vector
                const magnitude = Math.sqrt(vGray * vGray + hGray * hGray);
                magnitudes[pixelIndex] = magnitude;
                maxMagnitude = Math.max(maxMagnitude, magnitude);
                minMagnitude = Math.min(minMagnitude, magnitude);
            }
        }
        // Second pass: normalize and create single-channel output
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const pixelIndex = y * width + x;
                // Normalize magnitude to 0-255 range
                const normalizedMagnitude = maxMagnitude > minMagnitude ?
                    (((magnitudes[pixelIndex] || 0) - minMagnitude) / (maxMagnitude - minMagnitude)) * 255 : 0;
                const pixelValue = Math.min(255, Math.max(0, normalizedMagnitude));
                // Set single channel output (red channel shows magnitude, green and blue are 0)
                result[index] = pixelValue; // Red channel - magnitude
                result[index + 1] = 0; // Green channel - zero
                result[index + 2] = 0; // Blue channel - zero
                result[index + 3] = 255; // Alpha channel - opaque
            }
        }
        return result;
    }
    /**
     * Process image data to detect blur using edge detection.
     *
     * @param imageData - The raw pixel data as Uint8ClampedArray (RGBA format)
     * @param width - Width of the image in pixels
     * @param height - Height of the image in pixels
     * @returns A new Uint8ClampedArray with blur detection applied for heatmap display
     */
    static detectBlur(imageData, width, height) {
        // Apply both filters to get vertical and horizontal edge information
        return this.applyBothFilters(imageData, width, height);
    }
}
exports.default = BlurDetection;
