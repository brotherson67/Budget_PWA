let db;
const request = indexedDB.open("Budget-PWA", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("new_expense", { autoIncrement: true });
};

function checkDatabase() {
  const transaction = db.transaction("new_expense", "readonly");
  const store = transaction.objectStore("new_expense");
  const getAll = store.getAll();
}
request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log(event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(["new_expense"], "readwrite");

  const expenseObjectStore = transaction.objectStore("new_expense");

  expenseObjectStore.add(record);
}
