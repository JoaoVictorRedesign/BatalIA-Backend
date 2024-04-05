const axios = require('axios');

class RequestPrompt{
    constructor(){
        // this.input = input;
    }

    async GetResponse(input){
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
            const authToken = await authIBM()
            const axios = require('axios');
            let data = JSON.stringify({
                "input": input,
                "parameters": {
                    "decoding_method": "greedy",
                    "max_new_tokens": 1500,
                    "min_new_tokens": 0,
                    "stop_sequences": [],
                    "repetition_penalty": 1
                },
                "model_id": "meta-llama/llama-2-70b-chat",
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