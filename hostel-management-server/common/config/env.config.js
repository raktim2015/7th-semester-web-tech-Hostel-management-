module.exports = {

    "port": 3001,
    "ATLAS_URI": "mongodb+srv://ritesh:ritesh@cluster0.jhdtg.gcp.mongodb.net/hostel?retryWrites=true&w=majority",
    "LOCAL_URI": "mongodb://localhost:27017/hostel-management",
    "appEndPoint": "http://localhost:3001",
    "apiEndPoint": "http://localhost:3001",
    "jwt_secret": "Secret!Key6599",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "ADMIN": 0,
        "STUDENT": 1
        
    }
}
