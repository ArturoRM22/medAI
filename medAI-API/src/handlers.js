// handlers.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI_2, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit process with failure
  }
}

export async function handleImageUpload(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.url === '/api/upload' && req.method === 'POST') {
    try {
      const { fileName, caption, fileType } = await extractMetadata(req.headers);
      const imageDataBase64 = req.body; // Assuming req.body already contains the Base64-encoded image

      const imageUrl = `data:image/${fileType};base64,${imageDataBase64}`;

      const db = client.db("tutorial");
      const collection = db.collection('metadata');
      await collection.insertOne({ name: fileName, caption, fileType, imageUrl });

      res.status(201).json({ message: "Image uploaded, metadata stored" });
    } catch (error) {
      console.error('Error handling image upload', error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(404).json({ error: 'Not found' });
  }
}

async function extractMetadata(headers) {
  const contentType = headers['content-type'];
  const fileType = contentType.split('/')[1];
  const contentDisposition = headers['content-disposition'];
  const caption = headers['x-image-caption'] || 'No caption provided';
  const matches = /filename="([^"]+)/i.exec(contentDisposition);
  const fileName = matches?.[1] || `image-${Date.now()}.${fileType}`;
  return { fileName, caption, fileType };
}

export { connectDB };
