import { logsRepo } from "./logsRepoHandler.js";

class RestartLogsList {
    async restartButtonEvent() {
        await fetch("/logs/all", { method: "DELETE" })
            .then((res) => {
                if(res.status >= 400)
                    throw new Error("Could not finish the requisition");
            });

        const ul = document.getElementById("logs");
        ul.innerHTML = '';

        logsRepo.logs = [];
    }

    pressButtonEventDefinition() {
        const restartButton = document.querySelector("#options button");

        restartButton.removeEventListener("click", () => {});
        restartButton.addEventListener("click", this.restartButtonEvent);
    }
}

const restartHandler = new RestartLogsList();
restartHandler.pressButtonEventDefinition();

export { restartHandler };
