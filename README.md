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

#### Endpoint: `GET /events`

This endpoint retrieves a list of events stored in the database.

**Request:**

- Method: `GET`
- URL: `/events`

**Query Parameters:**

- `limit`: The number of events to return (optional).
- `cursor`: The ID of the event to start the pagination from (optional).

**Response:**

- Status: `200 OK`
- Body: A paginated response containing the list of events.

Example response:

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

**Fields:**

- `data`: An array of event objects containing `id`, `name`, `type`, and `description`.
- `nextCursor`: An object with the ID of the next item for pagination or `null` if there are no more events.

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
