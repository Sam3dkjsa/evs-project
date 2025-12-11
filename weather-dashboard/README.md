# Weather & Air Quality Dashboard

A modern, responsive weather and air quality monitoring dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- Real-time weather data display
- Hourly and daily forecasts
- Air quality monitoring (AQI, PM2.5, PM10, etc.)
- Location management
- Environmental alerts
- Responsive design for all devices

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Getting Started

1. Clone the repository (if not already cloned)
2. Navigate to the project directory:
   ```
   cd weather-dashboard
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## Building for Production

To create a production build:

```
npm run build
```

The built files will be placed in the `dist` directory.

## Previewing the Production Build

To preview the production build locally:

```
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── services/       # API services and data fetching
├── types/          # TypeScript types and interfaces
├── utils/          # Utility functions
├── App.tsx         # Main application component
├── main.tsx        # Entry point
```

## Customization

The dashboard supports:
- Temperature units (Celsius/Fahrenheit)
- Speed units (km/h or mph)
- Rainfall units (mm or inches)

## Technologies Used

- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Chart.js (data visualization)
- Axios (HTTP client)

## Troubleshooting

If you encounter issues running the application:

1. Ensure all dependencies are installed:
   ```
   npm install
   ```

2. Clear npm cache:
   ```
   npm cache clean --force
   ```

3. Delete node_modules and reinstall:
   ```
   rm -rf node_modules package-lock.json
   npm install
   ```

4. Check Node.js version:
   ```
   node --version
   ```

If you continue to experience issues, please open an issue with details about your environment and the error encountered.