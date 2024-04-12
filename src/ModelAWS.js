const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime") // ES Modules import
const readFileText = require("./ReadFileText")

class AWSModel{
    async ModelClaude(input, modelID, topicIndex){

      

        const config = {
          region: "us-east-1",
          credentials: {
            accessKeyId: "AKIA3X544P6C44TQJRE5",
            secretAccessKey: "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",
          },
        };
        
        const str = {
          "anthropic_version": "bedrock-2023-05-31",
          "max_tokens": 1000,
          "messages": [
            {
              "role": "user",
              "content": [
                {
                  "type": "text",
                  "text": await readFileText(topicIndex)  + input
                }
              ]
            }
          ]
        };
        const inputClaude3 = {
            "modelId": "anthropic.claude-3-sonnet-20240229-v1:0",
            "contentType": "application/json",
            "body": JSON.stringify(str)
        };

        
        const client = new BedrockRuntimeClient(config);
        
        const command = new InvokeModelCommand(inputClaude3);
        const response = await client.send(command);
        const decoder = new TextDecoder('utf-8');
        const texto = decoder.decode(response.body);
         
        const result = JSON.parse(texto)
        
        return result.content[0].text
        
    }
    async ModelMistral(input, modelID, topicIndex){

      const config = {
        region: "us-east-1",
        credentials: {
          accessKeyId: "AKIA3X544P6C44TQJRE5",
          secretAccessKey: "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",
        },

      };
      const inputMistral = {
        "modelId":"mistral.mixtral-8x7b-instruct-v0:1",
        "contentType": "application/json",
        "accept": "application/json",
        "body": JSON.stringify({
          "prompt": await readFileText(topicIndex) +  input,
          "max_tokens": 1300
      })
    }
      
      const client = new BedrockRuntimeClient(config);
      
      const command = new InvokeModelCommand(inputMistral);
      const response = await client.send(command);
      const decoder = new TextDecoder('utf-8');
      const texto = decoder.decode(response.body);
       
      const result = JSON.parse(texto)

      return result.outputs[0].text
    }

    async modelTitan(input, modelId, topicIndex){
      const config = {
        region: "us-east-1",
        credentials: {
          accessKeyId: "AKIA3X544P6C44TQJRE5",
          secretAccessKey: "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",
        },

      };
      const inputTitan = {
        "modelId":"amazon.titan-text-express-v1",
        "contentType": "application/json",
        "accept": "application/json",
        "body": JSON.stringify({
          "inputText": input,
      })
    }
      
      const client = new BedrockRuntimeClient(config);
      
      const command = new InvokeModelCommand(inputTitan);
      const response = await client.send(command);
      
      const decoder = new TextDecoder('utf-8');
      const texto = decoder.decode(response.body);
      
      const result = JSON.parse(texto)

      // console.log('result titan:', result.results[0].outputText);

      return result.results[0].outputText
    }
}

module.exports = AWSModel