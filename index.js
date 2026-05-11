import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
// photosDB
// WVgNQkUmprhBNTyx


const uri = "mongodb+srv://photosDB:WVgNQkUmprhBNTyx@cluster0.lad3qa5.mongodb.net/admin?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();

app.use(express.json());
app.use(cors());

const port = 5000;
let array = [];
app.get('/', (req, res)=>{
    res.send(array)
})

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const photoDB = client.db('photoDB');
    const photoColls = photoDB.collection('photos')

    app.post('/', async (req, res)=>{
        const imgURL = req.body
        array.push(imgURL)
        console.log(imgURL);
        const result = photoColls.insertOne(imgURL)
        res.send(array)
    })

  }
  catch(err){
    console.log(err);
  } 
  finally {

  }
}
run().catch(console.dir);

app.listen(port, (req, res)=>{
    console.log(`Server Connect On Port ${port}`);
})