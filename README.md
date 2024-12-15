## Montu Technical Test

### Requirements

It is recommended to use Node.js version 18.x or higher. and it is assumed that you have pnpm installed on your system. You can install pnpm using the following command:

- pnpm -> `npm install -g pnpm` or `curl -fsSL https://get.pnpm.io/install.sh | sh`

###

### Getting Started

To get started, clone the repository and install the required dependencies using the following command:

```bash
git clone https://github.com/arnabtarwani/montu.git
cd montu
pnpm install
```

### Running the Application

To run the application, use the following command:

```bash
pnpm dev
```

This will start the development server and open the application in your default browser on `http://localhost:5173`.

### Environment Variables

The application uses the Giphy API to fetch data. The API is rate-limited, so you need to get an API key from the Giphy website and set it as an environment variable. You can set the environment variable using the following command:

```bash
export VITE_GIPHY_BASE_URL="https://api.giphy.com/v1"
export VITE_GIPHY_API_KEY="YOUR_API_KEY"
```

Alternatively, you can set the environment variables in the `.env` file in the root directory of the project. An example `.env.example` file is provided in the root directory.

### Project Structure

The project is structured as follows:

- `src`: Contains the source code for the application.
- `src/api`: Contains the API endpoints for fetching data from the Giphy API.
- `src/components`: Contains reusable components for the application.
- `src/context`: Contains the context provider for the application.
- `src/hooks`: Contains custom hooks for the application.
- `src/lib`: Contains utility functions for the application.
- `src/pages`: Contains the different pages of the application.
- `src/style`: Contains the global styles for the application.
- `src/types`: Contains the types for the applications

### Improvements

- Add more tests for the React components. I am not the best at testing React components, so I preferred to focus on testing the API and the function. I will improve the tests as I learn more about testing React components.

- For testing I have used [vitest](https://vitest.dev/) and [playwright](https://playwright.dev/).

### System Design

The system design is available in the [system-design](./system-design/README.md) folder. It includes the high-level design, functional requirements, non-functional requirements, strategies for event-driven system, high-level load and traffic calculations, endpoints, database models, and the database schema.
