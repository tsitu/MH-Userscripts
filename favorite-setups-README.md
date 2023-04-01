# MouseHunt - Favorite Setups+

Based on the [script from tsitu](https://greasyfork.org/en/scripts/388403-mousehunt-favorite-setups), developed with his advice.

Allows the import/edit/saving of setups along with their associated locations, for quick location + setup changes. Designed with a dense UI to maximize setups visible at once, and with drag/drop support for reorganizing.

Adds a bunch of features and densifies the UI for my personal preference. Differences from tsitu's script:

**Known issues:**
- jump to setup search doesn't seem to work - FIXED
- resizing isn't "sticky" across refreshes - FIXED
- CSoS doesn't work, has to be saved as SoS - FIXED
- location based auto-sorting gets funky when new setups are added and manual sorts haven't been done yet - partly FIXED
- if you want to help fix these problems or anything else, here's [the script on my github](https://github.com/PersonalPalimpsest/MH-Userscripts/blob/master/src/favorite-setups.js)

**Location-based features:**
- added location when saving and loading setups, along with a travel button for that location for each setup
- right click function added to travel buttons to add the current location to a setup. helpful for migrating old setups so you don't have to recreate from scratch
- auto sorts setups with location = current location to the top. Now updates when you travel
- only shows the first setup of all locations other than the current one to reduce clutter

**UX:**
- 'Arm' button combined with the setup icons
- retain open/closed status of the pop-up across page loads
- increased setup char limit to 30
- saving an edited setup with a different name now saves it in the sort order right after the initial setup
- load and edit buttons now bring the cursor focus to the name field, allowing for typing it in right away
- "enter" key while focus is in the name field clicks the save button
- scroll position is now retained when saving a setup
- deleting a setup happens instantly
- sorting setups saves automatically
- a toggle lock was implemented to combat unintended sorting, and the save/reset sort buttons were removed
- the modal window can now be dragged by selecting anywhere in the top div instead of just the title text
- collapsible data list section for more setups visible at once
- adding disarm button
- general CSS style changes to remove elements, shrink borders and padding, densify the display of setups, and other backend cleanup/rejigging
- resizable pop-up that remembers its size across page loads
