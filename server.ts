const express = require('express');
const http = require('http');
const { EventSourcePolyfill } = require('event-source-polyfill');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const corsOptions = {
  origin: 'http://localhost:3000', // Update with the correct origin
};

app.use(express.json());
app.use(cors(corsOptions));

const clients: any[] = []; // Store connected clients
const pause: any[] = [];

// Create a single instance of EventSourcePolyfill
const eventSource = new EventSourcePolyfill('http://127.0.0.1:3001/admin-updates');
const eventPause = new EventSourcePolyfill('http://127.0.0.1:3001/pause');

app.get('/admin-updates', (req: any, res: any) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  clients.push(res);

  req.on('close', () => {
    clients.splice(clients.indexOf(res), 1);
    console.log('SSE connection closed - Counter');
  });
});

// Route to trigger updates to connected clients
app.get('/trigger', (req: any, res: any) => {
  const newCount = req.query.count || 0; // Use the provided count value or default to 0
  clients.forEach(client =>
    client.write(`data: ${newCount}\n\n`) // Send the new count in the event data
  );
});

app.get('/pause', (req: any, res: any) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  pause.push(res);

  req.on('close', () => {
    pause.splice(pause.indexOf(res), 1);
    console.log('SSE connection closed - Pause');
  });
});

// Route to trigger updates to connected clients
app.get('/trigger-button', (req: any, res: any) => {
  const text = req.query.text || 0; // Use the provided count value or default to 0
  pause.forEach(p =>
    p.write(`data: ${text}\n\n`) // Send the new count in the event data
  );
});


server.listen(3001, () => {
  console.log('Server listening on port 3001');
});
