
export async function POST(request: Request) {
    const apiKey = process.env.API_KEY
    const prompt = (await request.json()).prompt;
    // Send a request to the DALI API to generate an image based on the prompt
    const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${prompt}`,
        },
        body: JSON.stringify({ prompt: prompt, size: "256x256" }),
    });
    return await response.json().then( result => result.data[0].url);
}