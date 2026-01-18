export function asyncHandler(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            console.error(error);

            if (res.headersSent) {
                return next(error);
            }

            res.status(500).send({ message: error.message || "Something went wrong" });
        }
    };
}