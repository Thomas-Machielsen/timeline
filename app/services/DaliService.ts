
export async function generateImageUrl(prompt: string) {
    // Send a request to the DALI API to generate an image based on the prompt
    const response = await fetch("/api/dall-e", {
        method: "POST",
        body: JSON.stringify({ prompt: prompt, size: "256x256" }),
    });
    console.log({response})
    const url = await response.text();
    console.log(url)
    return url;
}