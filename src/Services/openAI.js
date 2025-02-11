import OpenAI from "openai"
import { useAppContext } from "../Contexts/AppContext";
import toast from "react-hot-toast";

const { modelDetails, userInput, setModelResponse, setResponseError} = useAppContext();


const client = new OpenAI({
    apiKey: modelDetails.apiKey
})

export const generateResponse = async () => {
    try {
        const stream = await client.chat.completions.create({
            model: modelDetails.modelName,
            messages: [{ role: "user", content: userInput }],
            temperature: modelDetails.temperature,
            stream: true,
        });
    
        await stream.on("data", (chunk) => {
            const response = chunk.choices[0].delta.content;
            setModelResponse((prevResponse) => prevResponse + response);
        })
    } catch (error) {
        setResponseError(true);
        toast.error(error.message);
    }
    
}


