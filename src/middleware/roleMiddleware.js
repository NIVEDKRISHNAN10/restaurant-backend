const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            console.log(req.user);
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "User not authenticated"
                });
            }
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }
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