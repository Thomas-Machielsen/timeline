
export async function POST(request: Request): Promise<{url: string}> {
    const apiKey = process.env.API_KEY
    const parameters = await request.json();
    // Send a request to the DALI API to generate an image based on the prompt
    const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(parameters),
    });
    const daliReply = await response.json().then( result => result.data[0].url);
    return new Response(daliReply)
}