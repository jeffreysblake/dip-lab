# DIP Electron

A Digital Image Processing (DIP) application built with Electron, TypeScript, and modern web technologies.

## Overview

This project provides a desktop application for digital image processing tasks using Electron framework. It includes various image processing algorithms implemented in TypeScript and rendered through a web-based UI.

## Features

- **Image Processing Algorithms**: 
  - Spatial domain operations
  - Frequency domain transformations  
  - Projection methods
  - Blur detection capabilities
- **Interactive Interface**: 
  - Web-based UI with modern design
  - Real-time image processing visualization
  - Responsive layout for different screen sizes
- **Technical Implementation**:
  - TypeScript backend with Electron
  - Modern JavaScript frontend
  - Comprehensive test suite

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (TypeScript)
- **Backend**: Node.js, Electron
- **Image Processing**: Custom DIP algorithms
- **Testing**: Jest
- **Build Tools**: TypeScript, Webpack/ESBuild

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dip-lab.git
   ```

2. Install dependencies:
   ```bash
   cd dip_lab
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Usage

1. Start the application:
   ```bash
   npm run dev
   ```

2. The application will launch with a web-based interface that provides access to various image processing tools.

3. You can process images using the available algorithms in different domains (spatial, frequency, projection).

## Project Structure

```
dip_lab/
├── src/
│   ├── main/          # Electron main process
│   └── renderer/      # Web UI components  
├── assets/          # Image resources
├── tests/             # Test files
└── package.json       # Dependencies and scripts
```

## Testing

Run the test suite:
```bash
npm run test
```

Generate coverage reports:
```bash
npm run test:coverage
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## Support

For support, please open an issue on GitHub.

## Acknowledgements

- Electron Framework
- Digital Image Processing Algorithms