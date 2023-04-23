import {askGPT, getTimelineItem} from "@/app/api/gpt/askGpt";
import {defaultChatMessagesParts} from "@/app/utils/constants";
import {TimelineItem} from "@/app/models";

export async function POST(request: Request) {
    const titles = await getTitles();
    if (titles) {
        const result = await Promise.all(
            titles.map((title) => getTimelineItem(title))
        );
        const returned = result.filter((item) => !!item).map((item) => item as TimelineItem);
        return new Response(JSON.stringify(returned))
    }
    return new Response("")
}

async function getTitles(): Promise<string[]> {
    const prompt = `Only reply in JSON ${defaultChatMessagesParts.titles}`;
    return await askGPT(prompt);
}