module.exports = {

    "port": 4000,
    "ATLAS_URI": "mongodb+srv://ritesh:ritesh@cluster0.jhdtg.gcp.mongodb.net/hostel?retryWrites=true&w=majority",
    "appEndPoint": "http://localhost:4000",
    "apiEndPoint": "http://localhost:4000",
    "jwt_secret": "Secret!Key6599",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "STUDENT": 1,
        "ADMIN": 0
    }
}
