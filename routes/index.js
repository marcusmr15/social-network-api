// Importing the necessary dependencies
const router = require('express').Router(); 
const apiRoutes = require('./api-routes');

// Mounting the API routes under '/api'
router.use('/api', apiRoutes);

// Handling 404 errors for routes that are not found
router.use((req, res) => {
    return res.status(404).send('Not found');
});

// Exporting the router
module.exports = router;
