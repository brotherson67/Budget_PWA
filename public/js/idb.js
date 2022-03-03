let db;
const request = indexedDB.open("Budget-PWA", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("new_expense", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    // uploadPizza();
  }
};

request.onerror = function (event) {
  console.log(event.target.errorCode);
};
