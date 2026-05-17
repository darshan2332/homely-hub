const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.MONGO_URI || process.env.DATABASE_LOCAL;

if (!DATABASE_URL) {
	throw new Error("Missing MongoDB connection string. Set MONGO_URI or DATABASE_LOCAL.");
}

mongoose
	.connect(DATABASE_URL)
	.then(() => {
		console.log("DB connection successful");
	})
	.catch((error) => {
		console.error("DB connection failed", error);
		process.exit(1);
	});

app.listen(PORT, () => {
	console.log(`App Running on port: ${PORT}`);
});

module.exports = app;