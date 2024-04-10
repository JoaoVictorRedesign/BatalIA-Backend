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

    const {prompt, model, topic, platform} = req.body;
    console.log('prompt :', prompt + " model: " + model + " topic: " + topic + " platform Left: " + platform);

    if(platform == "ibm"){
      const requestPrompt = new RequestPrompt;
      const response = await requestPrompt.GetResponse(prompt, model, topic)
      res.status(200)
      res.send({text: model + " " +response})

    }
    else if(platform == "aws"){
      const modelAWS = new AWSModel;

      let response;
    
      if(model == "Claude 3 Sonnet"){
        response = await modelAWS.ModelClaude(prompt,model, topic)
    
      }
      else if(model == "Mixtral 8x7B Instruct"){
        response = await modelAWS.ModelMistral(prompt, model, topic)
        
      }
      else if(model == "Titan Embeddings G1 - Text"){
        response = await modelAWS.modelTitan(prompt, model, topic)
    
      }
    
      res.status(200)
      res.send({text: model + " " +response})
    }
})

app.post("/request-model2", async (req, res) =>{
  const {prompt, model, topic, platform} = req.body;
  console.log("Model: " + model + " topic: " + topic + " prompt: " + prompt + " platform Rigth: " + platform)
  
  if(platform == "ibm"){
    const requestPrompt = new RequestPrompt;
    const response = await requestPrompt.GetResponse(prompt, model, topic)
    res.status(200)
    res.send({text: model + " " +response})

  }
  else if(platform == "aws"){
    const modelAWS = new AWSModel;

    let response;
  
    if(model == "Claude 3 Sonnet"){
      response = await modelAWS.ModelClaude(prompt,model, topic)
  
    }
    else if(model == "Mixtral 8x7B Instruct"){
      response = await modelAWS.ModelMistral(prompt, model, topic)
      
    }
    else if(model == "Titan Embeddings G1 - Text"){
      response = await modelAWS.modelTitan(prompt, model, topic)
  
    }
  
    res.status(200)
    res.send({text: model + " " +response})
  }

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})