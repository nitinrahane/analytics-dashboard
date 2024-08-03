# Analytics Dashboard

Welcome to the Analytics Dashboard project! This is a web application designed to visualize survey response data using various types of charts and word clouds. The project is built with React, Redux, and various charting libraries, and it is bundled with Vite for fast development and optimized production builds.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- Visualize survey response data with different chart types: Radar, Bar, Line, Pie, Radial Bar, and Area charts.
- Word clouds for entities and themes.
- Responsive design for all charts and components.
- Dynamic data fetching from a backend API.
- Configurable column visibility and density in data tables.
- Clean and consistent global styles using Sass.

## Tech Stack

- **Frontend:** React, Redux, TypeScript
- **Charting Libraries:** Recharts, D3, D3-Cloud
- **UI Library:** Material-UI (MUI)
- **Build Tool:** Vite
- **Styling:** Sass
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios

## Getting Started

Follow these steps to get the project up and running on your local machine:

### Prerequisites

Ensure you have the following installed:

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/nitinrahane/analytics-dashboard.git
    cd analytics-dashboard
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Create a `.env` file in the root directory:**

    ```env
    VITE_API_BASE_URL=http://localhost:4000
    ```

### Running and Building

### Running the Development Server

Start the development server with:

```bash
npm run dev
# or
yarn dev

```

The application should now be running on http://localhost:3000.

Building for Production
To build the project for production, run:

```bash
npm run build
# or
yarn build
```
The optimized and minified output will be in the dist directory.

Previewing the Production Build
To preview the production build locally, run:

```bash
npm run preview
# or
yarn preview
```


### Section : Project Structure

```markdown
## Project Structure

```plaintext
analytics-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── ChartSelector/
│   │   ├── DataTable/
│   │   ├── EmotionChart/
│   │   ├── SentimentDistribution/
│   │   ├── WordCloud/
│   │   └── ...
│   ├── hooks/
│   ├── interfaces/
│   ├── services/
│   ├── store/
│   ├── styles/
│   │   ├── _variables.scss
│   │   └── global.scss
│   ├── types/
│   ├── constants/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── .env
├── package.json
├── tsconfig.json
└── vite.config.ts

### Available Scripts


## Available Scripts

- **`npm start` or `yarn start`:** Start the Vite development server.
- **`npm run dev` or `yarn dev`:** Start the Vite development server.
- **`npm run build` or `yarn build`:** Build the project for production.
- **`npm run preview` or `yarn preview`:** Preview the production build locally.
- **`npm run lint` or `yarn lint`:** Run ESLint to lint the codebase.

## Environment Variables

The project uses environment variables to configure the backend API base URL. Create a `.env` file in the root directory and add the following:

```env
VITE_API_BASE_URL=http://localhost:4000
```


### Contributing

```markdown
## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Create a pull request to the main repository.
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
