// ==UserScript==
// @name         MouseHunt - Log Tracker
// @author       Tran Situ (tsitu)
// @namespace    https://greasyfork.org/en/users/232363-tsitu
// @version      0.2.1 (beta)
// @description  Stores, summarizes, and displays 'Hunter's Progress Report' logs
// @require      https://cdn.jsdelivr.net/npm/localforage@1.9.0/dist/localforage.min.js
// @match        http://www.mousehuntgame.com/*
// @match        https://www.mousehuntgame.com/*
// ==/UserScript==

(function () {
  if (!localforage) {
    console.group("MouseHunt - Log Tracker");
    console.log("localforage dependency not found. Please refresh!");
    console.groupEnd();
  } else {
    // Wait for full page load before calling functions
    window.addEventListener("load", function () {
      journalScanner();
      generateTab();
    });

    // Observe for HunterProfile presence (to re-inject custom tab)
    const observerTarget = document.querySelector(".mousehuntPage-content");
    if (observerTarget) {
      MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;

      const observer = new MutationObserver(async function () {
        const isProfile = document.querySelector(
          ".mousehuntPage-content.PageHunterProfile"
        );
        if (isProfile) {
          // Disconnect and reconnect later to prevent infinite mutation loop
          observer.disconnect();

          // Re-render
          await generateTab();

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

    function journalScanner() {
      const logEl = document.querySelector(".log_summary.stats");
      if (logEl) {
        /**
         * valueArr index breakdown
         *
         * [Section: Mice]
         * 0: Catches (e.g. 106)
         * 1: Fail to Attract (e.g. 10)
         * 2: Misses (e.g. 3)
         * 3: Stale Bait (e.g. 9)
         *
         * [Section: Gold / Points]
         * 4: Gold Gained (e.g. 352,050)
         * 5: Points Gained (e.g. 1,322,200)
         * 6: Gold Lost (e.g. 0)
         * 7: Points Lost (e.g. 4,799)
         * 8: Gold Total (e.g. 352,050)
         * 9: Points Total (1,317,401)
         *
         * [Section: Misc]
         * 10: Duration (e.g. 1 day, 12 hours)
         * 11: onclick string (e.g. showLogSummary(___))
         * 12: Journal Entry ID (e.g. 61716)
         * 13: Timestamp (e.g. 1581057691440)
         */

        // Skip if User ID attached to the journal is not your own (aka on someone else's profile)
        const journalActions = logEl
          .querySelector(".journalactions")
          .querySelector("a");
        const currentID = journalActions
          .getAttribute("data-params-string")
          .split("user_id=")[1]
          .split("&")[0];
        if (currentID != user.user_id) {
          console.group("MouseHunt - Log Tracker");
          console.log(
            `Skipped foreign journal entry from User ID ${currentID}`
          );
          console.groupEnd();
          return;
        }

        let valueArr = [];
        logEl.querySelectorAll(".value").forEach(el => {
          valueArr.push(el.textContent);
        });

        if (valueArr.length >= 10) {
          valueArr = valueArr.slice(0, 10); // IMPORTANT: Accuracy is only preserved if custom/anomalous values come after first 10
          const durationSubtitle = logEl
            .querySelector(".reportSubtitle")
            .textContent.split("Last ")[1];
          const entryID = logEl.getAttribute("data-entry-id");
          const journalDate = logEl.querySelector(".journaldate").textContent;
          const idString = `${entryID} - ${journalDate}`;

          logEl.querySelectorAll("a").forEach(a => {
            const clickStr = a.getAttribute("onclick");
            if (clickStr && clickStr.indexOf("showLogSummary") >= 0) {
              let escapedStr = escape(clickStr.split(" return false;")[0]);
              valueArr.push(durationSubtitle);
              valueArr.push(escapedStr);
              valueArr.push(entryID);
              valueArr.push(Date.now());
              saveLogData(valueArr, idString);
            }

            // TODO: Add "Save" button + "Saved" grey out text to bottom left of journal entries
            // If entry-id ever resets, kinda screwed if there's a collision

            /**
             * > Always unique. But not incremental per user. It's a shared incremental ID.
              Just wanted to see if you could clarify a bit further on this, since by observational accounts the ID seems to be incrementing per user
             */
          });
        }
      }
    }

    /**
     * TODO: Parse onclick showLogSummary string for mouse, location, cheese, and loot data
     * @param {string} clickStr
     */
    function onclickParse(clickStr) {
      const logData =
        JSON.parse(
          `[${
            clickStr.split("showLogSummary(")[1].split("); return false;")[0]
          }]`
        ) || [];

      if (logData.length === 4) {
        const [timePeriod, locationMiceData, cheeseData, lootData] = logData;
        console.log(locationMiceData); // Location + Mouse ID map (MHCT DB)
        console.log(cheeseData); // MH Item DB map, same for below
        console.log(lootData);
      }
    }

    async function saveLogData(valueArr, idString) {
      const existingData = await localforage.getItem("tsitu-log-tracker");
      if (existingData) {
        if (Object.keys(existingData).indexOf(idString) < 0) {
          if (deepDupeCheck(existingData, valueArr)) {
            console.group("MouseHunt - Log Tracker");
            console.log(
              `Deep dupe check skipped a journal entry with idString: "${idString}"`
            );
            console.log("This may be due to journal timezone changes");
            console.groupEnd();
          } else {
            existingData[idString] = valueArr;
            await localforage.setItem("tsitu-log-tracker", existingData);
          }
        } else {
          console.group("MouseHunt - Log Tracker");
          console.log(
            `Skipped duplicate journal entry with idString: "${idString}"`
          );
          console.groupEnd();
        }
      } else {
        const saveData = {};
        saveData[idString] = valueArr;
        await localforage.setItem("tsitu-log-tracker", saveData);
      }

      /**
       * Deep checks existing data for matching entry ID as well as 11 log components
       * Rationale: Journal timezone changes will cause unwanted dupes to be inserted via idString
       * @param {object} data Existing data object in storage
       * @param {array} arr Array to be scanned as potential duplicate
       */
      function deepDupeCheck(data, arr) {
        let retBool = false;
        let counter = 0;

        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          const check = data[keys[i]];
          if (arr[12] === check[12]) {
            for (let j = 0; j <= 10; j++) {
              if (arr[j] === check[j]) {
                counter += 1;
              }
            }
            break;
          }
        }

        if (counter === 11) {
          retBool = true; // 11/11 details match
        }

        return retBool;
      }
    }

    /**
     * Renders custom "Hunting Logs" tab on Hunter's Profile
     */
    async function generateTab() {
      // Remove custom elements if they already exist
      document
        .querySelectorAll(".tsitu-log-tracker")
        .forEach(el => el.remove());

      const isProfile = document.querySelector(
        "#mousehuntContainer.PageHunterProfile"
      );
      if (isProfile) {
        const dataTab = document.createElement("div");
        dataTab.className = "mousehuntHud-page-tabContent tsitu-log-tracker";
        dataTab.setAttribute("data-tab", "tsitu-logs");

        const data = await localforage.getItem("tsitu-log-tracker");
        if (data) {
          const dataTable = document.createElement("table");
          dataTable.style.borderCollapse = "collapse";

          const tableHead = document.createElement("thead");
          const headingList = [
            "Summary",
            "Catches",
            "FTA",
            "FTC",
            "Stale",
            "Gold Gain",
            "Points Gain",
            "Gold Lost",
            "Points Lost",
            "Total Gold",
            "Total Points",
            // "Duration",
            "Save Time"
          ];
          headingList.forEach(item => {
            const td = document.createElement("td");
            td.style.textAlign = "center";
            td.style.border = "1px solid black";
            td.style.padding = "4px";
            td.style.fontWeight = "bold";
            td.innerText = item;
            tableHead.appendChild(td);
          });
          dataTable.appendChild(tableHead);

          // Reverse-chrono sort based on entry saved timestamps
          const sortedKeys = Object.keys(data).sort((a, b) => {
            return data[b][13] - data[a][13];
          });

          // Build table
          sortedKeys.forEach(key => {
            const dataArr = data[key];
            const row = document.createElement("tr");

            const logTd = document.createElement("td");
            logTd.style.textAlign = "center";
            logTd.style.border = "1px solid black";
            logTd.style.padding = "1px";
            const logButton = document.createElement("button");
            logButton.innerText = dataArr[12];
            logButton.addEventListener("click", function () {
              const evalStr = dataArr[11];
              eval(unescape(evalStr));
            });
            logButton.addEventListener("contextmenu", async function (event) {
              if (confirm("Delete this hunting log entry?")) {
                if (
                  confirm(
                    "Are you sure you'd like to DELETE? This action cannot be undone."
                  )
                ) {
                  delete data[key];
                  await localforage.setItem("tsitu-log-tracker", data);
                  document
                    .querySelectorAll(".tsitu-log-tracker")
                    .forEach(el => el.remove());
                }
              }
              event.preventDefault();
            });
            logTd.appendChild(logButton);
            row.appendChild(logTd);

            for (let i = 0; i <= 13; i++) {
              if (i === 10 || i === 11 || i === 12) continue;
              const td = document.createElement("td");
              td.style.textAlign = "center";
              td.style.border = "1px solid black";
              td.style.padding = "1px";
              td.innerText = dataArr[i];

              if (i === 13) {
                const text = new Date(dataArr[i]);
                td.innerText = text.toLocaleString();
              }

              row.appendChild(td);
            }

            dataTable.appendChild(row);

            // Testing: Attack of the Clones
            // const clone = row.cloneNode(true);
            // dataTable.appendChild(clone);
            // const clone2 = row.cloneNode(true);
            // dataTable.appendChild(clone2);
            // const clone3 = row.cloneNode(true);
            // dataTable.appendChild(clone3);
            // const clone4 = row.cloneNode(true);
            // dataTable.appendChild(clone4);
            // const clone5 = row.cloneNode(true);
            // dataTable.appendChild(clone5);
          });

          dataTab.appendChild(dataTable);
        } else {
          const emptySpan = document.createElement("span");
          emptySpan.style.margin = "";
          emptySpan.innerText =
            "No hunting logs were detected in browser storage.\n\nPlease refresh or wait until the next 36h log is generated.";
          dataTab.appendChild(emptySpan);
        }

        const contentContainer = document.querySelector(
          ".mousehuntHud-page-tabContentContainer"
        );
        if (contentContainer) {
          contentContainer.insertAdjacentElement("beforeend", dataTab);
        }

        const logEl = document.createElement("a");
        logEl.href = "#";
        logEl.className = "mousehuntHud-page-tabHeader tsitu-log-tracker";
        logEl.onclick = function () {
          hg.utils.PageUtil.setPageTab("tsitu-logs");
          logEl.classList.toggle("active");
          dataTab.classList.toggle("active", true);
          return false; // Prevents scroll to top
        };

        const logSpan = document.createElement("span");
        logSpan.style.fontStyle = "italic";
        logSpan.innerText = "Hunting Logs";
        logEl.appendChild(logSpan);

        // Compute dynamic tab header widths
        // const numTabs = tabEl.children.length;
        // const adjWidth = 88 / numTabs;
        // tabEl.querySelectorAll(".campPage-tabs-tabHeader").forEach(el => {
        //   el.style.width = `${adjWidth}%`;
        // });
        // logEl.style.width = "12%";

        const tabContainer = document.querySelector(
          ".mousehuntHud-page-tabHeader-container"
        );
        if (tabContainer) {
          tabContainer.insertAdjacentElement("beforeend", logEl);
        }
      }
    }
  }

  /**
   * Misc: Move back top if/when needed
   */
  // XHR utility
  function xhrReq(url) {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = function () {
        resolve(xhr.responseText);
      };
      xhr.onerror = function () {
        reject(xhr.statusText);
      };
      xhr.send();
    });
  }

  // Parse HTML string into DOM
  function htmlParse(body) {
    const dom = new DOMParser();
    const doc = dom.parseFromString(body, "text/html");
    return doc;
  }

  // async function testDelete() {
  //   const data = await localforage.getItem("tsitu-log-tracker");
  //   delete data["96606 - 11:36 am - Floating Islands"];
  //   await localforage.setItem("tsitu-log-tracker", data);
  // }
  // testDelete();

  // async function transferino() {
  // const data = await localforage.getItem("tsitu-log-tracker");
  // console.log(escape(JSON.stringify(data)));
  // const test =
  //   "%7B%2261716%20-%2011%3A07%20pm%20-%20Claw%20Shot%20City%22%3A%5B%22106%22%2C%2210%22%2C%223%22%2C%229%22%2C%22352%2C050%22%2C%221%2C322%2C200%22%2C%220%22%2C%224%2C799%22%2C%22352%2C050%22%2C%221%2C317%2C401%22%2C%221%20day%2C%2012%20hours%22%2C%22app.views.HeadsUpDisplayView.hud.showLogSummary%2528%25221%2520day%252C%252012%2520hours%2522%252C%2520%257B%252262_985%2522%253A%25221%2522%252C%252262_986%2522%253A%25222%2522%252C%252262_993%2522%253A%25221%2522%252C%252243_479%2522%253A%252211%2522%252C%252261_970%2522%253A%25221%2522%252C%252261_965%2522%253A%25223%2522%252C%252261_966%2522%253A%25222%2522%252C%252261_969%2522%253A%25221%2522%252C%252261_964%2522%253A%25221%2522%252C%252261_968%2522%253A%25221%2522%252C%252229_87%2522%253A%25221%2522%252C%252229_142%2522%253A%25221%2522%252C%252243_484%2522%253A%252218%2522%252C%252243_481%2522%253A%25222%2522%252C%252243_478%2522%253A%252216%2522%252C%252243_473%2522%253A%252217%2522%252C%252243_480%2522%253A%252213%2522%252C%252243_467%2522%253A%25221%2522%252C%252243_483%2522%253A%25221%2522%252C%252243_486%2522%253A%25221%2522%252C%252243_476%2522%253A%25224%2522%252C%252243_475%2522%253A%25221%2522%252C%252243_468%2522%253A%25221%2522%252C%252243_469%2522%253A%25221%2522%252C%252243_470%2522%253A%25221%2522%252C%252243_466%2522%253A%25221%2522%252C%252243_472%2522%253A%25221%2522%252C%252243_485%2522%253A%25221%2522%257D%252C%2520%257B%25222906_bu%2522%253A%25227%2522%252C%25222906_m%2522%253A%25223%2522%252C%25222906_c%2522%253A%25224%2522%252C%252298_bu%2522%253A%2522101%2522%252C%252298_c%2522%253A%252291%2522%252C%25222630_bu%2522%253A%25221%2522%252C%25222630_c%2522%253A%25221%2522%252C%25222626_bu%2522%253A%25226%2522%252C%25222626_c%2522%253A%25226%2522%252C%25222629_bu%2522%253A%25222%2522%252C%25222629_c%2522%253A%25222%2522%252C%2522114_bu%2522%253A%25222%2522%252C%2522114_c%2522%253A%25222%2522%252C%252298_af%2522%253A%252210%2522%252C%252298_bs%2522%253A%25229%2522%257D%252C%2520%257B%25221990%2522%253A%25229%2522%252C%25222899%2522%253A%25223%2522%252C%25222830%2522%253A%252293%2522%252C%2522493%2522%253A%25221%2522%252C%2522923%2522%253A%25221%2522%252C%2522925%2522%253A%25225%2522%252C%25221288%2522%253A%25223%2522%252C%25221290%2522%253A%252226%2522%252C%25222619%2522%253A%25222%2522%252C%25221289%2522%253A%25225%2522%252C%25221174%2522%253A%25221%2522%252C%2522114%2522%253A%25224%2522%252C%2522491%2522%253A%25221%2522%252C%25221175%2522%253A%25224%2522%257D%2529%253B%22%2C%2261716%22%2C1604116295528%5D%2C%2262008%20-%2012%3A01%20am%20-%20Queso%20Geyser%22%3A%5B%22106%22%2C%221%22%2C%229%22%2C%221%22%2C%22615%2C195%22%2C%226%2C077%2C000%22%2C%22382%22%2C%2210%2C764%22%2C%22614%2C813%22%2C%226%2C066%2C236%22%2C%221%20day%2C%2012%20hours%22%2C%22app.views.HeadsUpDisplayView.hud.showLogSummary%2528%25221%2520day%252C%252012%2520hours%2522%252C%2520%257B%252262_998%2522%253A%25224%2522%252C%252262_993%2522%253A%25223%2522%252C%252262_985%2522%253A%25225%2522%252C%252262_986%2522%253A%25221%2522%252C%252262_994%2522%253A%25221%2522%252C%252262_1008%2522%253A%25221%2522%252C%252262_1003%2522%253A%25224%2522%252C%252262_997%2522%253A%25223%2522%252C%252262_996%2522%253A%25222%2522%252C%252262_1004%2522%253A%25221%2522%252C%252262_1005%2522%253A%25221%2522%252C%252262_1001%2522%253A%25224%2522%252C%252261_981%2522%253A%25226%2522%252C%252261_983%2522%253A%25221%2522%252C%252261_977%2522%253A%252213%2522%252C%252261_975%2522%253A%252210%2522%252C%252261_976%2522%253A%25226%2522%252C%252261_964%2522%253A%25221%2522%252C%252261_967%2522%253A%25221%2522%252C%252261_978%2522%253A%25224%2522%252C%252261_984%2522%253A%25221%2522%252C%252261_974%2522%253A%252218%2522%252C%252261_973%2522%253A15%257D%252C%2520%257B%25222906_bu%2522%253A%252238%2522%252C%25222906_c%2522%253A%252230%2522%252C%25222906_m%2522%253A%25228%2522%252C%25222627_bu%2522%253A45%252C%25222627_c%2522%253A44%252C%25222628_bu%2522%253A%252222%2522%252C%25222628_c%2522%253A%252221%2522%252C%25222628_m%2522%253A%25221%2522%252C%25222629_bu%2522%253A%252210%2522%252C%25222629_c%2522%253A%252210%2522%252C%25222630_bu%2522%253A%25221%2522%252C%25222630_c%2522%253A%25221%2522%252C%25222627_af%2522%253A%25221%2522%252C%25222627_bs%2522%253A%25221%2522%257D%252C%2520%257B%25222898%2522%253A%252213%2522%252C%25221290%2522%253A33%252C%25221289%2522%253A%25224%2522%252C%25222899%2522%253A%252214%2522%252C%25221990%2522%253A%25228%2522%252C%25222902%2522%253A%25226%2522%252C%2522493%2522%253A%25221%2522%252C%25222900%2522%253A%25223%2522%252C%25221288%2522%253A%25225%2522%252C%2522114%2522%253A%25222%2522%252C%25222527%2522%253A%25222%2522%252C%25222619%2522%253A%25222%2522%252C%2522923%2522%253A%25221%2522%252C%2522925%2522%253A%25223%2522%257D%2529%253B%22%2C%2262008%22%2C1604116306247%5D%2C%2262140%20-%2012%3A30%20pm%20-%20Queso%20Geyser%22%3A%5B%2283%22%2C%223%22%2C%229%22%2C%221%22%2C%22351%2C040%22%2C%223%2C135%2C650%22%2C%22894%22%2C%226%2C910%22%2C%22350%2C146%22%2C%223%2C128%2C740%22%2C%221%20day%2C%2012%20hours%22%2C%22app.views.HeadsUpDisplayView.hud.showLogSummary%2528%25221%2520day%252C%252012%2520hours%2522%252C%2520%257B%252261_973%2522%253A%25221%2522%252C%252261_974%2522%253A%25221%2522%252C%252261_982%2522%253A%25223%2522%252C%252261_981%2522%253A%25229%2522%252C%252261_983%2522%253A%25222%2522%252C%252261_976%2522%253A%252215%2522%252C%252261_975%2522%253A%252215%2522%252C%252261_977%2522%253A%252212%2522%252C%252261_967%2522%253A%25222%2522%252C%252261_978%2522%253A%25223%2522%252C%252261_968%2522%253A%25221%2522%252C%252229_8%2522%253A%25225%2522%252C%252229_53%2522%253A%25222%2522%252C%252229_143%2522%253A%25221%2522%252C%252229_111%2522%253A%25221%2522%252C%252229_130%2522%253A%25221%2522%252C%252262_1001%2522%253A%25222%2522%252C%252262_1008%2522%253A%25222%2522%252C%252262_988%2522%253A%25222%2522%252C%252262_1004%2522%253A%25221%2522%252C%252262_987%2522%253A%25222%2522%257D%252C%2520%257B%25222627_bu%2522%253A%252219%2522%252C%25222627_c%2522%253A%252218%2522%252C%25222628_bu%2522%253A38%252C%25222628_c%2522%253A%252235%2522%252C%25222628_m%2522%253A2%252C%252280_bu%2522%253A%25227%2522%252C%252280_m%2522%253A%25225%2522%252C%252280_af%2522%253A%25222%2522%252C%252280_bs%2522%253A%25221%2522%252C%25222629_bu%2522%253A%252211%2522%252C%25222629_c%2522%253A%252211%2522%252C%2522114_bu%2522%253A%252210%2522%252C%2522114_c%2522%253A%252210%2522%252C%25222906_bu%2522%253A%252210%2522%252C%25222906_c%2522%253A%25229%2522%252C%25222906_m%2522%253A%25221%2522%252C%25222627_m%2522%253A%25221%2522%252C%25222628_af%2522%253A%25221%2522%257D%252C%2520%257B%25221290%2522%253A%252233%2522%252C%25221990%2522%253A%25228%2522%252C%25222830%2522%253A%25228%2522%252C%25222527%2522%253A%25223%2522%252C%25221289%2522%253A%25223%2522%252C%2522333%2522%253A%25221%2522%252C%2522494%2522%253A%25222%2522%252C%25221288%2522%253A%25222%2522%252C%25222898%2522%253A%25225%2522%252C%25222900%2522%253A%25221%2522%252C%25222899%2522%253A%25224%2522%252C%25222902%2522%253A%25221%2522%257D%2529%253B%22%2C%2262140%22%2C1604116309407%5D%7D";
  // console.log(JSON.parse(unescape(test)));
  // const yo = await localforage.setItem(
  //   "tsitu-log-tracker",
  //   JSON.parse(unescape(test))
  // );
  // }
  // transferino();
})();
