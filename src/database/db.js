// var MongoClient = require('mongodb').MongoClient;
// var mongoose = require('mongoose');

// let cachedDb = null;

// exports.connectDatabase = async () => {
//     try{
//         if (conn == null) {
//             console.log("Creating new connection to the database....");
//             console.log('start connecting')
//             conn = await mongoose.connect('mongodb+srv://cse18107:Uxai9sKPqSDHvDf3@cluster0.pn9n7zq.mongodb.net/');
//             console.log(conn)
//             return conn;
//           }
//           console.log(
//             "Connection already established, reusing the existing connection"
//           );
//     }catch(error) {
//         console.log(error.message)
//     }

// };

// exports.connectToDatabase=()=> {
  
//     if (cachedDb && cachedDb.serverConfig.isConnected()) {
//         console.log('=> using cached database instance');
//         return Promise.resolve(cachedDb);
//     }
//     const dbName = 'test';
//     return MongoClient.connect('mongodb+srv://cse18107:Uxai9sKPqSDHvDf3@cluster0.pn9n7zq.mongodb.net/')
//         .then(client => { cachedDb = client.db(dbName); return cachedDb; });
// }

// mongoose.Promise = global.Promise;

// // Mongoose connection
// console.log('connection')
// mongoose.connect('mongodb+srv://cse18107:Uxai9sKPqSDHvDf3@cluster0.pn9n7zq.mongodb.net/');

// mongoose.connection.on('error', (err) => {
//   console.log(
//     '%s MongoDB connection error. Please make sure MongoDB is running.',
//   );
//   process.exit();
// });

// mongoose.connection.on('open', () => {
//   console.log(`Connected to Database`);
// });

const mongoose = require('mongoose');

let conn = null;

const uri = 'YOUR CONNECTION STRING HERE';

exports.connect = async function() {
    console.log('connection')
  if (conn == null) {
    conn = mongoose.connect('mongodb+srv://cse18107:Uxai9sKPqSDHvDf3@cluster0.pn9n7zq.mongodb.net/', {
      serverSelectionTimeoutMS: 5000
    }).then(() => mongoose);
    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn;
  }

  return conn;
};