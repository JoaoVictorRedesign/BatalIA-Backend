const express = require('express');
const RequestPrompt = require('./src/RequestPromt');
const AWSModel = require('./src/ModelAWS');
const app = express()
const port = 3000
const cors = require('cors');

app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

app.post('/request-prompt', async (req, res) => {

    const {prompt, model, topic} = req.body;
    console.log('prompt :', prompt + " model: " + model + " topic: " + topic);
    const requestPrompt = new RequestPrompt;
    const response = await requestPrompt.GetResponse(prompt, model, topic)
    console.log("model1");

    
    res.status(200)
    res.send({text: response})
    // console.log(req.headers.auth)
})

app.post("/request-model2", async (req, res) =>{
  const {prompt, model, topic} = req.body;


  const modelAWS = new AWSModel;
  const response = await modelAWS.ModelAWS(prompt,model, topic)

  console.log("model2")

  res.status(200)
  res.send({text: response.text})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})