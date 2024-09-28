// const express = require('express')
// const cors =require('cors')
// require('dotenv').config();
// const connectMongoDb = require('./connection')
// const app = express()
// const port = 8001;
// const taskRoutes = require('./routes/taskRoutes');
// const userRoutes = require('./routes/userRoutes')
// app.use(cors());
// app.use(express.json())
// app.use(express.urlencoded({ extended:false}))
// app.use('/api',taskRoutes);

// app.use('/user',userRoutes);

// connectMongoDb(process.env.Mongo_URI)
// .then(()=>{
//     console.log('Connect to MongoDB successfully');
// })
// .catch(()=>{
//     console.error('Failed to connect to MongoDB');
// })

// app.listen(port,()=>{
//     console.log(`Server is running at http://localhost:${port}`);
// })

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectMongoDb = require('./connection'); // Ensure this function is correctly implemented to connect to MongoDB
const multer = require('multer');
const app = express();
const port = process.env.PORT || 8001; // Allow port configuration via environment variable

// Import routes
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.memoryStorage();
const upload = multer({storage : storage});

// Define routes
app.use('/api/tasks', taskRoutes); // Changed endpoint for clarity
app.use('/api/users',upload.single('profilePicture'), userRoutes); // Changed endpoint for clarity

// Connect to MongoDB
connectMongoDb(process.env.Mongo_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit the application on database connection failure
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
