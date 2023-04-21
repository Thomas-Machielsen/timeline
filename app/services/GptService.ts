import { TimelineItem } from "../models";

export async function getTimelineArray(): Promise<TimelineItem[]> {
  // Send a request to the DALI API to generate an image based on the prompt
  const response = await fetch("http://localhost:3000/api/gpt/timeline", {
    method: "POST",
  });
  return response.json();
}

export async function ZoomInTimeLine(
  item: TimelineItem
): Promise<TimelineItem[]> {
  const response = await fetch("http://localhost:3000/api/gpt/zoom", {
    method: "POST",
    body: JSON.stringify(item),
  });
  return response.json();
}
