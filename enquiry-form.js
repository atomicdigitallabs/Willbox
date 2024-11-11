// Función común para establecer atributos de redirección y formulario
function setCommonEnquiryAttributes(redirectUrl, reasonForEnquiryText) {
    Se(redirectUrl);
    $("#upload-file-show-hide").addClass("hidden");
    $("#tab-group,#placed-order-show-hide,#know-account-num-show-hide,#vat-registered-show-hide,#address,#items-show-hide").removeClass("hidden");
    $("#addressline1_delivery,#postcode_delivery").prop("required", true).attr("required");
    $("#label-is-a-company").html("Are you hiring or purchasing for a company?*");
    $("#label-notes").html("Your message");
    $("#notes").attr("placeholder", "Enter any additional information relevant to your enquiry or questions you may have about hiring/purchasing with us.");
    $("#reason_for_enquiry").val(reasonForEnquiryText);
}

// Función específica para `New Hire`
function newHire() {
    setCommonEnquiryAttributes("/complete-your-enquiry/new-hire-thank-you", "New Hire");
}

// Función específica para `Sales Quote`
function salesQuote() {
    setCommonEnquiryAttributes("/complete-your-enquiry/sales-quote-thank-you", "Sales Quote");
}

// Evento que cambia el comportamiento según el motivo de la consulta
$("#reason_for_enquiry").on("change", function() {
    const selectedReason = $(this).val();
    if (selectedReason === "New Hire") {
        newHire();
        he("reason", "NewHire");
    } else if (selectedReason === "Sales Quote") {
        salesQuote();
        he("reason", "SalesQuote");
    } else if (selectedReason === "Container Conversions" || selectedReason === "Self Storage") {
        be();
        selectedReason === "Container Conversions" ? he("reason", "ContainerConversions") : he("reason", "SelfStorage");
    } else {
        Je();
        he("reason", "GeneralEnquiry");
    }
});

// Modificación en la función de inicialización para manejar `NewHire` y `SalesQuote`
(function() {
    var a = window.location.href,
        e = a.split("?");
    if (e.length > 1 && e[1] !== "") {
        let s = new Map(location.search.slice(1).split("&").map(r => r.split("=")));
        if (s.has("reason") === true) {
            var t = s.get("reason");
            if (t === "ContainerConversions" || t === "SelfStorage")
                t === "ContainerConversions" ? be(true, "ContainerConversions") : be(true, "SelfStorage");
            else if (t === "GeneralEnquiry") Je(true);
            else if (t === "NewHire") newHire();
            else if (t === "SalesQuote") salesQuote();
            else if (ke(true), $("#reason-for-enquiry-show-hide").hide(), localStorage.getItem("enquiry")) {
                var i = JSON.parse(localStorage.getItem("enquiry"));
                T(i) === false && ($("#enquiry-title").html("Complete your Enquiry"), V());
            }
        }
    } else if (ke(true), localStorage.getItem("enquiry")) {
        var i = JSON.parse(localStorage.getItem("enquiry"));
        T(i) === false && ($("#enquiry-title").html("Complete your Enquiry"), V());
    }
})();
