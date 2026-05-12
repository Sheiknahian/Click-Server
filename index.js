import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
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

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());

const port = 5000;

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const photoDB = client.db('photoDB');
    const photoColls = photoDB.collection('photos')
    app.get('/', async (req, res)=>{
      const cursor = await photoColls.find();
      const result = await cursor.toArray();
      res.send(result)
  })
    app.post('/', async (req, res)=>{
        const imgURL = req.body
        const img = {
                      image: imgURL.image,
                      time: new Date()
                    }
        console.log(imgURL);
        const result = await photoColls.insertOne(img)
        res.send(img)
    })
    app.delete('/:id', async (req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await photoColls.deleteOne(query)
      res.send(result)
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