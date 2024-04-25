# Arbitrum Blockchain Node.js Express GraphQL API

This project is a TypeScript Node.js Express API that fetches data from a subgraph on the Arbitrum blockchain network and returns the latest block number on the mainnet. It utilizes GraphQL queries to interact with the subgraph and implements cache optimization techniques for enhanced performance.

## Installation

Before proceeding with the installation, make sure you have Node.js and npm (Node Package Manager) installed on your system.

1. Clone the repository to your local machine:

```
git clone https://github.com/msalvatti/arbitrum-graphql-api.git
```

2. Navigate to the project directory:

```
cd arbitrum-graphql-api
```

3. Install the dependencies:

```
npm install
```

## Configuration

The project utilizes environment variables for sensitive data and configuration. Create a `.env` file in the root directory of the project with the following variables. Use the file .env.example for reference:

```dotenv
# The backend PORT
PORT=3001

# GraphQL endpoint for the Arbitrum blockchain network
GRAPHQL_ENDPOINT=https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/JBnWrv9pvBvSi2pUZzba3VweGBTde6s44QvsDABP47Gt

# Cache Time-to-Live (TTL) in seconds
CACHE_TTL_SECONDS=1
```

Replace `[api-key]` in the `GRAPHQL_ENDPOINT` variable with your actual API key obtained from TheGraph.

## Usage

To start the server, run the following command:

```
npm start
```

This will start the Express server at `http://localhost:3001`.

## Endpoints

### Get Latest Block Number

- **URL:** `/block/latest`
- **Method:** GET
- **Description:** Retrieves the latest block number on the Arbitrum mainnet.

## Testing

To run the unit tests, execute the following command:

```
npm test
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
