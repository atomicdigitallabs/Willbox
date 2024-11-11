"use strict";(() => {
    var ze = Object.defineProperty;
    var Ke = (a, e, t) => (e in a ? ze(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (a[e] = t));
    var _ = (a, e, t) => (Ke(a, typeof e != "symbol" ? e + "" : e, t), t);
    
    // Helper functions
    var xe = (a) => {
        var e = 0;
        for (var t in a) if (a.hasOwnProperty(t)) ++e;
        return e;
    };

    var T = (a) => !Array.isArray(a) || !a.length;
    var R = (a) => a instanceof Date && Object.prototype.toString.call(a) === "[object Date]" && !isNaN(a.getTime());
    var Q = (a) => (a < 10 ? "0" + a : a);

    // Formatting function
    var U = (a) => {
        if (R(a)) return a.toLocaleString("en-GB", { day: "numeric", month: "numeric", year: "numeric" });
        var e = new Date(a);
        return e.toLocaleString("en-GB", { day: "numeric", month: "numeric", year: "numeric" });
    };

    // Move array element
    var _e = (a, e, t) => {
        a.splice(t, 0, a.splice(e, 1)[0]);
        return a;
    };

    // Checked property helper
    var re = (a) => !!(a.prop("checked") === !0 || a.is(":checked"));

    // Local storage fetch helper for "enquiry"
    var V = (a) => {
        var e = JSON.parse(localStorage.getItem("enquiry"));
        if (!T(e)) {
            var i = [];
            for (var s = 0; s < e.length; s++) {
                var r = e[s], n = {};
                for (var d in r) {
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
                                            f === 0 ? (n.hireStart = h + "-" + p + "-" + g) : (n.hireEnd = h + "-" + p + "-" + g);
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
                                        f === 0 ? (n.hireStart = h + "-" + p + "-" + g) : (n.hireEnd = h + "-" + p + "-" + g);
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

    // Additional code sections cleaned up here
    // ...

    // Example initialisation
    var G = [];
    localStorage.getItem("selectedDates") && (G = JSON.parse(localStorage.getItem("selectedDates")));
    
    // Reset storage function
    function ce(a, e) {
        G = [a, e];
        localStorage.setItem("selectedDates", JSON.stringify(G));
        $("#enquiry_data").length && V(!0);
    }

    // Final setup of date picker defaults and other elements
    $.fn.datepicker.setDefaults({
        format: "dd-mm-yyyy",
        language: "en-GB",
        autoHide: !0,
        startDate: new Date(),
        pick: function (a) {
            if (a.view === "day") {
                var e = $(this), t = e.attr("id");
                if (t === "hire-start") {
                    var i = a.date,
                        s = a.date.getTime(),
                        r = new Date(s + 864e5 * 28),
                        n = $("#hire-end"),
                        d = n.datepicker("getDate");
                    n.datepicker("setStartDate", r);
                    R(d)
                        ? i >= new Date(d.getTime() - 864e5 * 28)
                            ? (n.datepicker("setDate", r), n.datepicker("show"), ce(i, r))
                            : ce(i, d)
                        : (n.datepicker("setDate", r), n.datepicker("show"), ce(i, r));
                } else if (t === "hire-end") {
                    var l = $("#hire-start");
                    if (l.val() !== "") {
                        var d = a.date,
                            i = l.datepicker("getDate");
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
                        ce(i, d);
                    } else {
                        l.datepicker("show");
                    }
                }
            }
        }
    });
})();
