exports.register = asuncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    const token = user.getSignedJwtToken();

    res.status(201).json({
        success: true,
        token,
        user: user,
    });
});