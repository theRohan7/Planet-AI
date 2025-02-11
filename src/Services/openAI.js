import OpenAI from "openai"
import { useWorkflow } from "../Contexts/Workflow.context";

const {userInput, modelDetails, setModelResponse} = useWorkflow()


const client = new OpenAI({
    apiKey: modelDetails.apiKey
})

async function main(){
    const stream = await client.chat.completions.create({
        model: modelDetails.modelName,
        messages: [{role:'user', content: userInput}],
        max_tokens: modelDetails.maxTokens,
        stream:true,

    });
    for await (const chunk of stream){
        setModelResponse(chunk.choices[0]?.delta.content || '')
    }
}

main()


