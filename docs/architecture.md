# Digital Image Processing (DIP) Electron Application - Architecture Specification

## Overview
This document provides an architectural overview of the DIP Electron application, a digital image processing system that supports spatial filtering, frequency domain analysis, and projection-based image operations.

## System Components

### 1. Core Image Processing Classes

#### Spatial Filtering Module (`src/main/classes/Spatial.ts`)
- **Purpose**: Implements various spatial filters for image manipulation
- **Key Features**:
  - Predefined filters (Gaussian Blur, Sharpen, Edge Detect, etc.)
  - Custom filter application with kernel support
  - Support for 3x3 and larger convolution kernels

#### Frequency Domain Processing Module (`src/main/classes/Frequency.ts`)
- **Purpose**: Implements frequency domain image processing operations
- **Key Features**:
  - Fast Fourier Transform (FFT) implementation
  - Low-pass, high-pass, and band-pass filters in frequency domain
  - Frequency spectrum analysis capabilities
  - Advanced filtering with custom parameters

#### Projection Analysis Module (`src/main/classes/Projection.ts`)
- **Purpose**: Implements various projection-based image analysis techniques
- **Key Features**:
  - Horizontal projection (sum pixels along rows)
  - Vertical projection (sum pixels along columns)  
  - Radial projection (sum pixels along radius from center)
  - Angular projection (sum pixels around center)

### 2. Data Structures

#### Image Data Classes (`src/main/classes/dipImage.ts` and `ImageData.ts`)
- **Purpose**: Provide structured representation of image data
- **Key Features**:
  - RGBA pixel storage with proper bounds checking
  - Pixel manipulation methods (set/get)
  - Image cloning and copying capabilities
  - Grayscale conversion support

#### Canvas Abstraction (`src/main/classes/dipCanvas.ts`)
- **Purpose**: Provides a canvas-like interface for image operations
- **Key Features**:
  - Integration with dipImage data structure
  - Pixel-level manipulation methods
  - Image data access abstraction

### 3. Application Architecture

#### Main Process (`src/main/index.ts`)
- **Purpose**: Manages Electron application lifecycle and window management
- **Key Components**:
  - BrowserWindow creation and configuration
  - HTML file loading with proper path resolution
  - IPC handler setup for communication between renderer and main processes

#### Inter-Process Communication (IPC) Handlers (`src/main/ipc-handlers.ts`)
- **Purpose**: Enable communication between Electron's main and renderer processes
- **Key Features**:
  - Handler for spatial filter application
  - Data serialization/deserialization for image processing operations
  - Error handling for backend processing

### 4. Frontend Integration Points

#### Renderer Process (`src/renderer/`)
- **Purpose**: Handles user interface and frontend interactions
- **Key Components**:
  - HTML views (spatial, frequency, projection)
  - TypeScript integration with Electron's main process
  - UI component structure for image processing controls

## System Flow

### Image Processing Workflow
1. User selects an image or loads one from assets
2. Frontend sends image data to main process via IPC
3. Main process uses Spatial/Frequency/Projection classes for operations  
4. Processed results returned through IPC to frontend
5. Results displayed in appropriate UI view

## Technology Stack
- **Framework**: Electron (cross-platform desktop application framework)
- **Language**: TypeScript (typed JavaScript)
- **Image Processing**: Native browser APIs with custom implementations
- **Architecture**: Main/Renderer process separation with IPC communication

## Design Principles
1. **Modularity**: Each processing module is self-contained and reusable
2. **Extensibility**: Easy to add new filters, projections, or frequency domain operations  
3. **Performance**: Efficient pixel manipulation using typed arrays
4. **Maintainability**: Clear separation of concerns between data structures and processing logic

## Key Features Implemented
- Spatial filtering with 9 predefined kernels
- Frequency domain analysis with FFT capabilities
- Projection-based image analysis techniques
- Image data structure abstraction for efficient operations