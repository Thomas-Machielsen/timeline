import {TimelineItem} from "@/app/models";
import {defaultChatMessagesParts} from "@/app/utils/constants";

export const askGPT = async (prompt: string) => {
    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a historian who specialises in the ancient world",
                    },
                    { role: "user", content: prompt },
                ],
                temperature: 0.5,
                max_tokens: 500,
            }),
        });
        const gptData = await res.json();
        console.log({gptData})
        const gptReply = JSON.parse(gptData.choices[0].message.content);
        console.log({gptReply})
        return gptReply;
    } catch (error) {
        throw error;
    }
};

export async function getTimelineItem(title: String): Promise<TimelineItem | null> {
    const prompt = `Only reply in JSON ${defaultChatMessagesParts.getItem} ${title} ${defaultChatMessagesParts.jsonformat} ${defaultChatMessagesParts.dateFormats}`;
    console.log(prompt);
    const response = await askGPT(prompt);
    return {
        ...response,
        title,
    };
}