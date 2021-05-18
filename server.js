const express = require('express')
const path = require('path')
const app = express()

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

const appDir = path.join(__dirname, 'client', 'dist')
app.use(express.static(appDir))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(appDir, "index.html"));
})

app.listen(port, () => {
  console.log('Our app is running on port: ' + port);
});