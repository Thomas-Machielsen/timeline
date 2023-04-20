"use client";
import { TimelineItem } from "@/app/models";
import { ReactNode, useState, useEffect, Suspense } from "react";
import styles from "./timeline.module.css";
import Image from "next/image";
import { getTimelineArray, ZoomInTimeLine } from "@/app/services/AIService";

type TimelineProps = {
  item: TimelineItem;
};

export function Timeline({ item, ...rest }: TimelineProps) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState<TimelineItem[]>([]);

  async function onItemSelect() {
    setOpen((state) => !state);
    const bla = await ZoomInTimeLine(item);
    console.log(bla);
    setZoom(bla);
  }

  return (
    <div className={styles.item}>
      <button onClick={onItemSelect} className={styles.timeline}>
        <div className={styles.date}>{item.date.from}</div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.date}>{item.date.to}</div>
      </button>
      {open && (
        <div>
          <div className={styles.content}>{item.description}</div>

          <Suspense fallback={<p>Loading feed...</p>}>
            {zoom &&
              zoom.length > 0 &&
              zoom.map((z) => <Timeline key={z.title} item={z} />)}
          </Suspense>
        </div>
      )}
    </div>
  );
}
