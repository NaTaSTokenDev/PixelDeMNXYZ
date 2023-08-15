import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

function ImgApp() {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [placeholder, setPlaceholder] = useState(
        "Enter some details"
    );
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const generateImage = async () => {
        console.log(prompt)
        setPlaceholder(`${prompt}`);
        setLoading(true);
        const res = await openai.createImage({
            prompt: `Create a cinematic concept art of a ${prompt} devil that looks like a highly detailed epic cinematic concept art. The ${prompt} devil should be depicted standing in front of a dark, ominous background, with a menacing expression on its face. It should have horns on its head, sharp teeth, and pointed ears.`,
            n: 1,
            size: "512x512",
        });
        setLoading(false);
        setResult(res.data.data[0].url);
    };
    
    return (
        <div className="main-box">
            {loading ? (
                <h2>Generating..Please Wait..</h2>
            ) : result?.length ? (
                <>
                    <h3>Your Evil Work</h3>
                    <br></br>
                    <img src={result} alt="result" />
                </>
            ) : (
                <>
                    <h3>AI DeMN Art Generator</h3>
                    <br></br>
                    <textarea
                        className="inputfield"
                        placeholder={placeholder}
                        rows={1}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <br></br>
                    <button className="button-a"
                        onClick={generateImage}>Generate an Image</button>
                </>
            )}
        </div>
    );
}

export default ImgApp;
