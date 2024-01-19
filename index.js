// const express = require('express');
// const app = express();

// const bodyParser = require('body-parser');
// app.use(bodyParser.json({ limit: '10mb' })); // برای JSON داده‌ها
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); 

// const cors = require('cors');
// const corsOptions = {
//   origin:"*",
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };
// app.use(cors(corsOptions)); // tanzimate server



// const mongoose = require('mongoose');
// const debug = require('debug')("app:main");
// const config = require('config');
// const winston = require('winston');

// const router = require('./src/routes');

// require('./startup/config')(app,express);
// require('./startup/db')();
// require('./startup/logging')();


// app.use('/api', router);


// const port = process.env.PORT || 5000;
// app.listen(port, ()=> console.log(`listening on port ${port}`));



///////////////////////////////////////////////////////////////////////
const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const cors = require('cors');
const corsOptions = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

const mongoose = require('mongoose');
const debug = require('debug')("app:main");
const config = require('config');
const winston = require('winston');

const router = require('./src/routes');

require('./startup/config')(app, express);
require('./startup/db')();
require('./startup/logging')();

app.use('/api', router);

// خواندن فایل‌های گواهینامه
const privateKey = fs.readFileSync('example.key', 'utf8');
const certificate = fs.readFileSync('example.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };


// ساخت سرور HTTPS
const httpsServer = https.createServer(credentials, app);

const port = process.env.PORT || 5000;

// گوش دادن به سرور
httpsServer.listen(port, () => console.log(`httpsServer listening on port ${port}`));
