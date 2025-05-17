import { Request, Response, NextFunction } from "express";

const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // Ensure req.user exists and has a role property
        if (!req.user || !roles.includes(req.user.role)) {
            // User role doesn't match the allowed roles
            res.status(403).json({
                success: false,
                message: `User role ${req.user?.role || "unknown"} is not authorized to access this route`,
            });
            return; // Explicitly return to ensure the function ends here
        }
        next(); // Proceed to the next middleware or route handler
    };
};

export default authorize;
