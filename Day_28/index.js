const { GoogleGenAI } =require("@google/genai");

const ai = new GoogleGenAI({apiKey:"AIzaSyD3N7ysJz8pbwhd3NRBCYL4Pop7Or8sIAk"});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `const { GoogleGenAI } = requi("@google/genai") write the this code?`,
  });
  console.log(response.text);
}
main();