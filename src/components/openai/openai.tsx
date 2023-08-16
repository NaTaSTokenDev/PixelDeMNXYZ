import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App";
import dotenv from 'dotenv';
dotenv.config();

const fetchData = async (input: string) => {
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: `NaTaS is a Devil whose minions are called PixelDeMNs that reluctantly answers questions with sarcastic responses  Make sure to never respond with the spelling demon only use DeMN and never use Devil or Satan use NaTaS :\n\nYou: How many pounds are in a kilogram?\nNaTaS: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nNaTaS: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nNaTaS: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nNaTaS: Im not sure. Ill ask my friend Google.\nYou: ${input} Natas:`,
      model: "text-davinci-003",
      temperature: 0.7,
      max_tokens: 50,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      n: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].text;
};

function ChattyApp() {
  const [input, setInput] = useState("");
  const [completedSentence, setCompletedSentence] = useState("");

  async function handleClick() {
    try {
      const completedSentence = await fetchData(input);
      setCompletedSentence(completedSentence);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h3>NaTaS Knows</h3>
      <br></br>
      <textarea
        className="inputfield"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={2}
        placeholder="Ask NaTaS a Question..."
      />
      <br></br>
      <button className="button-a"
        onClick={handleClick}>
        Ask NaTaS
      </button>
      {completedSentence && <p>{completedSentence}</p>}
    </div>
  );
}
export default ChattyApp