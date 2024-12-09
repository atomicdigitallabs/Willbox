"use strict";

(() => {
  document.getElementById("submit-enquiry").addEventListener("click", function (e) {
    e.preventDefault();

    const reason = document.getElementById("reason_for_enquiry").value;
    let isValid = true;

    if (reason === "New Hire") {
      isValid = validateNewHireForm();
      if (isValid) {
        setupNewHire();
      }
    } else if (reason === "Sales Quote") {
      isValid = validateSalesQuoteForm();
      if (isValid) {
        setupSalesQuote();
      }
    }

    if (isValid) {
      document.getElementById("wf-form-enquiry").submit();
    }
  });

  // Configuración específica para "New Hire"
  function setupNewHire() {
    Se("/complete-your-enquiry/hire-thank-you");
    showElements(["tab-group", "hire-specific-section"]);
    hideElements(["purchase-specific-section"]);
    setRequiredFields(["addressline1_delivery", "postcode_delivery"], true);
    document.getElementById("label-notes").innerHTML = "Details about your hire request";
  }

  // Configuración específica para "Sales Quote"
  function setupSalesQuote() {
    Se("/complete-your-enquiry/sales-thank-you");
    showElements(["tab-group", "purchase-specific-section"]);
    hideElements(["hire-specific-section"]);
    setRequiredFields(["addressline1_delivery", "postcode_delivery"], true);
    document.getElementById("label-notes").innerHTML = "Details about your purchase request";
  }

  // Validación del formulario "New Hire"
  function validateNewHireForm() {
    const requiredFields = [
      { id: "email_address", message: "Please enter an email address" },
      { id: "phone_number", message: "Please enter a phone number" },
      { id: "last_name", message: "Please enter a last name" },
      { id: "first_name", message: "Please enter a first name" },
    ];
    return validateFields(requiredFields);
  }

  // Validación del formulario "Sales Quote"
  function validateSalesQuoteForm() {
    const requiredFields = [
      { id: "postcode_delivery", message: "Please enter a delivery postcode" },
      { id: "addressline1_delivery", message: "Please enter a delivery address" },
      { id: "email_address", message: "Please enter an email address" },
      { id: "phone_number", message: "Please enter a phone number" },
      { id: "last_name", message: "Please enter a last name" },
      { id: "first_name", message: "Please enter a first name" },
    ];
    return validateFields(requiredFields);
  }

  // Función para validar campos
  function validateFields(fields) {
    let isValid = true;
    fields.forEach((field) => {
      const element = document.getElementById(field.id);
      if (!element.value) {
        isValid = false;
        showError(element, field.message);
      } else {
        removeError(element);
      }
    });
    return isValid;
  }

  // Mostrar error en un campo
  function showError(element, message) {
    let error = element.nextElementSibling;
    if (!error || !error.classList.contains("form-error")) {
      error = document.createElement("div");
      error.className = "form-error";
      error.innerText = message;
      element.insertAdjacentElement("afterend", error);
    }
    element.focus();
  }

  // Eliminar error de un campo
  function removeError(element) {
    const error = element.nextElementSibling;
    if (error && error.classList.contains("form-error")) {
      error.remove();
    }
  }

  // Mostrar elementos por ID
  function showElements(ids) {
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.remove("hidden");
      }
    });
  }

  // Ocultar elementos por ID
  function hideElements(ids) {
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.add("hidden");
      }
    });
  }

  // Configurar campos como requeridos o no
  function setRequiredFields(ids, isRequired) {
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        if (isRequired) {
          element.setAttribute("required", "true");
        } else {
          element.removeAttribute("required");
        }
      }
    });
  }

  // Función para redireccionar
  function Se(redirectUrl) {
    const form = document.getElementById("wf-form-enquiry");
    form.setAttribute("data-redirect", redirectUrl);
    form.setAttribute("redirect", redirectUrl);
  }
})();


