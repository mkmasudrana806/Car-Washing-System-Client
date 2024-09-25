import dayjs from "dayjs";

const getDateFromString = (value: string) => {
  let formattedDate = null;

  switch (value) {
    case "all":
      formattedDate = null;
      break;
    case "today":
      formattedDate = dayjs().format("YYYY-MM-DD");
      break;
    case "yesterday":
      formattedDate = dayjs().subtract(1, "day").format("YYYY-MM-DD");
      break;
    case "last7days":
      formattedDate = dayjs().subtract(7, "days").format("YYYY-MM-DD");
      break;
    case "last10days":
      formattedDate = dayjs().subtract(10, "days").format("YYYY-MM-DD");
      break;
    case "last30days":
      formattedDate = dayjs().subtract(30, "days").format("YYYY-MM-DD");
      break;
    case "lastYear":
      formattedDate = dayjs().subtract(1, "year").format("YYYY-MM-DD");
      break;
    case "last2years":
      formattedDate = dayjs().subtract(2, "years").format("YYYY-MM-DD");
      break;
    default:
      formattedDate = null;
  }

  console.log("Formatted Date before set into state: ", formattedDate);
  return formattedDate;
};

export default getDateFromString;
