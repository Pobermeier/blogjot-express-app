if (process.env.NODE_ENV === 'prod') {
  module.exports = {
    mongoURI:
      'mongodb+srv://pober:BuA7yjysl6bEsU9d@cluster0-uclm9.mongodb.net/blogjot?retryWrites=true&w=majority',
  };
} else {
  module.exports = {
    mongoURI:
      'mongodb+srv://pober:BuA7yjysl6bEsU9d@cluster0-uclm9.mongodb.net/blogjot?retryWrites=true&w=majority',
  };
}
