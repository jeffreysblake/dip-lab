# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
```bash
npm run dev          # Run the Electron application in development mode
npx tsc -p .        # Compile TypeScript (required before running)
npm start           # Run the compiled Electron application
```

### Testing
```bash
npm test                    # Run all Jest tests
npm run test:coverage      # Run tests with coverage report
jest src/main/classes/tests/Spatial.test.ts  # Run specific test file
```

### Building
```bash
npm run build       # Compile TypeScript and package with electron-builder
npx tsc -p .       # TypeScript compilation only
```

## Architecture Overview

### Application Structure
This is an **Electron-based Digital Image Processing (DIP) application** with a multi-view interface for different image processing operations:

- **Main Process** (`src/main/`): Node.js backend handling file operations and image processing
- **Renderer Process** (`src/renderer/`): HTML/CSS/JS frontend with dynamic view loading
- **IPC Communication**: Bridges main and renderer processes for image processing operations

### Core Processing Classes (`src/main/classes/`)
The application follows a **functional processing pattern** where each class handles a specific domain:

- **Spatial.ts**: Convolution-based spatial filtering (Gaussian blur, sharpening, edge detection)
- **Frequency.ts**: Frequency domain operations (FFT, low/high/band-pass filtering)  
- **Projection.ts**: Image projection analysis (horizontal, vertical, radial, angular)
- **ImageData.ts**: Core pixel data manipulation and validation
- **dipImage.ts**: High-level image container with coordinate-based pixel access
- **dipCanvas.ts**: Canvas rendering and display operations

### View System Architecture
The application uses a **dynamic view loading system**:

1. **Main Interface** (`src/renderer/index.html`): Sidebar navigation with fetch-based view loading
2. **Individual Views** (`src/renderer/views/*.html`): Self-contained processing interfaces
3. **IPC Integration**: Each view communicates with main process classes via exposed APIs

### IPC Communication Pattern
```
Renderer → window.electronAPI.{method} → IPC → Main Process Classes → Results
```

**Key IPC Handlers** (`src/main/ipc-handlers.ts`):
- `apply-spatial-filter`: Spatial processing operations
- `apply-frequency-filter`: Frequency domain operations  
- `apply-projection`: Projection analysis operations

### Image Asset Handling
Images are loaded from `assets/` directory using relative path `../../assets/Lenna.png` from view files.

## Development Patterns

### Class Structure
- All processing classes use **default exports** and **static methods**
- Image data is passed as `Uint8ClampedArray` with width/height parameters
- Alpha channel preservation is handled consistently across all operations

### Error Handling
- IPC handlers return `{success: boolean, data?: Array, error?: string}` format
- View-level fallback rendering for processing failures
- Comprehensive input validation in all processing methods

### Testing Strategy  
- **Unit tests** for all processing classes with edge case coverage
- **Integration tests** for IPC communication patterns
- **Mocking pattern** for isolating class dependencies
- Tests focus on `src/main/classes/` with 90%+ coverage target

### TypeScript Configuration
- **Strict mode** enabled with comprehensive type checking
- **CommonJS modules** for Electron compatibility
- Source maps and declarations generated for debugging
- Explicit null checks and index access protection