# Bookmark Web App

Bookmark is a web application that allows users to sign in with Google, add books to their collection, check popular books, and get AI-powered book recommendations. The app is built using Node.js, Express, and EJS, with data fetched from various APIs. It is deployed on Render and uses Postgres on AivenDB for data storage.

## Features

- **Google Sign-In**: Users can sign in using their Google account.
- **Add Books**: Users can add books to their personal collection.
- **Popular Books**: Check out the most popular books.
- **AI Recommendations**: Get book recommendations powered by AI.

## Live Demo

You can visualize and interact with the app live [here](https://library-hr83.onrender.com/).

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [PostgreSQL](https://www.postgresql.org/) installed and configured
- Google API credentials for OAuth

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/rehmansohail/library.git
    cd bookmark
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    PG_HOST=your-postgres-host
    PG_PORT=your-postgres-port
    PG_DATABASE=your-postgres-database
    PG_USER=your-postgres-user
    PG_PASSWORD=your-postgres-password
    ```

4. **Run the application:**

    ```bash
    npm start
    ```

    The app should now be running on `http://localhost:3000`.

### API Usage

- The app fetches book data and AI recommendations using external APIs. Ensure you have the necessary API keys and configurations set up.

### Deployment

The app is deployed on Render. You can deploy your own instance by following Render's deployment guides.

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework for Node.js
- [EJS](https://ejs.co/) - Embedded JavaScript templating
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [AivenDB](https://aiven.io/) - Managed database services

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Acknowledgments

- Thanks to all the API providers for their awesome data.
- Special thanks to the Render team for their amazing deployment platform.

---

Feel free to modify this README to better suit your project's needs.
