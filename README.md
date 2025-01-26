# Airbnb Clone
A simplified Airbnb clone built with the MERN stack, featuring secure user authentication and property listings with integrated map views for locations.

## Features
- User Authentication: Secure login and registration system using JWT.
- Property Listings: Users can browse available properties with detailed descriptions and images.
- Location Integration: View property locations on a map using MapTiler.
## Tech Stack
## Frontend:
- CSS: For additional styling beyond Bootstrap.
- Bootstrap: Used for pre-designed components like buttons, forms, and modals.Focused on styling.
## Backend:
- Node.js: Server-side runtime.
- Express.js: API routing and middleware.
- MongoDB: NoSQL database for storing user data and property listings.
## Additional Tools:
- JWT: For user authentication and session management.
- MapTiler: For displaying property locations on an interactive map.
## Installation
## Prerequisites:
- Node.js installed on your system.
- MongoDB database setup (local or cloud-based).
## Steps:
- Clone the repository:<br>
   git clone https://github.com/Akshaya0206/airbnb-clone.git <br> 
- Navigate to the project directory:<br>
cd airbnb-clone  <br>
- Install server dependencies:<br>
npm install  <br>
- Navigate to the frontend folder and install dependencies: <br>
cd client <br> 
npm install <br> 
- Set up environment variables:<br>
Create a .env file in the root directory.<br>
Add the following variables: <br>
MONGO_URI=your-mongodb-connection-string  <br>
JWT_SECRET=your-secret-key  <br>
MAPTILER_API_KEY=your-maptiler-api-key <br> 
## Start the development servers:
## Backend:
npm run server  
## Frontend:
cd client  <br>
npm start <br> 
## Access the application: 
Frontend: http://localhost:3000 <br>
Backend API: http://localhost:5000 <br>
## Screenshots 
Login/Registration Page <br>
Property Listings with Map Integration <br>
## Future Enhancements 
Add a booking system for properties.<br>
Implement advanced search filters (location, price range, etc.). <br>


