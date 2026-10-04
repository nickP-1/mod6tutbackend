const mongoose = require("mongoose");
const dbURI = `mongodb+srv://nickpickett2006_db_user:25ZZzsubrbGBT6yp@songdb.aturzhh.mongodb.net/?appName=SongDB`;
mongoose
  .connect(dbURI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Database connection error: ", err));

module.exports = mongoose;