#!/bin/bash

echo "📦 Initializing Node.js project..."
npm init -y

echo "📥 Installing dependencies..."
npm install express pg dotenv cors
npm install --save-dev nodemon

echo "📁 Creating folder structure..."
mkdir -p src/{routes,controllers,models,config,utils,middleware}
touch src/server.js src/config/db.js .env .gitignore

echo "🧹 Setting up basic files..."

cat <<EOL > .gitignore
node_modules
.env
EOL

cat <<EOL > src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Rotaflow backend is running.');
});

app.listen(PORT, () => {
  console.log(\`✅ Server running on port \${PORT}\`);
});
EOL

cat <<EOL > src/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
EOL

cat <<EOL > .env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/rotaflow
EOL

echo "🔧 Adding start script to package.json..."
npx json -I -f package.json -e 'this.scripts.start="node src/server.js"'
npx json -I -f package.json -e 'this.scripts.dev="nodemon src/server.js"'

echo "✅ Backend setup complete. Run with: npm run dev"

