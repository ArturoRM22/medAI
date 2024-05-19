import app from './app';
import { Server as webSocketServer } from 'socket.io';
import http from 'http';
import sockets from './sockets';
import { connectDB } from './db';
import { BlobServiceClient } from "@azure/storage-blob";
import { MongoClient } from 'mongodb';
import fs from 'fs';

// Ensure the following line is executed if you use environment variables
import dotenv from 'dotenv';
dotenv.config();

const { ACCOUNT_NAME, SAS_TOKEN, CONTAINER_NAME, MONGODB_URI_2 } = process.env;

connectDB();

const server = http.createServer(app);

const io = new webSocketServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials: true
  }
});

sockets(io);

const httpServer = server.listen(3001);
console.log('WS socket listening on port 3001');




























/* const client = new MongoClient(MONGODB_URI_2);
client.connect(); */


/* const blobServiceClient = new BlobServiceClient(`https://${ACCOUNT_NAME}.blob.core.windows.net/?${SAS_TOKEN}`);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME); */

/* const server2 = http.createServer(handleImageUpload); */

/* server2.listen(3002, () => {
  console.log('blob listening on port 3002');
});

async function extractMetadata(headers) {
  const contentType = headers['content-type'];
  const fileType = contentType.split('/')[1];
  const contentDisposition = headers['content-disposition'];
  const caption = headers['x-image-caption'] || 'No caption provided';
  const matches = /filename="([^"]+)/i.exec(contentDisposition);
  const fileName = matches?.[1] || `image-${Date.now()}.${fileType}`;
  return { fileName, caption, fileType };
}

async function uploadImageStream(blobName, dataBuffer) {
  const blobClient = containerClient.getBlobClient(blobName);
  const blockBlobClient = blobClient.getBlockBlobClient();
  const uploadBlobResponse = await blockBlobClient.uploadData(dataBuffer, {
    blobHTTPHeaders: { blobContentType: "image/png" },
  });
  return blobClient.url;
}

async function storeMetadata(name, caption, fileType, imageUrl) {
  const collection = client.db("tutorial").collection('metadata');
  await collection.insertOne({ name, caption, fileType, imageUrl });
}

async function handleImageUpload(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.url === '/api/upload' && req.method === 'POST') {
    try {
      const { fileName, caption, fileType } = await extractMetadata(req.headers);
      const imageDataBuffer = fs.readFileSync(req.body); // Read the image file from req.body

      const imageUrl = await uploadImageStream(fileName, imageDataBuffer);

      await storeMetadata(fileName, caption, fileType, imageUrl);
      res.writeHead(201);
      res.end(JSON.stringify({ message: "Image uploaded, metadata stored" }));
    } catch (error) {
      console.log(error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Server error" }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
} */

