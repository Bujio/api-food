module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ message: 'This route does not exist' });
  });

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message =
      err.message || 'Internal server error. Check the server console';
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error('ERROR', req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(status).json({
        message,
      });
    }
  });
};
