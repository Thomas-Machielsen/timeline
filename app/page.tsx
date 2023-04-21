// deps
import styles from "./page.module.css";

// components
import { Timeline } from "./components/Timeline/Timeline";
import { getTimelineArray } from "./services/GptService";

export default async function Home() {
  const timelines = await getTimelineArray();

  return (
    <main className={styles.main}>
      <div className={styles.timelines}>
        {timelines.map((item) => (
          <Timeline key={item.title} item={item}></Timeline>
        ))}
      </div>
    </main>
  );
}
