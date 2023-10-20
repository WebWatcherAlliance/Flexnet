# GTPS Simple HTTPs

This is a simple Express server for a gameserver named GTPS.

## Setup

### Prerequisites

- Node.js and npm should be installed on your system.

### Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Create a `key.pem` and `cert.pem` file for HTTPS configuration.

### Running the Server

Run the following command to start the server:

#### Install required Package 
```bash
npm install
```

#### Start the server
```bash
node .
```

## Routes

- `/` - Returns 'NaN' as a response.
- `/growtopia/server_data.php` - Returns predefined pack data.
- `/host` - Returns hosting details for Powertunnel.
- `/downhost` - Allows downloading of a file named 'host.txt'.

## Configurations

The server is configured to run on:

- HTTP: Port 80
- HTTPS: Port 443

Make sure these ports are not occupied by other services.

## Logs

All connections are logged in the `log.txt` file. Check the file for connection details.

## Disclaimer

This server is for demonstration purposes and may not be suitable for production environments without proper security considerations.

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.

---
