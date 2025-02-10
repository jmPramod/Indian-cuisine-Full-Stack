# Indian Cuisine API

## Description
This is a Node.js/Express-based RESTful API for exploring Indian cuisine. The API supports authentication, image uploads, and API documentation, and is containerized using Docker.

## Features
- Authentication using JWT
- Image uploads via Cloudinary
- API documentation using Swagger
- Containerization with Docker
- Testing with Jest

## Technologies Used
- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (jsonwebtoken, bcryptjs)
- **File Uploads:** Multer, Cloudinary
- **API Documentation:** Swagger (swagger-jsdoc, swagger-ui-express)
- **Testing:** Jest, Supertest
- **Containerization:** Docker
- **Other Libraries:** dotenv, cors, morgan, cookie-parser, Joi (for validation)

## Installation

### Prerequisites
- Node.js (>=14.x)
- MongoDB
- Docker (optional, for containerization)

### Clone the Repository
```sh
git clone https://github.com/jmPramod/Indian-cuisine-Full-Stack.git
cd Indian-cuisine-Full-Stack
```

### Install Dependencies
```sh
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Running the Application

### Start the Server
```sh
npm start
```

### Run in Development Mode (with Nodemon)
```sh
nodemon src/index.ts
```

## Testing
Run Jest tests using:
```sh
npm test
```

## API Documentation
Swagger documentation is available at:
```
http://localhost:5000/api-docs
```

## Docker Setup
To build and run the application inside a Docker container:
```sh
docker build -t indian-cuisine-api .
docker run -p 5000:5000 indian-cuisine-api
```

## Project Structure
```
Indian-cuisine-Full-Stack/
│── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── index.ts
│── tests/
│── .env.example
│── Dockerfile
│── package.json
│── README.md
```

## Contributing
Feel free to submit issues or pull requests for improvements.

## Author
Pramod J M

## License
ISC

## Swagger API Documentation
![image](https://github.com/user-attachments/assets/703d2975-0652-4485-9ea1-a1292f9a196e)

