exports.getDashboard = (req, res, next) => {
    res.render("dashboard", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationErrors: req.flash("validationErrors"),
        pageTitle: "Dashboard"
    });
};