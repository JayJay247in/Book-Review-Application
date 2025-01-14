# Node.js Express Book Management API

This project implements a RESTful API using Node.js and Express.js for managing a collection of books and user reviews. It includes both general user routes (accessible to all) and authenticated user routes (requiring a valid JWT access token).

## Features

### General User Routes

*   **POST `/register`:** Registers a new user (stores username and password) in the system.
*   **GET `/`:** Retrieves a list of all available books.
*   **GET `/isbn/:isbn`:** Retrieves details of a specific book based on its ISBN.
*   **GET `/author/:author`:** Retrieves all books written by a specific author.
*   **GET `/title/:title`:** Retrieves all books with a specific title.
*   **GET `/review/:isbn`:** Retrieves reviews for a specific book by ISBN.

### Authenticated User Routes

*  **POST `/customer/login`**: Authenticates an existing user.
*   **PUT `/customer/auth/review/:isbn`:** Adds or updates a book review.
*   **DELETE `/customer/auth/review/:isbn`:** Deletes a user's specific review for a book.

## Technologies Used

*   Node.js
*   Express.js
*   JSON Web Tokens (JWT)
*   express-session
*   axios (for asynchronous requests)

## Getting Started

To run this server locally, follow these steps:

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 16 or higher) and `npm` (or `yarn`) installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JayJay247in/Book-Review-Application.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Book-Review-Application
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Server

1.  **Start the server:**
    ```bash
    npm run start_auth
    ```
   The server will output `Server is running at port 5000` in the console

## Testing Endpoints

You can test all the endpoints using Postman

### Testing General User Routes

#### POST `/register`

*   **Purpose**: Register a new user
*   **Method**: `POST`
*   **URL**: `http://localhost:5000/register`
*   **Headers**:
     *  `Content-Type`:  `application/json`
*   **Body (JSON)**
    ```json
      {
          "username": "newUser",
          "password": "password123"
      }
    ```
      Replace `"newUser"` and `"password123"` with the username and password you want to register.
*   **Expected Response**:
    *   Status Code: `201 Created`
    *   Body:
        ```json
         {
            "message": "User registered successfully."
           }
         ```

#### GET `/`

*   **Purpose**: Get all available books
*   **Method**: `GET`
*   **URL**: `http://localhost:5000/`
*   **No Body**
*   **Expected Response**:
    *   Status Code: `200 OK`
   *  Response Body: A JSON object representing all books.

#### GET `/isbn/:isbn`

*   **Purpose**:  Get book details with ISBN.
*   **Method**: `GET`
*   **URL**:
     *   To test with valid ISBN: `http://localhost:5000/isbn/12345` (Replace 12345 with a valid ISBN).
     *  To test with invalid ISBN:  `http://localhost:5000/isbn/11111` (Replace 11111 with a non existing ISBN).
*   **No Body**
*   **Expected Response**:
       *   **If Valid ISBN**:
            * Status Code: `200 OK`
            *  Response body: A JSON object representing details of the book.
       *   **If InValid ISBN**:
            * Status Code: `404 Not Found`
            * Body: `{"message":"Book not found"}`.

#### GET `/author/:author`

*   **Purpose**: Get book details with the specified author
*   **Method**: `GET`
*   **URL**:
       *   To test with valid author:  `http://localhost:5000/author/Chinua%20Achebe`
       *    To test with invalid author: `http://localhost:5000/author/someAuthor`
   * **No Body**
*   **Expected Response**:
    *  **If valid author was provided**:
          * Status Code: `200 OK`
           * Response body: Array of books by the specified author.
     *  **If invalid author is provided:**
          * Status Code: `404 Not Found`
          * Response body: `{"message":"Book not found with that author"}`.

#### GET `/title/:title`

*   **Purpose**: Get book details with the specified title.
*   **Method**: `GET`
*   **URL**:
       *  To test with valid title: `http://localhost:5000/title/Things%20Fall%20Apart`
       * To test with invalid title: `http://localhost:5000/title/someTitle`
*   **No Body**
*   **Expected Response**:
      * **For existing title**:
           *   Status Code: `200 OK`
           *   Response Body:  Array of books with that title.
     *  **For non existing title**:
            *  Status Code: `404 Not Found`
            * Response Body: `{"message": "Book not found with that title"}`

#### GET `/review/:isbn`

*   **Purpose**: Get reviews for a specific book with the ISBN
*   **Method**: `GET`
*   **URL**:
    *   For a valid isbn with reviews: `http://localhost:5000/review/12345`
   *   For an invalid isbn:  `http://localhost:5000/review/11111`
*   **No Body**
*  **Expected Response**:
     *   **For a book with reviews**:
          *   Status Code: `200 OK`
          *   Response body: The review for the specified book, if it exists.
      *  **For non-existing book, or a book with no reviews:**
           * Status Code: `404 Not Found`
           * Response body: `{"message": "Reviews not found for this isbn"}`.

### Testing Authenticated User Routes

#### POST `/customer/login`

*   **Purpose:** Log in a registered user and obtain a JWT access token.
*   **Method:** `POST`
*   **URL:** `http://localhost:5000/customer/login`
*   **Headers**:
    *  `Content-Type: application/json`
*   **Body (JSON):**
    ```json
    {
      "username": "yourRegisteredUsername",
      "password": "yourRegisteredPassword"
     }
    ```
      Replace  `yourRegisteredUsername` and `yourRegisteredPassword` with actual registered user details.
*  **Expected Response:**
    * Status Code: `200 OK`
    * Body: `{"message":"User successfully logged in"}`. The access token is not present in the response, however, it will be stored in the server side session.

#### PUT `/customer/auth/review/:isbn`

*   **Purpose:**  Add or update a user's review for a book.
*   **Method**: `PUT`
*   **URL**: `http://localhost:5000/customer/auth/review/12345`
     Replace 12345 with a valid ISBN.
*   **Headers**:
    *  `Authorization`:  `Bearer <access-token>`  (Replace `<access-token>` with valid access token).
    *   Set `Content-Type` to `application/json` if you are sending request body.
*  **Set Query Parameter**
  *   In the `Params` tab, set key as `review`, and value as  `your book review message`. (Or the desired review text)
*   **Expected Response:**
    *   Status code:  `200 OK`
    *   Response body: `"Review successfully added/updated"`

#### DELETE `/customer/auth/review/:isbn`

*  **Purpose**: Delete a review for a book created by the logged in user.
*  **Method**: `DELETE`
*   **URL**: `http://localhost:5000/customer/auth/review/12345`  (replace the value with the actual `isbn`)
*   **Headers**:
       * `Authorization`: `Bearer <access-token>`
       Replace `<access-token>` with the access token you obtained from `/login`
*   **Expected Response:**
    *   **If the review is deleted**:
        * Status code `200 OK`
         * Body: `Friend deleted.`
    * **If the review is not found for the given user and isbn**
         *  Status code: `404 Not Found`
        *  Body: `{"message":"Review not found."}`

## Project Structure

*   `index.js`: Main server file.
*   `routes/general.js`:  Contains all general routes (for getting list of all books, books by author, title, ISBN, reviews, and user registration).
*   `routes/auth_users.js`: Contains all the routes for authentication using jwt and express session, and allows the user to add or delete reviews.
* `routes/booksdb.js`: Contains all the data of the books.

## Author

Ikechukwu Faithful

Feel free to customize this `README.md` further with specific project details or additional features.