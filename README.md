# RudderStack Data Catalog API

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Docker** and **Docker Compose**: For containerization and running the application
- **Node.js**: For development environment setup

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/nadywgd/rudderstack-data-catalog.git
   cd rudderstack-data-catalog
   ```

2. Install the required Node.js dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:
   Create a `.env` file at the root of the project, and add the following environment variables:

   ```env
   POSTGRES_DB=postgres
   POSTGRES_HOST=db
   POSTGRES_PASSWORD=postgres
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   ```

4. Start the application and PostgreSQL database using Docker Compose:

   ```bash
   docker-compose up --build
   ```

   This will start both the API and the PostgreSQL database in containers. The API will be accessible at `http://localhost:8080`.

---

## Deployment

1. Build the Docker images and start the containers:

   ```bash
   docker-compose up --build -d
   ```

2. Your application will be available at `http://localhost:8080`, and PostgreSQL will be running on `localhost:5432`.

3. If you'd like to deploy this app to a cloud service (e.g., AWS, Heroku, etc.), simply push the Docker images to your cloud service's registry and configure the environment variables accordingly.

---

## API Documentation

### **Event Model**

### **1. Retrieve All Events**

#### **Endpoint:** `GET /events`

Retrieves a paginated list of events stored in the database.

#### **Request:**

- **Method:** `GET`
- **URL:** `/events`
- **Query Parameters:**
  - `limit`: The number of events to return.
  - `cursor` _(optional)_: The ID of the event to start pagination from.

#### **Response:**

- **Status:** `200 OK`
- **Body:** A paginated response containing the list of events.