document.getElementById("wf-form-enquiry").addEventListener("submit", function(e) {
    e.preventDefault();
    const reason = document.getElementById("reason_for_enquiry").value;

    // Configura el formulario según el motivo de la consulta
    if (reason === "New Hire") {
        setupNewHireForm();
    } else if (reason === "Sales Quote") {
        setupSalesQuoteForm();
    }

    // Proceso general para enviar el formulario después de configurarlo
    document.getElementById("wf-form-enquiry").submit();
});

// Agregar elementos dinámicos al formulario
function addHiddenFields(n) {
    if (!n.purchase) {
        let h = document.createElement("textarea");
        h.name = "Purchase items";
        h.hidden = true;
        h.value = "Purchase items:\n";

        for (let c in n) {
            if (c === "purchase" && Array.isArray(n[c])) {
                for (let d = 0; d < n[c].length; d++) {
                    h.value += n[c][d];
                    if (d < n[c].length - 1) {
                        h.value += "\n"; // Salto de línea entre elementos
                    }
                }
            }
        }

        document.getElementById("wf-form-enquiry").append(h);
    }
}


function setupNewHireForm() {
    Se("/complete-your-enquiry/hire-thank-you"); // Redirige a la página de gracias para "New Hire"
    document.getElementById("upload-file-show-hide").classList.add("hidden");
    showElements(["tab-group", "placed-order-show-hide", "know-account-num-show-hide", "vat-registered-show-hide", "address", "items-show-hide"]);
    setRequiredFields(["addressline1_delivery", "postcode_delivery"], true);
    setInnerHTML("label-is-a-company", "Are you hiring for a company?*");
    setInnerHTML("label-notes", "Your message");
    setPlaceholder("notes", "Enter any additional information relevant to your enquiry or questions you may have about hiring.");
    document.getElementById("reason_for_enquiry").value = "New Hire";
}

function setupSalesQuoteForm() {
    Se("/complete-your-enquiry/sales-thank-you"); // Redirige a la página de gracias para "Sales Quote"
    document.getElementById("upload-file-show-hide").classList.add("hidden");
    showElements(["tab-group", "placed-order-show-hide", "know-account-num-show-hide", "vat-registered-show-hide", "address", "items-show-hide"]);
    setRequiredFields(["addressline1_delivery", "postcode_delivery"], true);
    setInnerHTML("label-is-a-company", "Are you purchasing for a company?*");
    setInnerHTML("label-notes", "Your message");
    setPlaceholder("notes", "Enter any additional information relevant to your enquiry or questions you may have about purchasing.");
    document.getElementById("reason_for_enquiry").value = "Sales Quote";
}

function Se(redirectUrl) {
    document.getElementById("wf-form-enquiry").setAttribute("data-redirect", redirectUrl);
    document.getElementById("wf-form-enquiry").setAttribute("redirect", redirectUrl);
}

function showElements(ids) {
    ids.forEach(id => document.getElementById(id).classList.remove("hidden"));
}

function setRequiredFields(ids, isRequired) {
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (isRequired) {
            element.setAttribute("required", "true");
            element.required = true;
        } else {
            element.removeAttribute("required");
            element.required = false;
        }
    });
}

function setInnerHTML(id, html) {
    document.getElementById(id).innerHTML = html;
}

function setPlaceholder(id, placeholderText) {
    document.getElementById(id).setAttribute("placeholder", placeholderText);
}

// Inicialización basada en parámetros de URL
(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const reason = urlParams.get("reason");
    if (reason === "NewHire") {
        setupNewHireForm();
    } else if (reason === "SalesQuote") {
        setupSalesQuoteForm();
    }
})();

/*!
 * Datepicker v1.0.10
 * https://fengyuanchen.github.io/datepicker
 *
 * Copyright 2014-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2020-09-29T14:46:10.983Z
 */
/*!
 * NOTE
 * This is a modified version of datepicker to remove the jquery dependency as it is included with Webflow
 * Edited by Carl Burden
 */
