"use strict";
(() => {
    var ze = Object.defineProperty;
    var Ke = (a, e, t) => e in a ? ze(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
    var _ = (a, e, t) => (Ke(a, typeof e != "symbol" ? e + "" : e, t), t);
    var xe = a => { var e = 0; for (var t in a) a.hasOwnProperty(t) && ++e; return e; };
    var T = a => !Array.isArray(a) || !a.length;
    var R = a => a instanceof Date && Object.prototype.toString.call(a) === "[object Date]" && !isNaN(a.getTime());
    var Q = a => (a < 10 && (a = "0" + a), a);

    var U = a => {
        if (R(a)) return a.toLocaleString("en-GB", { day: "numeric", month: "numeric", year: "numeric" });
        var e = new Date(a);
        return e.toLocaleString("en-GB", { day: "numeric", month: "numeric", year: "numeric" });
    };

    var _e = (a, e, t) => (a.splice(t, 0, a.splice(e, 1)[0]), a);
    var re = a => !!(a.prop("checked") === !0 || a.is(":checked"));
    
    var V = a => {
        var e = JSON.parse(localStorage.getItem("enquiry"));
        if (!T(e)) {
            let i = [];
            for (let s = 0; s < e.length; s++) {
                var r = e[s], n = {};
                for (let d in r) {
                    if (r.hasOwnProperty(d)) {
                        if (d === "billing" || d === "name" || d === "variant" || d === "qty") {
                            n[d] = r[d];
                        } else if (d === "selectedDates") {
                            if (a === !0) {
                                var l = JSON.parse(localStorage.getItem("selectedDates"));
                                if (!T(l)) {
                                    $.each(l, function (f, y) {
                                        var c = new Date(y);
                                        if (R(c)) {
                                            var g = c.getFullYear(),
                                                p = Q(c.getMonth() + 1),
                                                h = Q(c.getDate());
                                            f === 0 ? n.hireStart = h + "-" + p + "-" + g : n.hireEnd = h + "-" + p + "-" + g;
                                        }
                                    });
                                }
                            } else if (!T(r[d])) {
                                var l = r[d];
                                $.each(l, function (f, y) {
                                    var c = new Date(y);
                                    if (R(c)) {
                                        var g = c.getFullYear(),
                                            p = Q(c.getMonth() + 1),
                                            h = Q(c.getDate());
                                        f === 0 ? n.hireStart = h + "-" + p + "-" + g : n.hireEnd = h + "-" + p + "-" + g;
                                    }
                                });
                            }
                        }
                    }
                }
                i.push(n);
            }
            $("#enquiry_data").val(JSON.stringify(i));
        } else {
            $("#enquiry_data").val("");
        }
    };

    var Z = a => {
        if (a === "complete-enquiry") {
            var e = JSON.parse(localStorage.getItem("enquiry")), t = 0;
            for (let i = 0; i < e.length; i++) t += parseInt(e[i].qty);
            $('[data-enquiry="total"]').text(t);
            $('[data-enquiry="get-a-quote"]').attr("href", "/complete-your-enquiry?reason=NewHireSalesQuote");
        } else {
            $('[data-enquiry="get-a-quote"]').attr("href", "/complete-your-enquiry");
        }
        $('[data-enquiry="get-a-quote"] .' + a).show().siblings().hide();
    };

    var H = a => {
        return '<div class="datepicker-container"><div class="datepicker-title">' + a + '</div><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>';
    };

    // Initialize Date Picker with defaults
    $.fn.datepicker.setDefaults({
        format: "dd-mm-yyyy",
        language: "en-GB",
        autoHide: !0,
        startDate: new Date,
        pick: function (a) {
            if (a.view === "day") {
                var e = $(this), t = e.attr("id");
                if (t === "hire-start") {
                    var i = a.date, s = a.date.getTime(), r = new Date(s + 864e5 * 28), n = $("#hire-end"), d = n.datepicker("getDate");
                    n.datepicker("setStartDate", r);
                    R(d) ? i >= new Date(d.getTime() - 864e5 * 28) ? (n.datepicker("setDate", r), n.datepicker("show")) : null : null;
                } else if (t === "hire-end") {
                    var l = $("#hire-start");
                    if (l.val() !== "") {
                        var d = a.date, i = l.datepicker("getDate");
                        if (d < i) {
                            a.preventDefault();
                            alert("End date cannot be before the start date");
                            return;
                        }
                        if (d === i) {
                            a.preventDefault();
                            alert("Minimum hire period is 1 day");
                            return;
                        }
                    } else {
                        l.datepicker("show");
                    }
                }
            }
        }
    });

    // Additional configuration or functions here...

    $("#submit-enquiry").on("click", function (a) {
        var e = !0, t = $("#reason_for_enquiry").val();
        if (t === "Container Conversions" || t === "Self Storage" || t === "General Enquiry") {
            var i = [{ id: "email_address", message: "Please enter an email address" }, { id: "phone_number", message: "Please enter a phone number" }, { id: "last_name", message: "Please enter a last name" }, { id: "first_name", message: "Please enter a first name" }];
            $.each(i, function (g, p) {
                $("#"+p.id).val() ? $("#"+p.id).siblings(".form-error").remove() : (e = !1, $("#"+p.id).siblings(".form-error").length || $('<div class="form-error">'+p.message+"</div>").insertAfter("#"+p.id), $("#"+p.id).trigger("focus"));
            });
        } else {
            // Additional form handling...
        }
        return e ? (t = t.replace("/", " or "), $("#wf-form-enquiry").attr("data-name", t).attr("aria-label", t), $("#wf-form-enquiry").trigger("submit")) : !1;
    });
})();
