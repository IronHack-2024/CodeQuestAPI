const helmet = require("helmet");

const securityMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css",
        "https://cdn.tailwindcss.com",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "https://fonts.googleapis.com",
        "'unsafe-inline'",
      ],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: [
        "'self'",
        "https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js",
        "https://cdn.tailwindcss.com",
        "'unsafe-eval'",
        "'unsafe-inline'",
      ],
      connectSrc: ["'self'", "https://codequestapi.onrender.com"],
    },
  },
});

module.exports = securityMiddleware;
