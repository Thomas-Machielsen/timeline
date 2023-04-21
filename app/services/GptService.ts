import { TimelineItem, ZoomPeriod } from "../models";
import { defaultChatMessagesParts } from "../utils/constants";

export async function getTimelineArray(): Promise<TimelineItem[]> {
  const titles = await getTitles();
  if (titles) {
    const result = await Promise.all(
      titles.map((title) => getTimelineItem(title))
    );
    return result.filter((item) => !!item).map((item) => item as TimelineItem);
  }
  return [];
}

export async function ZoomInTimeLine(
  item: TimelineItem
): Promise<TimelineItem[]> {
  const periods = await getZoomedPeriods(item);
  console.log("periods", periods);
  if (periods && periods.length > 0) {
    const result = await Promise.all(
      periods.map((period) => getZoomedTimelineItem(period))
    );
    return result.filter((item) => !!item).map((item) => item as TimelineItem);
  }
  return [];
}

async function getZoomedTimelineItem(
  period: ZoomPeriod
): Promise<TimelineItem | null> {
  return getTimelineItem(
    `${period.title} in the period from ${period.date.from} to ${period.date.to}`
  );
}

async function getTitles(): Promise<string[]> {
  const prompt = `Only reply in JSON ${defaultChatMessagesParts.titles}`;
  const result = await askGTP(prompt);
  return result;
}

async function getZoomedPeriods(item: TimelineItem): Promise<ZoomPeriod[]> {
  const prompt = `Only reply in JSON Only reply in a JSON array 5 important periods or themes within ${item.title} from ${item.date.from} to ${item.date.to} in json format: "title, date:{from, to}"`;
  const result = await askGTP(prompt);
  return result;
}

async function getTimelineItem(title: String): Promise<TimelineItem | null> {
  const prompt = `Only reply in JSON ${defaultChatMessagesParts.getItem} ${title} ${defaultChatMessagesParts.jsonformat} ${defaultChatMessagesParts.dateFormats}`;
  console.log(prompt);
  const response = await askGTP(prompt);
  return {
    ...response,
    title,
  };
}

const askGTP = async (prompt: string) => {
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
    const data = await res.json();
    console.log({data})
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    throw error;
  }
};
