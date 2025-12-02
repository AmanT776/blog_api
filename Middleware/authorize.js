exports.authorize = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || !requiredRole.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  };
};
