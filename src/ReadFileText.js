const fs = require("fs")

async function readFileText(topicIndex) {
    let path;

    if(topicIndex == 1){
        path = "./src/assets/f1_text.txt"
    }
    else if(topicIndex == 2){
        path = "./src/assets/futebol_text.txt"
    }
    else if(topicIndex == 3){
        path = "./assets/f1_text.txt"
    }
    
    const text = fs.readFileSync(path)
    return text

}
module.exports = readFileText