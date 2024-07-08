const api = process.env.REACT_APP_API;

export const urls = {
   common: `${api}`,
   remove: `${api}?title=`,
   toggleDone: `${api}status`,
};

export function getTodayDate() {
   return new Date().toISOString().split("T")[0];
}

export function getCurrentTime() {
   const now = new Date();
   const hours = String(now.getHours()).padStart(2, '0');
   const minutes = String(now.getMinutes() + 5).padStart(2, '0');
   return `${hours}:${minutes}`;
}
export function formatDateString(dateString) {
   const date = new Date(dateString);

   let hours = date.getHours();
   const minutes = date.getMinutes().toString().padStart(2, '0');
   const day = date.getDate();
   const month = date.toLocaleString('default', { month: 'long' });
   const year = date.getFullYear();

   const period = hours >= 12 ? 'PM' : 'AM';

   hours = hours % 12 || 12; // Converts '0' hours to '12'
   hours = hours.toString().padStart(2, '0'); // Pad hours with leading zero if needed

   return `${hours}:${minutes} ${period} ${month} ${day}, ${year}`;
}

export function splitDateTime(dateTimeString) {
   const [date, time] = dateTimeString.split('T');
   return [date, time.slice(0, 5)];
}
