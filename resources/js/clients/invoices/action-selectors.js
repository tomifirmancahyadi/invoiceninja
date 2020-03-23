/**
 * Invoice Ninja (https://invoiceninja.com)
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2020. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://opensource.org/licenses/AAL
 */

class ActionSelectors {
    constructor() {
        this.parentElement = document.querySelector(".form-check-parent");
        this.parentForm = document.getElementById("bulkActions");
    }

    watchCheckboxes(parentElement) {
        document.querySelectorAll(".form-check-child").forEach(child => {
            if (parentElement.checked) {
                child.checked = parentElement.checked;
                this.processChildItem(child, document.getElementById("bulkActions"));
            } else {
                child.checked = false;
                document
                    .querySelectorAll(".child-hidden-input")
                    .forEach(element => element.remove());
            }
        });
    }

    processChildItem(element, parent, options = {}) {
        if (options.hasOwnProperty("single")) {
            document
                .querySelectorAll(".child-hidden-input")
                .forEach(element => element.remove());
        }

        let _temp = document.createElement("INPUT");

        _temp.setAttribute("name", "invoices[]");
        _temp.setAttribute("value", element.dataset.value);
        _temp.setAttribute("class", "child-hidden-input");
        _temp.hidden = true;

        parent.append(_temp);
    }

    handle() {
        this.parentElement.addEventListener("click", () => {
            this.watchCheckboxes(this.parentElement);
        });

        for (let child of document.querySelectorAll(".pay-now-button")) {
            child.addEventListener("click", () => {
                this.processChildItem(child, this.parentForm, { single: true });
                document.querySelector('button[value="payment"]').click();
            });
        }

        for (let child of document.querySelectorAll(".form-check-child")) {
            child.addEventListener("click", () => {
                this.processChildItem(child, this.parentForm);
            });
        }
    }
}

/** @handle **/
new ActionSelectors().handle();
