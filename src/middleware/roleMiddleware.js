const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            console.log(3);
            console.log(req.user);
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "User not authenticated"
                });
            }
            console.log(4);
            console.log(req.user.role);
            console.log(allowedRoles);
            // return res.json(req.user.role);
            console.log(!allowedRoles.includes(req.user.role));
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }
                console.log(5); 

            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    };
};

module.exports = roleMiddleware;