const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { MongoClient } = require('mongodb');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const url = 'mongodb://localhost:27017';
const dbName = 'yourdatabase';
const collectionName = 'documents';

MongoClient.connect(url)
  .then(client => {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    wss.on('connection', function connection(ws) {
      // Send current documents to newly connected client
      collection.find({}).toArray()
        .then(docs => {
          ws.send(JSON.stringify(docs));
        })
        .catch(error => {
          console.error('Error fetching documents:', error);
        });

      ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        const { type, docId, content } = data;

        switch (type) {
          case 'update':
            collection.updateOne({ _id: docId }, { $set: { content } })
              .then(() => {
                // Broadcast updated document to all connected clients
                wss.clients.forEach(function each(client) {
                  if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'update', docId, content }));
                  }
                });
              })
              .catch(error => {
                console.error('Error updating document:', error);
              });
            break;
          case 'create':
            collection.insertOne({ _id: docId, content })
              .then(() => {
                // Broadcast new document to all connected clients
                wss.clients.forEach(function each(client) {
                  if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'create', docId, content }));
                  }
                });
              })
              .catch(error => {
                console.error('Error creating document:', error);
              });
            break;
          default:
            console.error('Unknown message type:', type);
        }
      });
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });

server.listen(8080, function() {
  console.log('Server is listening on port 8080');
});
