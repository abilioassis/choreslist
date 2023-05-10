"use strict";

/**
 * Event handlers
 */
document.getElementById("chore-add").addEventListener("click", function () {
  choreAdd();
});

document
  .getElementById("chore-remove-all")
  .addEventListener("click", function () {
    choreRemoveAll();
  });

document
  .getElementById("chore-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      choreAdd();
    }
  });

initializeApp();

function initializeApp() {
  for (let idx = 0; idx < localStorage.length; idx++) {
    const key = localStorage.key(idx);
    const chore = localStorage.getItem(key);
    updateUI("chore", chore);
  }
}

function choreAdd() {
  const choreInput = document
    .getElementById("chore-input")
    .value.trim()
    .toLowerCase();

  if (choreInput !== "") {
    if (localStorage.getItem(choreInput) !== null) {
      // chore exists in localStorage
      updateUI("warning", "This task already exists.");
    } else {
      // chore doesn't exists in localStorage
      localStorage.setItem(choreInput, choreInput);
      updateUI("chore", choreInput);
    }
  }
}

function choreRemoveAll() {
  localStorage.clear();
  updateUI("clear");
}

function updateUI(strType, str) {
  const msgEl = document.getElementById("msg");
  const choreInputEl = document.getElementById("chore-input");
  const choreListEl = document.getElementById("chores-list");

  if (strType === "warning") {
    msgEl.innerText = str;
  } else if (strType === "clear") {
    msgEl.innerText = "";
    choreInputEl.value = "";
    choreListEl.innerHTML = "";
  } else {
    msgEl.innerText = "";
    choreInputEl.value = "";
    choreListEl.innerHTML += `<div class="chore">${str}</div>`;
  }
}
