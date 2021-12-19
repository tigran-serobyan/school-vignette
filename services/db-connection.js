const mongoose = require("mongoose");
mongoose.connect(process.env.DBURI || process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', console.log).once('open', () => {
    console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (e) => {
    throw 'Can\'t connect to MongoDB'
})
mongoose.connection.on('disconnected', (e) => {
    throw 'Disconnected from the MongoDB'
})