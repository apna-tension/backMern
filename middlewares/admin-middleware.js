const adminMiddleware = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user.isAdmin) {
            return res.status(401).json({ msg: "Admin resources access denied. User is not an admin" });
        }
        console.log("the user is : " , user);
        // return res.status(200).json({ msg: "Admin access granted" });

        // if user is an admin proceed to the next middleware
        next();
    }
    catch (err) {
        console.log(err);
        // return res.status(500).json({ msg: err.message });
        next(err);

    }
};

module.exports = adminMiddleware;