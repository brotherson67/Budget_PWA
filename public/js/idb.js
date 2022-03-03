const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db;
const request = indexedDB.open("budget-pwa", 1);

request.onupgradeneeded = (event) => {
  event.target.result.createObjectStore("new_expense", {
    keyPath: "id",
    autoIncrement: true,
  });
};

request.onerror = (err) => {
  console.log(err.message);
};

request.onsuccess = (event) => {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

function saveRecord(record) {
  const transaction = db.transaction("new_expense", "readwrite");
  const store = transaction.objectStore("new_expense");
  store.add(record);
}

function checkDatabase() {
  const transaction = db.transaction("new_expense", "readonly");
  const store = transaction.objectStore("new_expense");
  const getAll = store.getAll();

  getAll.onsuccess = () => {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          const transaction = db.transaction("new_expense", "readwrite");
          const store = transaction.objectStore("new_expense");
          store.clear();
        });
    }
  };
}

window.addEventListener("online", checkDatabase);
