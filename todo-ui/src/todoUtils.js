const api = process.env.REACT_APP_API;

export const urls = {
   common: `${api}`,
   remove: `${api}?title=`,
   toggleDone: `${api}status`,
   update: `${api}?id=`,
};

export const sortByOptions = [
   "Default",
   "Name (Asc)",
   "Name (Dsc)",
   "Due (Asc)",
   "Due (Dsc)",
   "Done (Asc)",
   "Done (Dsc)",
];

export function getTodayDate() {
   return new Date().toISOString().split("T")[0];
}

export function getCurrentTime() {
   const now = new Date();
   let hours = now.getHours();
   let minutes = now.getMinutes();
   if (minutes >= 55) {
      ++hours;
      minutes = 5;
   }
   hours = String(now.getHours()).padStart(2, "0");
   minutes = String(now.getMinutes() + 5).padStart(2, "0");
   console.log(`getCurrentTime ${hours}:${minutes}`);
   return `${hours}:${minutes}`;
}

export function formatDateString(dateString) {
   const [date, time] = dateString.split("T");
   const [year, month, day] = date.split("-");
   const [hour, min, sec] = time.split(":");
   const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];

   console.log(`${hour}:${min} ${day} ${months[Number(month) - 1]}, ${year} `);
   return `${convertTo12HourFormat(`${hour}:${min}`)} ${day} ${months[Number(month) - 1]
      }, ${year} `;
}

function convertTo12HourFormat(timeString) {
   let [hours, minutes] = timeString.split(":").map(Number);
   let period = hours >= 12 ? "PM" : "AM";
   hours = hours % 12 || 12;
   let formattedHours = hours.toString().padStart(2, "0");
   let formattedMinutes = minutes.toString().padStart(2, "0");
   return `${formattedHours}:${formattedMinutes} ${period} `;
}

export function combineDateTime(date, time) {
   console.log(`${date}T${time}:00.000Z`);
   return `${date}T${time}:00.000Z`;
}

export function splitDateTime(dateTimeString) {
   const [date, time] = dateTimeString.split("T");
   return [date, time.slice(0, 5)];
}

export function truncateString(str, n) {
   if (!str || str === "") return ". . .";
   if (str.length > n) {
      return str.substring(0, n) + "...";
   }
   return str;
}
