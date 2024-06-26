const api = process.env.REACT_APP_API;

export const urls = {
   allTodos: `${api}`,
   remove: `${api}?title=`,
   toggleDone: `${api}status`,
};

export function formatDateString(dateString) {
   const date = new Date(dateString);

   const hours = date.getHours().toString().padStart(2, '0');
   const minutes = date.getMinutes().toString().padStart(2, '0');
   const day = date.getDate();
   const month = date.toLocaleString('default', { month: 'long' });
   const year = date.getFullYear();

   return `${hours}:${minutes} ${month} ${day}, ${year}`;
}