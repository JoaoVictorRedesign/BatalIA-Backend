const express = require('express');
const RequestPrompt = require('./src/RequestPromt');
const app = express()
const port = 3000
const cors = require('cors');

app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

app.post('/request-prompt', async (req, res) => {

    const {prompt} = req.body;
    console.log('prompt :', prompt);
    const requestPrompt = new RequestPrompt;
    const response = await requestPrompt.GetResponse(prompt)
    console.log('response :', response);

    
    res.status(200)
    res.send({res: response})
    // console.log(req.headers.auth)
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})