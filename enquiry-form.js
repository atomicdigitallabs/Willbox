"use strict";

// Definición de funciones de configuración y manipulación del formulario

function ke(reasonType) {
    // Configura la redirección en función del tipo de motivo (New Hire o Sales Quote)
    Se(reasonType === "NewHire" ? "/complete-your-enquiry/hire-thank-you" : "/complete-your-enquiry/sales-thank-you");

    $("#upload-file-show-hide").addClass("hidden");
    $("#tab-group,#placed-order-show-hide,#know-account-num-show-hide,#vat-registered-show-hide,#address,#items-show-hide").removeClass("hidden");

    $("#addressline1_delivery,#postcode_delivery").prop("required", true).attr("required", true);
    $("#label-is-a-company").html(reasonType === "NewHire" ? "Are you hiring for a company?*" : "Are you requesting a sales quote for a company?*");
    $("#label-notes").html(reasonType === "NewHire" ? "Your hire message" : "Your sales message");
    $("#notes").attr("placeholder", reasonType === "NewHire" ? "Enter additional info about your hire enquiry" : "Enter additional info about your sales enquiry");

    // Establece el tipo de motivo en el formulario
    $("#reason_for_enquiry").val(reasonType === "NewHire" ? "New Hire" : "Sales Quote");
}

function be() {
    Se("/complete-your-enquiry/thank-you");
    $("#addressline1_delivery,#postcode_delivery").prop("required", false).removeAttr("required");
    $("#tab-group,#address,#items-show-hide").addClass("hidden");
    $("#reason-for-enquiry-show-hide,#upload-file-show-hide").removeClass("hidden");

    $("#label-is-a-company").html("Are you enquiring on behalf of a company?*");
    $("#label-notes").html("Your project requirements");
    $("#notes").attr("placeholder", "Please provide a brief summary of your project to discuss.");
}

function Je() {
    Se("/complete-your-enquiry/thank-you");
    $("#enquiry-title").html("Get in touch");
    $("#addressline1_delivery,#postcode_delivery").prop("required", false).removeAttr("required");
    $("#tab-group,#address,#upload-file-show-hide,#items-show-hide").addClass("hidden");
    $("#reason-for-enquiry-show-hide").removeClass("hidden");

    $("#label-is-a-company").html("Are you enquiring on behalf of a company?*");
    $("#label-notes").html("Your message");
    $("#notes").attr("placeholder", "Please provide a brief summary of your project to discuss.");
}

// Configura los motivos en el campo reason_for_enquiry
$("#reason_for_enquiry").on("change", function() {
    let selectedReason = $(this).val();

    if (selectedReason === "Container Conversions" || selectedReason === "Self Storage") {
        be();
        if (selectedReason === "Container Conversions") {
            he("reason", "ContainerConversions");
        } else {
            he("reason", "SelfStorage");
        }
    } else if (selectedReason === "General Enquiry") {
        Je();
        he("reason", "GeneralEnquiry");
    } else {
        // Separa los casos para "New Hire" y "Sales Quote"
        if (selectedReason === "New Hire") {
            ke("NewHire");
            he("reason", "NewHire");
            $("#enquiry-title").html("Get a New Hire Quote");
        } else if (selectedReason === "Sales Quote") {
            ke("SalesQuote");
            he("reason", "SalesQuote");
            $("#enquiry-title").html("Get a Sales Quote");
        }
    }
});

// Función para actualizar el estado del motivo en la URL
function he(paramName, paramValue) {
    paramName = encodeURI(paramName);
    paramValue = encodeURI(paramValue);
    let urlParams = document.location.search.substr(1).split("&");
    let found = false;

    for (let i = urlParams.length - 1; i >= 0; i--) {
        let param = urlParams[i].split("=");
        if (param[0] === paramName) {
            param[1] = paramValue;
            urlParams[i] = param.join("=");
            found = true;
            break;
        }
    }

    if (!found) {
        urlParams[0] = paramName + "=" + paramValue;
    }

    let newUrl = urlParams.join("&");
    if (history.replaceState) {
        window.history.replaceState(null, null, window.location.pathname + "?" + newUrl);
    }
}

// Configuración del campo reason_for_enquiry en función de parámetros de URL
(function() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("reason")) {
        let reasonParam = urlParams.get("reason");

        if (reasonParam === "ContainerConversions" || reasonParam === "SelfStorage") {
            be(true);
            $("#reason_for_enquiry").val(reasonParam === "ContainerConversions" ? "Container Conversions" : "Self Storage");
        } else if (reasonParam === "GeneralEnquiry") {
            Je(true);
            $("#reason_for_enquiry").val("General Enquiry");
        } else if (reasonParam === "NewHire") {
            ke("NewHire");
            $("#reason_for_enquiry").val("New Hire");
        } else if (reasonParam === "SalesQuote") {
            ke("SalesQuote");
            $("#reason_for_enquiry").val("Sales Quote");
        }
    }
})();
