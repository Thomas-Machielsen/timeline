export type TimelineItem = {
  title: string;
  description: string;
  causeOfBeginning: string;
  causeOfEnd: string;
  date: {
    from: number;
    to: number;
  };
};

export type ZoomPeriod = {
  title: string;
  date: {
    from: number;
    to: number;
  };
};
