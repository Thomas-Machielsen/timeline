export const defaultChatMessagesParts = {
  titles:
    "What are important themes or periods in history, mention 5 as JSON array ",
  getItem: "tell me more about",
  items: "What are important events or periods within this period",
  dateFormats: {
    yearOnly: "print dates as year in BCE / CE",
    yearAndMonths: "print date in Year and Monts",
    full: "print dates including year, months and days",
  },
  jsonformat:
    "in the JSON format: 'description, causeOfBeginning, causeOfEnd, date: {to in AD, from in AD}, imageDescriptionForDaliApi'",
};
