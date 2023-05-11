"use strict";

/**
 * Load data from the database and update the UI on start
 */
initializeApp();

function initializeApp() {
  for (let idx = 0; idx < localStorage.length; idx++) {
    const key = localStorage.key(idx);
    const chore = localStorage.getItem(key);
    updateUI("newChore", chore);
  }
}

/**
 * Add new chore on button click
 */
document.getElementById("chore-add").addEventListener("click", function () {
  newChore();
});

/**
 * Add new chore on pressing Enter
 */
document
  .getElementById("chore-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      newChore();
    }
  });

/**
 * Deletes all chores on button click
 */
document
  .getElementById("chore-remove-all")
  .addEventListener("click", function () {
    removeAllChores();
  });

/**
 * Add new chore to database and updates the UI
 */
function newChore() {
  const choreEl = document.getElementById("chore-input");
  const choreTxt = choreEl.value.trim();
  const choreTxtKey = choreTxt.toLowerCase();

  if (choreTxt !== "") {
    if (localStorage.getItem(choreTxtKey) !== null) {
      // chore exists in database
      updateUI("warning");
    } else {
      // chore doesn't exists in database
      localStorage.setItem(choreTxtKey, choreTxt);
      updateUI("newChore", choreTxt);
    }
  }
}

function removeChor(choreEl) {
  localStorage.removeItem(choreEl.innerText);
  updateUI("removeChor", choreEl);
}

function removeAllChores() {
  localStorage.clear();
  updateUI("removeAllChores");
}

function updateUI(cmd, chore) {
  const msgEl = document.getElementById("msg");
  const choreInputEl = document.getElementById("chore-input");
  const choreListEl = document.getElementById("chores-list");

  switch (cmd) {
    case "warning":
      msgEl.innerText = "This task already exists.";
      break;
    case "removeChor":
      choreListEl.removeChild(chore);
      break;
    case "removeAllChores":
      msgEl.innerText = "";
      choreInputEl.value = "";
      choreListEl.innerHTML = "";
      break;
    default: // "newChore"
      msgEl.innerText = "";
      choreInputEl.value = "";
      const newChoreEl = document.createElement("div");
      newChoreEl.classList.add("chore");
      newChoreEl.innerText = chore;
      newChoreEl.addEventListener("click", function () {
        removeChor(this);
      });
      choreListEl.appendChild(newChoreEl);
  }
}
