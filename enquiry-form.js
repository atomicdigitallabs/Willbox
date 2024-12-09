"use strict";

(() => {
  document.getElementById("submit-enquiry").addEventListener("click", function (e) {
    e.preventDefault();

    const reason = document.getElementById("reason_for_enquiry").value;
    let isValid = true;

    if (reason === "New Hire") {
      isValid = validateForm(newHireFields());
      if (isValid) setupForm("New Hire");
    } else if (reason === "Sales Quote") {
      isValid = validateForm(salesQuoteFields());
      if (isValid) setupForm("Sales Quote");
    }

    if (isValid) {
      document.getElementById("wf-form-enquiry").submit();
    }
  });

  // Setup form based on reason
  function setupForm(reason) {
    const redirectUrl =
      reason === "New Hire"
        ? "/complete-your-enquiry/hire-thank-you"
        : "/complete-your-enquiry/sales-thank-you";

    setRedirect(redirectUrl);

    const isHire = reason === "New Hire";
    toggleSections(isHire);
    updateLabels(isHire);
    setRequiredFields(["addressline1_delivery", "postcode_delivery"], true);
  }

  // Toggle visibility of sections
  function toggleSections(isHire) {
    showElements(["tab-group", "placed-order-show-hide", "know-account-num-show-hide", "vat-registered-show-hide", "address", "items-show-hide"]);
    hideElements([isHire ? "purchase-specific-section" : "hire-specific-section"]);
  }

  // Update labels and placeholders
  function updateLabels(isHire) {
    setInnerHTML("label-is-a-company", isHire ? "Are you hiring for a company?*" : "Are you purchasing for a company?*");
    setInnerHTML("label-notes", "Your message");
    setPlaceholder("notes", isHire ? "Enter additional hire details" : "Enter additional purchase details");
  }

  // Validation logic
  function validateForm(fields) {
    let isValid = true;
    fields.forEach(({ id, message }) => {
      const element = document.getElementById(id);
      if (!element.value) {
        isValid = false;
        showError(element, message);
      } else {
        removeError(element);
      }
    });
    return isValid;
  }

  function newHireFields() {
    return [
      { id: "email_address", message: "Please enter an email address" },
      { id: "phone_number", message: "Please enter a phone number" },
      { id: "last_name", message: "Please enter a last name" },
      { id: "first_name", message: "Please enter a first name" },
    ];
  }

  function salesQuoteFields() {
    return [
      { id: "postcode_delivery", message: "Please enter a delivery postcode" },
      { id: "addressline1_delivery", message: "Please enter a delivery address" },
      ...newHireFields(), // Include shared fields
    ];
  }

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

  function removeError(element) {
    const error = element.nextElementSibling;
    if (error && error.classList.contains("form-error")) {
      error.remove();
    }
  }

  function setRedirect(url) {
    const form = document.getElementById("wf-form-enquiry");
    form.setAttribute("data-redirect", url);
    form.setAttribute("redirect", url);
  }

  function showElements(ids) {
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.classList.remove("hidden");
    });
  }

  function hideElements(ids) {
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.classList.add("hidden");
    });
  }

  function setInnerHTML(id, html) {
    document.getElementById(id).innerHTML = html;
  }

  function setPlaceholder(id, placeholder) {
    document.getElementById(id).setAttribute("placeholder", placeholder);
  }

  function setRequiredFields(ids, isRequired) {
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (isRequired) {
        element.setAttribute("required", "true");
      } else {
        element.removeAttribute("required");
      }
    });
  }

  // URL-based initialization
  const urlParams = new URLSearchParams(window.location.search);
  const reason = urlParams.get("reason");
  if (reason === "NewHire") {
    setupForm("New Hire");
  } else if (reason === "SalesQuote") {
    setupForm("Sales Quote");
  }
})();
