const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://jattsam100:Jk9622079522@cluster0.tshusya.mongodb.net/gofoodmern?appName=Cluster0";

// Set the strictQuery option to avoid the deprecation warning
mongoose.set('strictQuery', false);

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
        if (err) {
            console.log("---" + err);
        } else {
            console.log("Connected to MongoDB");

            try {
                const foodCollection = await mongoose.connection.db.collection("food_items");
                foodCollection.find({}).toArray(async function (err, data) {
                    if (err) {
                        callback(err, null, null);
                    } else {
                        const categoryCollection = await mongoose.connection.db.collection("foodCategory");
                        categoryCollection.find({}).toArray(function (err, Catdata) {
                            callback(err, data, Catdata);
                        });
                    }
                });
            } catch (error) {
                console.log("Error:", error);
                callback(error, null, null);
            }
        }
    });
};
