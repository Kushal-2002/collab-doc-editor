// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

const socket = new WebSocket('ws://localhost:8080');

function App() {
  const [documents, setDocuments] = useState({});

  useEffect(() => {
    // Listen for updates from the WebSocket server
    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      const { type, docId, content } = data;

      switch (type) {
        case 'update':
          setDocuments(prevDocuments => ({
            ...prevDocuments,
            [docId]: content
          }));
          break;
        case 'create':
          setDocuments(prevDocuments => ({
            ...prevDocuments,
            [docId]: content
          }));
          break;
        default:
          console.error('Unknown message type:', type);
      }
    };
  }, []);

  const handleDocumentChange = (docId, content) => {
    // Send document updates to the WebSocket server
    socket.send(JSON.stringify({ type: 'update', docId, content }));
  };

  const createNewDocument = () => {
    const docId = Date.now().toString(); // Generate a unique ID for the document
    const content = ''; // Initial content of the document
    setDocuments(prevDocuments => ({
      ...prevDocuments,
      [docId]: content
    }));
    // Send new document creation event to the WebSocket server
    socket.send(JSON.stringify({ type: 'create', docId, content }));
  };

  return (
    <div className="App">
      <h1>Collaborative Document Editor</h1>
      <button onClick={createNewDocument}>Create New Document</button>
      {Object.keys(documents).map(docId => (
        <DocumentEditor
          key={docId}
          docId={docId}
          content={documents[docId]}
          onDocumentChange={handleDocumentChange}
        />
      ))}
    </div>
  );
}

function DocumentEditor({ docId, content, onDocumentChange }) {
  const handleChange = event => {
    const newContent = event.target.value;
    onDocumentChange(docId, newContent);
  };

  return (
    <div className="DocumentEditor">
      <textarea value={content} onChange={handleChange} />
    </div>
  );
}

export default App;
