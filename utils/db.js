const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('Connection to the database made successfully');
	} catch (error) {
		console.error(`The following error has occurred: ${error.message}`);
	}
}

const disconnectDB = async () => {
	try {
	  await mongoose.connection.close();
	  console.log("Database disconnected successfully");
	} catch (error) {
	  console.error("Error disconnecting from the database:", error);
	}
  };

module.exports = { connectDB, disconnectDB };