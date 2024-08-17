# URL Metadata Fetcher

URL Metadata Fetcher is a web application that allows users to fetch metadata from multiple URLs simultaneously. It provides a simple interface for users to input URLs and displays the fetched metadata in an organized manner.

Live demo: [https://urlfetcherfe.nw.r.appspot.com/](https://urlfetcherfe.nw.r.appspot.com/)

## Features

- Fetch metadata (title, description, and image) from multiple URLs
- Dynamic addition and removal of URL input fields
- Input validation for URLs
- Responsive design using Material-UI components
- Rate limiting to handle a maximum of 5 requests per second
- Security measures against common web vulnerabilities

## Technology Stack

- Frontend: React, Material-UI
- Backend: Node.js, Express
- Deployment: Google Cloud Platform

## Setup and Installation

1. Clone the repository:

```bash 
git clone https://github.com/vladiyudi/metaDataFetcher.git
```

2. Set up the backend:

```bash 
cd metaDataFetcher/be_url_metadata_fetcher
```

Create a `.env` file in the `be_url_metadata_fetcher` directory and add:

```bash 
FRONTEND_URL=http://localhost:3001
PORT=3000
```

3. Start the backend server:

Install dependancies

```bash
npm install
```

Run backend:

```bash 
npm start 
```

4. Set up the frontend:

In a new terminal, 

```bash
cd metaDataFetcher/fe_url_metadata_fetcher
```

Create a `.env` file in the `fe_url_metadata_fetcher` directory and add:

```bash
REACT_APP_BACKEND_URL=http://localhost:3000
PORT=3001 
```

Install dependancies

```bash
npm install
```

Run frontend:

```bash 
npm start 
```

6. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Running Tests

To run the test suite for the backend:

Make sure server is stopped

```bash 
cd metaDataFetcher/be_url_metadata_fetcher
npm run test 
```

To run the test suite for the frontend:

```bash 
cd metaDataFetcher/fe_url_metadata_fetcher
npm test -- --watchAll=false 
```

## Design Choices and Trade-offs

1. **Frontend Framework**: React was chosen for its component-based architecture and efficient rendering, allowing for a smooth user experience.

2. **UI Library**: Material-UI was used to ensure a consistent and responsive design across devices.

3. **State Management**: React's useState hook was used for local state management. For larger applications, a more robust solution like Redux might be considered.

4. **API Requests**: Axios was chosen for its ease of use and built-in CSRF token support.

5. **URL Validation**: A simple regex pattern is used for basic URL validation. For production, a more comprehensive validation library might be considered.

6. **Error Handling**: Errors are displayed to the user for invalid inputs and failed API requests, enhancing user experience.

## Security Measures

1. **CSRF Protection**: The application uses CSRF tokens to prevent Cross-Site Request Forgery attacks.

2. **Helmet**: The Express app uses Helmet middleware to set various HTTP headers for better security.

3. **Rate Limiting**: Implemented on the server to handle a maximum of 5 requests per second, preventing abuse.

4. **Input Validation**: URLs are validated on both client and server side to prevent malicious inputs.

5. **CORS**: Configured to only allow requests from the specified frontend URL.

6. **HTTPS**: The application enforces HTTPS connections for secure data transmission.