##### **Example Response:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Product Clicked",
      "type": "track",
      "description": "User clicked on the product summary"
    },
    {
      "id": 2,
      "name": "Page View",
      "type": "track",
      "description": "User visited a product page"
    }
  ],
  "nextCursor": {
    "id": 3
  }
}
```

---

### **2. Retrieve a Single Event by ID**

#### **Endpoint:** `GET /events/:id`

Retrieves a specific event by its ID.

#### **Request:**

- **Method:** `GET`
- **URL:** `/events/:id`
- **Path Parameter:**
  - `id` _(required)_: The ID of the event to retrieve.

#### **Response:**

- **Status:** `200 OK` _(if found)_
- **Status:** `404 Not Found` _(if the event does not exist)_

##### **Example Response:**

```json
{
  "id": 1,
  "name": "Product Clicked",
  "type": "track",
  "description": "User clicked on the product summary"
}
```

##### **Error Response (404):**

```json
{
  "message": "Event not Found"
}
```

---

### **3. Create a New Event**

#### **Endpoint:** `POST /events`

Creates a new event.

#### **Request:**

- **Method:** `POST`
- **URL:** `/events`
- **Body:** (JSON)

##### **Example Request Body:**

```json
{
  "name": "Purchase Completed",
  "type": "track",
  "description": "User completed a purchase"
}
```

#### **Response:**

- **Status:** `201 Created`
- **Body:** The created event.

##### **Example Response:**

```json
{
  "id": 5,
  "name": "Purchase Completed",
  "type": "track",
  "description": "User completed a purchase"
}
```

---

### **4. Update an Event**

#### **Endpoint:** `PUT /events/:id`

Updates an existing event.

#### **Request:**

- **Method:** `PUT`
- **URL:** `/events/:id`
- **Path Parameter:**
  - `id` _(required)_: The ID of the event to update.
- **Body:** (JSON)

##### **Example Request Body:**

```json
{
  "name": "Updated Event Name",
  "type": "track",
  "description": "Updated event description"
}
```

#### **Response:**

- **Status:** `200 OK` _(if updated successfully)_
- **Status:** `404 Not Found` _(if the event does not exist)_

##### **Example Response:**

```json
{
  "id": 1,
  "name": "Updated Event Name",
  "type": "track",
  "description": "Updated event description"
}
```

##### **Error Response (404):**

```json
{
  "message": "Event not Found"
}
```

---

### **5. Delete an Event**

#### **Endpoint:** `DELETE /events/:id`

Deletes an event by its ID.

#### **Request:**

- **Method:** `DELETE`
- **URL:** `/events/:id`
- **Path Parameter:**
  - `id` _(required)_: The ID of the event to delete.

#### **Response:**

- **Status:** `204 No Content` _(if deleted successfully)_
- **Status:** `404 Not Found` _(if the event does not exist)_

##### **Error Response (404):**

```json
{
  "message": "Event not Found"
}
```

---

### **Summary of Endpoints**

| Method | Endpoint      | Description                   |
| ------ | ------------- | ----------------------------- |
| GET    | `/events`     | Retrieve a list of events     |
| GET    | `/events/:id` | Retrieve a single event by ID |
| POST   | `/events`     | Create a new event            |
| PUT    | `/events/:id` | Update an existing event      |
| DELETE | `/events/:id` | Delete an event by ID         |

---

### **Property Model**

### **1. Retrieve All Properties**

#### **Endpoint:** `GET /propertes`

Retrieves a paginated list of properties stored in the database.

#### **Request:**

- **Method:** `GET`
- **URL:** `/properties`
- **Query Parameters:**
  - `limit`: The number of properties to return.
  - `cursor` _(optional)_: The ID of the property to start pagination from.

#### **Response:**

- **Status:** `200 OK`
- **Body:** A paginated response containing the list of property.

---

### **2. Retrieve a Single Property by ID**

#### **Endpoint:** `GET /properties/:id`

Retrieves a specific property by its ID.

#### **Request:**

- **Method:** `GET`
- **URL:** `/properties/:id`
- **Path Parameter:**
  - `id` _(required)_: The ID of the property to retrieve.

#### **Response:**

- **Status:** `200 OK` _(if found)_
- **Status:** `404 Not Found` _(if the property does not exist)_

##### **Example Response:**

```json
{
  "id": 1,
  "name": "price",
  "type": "number",
  "description": "price of the product"
}
```

##### **Error Response (404):**

```json
{
  "message": "Property not Found"
}
```

---

### **3. Create a New Property**

#### **Endpoint:** `POST /properties`

Creates a new propety.

#### **Request:**

- **Method:** `POST`
- **URL:** `/properties`
- **Body:** (JSON)

##### **Example Request Body:**

```json
{
  "name": "price",
  "type": "number",
  "description": "price of the product"
}
```

#### **Response:**

- **Status:** `201 Created`
- **Body:** The created property.

##### **Example Response:**

```json
{
  "id": 5,
  "name": "price",
  "type": "number",
  "description": "price of the product"
}
```

---

### **4. Update a Property**

#### **Endpoint:** `PUT /properties/:id`

Updates an existing property.

#### **Request:**

- **Method:** `PUT`
- **URL:** `/properties/:id`
- **Path Parameter:**
  - `id` _(required)_: The ID of the property to update.
- **Body:** (JSON)

##### **Example Request Body:**

```json
{
  "name": "Updated Property Name",
  "type": "number",
  "description": "Updated property description"
}
```

#### **Response:**

- **Status:** `200 OK` _(if updated successfully)_
- **Status:** `404 Not Found` _(if the property does not exist)_

##### **Example Response:**

```json
{
  "id": 1,
  "name": "Updated Property Name",
  "type": "boolean",
  "description": "Updated property description"
}
```

##### **Error Response (404):**

```json
{
  "message": "Property not Found"
}
```

---

### **5. Delete a Property**

#### **Endpoint:** `DELETE /properties/:id`

Deletes an property by its ID.

#### **Request:**

- **Method:** `DELETE`
- **URL:** `/properties/:id`
- **Path Parameter:**
  - `id` _(required)_: The ID of the property to delete.

#### **Response:**

- **Status:** `204 No Content` _(if deleted successfully)_
- **Status:** `404 Not Found` _(if the property does not exist)_

##### **Error Response (404):**

```json
{
  "message": "Property not Found"
}
```

---

### **Summary of Endpoints**

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| GET    | `/propeties`      | Retrieve a list of properties    |
| GET    | `/properties/:id` | Retrieve a single property by ID |
| POST   | `/properties`     | Create a new property            |
| PUT    | `/properties/:id` | Update an existing property      |
| DELETE | `/properties/:id` | Delete an property by ID         |

---

## Key Design and Rationale

1. **Database Design**:

   - **PostgreSQL** is chosen for its relational structure, making it easy to model the entities and relationships (Events, Properties, Tracking Plans).
   - The use of a **normalized** database schema helps ensure data consistency and reduces redundancy.

2. **Paginated API**:

   - The **cursor-based pagination** approach was chosen to efficiently handle large data sets. By using a cursor, the client can request the next set of results without needing to keep track of page numbers, ensuring better performance with large datasets.

3. **Dockerization**:
   - **Docker** is used for easy environment setup and isolation. The application and the database are contained in separate services, with the database configured using volumes for persistent data storage.

---

## Future Improvements

- **Authentication & Authorization**: Implement role-based access control for more secure API access.
- **API Rate Limiting**: Protect the API from abuse by adding rate limiting.
- **Extend Error Middleware**: Extend error middleware to handle more error types.
- **Testing**: Implement tests for critical paths in the application.
