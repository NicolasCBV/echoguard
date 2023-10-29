import { listHandler } from "./listHandler.js";
import { logsRepo } from "./logsRepoHandler.js";
import { Utils } from "./utils.js";

class Filter {
  actualLevel = 'ALL';

  buildListItemsBasedOnFilter(logs) {
    const ul = document.getElementById("logs");
    ul.innerHTML = '';

    for(let index=0; index < logs.length; index++) {
      ul.innerHTML = ul.innerHTML + `
        <li>
          <button type="button">
            <i class="level fa-solid ${Utils.getAwesomeIcon(logs[index].level)}">
            </i>						
            <div class="text-log">
              <h2>${logs[index].name}</h2>
              <p>Level: ${logs[index].level}</p>
            </div>

            <span class="${logs[index].level.toLowerCase()}-color"></span>
          </button>
        </li>`
    }
  }

  changeCardsValues(level) {
    const logs = logsRepo.getByLevel(level);

    this.buildListItemsBasedOnFilter(logs);
    this.actualLevel = level;

    listHandler.trackEvents(logs);
  }

  watchSelect() {
    const filter = document.getElementById("filter");
    filter.addEventListener("change", (event) => {
      this.changeCardsValues(event.target.value.toUpperCase());
    })
  }
}

const filter = new Filter();
filter.watchSelect();

export { filter };
