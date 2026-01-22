const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erreur Mongoose validation
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: "Erreur de validation",
      details: errors,
    });
  }

  // Erreur Mongoose CastError (ID invalide)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: "ID invalide",
    });
  }

  // Erreur par défaut
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Erreur serveur",
    statusCode: err.statusCode || 500,
  });
};

export default errorHandler;
