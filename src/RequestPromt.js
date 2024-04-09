const axios = require('axios');
const fs = require('fs');
const readFileText = require("./ReadFileText")

class RequestPrompt{
    constructor(){
        // this.input = input;
    }
    
    async GetResponse(input,modelId, topicIndex){

        function getModelIdByName(modelId) {
            const models= [
                { name: 'LLama',model: "meta-llama/llama-2-13b-chat" },
                { name: 'Granite 13b chat v2', model: "ibm/granite-13b-chat-v2" },
                { name: 'Flan ul2 20b', model: "google/flan-ul2"},
            ]
            
            // Encontrar o objeto com o nome correspondente
            const foundModel = models.find(model => model.name === modelId);
            
            // Se encontrar, atribuir o valor de model à variável modelId
            if (foundModel) {
                const modelId = foundModel.model;
                return modelId;
            } else {
                // Se não encontrar, pode lidar com isso de acordo com sua lógica
                return null; // ou algum outro valor padrão, ou lançar uma exceção, etc.
            }
        }

        async function authIBM(){
            const apikey = "0IF9QSSIxXk5EfN8TbunHt4-71fBlk5SBeJCx0-N6Srx"
                const endpoint = "https://iam.cloud.ibm.com/identity/token";
                const headers = {
                    "Content-Type": "application/x-www-form-urlencoded"
                };
                const data = new URLSearchParams({
                    "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
                    "apikey": apikey
                });

                try {
                    const responseAuth = await axios.post(endpoint, data, {
                        headers: headers
                    });
                    const accessToken = responseAuth.data.access_token;
                    return accessToken;
                } catch (error) {
                    console.error("Error generating IBM access token:", error);
                    throw error;
                }
        }
        
        
        async function Request() {                 
            let data = JSON.stringify({
                "input": await readFileText(topicIndex) +  input,
                "parameters": {
                    "decoding_method": "greedy",
                    "max_new_tokens": 1500,
                    "min_new_tokens": 0,
                    "stop_sequences": [],
                    "repetition_penalty": 1
                },
                "model_id": getModelIdByName(modelId),
                "project_id": "3ea892dd-c111-47d9-976d-bc87ceeda3c4"
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + await authIBM()
                },
                data: data
            };

            const response = await axios.request(config)

            return response
        }
        
        const response = await Request()
        
        return response.data.results[0].generated_text
       
    }
}


module.exports =  RequestPrompt;