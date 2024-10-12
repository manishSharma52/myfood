const mongoose = require("mongoose");
const connectURL =
  "mongodb+srv://manishSharma:manish123@cluster0.yh07i.mongodb.net/manishSharma?retryWrites=true&w=majority&appName=Cluster0";

const mongodb = async () => {
  
    try{
await mongoose.connect(connectURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
    console.log('isconnected')
    const fetched_data = await mongoose.connection.db.collection('foodItmes');
     const data = await fetched_data.find({}).toArray()

     const FoodCollection = await mongoose.connection.db.collection('foodCollections');
     const Categories = await FoodCollection.find({}).toArray()

        
            global.food_itmes = data;
            // console.log(global.food_itmes)
            global.foodCollection = Categories;
            // console.log(global.foodCollection)
        }

    // })
    catch (error){
    console.log('error',error)
    process.exit(1);
}
}

module.exports = mongodb;
