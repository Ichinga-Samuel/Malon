const mongoose = require('mongoose');

const connectDB = async () => {
    try{
       await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        mongoose.connection.on('connected', () => console.log(`MongoDb connected: ${mongoose.connection.host}`))
    }
    catch (e) {
        console.log(e);
        process.exit(1);

    }
};
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});
module.exports = connectDB;
