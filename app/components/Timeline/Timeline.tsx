"use client";
import {TimelineItem} from "@/app/models";
import {ReactNode, useState, useEffect, Suspense} from "react";
import styles from "./timeline.module.css";
import Image from "next/image";
import {getTimelineArray, ZoomInTimeLine} from "@/app/services/GptService";
import {generateImageUrl} from "@/app/services/DaliService";

type TimelineProps = {
    item: TimelineItem;
};

export function Timeline({item, ...rest}: TimelineProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [zoom, setZoom] = useState<TimelineItem[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    useEffect(() => {
        generateImageUrl(item.imageDescriptionForDaliApi).then(url => {
            console.log({result: url})
            setImageUrl(url)
        })
    }, [])

    async function onItemSelect() {
        setOpen((state) => !state);

    }

    async function onZoom() {
        setLoading(true)
        const zoom = await ZoomInTimeLine(item);
        setZoom(zoom)
        setLoading(false)
    }

    return (
        <div className={styles.item}>
            <button onClick={onItemSelect} className={styles.timeline}>
                <div className={styles.date}>{item.date?.from || "-"}</div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.date}>{item.date?.to || "-"}</div>
            </button>
            {open && (
                <div>
                    <div className={styles.content} onClick={onZoom}>
                        {imageUrl &&
                            <Image width={256} height={256} alt={item.imageDescriptionForDaliApi} src={imageUrl}/>}
                        <div className={styles.beginning}>{item.causeOfBeginning}</div>
                        <div className={styles.content}>{item.description}</div>
                        <div className={styles.ending}>{item.causeOfEnd}</div>
                    </div>
                    <div>
                        {zoom && zoom.map((z) => <Timeline key={z.title} item={z}/>)}
                    </div>
                </div>
            )}
            {loading &&
                <div className={styles.loading}>
                    <img width={24} height={24} src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"/>
                </div>
            }
        </div>
    );
}
