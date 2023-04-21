
export async function generateImageUrl(prompt: string) {
    // Send a request to the DALI API to generate an image based on the prompt
    const response = await fetch("/api/dall-e", {
        method: "POST",
        body: JSON.stringify({ prompt: prompt, size: "256x256" }),
    });
    return await response.text();
}