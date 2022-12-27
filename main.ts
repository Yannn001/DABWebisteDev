class Form {
    formTwo: string;
    formThree: string;
    constructor() {
        this.formTwo = "            <div id=\"missonType\" class=\"input-group col-md-6\">\n              <div class=\"input-group-prepend\">\n                <label class=\"input-group-text\" for=\"inputGroupSelect01\">Mission Type</label>\n              </div>\n              <select class=\"custom-select\" id=\"inputGroupSelect01\">\n                <option selected>Please pick one of the following mission type</option>\n                <option value=\"1\">One</option>\n                <option value=\"2\">Two</option>\n                <option value=\"3\">Three</option>\n              </select>\n            </div>\n            <div class=\"col-md-12\">\n              <input type=\"text\" class=\"form-control\" id=\"heatMapMetric\" placeholder=\"Metric of the Heat Map\"\n                required=\"\" autocomplete=\"off\" name=\"heatMapMetric\">\n              <div class=\"valid-feedback\">\n              </div>\n            </div>\n\n            <div class=\"col-md-12\">\n              <input type=\"text\" class=\"form-control\" id=\"missionDuration\" placeholder=\"Duration for this mission\"\n                required=\"\" autocomplete=\"off\" name=\"missionDuration\">\n              <div class=\"valid-feedback\">\n              </div>\n            </div>\n            \n            <div class=\"col-12\">\n              <button id=\"toStepThreeButton\" type=\"button\" class=\"btn btn-primary\" style=\"      \n              padding: 10px 20px 10px;\n              border-radius: 25px;\n              background-color: #3b6afd;\">\n                Next\n              </button>\n            </div>";
    }
    getFormTwo(): string {
        return this.formTwo;
    }
}

class FormExtractor {
    map: Map<String, String>;

    constructor(formId: string) {
        this.map = new Map<string, String>();

        const formo = document.querySelector(formId) as HTMLFormElement;
        for (let i = 0; i < formo.elements.length - 1; i++) {
            const element = formo.elements[i] as HTMLInputElement | HTMLSelectElement;
            this.map.set(element.name, element.value);
        }
    }

    //this function will return true is all required elements are filled.
    checkForMissingElement(): boolean {
        const entries = this.map.entries();
        for (const entry of entries) {
            if (entry[0] == "faaCheck" || entry[0] == "acknowledgeCheck") {
                const faaCheck = document.querySelector("#checkFAACheck") as HTMLInputElement;
                const acknowledgeCheck = document.querySelector("#checkAcknowledgeCheck") as HTMLInputElement;
                if (!faaCheck.checked || !acknowledgeCheck.checked) {
                    return false;
                    break;
                }
            }
            if (entry[0] != "additionalInfo" && entry[1] == "") {
                console.log("missing elements: " + entry[0]);
                return false;
                break;
            }
            //console.log(entry[0], entry[1]);
        }
        return true;
    }

}

const form = new Form();

async function handle2StepTwoButtonClick(): Promise<string>  {
    return new Promise((resolve, reject) => {
        const firstButton = document.getElementById('toStepTwoButton');
        firstButton.addEventListener('click', async () => {
            try {
                const formExtractor = new FormExtractor("#demoForm");
                if (formExtractor.checkForMissingElement()) {
                    document.getElementById("stageOne").style.opacity = "0.5";
                    document.getElementById("stageTwo").style.opacity = "1";
                    document.getElementById("stageThree").style.opacity = "0.5";
                    const result = form.getFormTwo();
                    const formDiv = document.getElementById('demoForm');
                    formDiv.innerHTML = result;
                    resolve('Passed step one!');
                } else {
                    console.log("fail to pass step one");
                }
            } catch (error) {
                console.error(error);
                reject('Error!');
            }
        });
      });
}

async function handle2StepThreeButtonClick(): Promise<string>  {
    return new Promise((resolve, reject) => {
    const secondButton = document.getElementById('toStepThreeButton');
    secondButton.addEventListener('click', async () => {
            try {
                const formExtractor = new FormExtractor("#demoForm");
                if (formExtractor.checkForMissingElement()) {
                    document.getElementById("stageOne").style.opacity = "0.5";
                    document.getElementById("stageTwo").style.opacity = "0.5";
                    document.getElementById("stageThree").style.opacity = "1";
                    const result = form.getFormTwo();
                    const formDiv = document.getElementById('demoForm');
                    formDiv.innerHTML = "            <div class=\"demoBtn\" style=\"      \n    margin-top: 50px;\n    margin-left: 50px;\n    width: 80%;\n    \">\n              Get report\n            </div>";
                    resolve('Passed step two!');
                } else {
                    console.log("fail to pass step two");
                }
            } catch (error) {
                console.error(error);
                reject('Error!');
            }
        });
      });
}


handle2StepTwoButtonClick().then(resultOne => {
    console.log(resultOne);
    handle2StepThreeButtonClick().then(resultTwo => {
        console.log(resultTwo);
      }); 
  });

// firstPromise.then(result => {
//     console.log(result);  // Output: 'First success!'
//     return secondPromise;
// }).then(result => {
//     console.log(result);  // Output: 'Second success!'
// });
// // handle2StepTwoButtonClick();
// async function example() {
//     // Wait for the promise to resolve
//     const result = await firstPromise;
//     console.log(result);  // Output: 'Success!'
//   }

