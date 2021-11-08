// Custom middleware that logs out the type and path of each request to the server
const clog = (req, res, next) => {
  switch (req.method) {
    case 'GET': {
      console.log(`📗${req.method} request to ${req.path}`);
      break;
    }
    case 'POST': {
      console.log(`📘${req.method} request to ${req.path}`);
      break;
    }
    case 'DELETE': {
      console.log(`📙${req.method} request to ${req.path}`);
      break;
    }
    default:
      console.log(`${req.method} request to ${req.path}`);
  }

  next();
};

exports.clog = clog;
