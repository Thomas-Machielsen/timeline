import {askGPT, getTimelineItem} from "@/app/api/gpt/askGpt";
import {TimelineItem, ZoomPeriod} from "@/app/models";

export async function POST(request:Request) {
    const item:TimelineItem = await request.json()
    const periods = await getZoomedPeriods(item);
    console.log("periods", periods);
    if (periods && periods.length > 0) {
        const result = await Promise.all(
            periods.map((period) => getZoomedTimelineItem(period))
        );
        const returned = result.filter((item) => !!item).map((item) => item as TimelineItem);
        return new Response(JSON.stringify(returned));
    }
    return new Response("");
}

async function getZoomedTimelineItem(
    period: ZoomPeriod
): Promise<TimelineItem | null> {
    return getTimelineItem(
        `${period.title} in the period from ${period.date.from} to ${period.date.to}`
    );
}

async function getZoomedPeriods(item: TimelineItem): Promise<ZoomPeriod[]> {
    const prompt = `Only reply in JSON Only reply in a JSON array 5 important periods or themes within ${item.title} from ${item.date.from} to ${item.date.to} in json format: "title, date:{from, to}"`;
    return await askGPT(prompt);
}
