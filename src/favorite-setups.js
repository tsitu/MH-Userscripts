// ==UserScript==
// @name         MouseHunt - Favorite Setups
// @author       Tran Situ (tsitu)
// @namespace    https://greasyfork.org/en/users/232363-tsitu
// @version      1.5.1
// @description  Unlimited custom favorite trap setups!
// @grant        GM_addStyle
// @match        http://www.mousehuntgame.com/*
// @match        https://www.mousehuntgame.com/*
// ==/UserScript==
GM_addStyle ( `
#tsitu-fave-setups {
  background-color: #F5F5F5;
  position: fixed;
  z-index: 42;
  left: 5px;
  top: 5px;
  border: solid 3px #696969;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  height: 95vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: inherit;
  resize: both;
  min-width: min-content;
  min-height: 25vh;
}
}
#tsitu-fave-setups button {
	  cursor: pointer;
}
#tsitu-fave-setups .title {
    font-weight: bold;
    font-size: 160%;
    text-decoration: underline;
}
#tsitu-fave-setups #close-button {
    float: right;
    font-size: 15px;
    color: rgba(690,0,0,0.69);
    padding: 1px 5px;
    margin: -11px;
    //background-color: rgba(420,0,0,0.420);
    //border-radius: 0px 5px;
    //border: none;
}

.btn-group {
  display: inline-flex;
  justify-content: center;
  padding: 8px 0px;
}
.btn-group .button {
  margin: -1px;
  flex-grow: 1;
  font-size: 100%;
}
#saveButton {
  font-weight: bold;
  font-size: 120%;
}

.favInput {
  //display: flex;
  //flex-grow: 1;
  width: calc(100% - 5px*2 - 2px);
  padding: 1px 5px;
  //justify-content: center;
  margin: -1px -1px;
  font-size: 110%;
}

#collapsible {
  display: none;
}

#dataListDiv {
  max-height: 0px;
  overflow-y: hidden;
  opacity: 1;
  transition: max-height 250ms ease-in-out, opacity 500ms;
}

#collapsible:checked + #dataListDiv {
  max-height: 100%;
  overflow-y: visible;
  opacity: 1;
}

#dataListTable {
 width: 100%;
}

.setupSelectorDiv {
  padding-bottom: 5px;
}

#scroller {
  /* fill parent */
  display: block;
  width: 100%;
  height: 100%;
  /* set to some transparent color */
  border-color: rgba(0, 0, 0, 0.0);
  transition: border-color 300ms ease-in-out;
  overflow: auto;
  padding-right: 2px;
  margin-bottom: 5px;
}

#scroller:hover {
  /* the color we want the scrollbar on hover */
  border-color: rgba(0, 0, 0, 0.3);
}

#scroller::-webkit-scrollbar,
#scroller::-webkit-scrollbar-thumb,
#scroller::-webkit-scrollbar-corner {
  /* add border to act as background-color */
  border-right-style: outset;
  border-right-width: 3px;
  /* inherit border-color to inherit transitions */
  border-color: inherit;
}
#scroller::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  border-color: rgba(0,0,0,0);
}
#scroller::-webkit-scrollbar-thumb {
  border-color: inherit;
  border-radius: 50px;
}

#scroller::-webkit-scrollbar-thumb:active {
  border-color: rgba(0, 0, 0, 0.5);
}

// #setupTableDiv {
//   overflow-y: scroll;
//   max-height: 100%;
// }
// #setupTableDiv::-webkit-scrollbar
// {
//   width: 5px;
//   background-color: #F5F5F5;
// }
// #setupTableDiv::-webkit-scrollbar-thumb
// {
//   background-color: #696969;
//   border-radius: 420px;
// }
#setupTbody tr:nth-child(odd){
  background-color: rgba(0, 0, 0, 0.25);
}
#setupTbody tr:nth-child(even){
  background-color: rgba(0, 0, 0, 0.069);
}
.tsitu-fave-setup-row {
    display: grid;
    align-items: stretch;
    grid-template-columns: 1fr auto 2em;
    grid-template-rows: 50% 50%;
    grid-template-areas:
        "a c d"
        "b c e";
    padding: 3px;
    border-radius: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.tsitu-fave-setup-namespan {
    grid-area: a;
    font-size: inherit;
    text-align: left;
    text-overflow: ellipsis;
    padding-top: 3px;
    padding-left: 3px;
    margin-right: -3px;
}
.travelButton {
    grid-area: b;
    overflow: hidden;
    padding: 0px 2px;
    font-size: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
}
#imgSpan {
  grid-area: c;
  //align-items: center;
  max-height: 100%;
  max-width: max-content;
  min-width: max-content;
  padding: 0px 0px 0px 0px;
  margin-left: 3px;
  margin-right: -1px;
  //justify-items: center;
  overflow: hidden;
}
#imgSpan img {
  max-height: 100%;
  max-width: 100%;
   height: 3.2vh; /* change this to change the overall size which should scale with this */
//   width: auto;
//   object-fit: scale-down;
  margin-bottom: -3px;
}
#editButton {
  grid-area: d;
  text-align: center;
  font-size: inherit;
  padding: 0;
  margin-bottom: -1px;
}
#deleteButton {
  grid-area: e;
  text-align: center;
  font-size: inherit;
  padding: 0;
  margin-top: -1px;
}
#resizeButton {
    display: flex;
    flex-direction: right;
    float: right;
    font-size: 15px;
    color: rgba(690,0,0,0.69);
    padding: 1px 5px;
    margin: -11px;
    background-color: rgba(420,0,0,0.420);
    border-radius: 5px 0px;
    border: none;
}
`);
(function () {
  // Observe Camp page for mutations (to re-inject button)
  const observerTarget = document.querySelector(".mousehuntPage-content");
  if (observerTarget) {
    MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;

    const observer = new MutationObserver(function () {
      const campExists = document.querySelector(
        ".mousehuntPage-content.PageCamp"
      );
      if (campExists) {
        // Disconnect and reconnect later to prevent infinite mutation loop
        observer.disconnect();

        // Re-render buttons (mainly for alternate TEM area placement)
        injectUI();

        observer.observe(observerTarget, {
          childList: true,
          subtree: true
        });
      }
    });

    observer.observe(observerTarget, {
      childList: true,
      subtree: true
    });
  }

  // Sorted from low to high (matches top HUD except weapon/base swapped for clarity)
  const displayOrder = {
    weapon: 1,
    base: 2,
    bait: 3,
    cheese: 3,
    trinket: 4,
    charm: 4,
    skin: 5,
    location: 6
  };

  // Pull and save location list
  const xhr = new XMLHttpRequest();
  xhr.open(
      "POST",
      `https://www.mousehuntgame.com/managers/ajax/pages/page.php?page_class=HunterProfile&page_arguments%5Btab%5D=mice&page_arguments%5Bsub_tab%5D=location&uh=${user.unique_hash}`
  );
  xhr.onload = function () {
      const response = JSON.parse(xhr.responseText);
      const locations =
            response.page.tabs.mice.subtabs[1].mouse_list.categories;
      if (locations) {
          const masterObj = {};

          locations.forEach(el => {
              const obj = {};
              obj["type"] = el.type;
              masterObj[el.name] = obj;
          });

          localStorage.setItem(
              "ast-location-mapping",
              JSON.stringify(masterObj)
          );
      };
  };
  xhr.send();

  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function () {
    this.addEventListener("load", function () {
      if (
        this.responseURL ===
        "https://www.mousehuntgame.com/managers/ajax/users/gettrapcomponents.php"
      ) {
        let data;
        try {
          data = JSON.parse(this.responseText).components;
          if (data && data.length > 0) {
            const ownedItems = JSON.parse(
              localStorage.getItem("tsitu-owned-components")
            ) || {
              bait: {},
              base: {},
              weapon: {},
              trinket: {},
              skin: {},
              location: {}
            };

            data.forEach(el => {
              let key = el.name;
              const arr = [el.item_id, el.thumbnail];
              if (el.classification === "skin") {
                arr.push(el.component_name);
              }

              if (el.classification === "weapon") {
                if (el.name.indexOf("Golem Guardian") >= 0) {
                  // Golem Guardian edge case
                  arr[0] = 2732;
                  key = "Golem Guardian Trap";
                } else if (el.name.indexOf("Isle Idol") >= 0) {
                  // Isle Idol edge case
                  arr[0] = 1127;
                  key = "Isle Idol Trap";
                }
              }

              ownedItems[el.classification][key] = arr;

              // switch statement for all 5 classifications
              // ^ custom array, last element = image_trap hash if available
              // ^ ideally thumbnail is also just the hash portion, img src can be trivially built dynamically
              // ^ i believe this is for synergy with equipment-preview, so it's not necessary for now
            });

            // Edge case cleanup
            Object.keys(ownedItems.weapon).forEach(el => {
              if (
                (el.indexOf("Golem Guardian") >= 0 &&
                  el !== "Golem Guardian Trap") ||
                (el.indexOf("Isle Idol") >= 0 && el !== "Isle Idol Trap")
              ) {
                delete ownedItems.weapon[el];
              }
            });

            localStorage.setItem(
              "tsitu-owned-components",
              JSON.stringify(ownedItems)
            );
            localStorage.setItem("favorite-setup-timestamp", Date.now());
            const existing = document.querySelector("#tsitu-fave-setups");
            if (existing) render();
          } else {
            console.log(
              "Invalid components array data from gettrapcomponents.php"
            );
          }
        } catch (error) {
          console.log(
            "Failed to process server response for gettrapcomponents.php"
          );
          console.error(error.stack);
        }
      }
    });
    originalOpen.apply(this, arguments);
  };

  function render() {
    const existing = document.querySelector("#tsitu-fave-setups");
    if (existing) existing.remove();

    const rawData = localStorage.getItem("tsitu-owned-components");
    var editSort = -1; // ast location mod. change to -2 if you want new setups to appear above location sorted setups until they are manually sorted.
    const locMap = JSON.parse(localStorage.getItem("ast-location-mapping")); // ast location mod
    // aliases for locations with multiple environment_names for the same environment_type
    locMap["Cursed City"] = {"type": "lost_city"};
    locMap["Sand Crypts"] = {"type": "sand_dunes"};
    locMap["Twisted Garden"] = {"type": "desert_oasis"};

    if (rawData) {
      const data = JSON.parse(rawData);
      data.location = locMap;
      const dataKeys = Object.keys(data).sort((a, b) => {
        return displayOrder[a] - displayOrder[b];
      });

      async function batchLoad(
        baitName,
        baseName,
        weaponName,
        trinketName,
        skinName
      ) {
        if (weaponName.indexOf("Golem Guardian") >= 0) {
          weaponName = "Golem Guardian Trap";
        }
        if (weaponName.indexOf("Isle Idol") >= 0) {
          weaponName = "Isle Idol Trap";
        }

        // Diff current setup with proposed batch to minimize server load
        const diff = {};
        if (data.bait[baitName] && user.bait_name !== baitName) {
          diff.bait = data.bait[baitName][0];
        }
        if (data.base[baseName] && user.base_name !== baseName) {
          diff.base = data.base[baseName][0];
        }
        if (data.weapon[weaponName] && user.weapon_name !== weaponName) {
          diff.weapon = data.weapon[weaponName][0];
        }
        if (data.trinket[trinketName] && user.trinket_name !== trinketName) {
          diff.trinket = data.trinket[trinketName][0];
        }
        // if (
        //   data.skin[skinName] &&
        //   data.skin[skinName][2] === weaponName &&
        //   user.skin_item_id !== data.skin[skinName][0]
        //   // note: this will probably proc every single time... diff AFTER weapon swap?
        // ) {
        //   diff.skin = data.skin[skinName][0];
        // }

        if (baitName === "N/A") diff.bait = "disarm";
        if (trinketName === "N/A") diff.trinket = "disarm";
        // if (skinName === "N/A") diff.skin = "disarm";

        const diffKeys = Object.keys(diff).sort((a, b) => {
          return displayOrder[a] - displayOrder[b];
        });

        if (diffKeys.length === 0) {
          return; // Cancel if setup isn't changing
        } else if (diffKeys.length >= 2) {
          localStorage.setItem("tsitu-batch-loading", true); // Minimize Mapping Helper TEM requests by setting an in-progress bool
        }

        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        let counter = 0;
        for (let classification of diffKeys) {
          /**
           * TODO: Investigate bug that de-skins a weapon if you've used mobile app FS to arm a skinless weapon setup
           * Attempted to emulate browser item selector click by calling `app.pages.CampPage.armItem(element)`
           * Passed in a "fake" element with data-item-id so that `tmpItem` is derived
           * Inside `armItem`: 'syncInventory' and/or 'loadItems' fills in 'trapItems' so that 'getItemById' works
           * Final TrapControl requests seem to be identical with script... so the stuff before might be relevant
           */
          counter += 1;
          if (counter === diffKeys.length) {
            localStorage.setItem("tsitu-batch-loading", false); // Reset bool in time for last request
          }

          const id = diff[classification];
          if (id === "disarm") {
            await hg.utils.TrapControl.disarmItem(classification).go();
          } else {
            await hg.utils.TrapControl.armItem(id, classification).go();
            // const testEl = document.createElement("a");
            // testEl.setAttribute("data-item-id", id);
            // console.log(testEl);
            // await app.pages.CampPage.armItem(testEl);
          }
          await sleep(420);
        }

        // Another reset just in case something goes wrong inside the for...of
        localStorage.setItem("tsitu-batch-loading", false);

        // Deprecated the old method because unable to prevent userinventory.php calls from syncArmedItems (caused by mobile/regular desync)
        // Witnessed up to an 18 request simul-slam (at least +1 increments starting from 3 / n-1 duplicates with 1 response's items[] different)
        // If switching back to a previous setup then things do seem to be cached
        // CBS may investigate at some point, but going to use the new method above for v1.0 and beyond
      }

      // Main popup styling
      const mainDiv = document.createElement("div");
      mainDiv.id = "tsitu-fave-setups";

      // Top div styling (close button, title, drag instructions)
      const topDiv = document.createElement("div");
      topDiv.id = "header"
      topDiv.title = "Drag header to reposition this popup";

      const titleSpan = document.createElement("span");
      titleSpan.className = "title";
      titleSpan.innerText = "Favorite Setups";

      const closeButton = document.createElement("button");
      closeButton.id = "close-button";
      closeButton.textContent = "×";
      closeButton.onclick = function () {
        document.body.removeChild(mainDiv);
        localStorage.setItem('showSetups', "N");
      };

      topDiv.appendChild(closeButton);
      topDiv.appendChild(titleSpan);

      // Build <datalist> dropdowns
      const dataListTable = document.createElement("table");
      dataListTable.id = "dataListTable";

      for (let rawCategory of dataKeys) {
        let category = rawCategory;
        if (category === "sort") continue;
        if (category === "skin") continue; // note: only show appropriate skins if implementing
        if (category === "bait") category = "cheese";
        if (category === "trinket") category = "charm";

        const dataList = document.createElement("datalist");
        dataList.id = `favorite-setup-datalist-${category}`;
        for (let item of Object.keys(data[rawCategory]).sort()) {
          const option = document.createElement("option");
          option.value = item;
          dataList.appendChild(option);
        }

        const dataListInput = document.createElement("input");
        dataListInput.id = `favorite-setup-input-${category}`;
        dataListInput.className = "favInput";
        dataListInput.setAttribute("placeholder", `Select ${category}: `);
        dataListInput.setAttribute(
          "list",
          `favorite-setup-datalist-${category}`
        );

        const inputCol = document.createElement("td");
        inputCol.className = "inputCol";
        inputCol.appendChild(dataList);
        inputCol.appendChild(dataListInput);

        const dataListRow = document.createElement("tr");
        dataListRow.className = "dataListRow";

        dataListRow.appendChild(inputCol);
        dataListTable.appendChild(dataListRow);
      }

      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.id = "favorite-setup-name";
      nameInput.className = "favInput";
      nameInput.setAttribute("placeholder", "Setup name: ");
      nameInput.required = true;
      nameInput.minLength = 1;
      nameInput.maxLength = 30;
      nameInput.addEventListener("keyup", function(event) {
          // Number 13 is the "Enter" key on the keyboard
          if (event.keyCode === 13) {
              // Cancel the default action, if needed
              event.preventDefault();
              // Trigger the button element with a click
              document.getElementById("saveButton").click();
          }
      });

      const nameInputCol = document.createElement("td");
      nameInputCol.appendChild(nameInput);

      const nameRow = document.createElement("tr");
      nameRow.appendChild(nameInputCol);
      dataListTable.appendChild(nameRow);

      // Hidden checkbox to toggle dataListDiv visibility
      const collapsibleCheckbox = document.createElement("input");
      collapsibleCheckbox.id = "collapsible";
      collapsibleCheckbox.type = "checkbox";

      const dataListDiv = document.createElement("div");
      dataListDiv.id = "dataListDiv";
      dataListDiv.appendChild(dataListTable);

      // Import setup / Save setup / Reset input buttons
      const saveButton = document.createElement("button");
      saveButton.id = "saveButton";
      saveButton.className = "button";
      saveButton.textContent = "Save Setup";
      saveButton.onclick = function () {
        const bait = document.querySelector("#favorite-setup-input-cheese")
          .value;
        const base = document.querySelector("#favorite-setup-input-base").value;
        const weapon = document.querySelector("#favorite-setup-input-weapon")
          .value;
        const charm = document.querySelector("#favorite-setup-input-charm")
          .value;
        // const skin = document.querySelector("#favorite-setup-input-skin").value;
        const name = document.querySelector("#favorite-setup-name").value;
        const location = document.querySelector("#favorite-setup-input-location").value;

        if (name.length >= 1 && name.length <= 30) {
          const obj = {};
          obj[name] = {
            bait: "N/A",
            base: "N/A",
            weapon: "N/A",
            trinket: "N/A",
            skin: "N/A",
            location: "N/A"
          };

          if (data.bait[bait] !== undefined) obj[name].bait = bait;
          if (data.base[base] !== undefined) obj[name].base = base;
          if (data.weapon[weapon] !== undefined) obj[name].weapon = weapon;
          if (data.trinket[charm] !== undefined) obj[name].trinket = charm;
          // if (data.skin[skin] !== undefined) obj[name].skin = skin;
          if (data.location[location] !== undefined) obj[name].location = location;
          obj[name].sort = editSort;
          console.log("saved setup '"+name+"': "+JSON.stringify(obj[name]));

          const storedRaw = localStorage.getItem("favorite-setups-saved");
          if (storedRaw) {
            const storedData = JSON.parse(storedRaw);
            if (storedData[name] !== undefined) {
              if (confirm(`Do you want to overwrite saved setup '${name}'?`)) {
                obj[name].sort = storedData[name].sort;
              } else {
                return;
              }
            }
            storedData[name] = obj[name];
            localStorage.setItem(
              "favorite-setups-saved",
              JSON.stringify(storedData)
            );
          } else {
            localStorage.setItem("favorite-setups-saved", JSON.stringify(obj));
          }
          var saveScroll = document.getElementById("scroller").scrollTop; // ast location mod
          render();
          document.getElementById("scroller").scrollTop = saveScroll;
          console.log("scroll position before/after: "+saveScroll+" / "+document.getElementById("scroller").scrollTop);
        } else {
          alert(
            "Please enter a name for your setup that is between 1-30 characters"
          );
        }
      };

      const loadButton = document.createElement("button");
      loadButton.id = "loadButton";
      loadButton.className = "button";
      loadButton.textContent = "Import setup";
      loadButton.onclick = function () {
        document.querySelector("#collapsible").checked = true; // to toggle collapsible
        document.querySelector("#favorite-setup-input-cheese").value =
          user.bait_name || "";
        document.querySelector("#favorite-setup-input-base").value =
          user.base_name || "";
        document.querySelector("#favorite-setup-input-weapon").value =
          user.weapon_name || "";
        document.querySelector("#favorite-setup-input-charm").value =
          user.trinket_name || "";
        document.querySelector("#favorite-setup-input-location").value =
          user.environment_name || "";
        // if (user.skin_name) {
        //   document.querySelector("#favorite-setup-input-skin").value =
        //     user.skin_name; // not really a thing, gotta use a qS probably or parse from LS ID-name map
        // }
        document.getElementById("favorite-setup-name").focus();
        console.log("loaded items: ",user.bait_name, user.base_name, user.weapon_name, user.trinket_name, user.environment_name);
      };

      const resetButton = document.createElement("button");
      resetButton.className = "button";
      resetButton.textContent = "Reset inputs";
      resetButton.onclick = function () {
        document.querySelector("#collapsible").checked = false; // to toggle collapsible
        document.querySelector("#favorite-setup-input-cheese").value = "";
        document.querySelector("#favorite-setup-input-base").value = "";
        document.querySelector("#favorite-setup-input-weapon").value = "";
        document.querySelector("#favorite-setup-input-charm").value = "";
        // document.querySelector("#favorite-setup-input-skin").value = "";
        document.querySelector("#favorite-setup-name").value = "";
        document.querySelector("#favorite-setup-input-location").value = "";
      };

      const buttonSpan = document.createElement("span");
      buttonSpan.className = "btn-group";
      buttonSpan.appendChild(loadButton);
      buttonSpan.appendChild(saveButton);
      buttonSpan.appendChild(resetButton);

      // Sort existing saved setups
      const savedRaw = localStorage.getItem("favorite-setups-saved");
      const savedSetups = JSON.parse(savedRaw) || {};
      const savedSetupSortKeys = Object.keys(savedSetups).sort((a, b) => {
        return savedSetups[a].sort - savedSetups[b].sort;
      });

      // Create setup dropdown selector
      const setupSelector = document.createElement("datalist");
      setupSelector.id = "favorite-setup-selector";
      for (let item of savedSetupSortKeys) {
        const option = document.createElement("option");
        option.value = item;
        setupSelector.appendChild(option);
      }

      const setupSelectorInput = document.createElement("input");
      setupSelectorInput.id = "favorite-setup-selector-input";
      setupSelectorInput.className =  "favInput";
      setupSelectorInput.setAttribute("placeholder", "Jump to setup:");
      setupSelectorInput.setAttribute("list", "favorite-setup-selector");
      setupSelectorInput.oninput = function () {
        const name = setupSelectorInput.value;
        if (savedSetups[name] !== undefined) {
          const rows = document.querySelectorAll("tr.tsitu-fave-setup-row");
          rows.forEach(el => {
            el.style.backgroundColor = "";
          });

          /**
           * Return row element that matches dropdown setup name
           * @param {string} name Dropdown setup name
           * @return {HTMLElement|false} <tr> that should be highlighted and scrolled to
           */
          function findElement(name) {
            for (let el of rows) {
              const spans = el.querySelectorAll("span");
              if (spans.length === 2) {
                if (name === spans[0].textContent) {
                  return el;
                }
              }
            }

            return false;
          }

          // Calculate index for nth-child
          const targetEl = findElement(name);
          let nthChildValue = 0;
          for (let i = 0; i < rows.length; i++) {
            const el = rows[i];
            if (el === targetEl) {
              nthChildValue = i + 1;
              break;
            }
          }

          // tr:nth-child value (min = 1)
          const scrollRow = document.querySelector(
            `tr.tsitu-fave-setup-row:nth-child(${nthChildValue})`
          );
          if (scrollRow) {
            scrollRow.style.backgroundColor = "#D6EBA1";
            scrollRow.scrollIntoView({
              behavior: "auto",
              block: "nearest",
              inline: "nearest"
            });
          }

          setupSelectorInput.value = "";
        }
      };

      const setupSelectorDiv = document.createElement("div");
      setupSelectorDiv.appendChild(setupSelector);
      setupSelectorDiv.appendChild(setupSelectorInput);

      // TODO: Improve async logic, probably await completion of a component switch otherwise might overlap and/or silently fail
      // TODO: [high] Location tags on setup creation (checkboxes a la best setups)
      // TODO: [med]  Import/export setup "profiles" (separate dropdown of profiles) (export specific profile obj to dropbox/pastebin?)
      // ^ Profile management could be an elegant bulk grouping solution if done properly
      // TODO: [med]  Mobile UX for drag & drop as well as scrollable div (jquery-ui-touch-punch did not work for simulating touch events)
      // TODO: [low]  Skin implementation/checks (in-progress, but either save for later or scrap entirely since use case is minimal)

      const scroller = document.createElement("div");
      scroller.id = "scroller";
      // Setup table styling
      const setupTable = document.createElement("table");
      const setupTbody = document.createElement("tbody");
      setupTbody.id = "setupTbody";

      const setupTableDiv = document.createElement("div");
      setupTableDiv.id = "setupTableDiv";

      // Generate and append each saved setup as a new <tr>
      savedSetupSortKeys.forEach(name => {
        generateRow(name);
      });

      function generateRow(name) {
        const el = savedSetups[name];
        const elKeys = Object.keys(savedSetups[name]).sort((a, b) => {
          return displayOrder[a] - displayOrder[b];
        });

        const imgSpan = document.createElement("span");
        imgSpan.className = "button";
        imgSpan.id = "imgSpan";

        for (let type of elKeys) {
          if (type === "sort") continue;
          if (type === "skin") continue;
          if (type === "location") continue;

          const img = document.createElement("img");
          let item = el[type];
          if (data.weapon["Golem Guardian Trap"] !== undefined) {
            if (type === "weapon") {
              if (item.indexOf("Golem Guardian") >= 0) {
                item = "Golem Guardian Trap";
              } else if (item.indexOf("Isle Idol") >= 0) {
                item = "Isle Idol Trap";
              }
            }
          }
          img.title = item;
          if (item === "N/A") {
            if (type === "bait") img.title = "Disarm Bait";
            if (type === "trinket") img.title = "Disarm Charm";
            // if (type === "skin") img.title = "Disarm Skin";
          }
          img.onclick = function () {
            // Mobile tooltip behavior = LOW priority because long pressing works on FF
            // const appendTitle = img.querySelector(".append-title");
            // if (!appendTitle) {
            //   const appendSpan = document.createElement("span");
            //   appendSpan.className = "append-title";
            //   appendSpan.style.position = "absolute";
            //   appendSpan.style.padding = "4px";
            //   // appendSpan.textContent = item;
            //   appendSpan.textContent = img.title;
            //   img.append(appendSpan);
            // } else {
            //   appendTitle.remove();
            // }
          };
          img.src =
            "https://www.mousehuntgame.com/images/items/stats/ee8f12ab8e042415063ef4140cefab7b.gif?cv=243";
          if (data[type][item]) img.src = data[type][item][1];
          imgSpan.appendChild(img);
        };
        imgSpan.onclick = function () { //ast location mod
            batchLoad(el.bait, el.base, el.weapon, el.trinket, el.skin);
            console.log("armed '"+name+"': ", el.bait, el.base, el.weapon, el.trinket, el.skin, el.location);
        };

        const nameSpan = document.createElement("span");
        nameSpan.className = "tsitu-fave-setup-namespan";
        nameSpan.textContent = name;

        const editButton = document.createElement("button");
        editButton.id = "editButton";
        editButton.className = "button";
        editButton.textContent = "✏️";
        editButton.onclick = function () {
          document.querySelector("#collapsible").checked = true;
          document.querySelector("#favorite-setup-input-cheese").value =
            el.bait === "N/A" ? "" : el.bait;
          document.querySelector("#favorite-setup-input-base").value =
            el.base === "N/A" ? "" : el.base;
          document.querySelector("#favorite-setup-input-weapon").value =
            el.weapon === "N/A" ? "" : el.weapon;
          document.querySelector("#favorite-setup-input-charm").value =
            el.trinket === "N/A" ? "" : el.trinket;
          document.querySelector("#favorite-setup-input-location").value =
            el.location === "N/A" ? "" : el.location;
          // document.querySelector("#favorite-setup-input-skin").value =
          // el.skin === "N/A" ? "" : el.skin;
          document.querySelector("#favorite-setup-name").value = name || "";
          editSort = el.sort; // for sorting name-edited setups after the originating setup this button was clicked on
          console.log("editing setup: "+name+" from sort position "+editSort);
          document.getElementById("favorite-setup-name").focus(); // ast location mod
        };

        const deleteButton = document.createElement("button");
        deleteButton.id = "deleteButton";
        deleteButton.className = "button";
        deleteButton.textContent = "🗑️";
        deleteButton.onclick = function () {
          if (confirm(`Delete setup '${name}'?`)) {
            const storedRaw = localStorage.getItem("favorite-setups-saved");
            if (storedRaw) {
              const storedData = JSON.parse(storedRaw);
              if (storedData[name]) delete storedData[name];
              localStorage.setItem(
                "favorite-setups-saved",
                JSON.stringify(storedData)
              );
              // to delete from DOM without a re-render
              var i = this.parentNode.rowIndex;
              console.log("deleted '"+name+"' from rowIndex: "+i);
              document.getElementById("setupTbody").deleteRow(i);
            }
          }
        };

        const travelButton = document.createElement("button"); //ast location mod
        travelButton.className = "travelButton";
        travelButton.title = "Left click to travel, Right click to update setup location to current location"
        if (el.location) {
            travelButton.textContent = el.location;
        } else {
            travelButton.textContent = 'N/A'
        };
        travelButton.onclick = function () {
            app.pages.TravelPage.travel (locMap[el.location].type);
        };

        const setupRow = document.createElement("tr");
        setupRow.className = "tsitu-fave-setup-row";
        setupRow.appendChild(nameSpan);
        setupRow.appendChild(travelButton);
        setupRow.appendChild(imgSpan);
        setupRow.appendChild(editButton);
        setupRow.appendChild(deleteButton);
        setupTbody.appendChild(setupRow);
      }

      // Toggle sort lock/unlock
      const toggleSort = document.createElement("button"); // ast location mod
      toggleSort.id = "toggleSort";
      toggleSort.innerText = "Click to unlock drag and drop sort";// "Reset Sort Order";
      toggleSort.onclick = function () {
          var disabled = $(setupTbody).sortable("option", "disabled");
          if (disabled) {
              $(setupTbody).sortable("enable");
              toggleSort.innerText = "Drag to sort";
              GM_addStyle( //disable setup name selection when dragging
                  " .tsitu-fave-setup-namespan {                    grid-area: a;                    font-size: inherit;                    text-align: left;                    text-overflow: ellipsis;                    user-select: none;}"
              );
          } else {
              $(setupTbody).sortable("disable");
              toggleSort.innerText = "Click to unlock sort";
              GM_addStyle(
                  " .tsitu-fave-setup-namespan {                    grid-area: a;                    font-size: inherit;                    text-align: left;                    text-overflow: ellipsis;                    user-select: text;}"
              );
          }
      };

      const sortSpan = document.createElement("span");
      sortSpan.innerText = "Drag & drop to rearrange setup rows (PC only)";

      // Make the table drag & drop-able via jQuery sortable()
      GM_addStyle(
        ".ui-state-highlight-tsitu { height: 68px; background-color: #FAFFAF; }"
      );
      $(setupTbody).sortable({
        placeholder: "ui-state-highlight-tsitu",
        scroll: true,
        scrollSensitivity: 80,
        scrollSpeed: 20,
        cursor: "move",
        disabled: true,
        update: function() {
            const storedRaw = localStorage.getItem("favorite-setups-saved");
            if (storedRaw) {
                const storedData = JSON.parse(storedRaw);
                const nameSpans = document.querySelectorAll(
                    ".tsitu-fave-setup-namespan"
                );
                if (nameSpans.length === Object.keys(storedData).length) {
                    for (let i = 0; i < nameSpans.length; i++) {
                        const name = nameSpans[i].textContent;
                        if (storedData[name] !== undefined) {
                            storedData[name].sort = i;
                        }
                    }
                    localStorage.setItem(
                        "favorite-setups-saved",
                        JSON.stringify(storedData)
                    );
                }
            }
        }
      });
      setupTable.appendChild(setupTbody);
      setupTableDiv.appendChild(setupTable);

      // Append everything to main popup UI
      mainDiv.appendChild(topDiv);
      mainDiv.appendChild(buttonSpan);
      mainDiv.appendChild(dataListDiv);
      mainDiv.appendChild(setupSelectorDiv);
      scroller.appendChild(setupTableDiv);
      mainDiv.appendChild(scroller);
      mainDiv.appendChild(toggleSort);
      document.body.appendChild(mainDiv);
      dragElement(mainDiv, topDiv);

      // Reposition popup based on previous dragged location
      const posTop = localStorage.getItem("favorite-setup-pos-top");
      const posLeft = localStorage.getItem("favorite-setup-pos-left");
      if (posTop && posLeft) {
        const intTop = parseInt(posTop);
        if (intTop > 0 && intTop < window.innerHeight - 150) {
          mainDiv.style.top = posTop;
        }
        const intLeft = parseInt(posLeft);
        if (intLeft > 0 && intLeft < window.innerWidth - 150) {
          mainDiv.style.left = posLeft;
        }
      }
    } else {
      alert(
        "No owned item data available. Please refresh, click any of the 5 setup-changing boxes, and try again"
      );
    }
  }

  // Inject initial button/link into UI
  function injectUI() {
    document.querySelectorAll("#fave-setup-button").forEach(el => el.remove());

    const lsPlacement = localStorage.getItem("favorite-setup-placement");
    if (lsPlacement === "tem") {
      const target = document.querySelector(
        ".campPage-trap-armedItemContainer"
      );
      if (target) {
        const div = document.createElement("div");
        div.id = "fave-setup-button";
        const button = document.createElement("button");
        button.innerText = "Favorite Setups";
        button.addEventListener("click", function () {
          const existing = document.querySelector("#tsitu-fave-setups");
          if (existing) {
              localStorage.setItem('showSetups', "N");
              existing.remove();
          }
          else {
              localStorage.setItem('showSetups', "Y");
              render()
          };
        });
        button.addEventListener("contextmenu", function () {
          if (confirm("Toggle 'Favorite Setups' placement?")) {
            localStorage.setItem("favorite-setup-placement", "top");
            injectUI();
          } else {
            localStorage.setItem("favorite-setup-placement", "tem");
          }
        });
        div.appendChild(document.createElement("br"));
        div.appendChild(button);
        target.appendChild(div);
      }
    } else {
      const target = document.querySelector(".mousehuntHud-gameInfo");
      if (target) {
        const link = document.createElement("a");
        link.id = "fave-setup-button";
        link.innerText = "[Favorite Setups]";
        link.addEventListener("click", function () {
          const existing = document.querySelector("#tsitu-fave-setups");
          if (existing) {
              localStorage.setItem('showSetups', "N"); // retain previous open/close behaviour
              existing.remove();
          }
          else {
              render();
              localStorage.setItem('showSetups', "Y"); // retain previous open/close behaviour
          };
          return false; // Prevent default link clicked behavior
        });
        link.addEventListener("contextmenu", function () {
          if (confirm("Toggle '[Favorite Setups]' placement?")) {
            localStorage.setItem("favorite-setup-placement", "tem");
            injectUI();
          } else {
            localStorage.setItem("favorite-setup-placement", "top");
          }
        });
        target.prepend(link);
      }
    }
  }
  // retain previous open/close behaviour
  var openedSettings = localStorage.getItem('showSetups');
  if(openedSettings == "Y") render();
  injectUI();

  /**
   * Element dragging functionality
   * @param {HTMLElement} el Element that actually moves
   * @param {HTMLElement} target Element to drag in order to move 'el'
   */
  function dragElement(el, target) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    if (document.getElementById(target.id + "header")) {
      document.getElementById(target.id + "header").onmousedown = dragMouseDown;
    } else {
      target.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      el.style.top = el.offsetTop - pos2 + "px";
      el.style.left = el.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      localStorage.setItem("favorite-setup-pos-top", el.style.top);
      localStorage.setItem("favorite-setup-pos-left", el.style.left);
    }
  }
})();
