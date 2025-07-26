import mongoose from "mongoose";    

// export const dbConnection = () => {
//     mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log("Database connected successfully");
//     })
//     .catch((error) => {
//         console.error("Database connection failed:", error);
//     });
// }
// Updated dbConnection function to use a local MongoDB instance: for compass
 export const dbConnection = () => {
    mongoose
        .connect( process.env.MONGO_URI, {
            dbName: "blogApp",
        })
        .then(() => {
            console.log("Database connected successfully");
        })  
        .catch((error) => {
            console.error(`Database connection failed:", ${error}`);
        });
 };