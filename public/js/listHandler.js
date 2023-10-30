import { filter } from "./filter.js";
import { logsRepo } from "./logsRepoHandler.js";
import { Utils } from "./utils.js";

class ListHandler {
  constructor() {
    this.deleteButtonEvent = this.deleteButtonEvent.bind(this);
  }

  deleteButtonKey = (id, name) => encodeURIComponent(`delete-log.${id}-${name.replaceAll(' ', '_')}`);
  buildPopup = (id, name, level, layer, desc, createdAt) => {
    const date = Utils.formatDate(new Date(createdAt));
      
    return `<div id="wrapper">
        <div id="pop-up">
            <i class="level fa-solid ${Utils.getAwesomeIcon(level)}"></i>
            <div id="pop-up-infos">
                <h2>${name}</h2>
                <p><b>Level</b>: ${level}</p>
                <p><b>Layer</b>: ${layer}</p>
                <p><b>Created at</b>: ${date}</p>
                <div id="popup-description">
                  <p><b>Description</b>:</p>
                  <p>${desc}</p>
                </div>
            </div>
            <div id="pop-up-options">
                <button id="${this.deleteButtonKey(id, name)}" type="button" class="outline-button">
                    Delete
                </button>
    
                <button id="back-button" type="button" class="button">
                    Back
                </button>
            </div>
        </div>
    </div>`
  };

  reloadList(logs) {
    const cards = document.querySelectorAll("#logs li");
    const ul = document.getElementById("logs");
    ul.innerHTML = '';

    for(let index=0; index < cards.length; index++) {
      if(!logs[index])
        return;

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

  async deleteButtonEvent(id, name) {
    const logIndex = logsRepo.logs.findIndex((item) => (
      item.id === id && item.name === name
    ));
    logsRepo.logs.splice(logIndex, 1);

    await fetch('/logs', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name, id })
    })
      .then((res) => {
        if(res.status >= 400)
          throw new Error("Could not finish the requisition");
      });

    const visibleLogs = logsRepo.getByLevel(filter.actualLevel);
    this.reloadList(visibleLogs);
    this.trackEvents(visibleLogs);

    const pin = document.getElementById("popup-pin");
    pin.innerHTML = '';
  }

  backButtonEvent() {
    const pin = document.getElementById("popup-pin");
    pin.innerHTML = '';
  }

  spawnPopup(id, name, level, layer, desc, createdAt) {
    const pin = document.getElementById("popup-pin");
    pin.innerHTML = this.buildPopup(id, name, level, layer, desc, createdAt);

    const deleteButton = document.getElementById(this.deleteButtonKey(id, name));
    const backButton = document.getElementById("back-button");

    deleteButton.removeEventListener("click", () => {});
    deleteButton.addEventListener(
      "click", 
      async () => await this.deleteButtonEvent(id, name)
    );

    backButton.removeEventListener("click", () => {});
    backButton.addEventListener("click", this.backButtonEvent);

    if(!existentEvent) this.cardEvents.push(id);
  }

  trackEvents(logs = logsRepo.logs) {
    const cards = document.querySelectorAll("#logs li");

    for(let i=0; i<cards.length; i++) {
      cards[i].removeEventListener("click", () => {});
      cards[i].addEventListener("click", () => {
        this.spawnPopup(
          logs[i].id,
          logs[i].name,
          logs[i].level,
          logs[i].layer,
          logs[i].description,
          logs[i].createdAt
        ); 
      });
    }
  }
}

const listHandler = new ListHandler();

listHandler.trackEvents();

export { listHandler }
