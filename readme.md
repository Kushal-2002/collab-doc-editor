This setup involves a Node.js backend with WebSocket for real-time communication and a MongoDB database for persistence, alongside a React frontend for a collaborative document editor. Here's how to get it all up and running.

Prerequisites
Node.js: Make sure Node.js is installed on your system. You can download it from nodejs.org.
MongoDB: Ensure MongoDB is installed and running on your system. Instructions can be found at mongodb.com.
npm or yarn: These Node.js package managers are used to install dependencies. npm comes bundled with Node.js.
Backend Setup
Create a directory for your backend application, then navigate into it via your terminal.

Initialize a new Node.js project: Run npm init -y to create a package.json file.

Install dependencies: Execute the following command to install the necessary Node.js modules:

bash
Copy code
npm install express http ws mongodb
Create index.js: In your project directory, create a file named index.js and paste the backend source code provided.

Start the MongoDB service if it's not running already.

Run your backend server: Execute node index.js in your terminal. Your server should be listening on port 8080.

Frontend Setup
Create a React app: If you haven't installed create-react-app globally, you can do so by running npm install -g create-react-app. Then, create your app with:

bash
Copy code
npx create-react-app collaborative-doc-editor
Navigate into your newly created app directory:

bash
Copy code
cd collaborative-doc-editor
Install additional dependencies if needed (though for this setup, the base React setup should suffice).

Replace src/App.js: Open the src/App.js file and replace its content with the frontend source code provided. Also, ensure you have the src/App.css for styling or create one if necessary.

Run your React app: Execute npm start within your React app directory. This will start the development server, usually on http://localhost:3000.

Using the Application
With both the backend server and the frontend development server running, open your browser and navigate to http://localhost:3000.
You can now create new documents and see updates in real-time across different browser windows or tabs due to the WebSocket connection.
Every document change is sent to the server, which then broadcasts the update to all connected clients, ensuring that all users see the document updates as they happen.
Debugging
If you encounter issues:

Ensure MongoDB is running and accessible.
Check the console for any error messages on both the backend and frontend.
Make sure ports 8080 and 3000 are not blocked or used by another process.
Verify the WebSocket URL (ws://localhost:8080) matches the backend server address and port.
This setup demonstrates a basic real-time collaborative document editor. However, for production use, consider adding authentication, validation, error handling, and SSL encryption, among other enhancements.