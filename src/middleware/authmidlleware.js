const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // console.log (1);
        const token = req.headers.authorization;
        // console.log (221);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Remove "Bearer "
        const cleanToken = token.split(" ")[1];
        console.log (process.env.JWT_SECRET);
        console.log (cleanToken);

        // console.log (jwt.verify(yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTM1ZjM0NWNkYmM5OWUzMWI2YTc2NSIsInJvbGUiOiIxIiwiaWF0IjoxNzc2NTA4NzI0LCJleHAiOjE3NzY1OTUxMjR9.Kiv1FHos1Q7vE6fuvf2mYBtkOoqenBBVCjbmStP_UgE, secretkey));

        const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
        console.log (decoded);
        
        // return res.json(decoded);


        // attach user data to request
        req.user = decoded;
        // return res.json(req.user);
        console.log(req.user);
        console.log(2);
        next();
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;