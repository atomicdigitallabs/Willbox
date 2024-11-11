"use strict";
( () => {
    var ze = Object.defineProperty;
    var Ke = (a, e, t) => e in a ? ze(a, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : a[e] = t;
    var _ = (a, e, t) => (Ke(a, typeof e != "symbol" ? e + "" : e, t),
    t);
    var xe = a => {
        var e = 0;
        for (var t in a)
            a.hasOwnProperty(t) && ++e;
        return e
    }
      , T = a => !Array.isArray(a) || !a.length
      , R = a => a instanceof Date && Object.prototype.toString.call(a) === "[object Date]" && !isNaN(a.getTime())
      , Q = a => (a < 10 && (a = "0" + a),
    a);
    var U = a => {
        if (R(a))
            return a.toLocaleString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric"
            });
        var e = new Date(a);
        return e.toLocaleString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        })
    }
      , _e = (a, e, t) => (a.splice(t, 0, a.splice(e, 1)[0]),
    a)
      , re = a => !!(a.prop("checked") === !0 || a.is(":checked"))
      , V = a => {
        var e = JSON.parse(localStorage.getItem("enquiry"));
        if (T(e) === !1) {
            for (var i = [], s = 0; s < e.length; s++) {
                var r = e[s]
                  , n = {};
                for (var d in r)
                    if (r.hasOwnProperty(d)) {
                        if (d === "billing" || d === "name" || d === "variant" || d === "qty")
                            n[d] = r[d];
                        else if (d === "selectedDates") {
                            if (a === !0) {
                                var l = JSON.parse(localStorage.getItem("selectedDates"));
                                T(l) === !1 && $.each(l, function(f, y) {
                                    var c = new Date(y);
                                    if (R(c)) {
                                        var g = c.getFullYear()
                                          , p = Q(c.getMonth() + 1)
                                          , h = Q(c.getDate());
                                        f === 0 ? n.hireStart = h + "-" + p + "-" + g : n.hireEnd = h + "-" + p + "-" + g
                                    }
                                })
                            } else if (!T(r[d])) {
                                var l = r[d];
                                $.each(l, function(f, y) {
                                    var c = new Date(y);
                                    if (R(c)) {
                                        var g = c.getFullYear()
                                          , p = Q(c.getMonth() + 1)
                                          , h = Q(c.getDate());
                                        f === 0 ? n.hireStart = h + "-" + p + "-" + g : n.hireEnd = h + "-" + p + "-" + g
                                    }
                                })
                            }
                        }
                    }
                i.push(n)
            }
            $("#enquiry_data").val(JSON.stringify(i))
        } else
            $("#enquiry_data").val("")
    }
    ;
    var Z = a => {
        if (a === "complete-enquiry") {
            var e = JSON.parse(localStorage.getItem("enquiry"))
              , t = 0;
            for (let i = 0; i < e.length; i++)
                t += parseInt(e[i].qty);
            $('[data-enquiry="total"]').text(t),
            $('[data-enquiry="get-a-quote"]').attr("href", "/complete-your-enquiry?reason=NewHireSalesQuote")
        } else
            $('[data-enquiry="get-a-quote"]').attr("href", "/complete-your-enquiry");
        $('[data-enquiry="get-a-quote"] .' + a).show().siblings().hide()
    }
      , H = a => {
        var e = '<div class="datepicker-container"><div class="datepicker-title">' + a + '</div><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>';
        return e
    }
    ;
    var Ie = a => a.closest(".modal").length ? (console.log("in a modal"),
    !0) : !1;
    $ = $ && $.hasOwnProperty("default") ? $.default : $;
    function Qe(a, e) {
        if (!(a instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function Ee(a, e) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(a, i.key, i)
        }
    }
    function Ze(a, e, t) {
        return e && Ee(a.prototype, e),
        t && Ee(a, t),
        a
    }
    var Te = {
        autoShow: !1,
        autoHide: !1,
        autoPick: !1,
        inline: !1,
        container: null,
        trigger: null,
        language: "",
        format: "mm/dd/yyyy",
        date: null,
        startDate: null,
        endDate: null,
        startView: 0,
        weekStart: 0,
        yearFirst: !1,
        yearSuffix: "",
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        itemTag: "li",
        mutedClass: "muted",
        pickedClass: "picked",
        disabledClass: "disabled",
        highlightedClass: "highlighted",
        template: '<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',
        offset: 10,
        zIndex: 1e3,
        filter: null,
        show: null,
        hide: null,
        pick: null
    }
      , Ve = typeof window != "undefined"
      , He = Ve ? window : {}
      , Ae = Ve ? "ontouchstart"in He.document.documentElement : !1
      , I = "datepicker"
      , B = "click.".concat(I)
      , Me = "focus.".concat(I)
      , ve = "hide.".concat(I)
      , de = "keyup.".concat(I)
      , ge = "pick.".concat(I)
      , Ne = "resize.".concat(I)
      , Ye = "scroll.".concat(I)
      , pe = "show.".concat(I)
      , Pe = "touchstart.".concat(I)
      , N = "".concat(I, "-hide")
      , me = {}
      , O = {
        DAYS: 0,
        MONTHS: 1,
        YEARS: 2
    }
      , Xe = Object.prototype.toString;
    function je(a) {
        return Xe.call(a).slice(8, -1).toLowerCase()
    }
    function ie(a) {
        return typeof a == "string"
    }
    var we = Number.isNaN || He.isNaN;
    function Fe(a) {
        return typeof a == "number" && !we(a)
    }
    function oe(a) {
        return typeof a == "undefined"
    }
    function j(a) {
        return je(a) === "date" && !we(a.getTime())
    }
    function ne(a, e) {
        for (var t = arguments.length, i = new Array(t > 2 ? t - 2 : 0), s = 2; s < t; s++)
            i[s - 2] = arguments[s];
        return function() {
            for (var r = arguments.length, n = new Array(r), d = 0; d < r; d++)
                n[d] = arguments[d];
            return a.apply(e, i.concat(n))
        }
    }
    function A(a) {
        return '[data-view="'.concat(a, '"]')
    }
    function et(a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }
    function ye(a, e) {
        return [31, et(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
    }
    function X(a, e, t) {
        return Math.min(t, ye(a, e))
    }
    var tt = /(y|m|d)+/g;
    function it(a) {
        var e = String(a).toLowerCase()
          , t = e.match(tt);
        if (!t || t.length === 0)
            throw new Error("Invalid date format.");
        return a = {
            source: e,
            parts: t
        },
        $.each(t, function(i, s) {
            switch (s) {
            case "dd":
            case "d":
                a.hasDay = !0;
                break;
            case "mm":
            case "m":
                a.hasMonth = !0;
                break;
            case "yyyy":
            case "yy":
                a.hasYear = !0;
                break
            }
        }),
        a
    }
    function at(a) {
        var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1
          , t = $(a)
          , i = t.css("position")
          , s = i === "absolute"
          , r = e ? /auto|scroll|hidden/ : /auto|scroll/
          , n = t.parents().filter(function(d, l) {
            var o = $(l);
            return s && o.css("position") === "static" ? !1 : r.test(o.css("overflow") + o.css("overflow-y") + o.css("overflow-x"))
        }).eq(0);
        return i === "fixed" || !n.length ? $(a.ownerDocument || document) : n
    }
    function fe(a) {
        var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1
          , t = String(Math.abs(a))
          , i = t.length
          , s = "";
        for (a < 0 && (s += "-"); i < e; )
            i += 1,
            s += "0";
        return s + t
    }
    var st = /\d+/g
      , rt = {
        show: function() {
            this.built || this.build(),
            !this.shown && (this.trigger(pe).isDefaultPrevented() || (this.shown = !0,
            this.$picker.removeClass(N).on(B, $.proxy(this.click, this)),
            this.showView(this.options.startView),
            this.inline || (this.$scrollParent.on(Ye, $.proxy(this.place, this)),
            $(window).on(Ne, this.onResize = ne(this.place, this)),
            $(document).on(B, this.onGlobalClick = ne(this.globalClick, this)),
            $(document).on(de, this.onGlobalKeyup = ne(this.globalKeyup, this)),
            Ae && $(document).on(Pe, this.onTouchStart = ne(this.touchstart, this)),
            this.place())))
        },
        hide: function() {
            !this.shown || this.trigger(ve).isDefaultPrevented() || (this.shown = !1,
            this.$picker.addClass(N).off(B, this.click),
            this.inline || (this.$scrollParent.off(Ye, this.place),
            $(window).off(Ne, this.onResize),
            $(document).off(B, this.onGlobalClick),
            $(document).off(de, this.onGlobalKeyup),
            Ae && $(document).off(Pe, this.onTouchStart)))
        },
        toggle: function() {
            this.shown ? this.hide() : this.show()
        },
        update: function() {
            var e = this.getValue();
            e !== this.oldValue && (this.setDate(e, !0),
            this.oldValue = e)
        },
        pick: function(e) {
            var t = this.$element
              , i = this.date;
            this.trigger(ge, {
                view: e || "",
                date: i
            }).isDefaultPrevented() || (i = this.formatDate(this.date),
            this.setValue(i),
            this.isInput && (t.trigger("input"),
            t.trigger("change")))
        },
        reset: function() {
            this.setDate(this.initialDate, !0),
            this.setValue(this.initialValue),
            this.shown && this.showView(this.options.startView)
        },
        getMonthName: function(e, t) {
            var i = this.options
              , s = i.monthsShort
              , r = i.months;
            return $.isNumeric(e) ? e = Number(e) : oe(t) && (t = e),
            t === !0 && (r = s),
            r[Fe(e) ? e : this.date.getMonth()]
        },
        getDayName: function(e, t, i) {
            var s = this.options
              , r = s.days;
            return $.isNumeric(e) ? e = Number(e) : (oe(i) && (i = t),
            oe(t) && (t = e)),
            i ? r = s.daysMin : t && (r = s.daysShort),
            r[Fe(e) ? e : this.date.getDay()]
        },
        getDate: function(e) {
            var t = this.date;
            return e ? this.formatDate(t) : new Date(t)
        },
        setDate: function(e, t) {
            var i = this.options.filter;
            if (j(e) || ie(e)) {
                if (e = this.parseDate(e),
                $.isFunction(i) && i.call(this.$element, e, "day") === !1)
                    return;
                this.date = e,
                this.viewDate = new Date(e),
                t || this.pick(),
                this.built && this.render()
            }
        },
        setStartDate: function(e) {
            j(e) || ie(e) ? this.startDate = this.parseDate(e) : this.startDate = null,
            this.built && this.render()
        },
        setEndDate: function(e) {
            j(e) || ie(e) ? this.endDate = this.parseDate(e) : this.endDate = null,
            this.built && this.render()
        },
        parseDate: function(e) {
            var t = this.format
              , i = [];
            return j(e) || (ie(e) && (i = e.match(st) || []),
            e = e ? new Date(e) : new Date,
            j(e) || (e = new Date),
            i.length === t.parts.length && ($.each(i, function(s, r) {
                var n = parseInt(r, 10);
                switch (t.parts[s]) {
                case "yy":
                    e.setFullYear(2e3 + n);
                    break;
                case "yyyy":
                    e.setFullYear(r.length === 2 ? 2e3 + n : n);
                    break;
                case "mm":
                case "m":
                    e.setMonth(n - 1);
                    break
                }
            }),
            $.each(i, function(s, r) {
                var n = parseInt(r, 10);
                switch (t.parts[s]) {
                case "dd":
                case "d":
                    e.setDate(n);
                    break
                }
            }))),
            new Date(e.getFullYear(),e.getMonth(),e.getDate())
        },
        formatDate: function(e) {
            var t = this.format
              , i = "";
            if (j(e)) {
                var s = e.getFullYear()
                  , r = e.getMonth()
                  , n = e.getDate()
                  , d = {
                    d: n,
                    dd: fe(n, 2),
                    m: r + 1,
                    mm: fe(r + 1, 2),
                    yy: String(s).substring(2),
                    yyyy: fe(s, 4)
                };
                i = t.source,
                $.each(t.parts, function(l, o) {
                    i = i.replace(o, d[o])
                })
            }
            return i
        },
        destroy: function() {
            this.unbind(),
            this.unbuild(),
            this.$element.removeData(I)
        }
    }
      , nt = {
        click: function(e) {
            var t = $(e.target)
              , i = this.options
              , s = this.date
              , r = this.viewDate
              , n = this.format;
            if (e.stopPropagation(),
            e.preventDefault(),
            !t.hasClass("disabled")) {
                var d = t.data("view")
                  , l = r.getFullYear()
                  , o = r.getMonth()
                  , f = r.getDate();
                switch (d) {
                case "years prev":
                case "years next":
                    {
                        l = d === "years prev" ? l - 10 : l + 10,
                        r.setFullYear(l),
                        r.setDate(X(l, o, f)),
                        this.renderYears();
                        break
                    }
                case "year prev":
                case "year next":
                    l = d === "year prev" ? l - 1 : l + 1,
                    r.setFullYear(l),
                    r.setDate(X(l, o, f)),
                    this.renderMonths();
                    break;
                case "year current":
                    n.hasYear && this.showView(O.YEARS);
                    break;
                case "year picked":
                    n.hasMonth ? this.showView(O.MONTHS) : (t.siblings(".".concat(i.pickedClass)).removeClass(i.pickedClass).data("view", "year"),
                    this.hideView()),
                    this.pick("year");
                    break;
                case "year":
                    l = parseInt(t.text(), 10),
                    s.setDate(X(l, o, f)),
                    s.setFullYear(l),
                    r.setDate(X(l, o, f)),
                    r.setFullYear(l),
                    n.hasMonth ? this.showView(O.MONTHS) : (t.addClass(i.pickedClass).data("view", "year picked").siblings(".".concat(i.pickedClass)).removeClass(i.pickedClass).data("view", "year"),
                    this.hideView()),
                    this.pick("year");
                    break;
                case "month prev":
                case "month next":
                    o = d === "month prev" ? o - 1 : o + 1,
                    o < 0 ? (l -= 1,
                    o += 12) : o > 11 && (l += 1,
                    o -= 12),
                    r.setFullYear(l),
                    r.setDate(X(l, o, f)),
                    r.setMonth(o),
                    this.renderDays();
                    break;
                case "month current":
                    n.hasMonth && this.showView(O.MONTHS);
                    break;
                case "month picked":
                    n.hasDay ? this.showView(O.DAYS) : (t.siblings(".".concat(i.pickedClass)).removeClass(i.pickedClass).data("view", "month"),
                    this.hideView()),
                    this.pick("month");
                    break;
                case "month":
                    o = $.inArray(t.text(), i.monthsShort),
                    s.setFullYear(l),
                    s.setDate(X(l, o, f)),
                    s.setMonth(o),
                    r.setFullYear(l),
                    r.setDate(X(l, o, f)),
                    r.setMonth(o),
                    n.hasDay ? this.showView(O.DAYS) : (t.addClass(i.pickedClass).data("view", "month picked").siblings(".".concat(i.pickedClass)).removeClass(i.pickedClass).data("view", "month"),
                    this.hideView()),
                    this.pick("month");
                    break;
                case "day prev":
                case "day next":
                case "day":
                    d === "day prev" ? o -= 1 : d === "day next" && (o += 1),
                    f = parseInt(t.text(), 10),
                    s.setDate(1),
                    s.setFullYear(l),
                    s.setMonth(o),
                    s.setDate(f),
                    r.setDate(1),
                    r.setFullYear(l),
                    r.setMonth(o),
                    r.setDate(f),
                    this.renderDays(),
                    d === "day" && this.hideView(),
                    this.pick("day");
                    break;
                case "day picked":
                    this.hideView(),
                    this.pick("day");
                    break
                }
            }
        },
        globalClick: function(e) {
            for (var t = e.target, i = this.element, s = this.$trigger, r = s[0], n = !0; t !== document; ) {
                if (t === r || t === i) {
                    n = !1;
                    break
                }
                t = t.parentNode
            }
            n && this.hide()
        },
        keyup: function() {
            this.update()
        },
        globalKeyup: function(e) {
            var t = e.target
              , i = e.key
              , s = e.keyCode;
            this.isInput && t !== this.element && this.shown && (i === "Tab" || s === 9) && this.hide()
        },
        touchstart: function(e) {
            var t = e.target;
            this.isInput && t !== this.element && !$.contains(this.$picker[0], t) && (this.hide(),
            this.element.blur())
        }
    }
      , ot = {
        render: function() {
            this.renderYears(),
            this.renderMonths(),
            this.renderDays()
        },
        renderWeek: function() {
            var e = this
              , t = []
              , i = this.options
              , s = i.weekStart
              , r = i.daysMin;
            s = parseInt(s, 10) % 7,
            r = r.slice(s).concat(r.slice(0, s)),
            $.each(r, function(n, d) {
                t.push(e.createItem({
                    text: d
                }))
            }),
            this.$week.html(t.join(""))
        },
        renderYears: function() {
            var e = this.options, t = this.startDate, i = this.endDate, s = e.disabledClass, r = e.filter, n = e.yearSuffix, d = this.viewDate.getFullYear(), l = new Date, o = l.getFullYear(), f = this.date.getFullYear(), y = -5, c = 6, g = [], p = !1, h = !1, D;
            for (D = y; D <= c; D += 1) {
                var C = new Date(d + D,1,1)
                  , v = !1;
                t && (v = C.getFullYear() < t.getFullYear(),
                D === y && (p = v)),
                !v && i && (v = C.getFullYear() > i.getFullYear(),
                D === c && (h = v)),
                !v && r && (v = r.call(this.$element, C, "year") === !1);
                var u = d + D === f
                  , k = u ? "year picked" : "year";
                g.push(this.createItem({
                    picked: u,
                    disabled: v,
                    text: d + D,
                    view: v ? "year disabled" : k,
                    highlighted: C.getFullYear() === o
                }))
            }
            this.$yearsPrev.toggleClass(s, p),
            this.$yearsNext.toggleClass(s, h),
            this.$yearsCurrent.toggleClass(s, !0).html("".concat(d + y + n, " - ").concat(d + c).concat(n)),
            this.$years.html(g.join(""))
        },
        renderMonths: function() {
            var e = this.options, t = this.startDate, i = this.endDate, s = this.viewDate, r = e.disabledClass || "", n = e.monthsShort, d = $.isFunction(e.filter) && e.filter, l = s.getFullYear(), o = new Date, f = o.getFullYear(), y = o.getMonth(), c = this.date.getFullYear(), g = this.date.getMonth(), p = [], h = !1, D = !1, C;
            for (C = 0; C <= 11; C += 1) {
                var v = new Date(l,C,1)
                  , u = !1;
                t && (h = v.getFullYear() === t.getFullYear(),
                u = h && v.getMonth() < t.getMonth()),
                !u && i && (D = v.getFullYear() === i.getFullYear(),
                u = D && v.getMonth() > i.getMonth()),
                !u && d && (u = d.call(this.$element, v, "month") === !1);
                var k = l === c && C === g
                  , w = k ? "month picked" : "month";
                p.push(this.createItem({
                    disabled: u,
                    picked: k,
                    highlighted: l === f && v.getMonth() === y,
                    index: C,
                    text: n[C],
                    view: u ? "month disabled" : w
                }))
            }
            this.$yearPrev.toggleClass(r, h),
            this.$yearNext.toggleClass(r, D),
            this.$yearCurrent.toggleClass(r, h && D).html(l + e.yearSuffix || ""),
            this.$months.html(p.join(""))
        },
        renderDays: function() {
            var e = this.$element, t = this.options, i = this.startDate, s = this.endDate, r = this.viewDate, n = this.date, d = t.disabledClass, l = t.filter, o = t.months, f = t.weekStart, y = t.yearSuffix, c = r.getFullYear(), g = r.getMonth(), p = new Date, h = p.getFullYear(), D = p.getMonth(), C = p.getDate(), v = n.getFullYear(), u = n.getMonth(), k = n.getDate(), w, m, b, S = [], q = c, E = g, x = !1;
            g === 0 ? (q -= 1,
            E = 11) : E -= 1,
            w = ye(q, E);
            var Y = new Date(c,g,1);
            for (b = Y.getDay() - parseInt(f, 10) % 7,
            b <= 0 && (b += 7),
            i && (x = Y.getTime() <= i.getTime()),
            m = w - (b - 1); m <= w; m += 1) {
                var P = new Date(q,E,m)
                  , J = !1;
                i && (J = P.getTime() < i.getTime()),
                !J && l && (J = l.call(e, P, "day") === !1),
                S.push(this.createItem({
                    disabled: J,
                    highlighted: q === h && E === D && P.getDate() === C,
                    muted: !0,
                    picked: q === v && E === u && m === k,
                    text: m,
                    view: "day prev"
                }))
            }
            var W = []
              , F = c
              , M = g
              , z = !1;
            g === 11 ? (F += 1,
            M = 0) : M += 1,
            w = ye(c, g),
            b = 42 - (S.length + w);
            var Be = new Date(c,g,w);
            for (s && (z = Be.getTime() >= s.getTime()),
            m = 1; m <= b; m += 1) {
                var ue = new Date(F,M,m)
                  , Ge = F === v && M === u && m === k
                  , ae = !1;
                s && (ae = ue.getTime() > s.getTime()),
                !ae && l && (ae = l.call(e, ue, "day") === !1),
                W.push(this.createItem({
                    disabled: ae,
                    picked: Ge,
                    highlighted: F === h && M === D && ue.getDate() === C,
                    muted: !0,
                    text: m,
                    view: "day next"
                }))
            }
            var qe = [];
            for (m = 1; m <= w; m += 1) {
                var se = new Date(c,g,m)
                  , K = !1;
                i && (K = se.getTime() < i.getTime()),
                !K && s && (K = se.getTime() > s.getTime()),
                !K && l && (K = l.call(e, se, "day") === !1);
                var Ce = c === v && g === u && m === k
                  , We = Ce ? "day picked" : "day";
                qe.push(this.createItem({
                    disabled: K,
                    picked: Ce,
                    highlighted: c === h && g === D && se.getDate() === C,
                    text: m,
                    view: K ? "day disabled" : We
                }))
            }
            this.$monthPrev.toggleClass(d, x),
            this.$monthNext.toggleClass(d, z),
            this.$monthCurrent.toggleClass(d, x && z).html(t.yearFirst ? "".concat(c + y, " ").concat(o[g]) : "".concat(o[g], " ").concat(c).concat(y)),
            this.$days.html(S.join("") + qe.join("") + W.join(""))
        }
    }
      , Le = "".concat(I, "-top-left")
      , lt = "".concat(I, "-top-right")
      , Re = "".concat(I, "-bottom-left")
      , dt = "".concat(I, "-bottom-right")
      , ct = [Le, lt, Re, dt].join(" ")
      , le = function() {
        function a(e) {
            var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            Qe(this, a),
            this.$element = $(e),
            this.element = e,
            this.options = $.extend({}, Te, me[t.language], $.isPlainObject(t) && t),
            this.$scrollParent = at(e, !0),
            this.built = !1,
            this.shown = !1,
            this.isInput = !1,
            this.inline = !1,
            this.initialValue = "",
            this.initialDate = null,
            this.startDate = null,
            this.endDate = null,
            this.init()
        }
        return Ze(a, [{
            key: "init",
            value: function() {
                var t = this.$element
                  , i = this.options
                  , s = i.startDate
                  , r = i.endDate
                  , n = i.date;
                this.$trigger = $(i.trigger),
                this.isInput = t.is("input") || t.is("textarea"),
                this.inline = i.inline && (i.container || !this.isInput),
                this.format = it(i.format);
                var d = this.getValue();
                this.initialValue = d,
                this.oldValue = d,
                n = this.parseDate(n || d),
                s && (s = this.parseDate(s),
                n.getTime() < s.getTime() && (n = new Date(s)),
                this.startDate = s),
                r && (r = this.parseDate(r),
                s && r.getTime() < s.getTime() && (r = new Date(s)),
                n.getTime() > r.getTime() && (n = new Date(r)),
                this.endDate = r),
                this.date = n,
                this.viewDate = new Date(n),
                this.initialDate = new Date(this.date),
                this.bind(),
                (i.autoShow || this.inline) && this.show(),
                i.autoPick && this.pick()
            }
        }, {
            key: "build",
            value: function() {
                if (!this.built) {
                    this.built = !0;
                    var t = this.$element
                      , i = this.options
                      , s = $(i.template);
                    this.$picker = s,
                    this.$week = s.find(A("week")),
                    this.$yearsPicker = s.find(A("years picker")),
                    this.$yearsPrev = s.find(A("years prev")),
                    this.$yearsNext = s.find(A("years next")),
                    this.$yearsCurrent = s.find(A("years current")),
                    this.$years = s.find(A("years")),
                    this.$monthsPicker = s.find(A("months picker")),
                    this.$yearPrev = s.find(A("year prev")),
                    this.$yearNext = s.find(A("year next")),
                    this.$yearCurrent = s.find(A("year current")),
                    this.$months = s.find(A("months")),
                    this.$daysPicker = s.find(A("days picker")),
                    this.$monthPrev = s.find(A("month prev")),
                    this.$monthNext = s.find(A("month next")),
                    this.$monthCurrent = s.find(A("month current")),
                    this.$days = s.find(A("days")),
                    this.inline ? $(i.container || t).append(s.addClass("".concat(I, "-inline"))) : ($(document.body).append(s.addClass("".concat(I, "-dropdown"))),
                    s.addClass(N).css({
                        zIndex: parseInt(i.zIndex, 10)
                    })),
                    this.renderWeek()
                }
            }
        }, {
            key: "unbuild",
            value: function() {
                !this.built || (this.built = !1,
                this.$picker.remove())
            }
        }, {
            key: "bind",
            value: function() {
                var t = this.options
                  , i = this.$element;
                $.isFunction(t.show) && i.on(pe, t.show),
                $.isFunction(t.hide) && i.on(ve, t.hide),
                $.isFunction(t.pick) && i.on(ge, t.pick),
                this.isInput && i.on(de, $.proxy(this.keyup, this)),
                this.inline || (t.trigger ? this.$trigger.on(B, $.proxy(this.toggle, this)) : this.isInput ? i.on(Me, $.proxy(this.show, this)) : i.on(B, $.proxy(this.show, this)))
            }
        }, {
            key: "unbind",
            value: function() {
                var t = this.$element
                  , i = this.options;
                $.isFunction(i.show) && t.off(pe, i.show),
                $.isFunction(i.hide) && t.off(ve, i.hide),
                $.isFunction(i.pick) && t.off(ge, i.pick),
                this.isInput && t.off(de, this.keyup),
                this.inline || (i.trigger ? this.$trigger.off(B, this.toggle) : this.isInput ? t.off(Me, this.show) : t.off(B, this.show))
            }
        }, {
            key: "showView",
            value: function(t) {
                var i = this.$yearsPicker
                  , s = this.$monthsPicker
                  , r = this.$daysPicker
                  , n = this.format;
                if (n.hasYear || n.hasMonth || n.hasDay)
                    switch (Number(t)) {
                    case O.YEARS:
                        s.addClass(N),
                        r.addClass(N),
                        n.hasYear ? (this.renderYears(),
                        i.removeClass(N),
                        this.place()) : this.showView(O.DAYS);
                        break;
                    case O.MONTHS:
                        i.addClass(N),
                        r.addClass(N),
                        n.hasMonth ? (this.renderMonths(),
                        s.removeClass(N),
                        this.place()) : this.showView(O.YEARS);
                        break;
                    default:
                        i.addClass(N),
                        s.addClass(N),
                        n.hasDay ? (this.renderDays(),
                        r.removeClass(N),
                        this.place()) : this.showView(O.MONTHS)
                    }
            }
        }, {
            key: "hideView",
            value: function() {
                !this.inline && this.options.autoHide && this.hide()
            }
        }, {
            key: "place",
            value: function() {
                if (!this.inline) {
                    var t = this.$element
                      , i = this.options
                      , s = this.$picker
                      , r = $(document).outerWidth()
                      , n = Ie(t) === !0 ? t.closest(".modal").outerHeight() : $(document).outerHeight()
                      , d = t.outerWidth()
                      , l = t.outerHeight()
                      , o = s.width()
                      , f = s.height()
                      , y = t.offset()
                      , c = y.left
                      , g = y.top
                      , p = parseFloat(i.offset)
                      , h = Le;
                    we(p) && (p = 10),
                    g > f && g + l + f > n ? (g -= f + p,
                    h = Re) : g += l + p,
                    c + o > r && (c += d - o,
                    h = h.replace("left", "right")),
                    s.removeClass(ct).addClass(h).css({
                        top: g,
                        left: c
                    })
                }
            }
        }, {
            key: "trigger",
            value: function(t, i) {
                var s = $.Event(t, i);
                return this.$element.trigger(s),
                s
            }
        }, {
            key: "createItem",
            value: function(t) {
                var i = this.options
                  , s = i.itemTag
                  , r = {
                    text: "",
                    view: "",
                    muted: !1,
                    picked: !1,
                    disabled: !1,
                    highlighted: !1
                }
                  , n = [];
                return $.extend(r, t),
                r.muted && n.push(i.mutedClass),
                r.highlighted && n.push(i.highlightedClass),
                r.picked && n.push(i.pickedClass),
                r.disabled && n.push(i.disabledClass),
                "<".concat(s, ' class="').concat(n.join(" "), '" data-view="').concat(r.view, '">').concat(r.text, "</").concat(s, ">")
            }
        }, {
            key: "getValue",
            value: function() {
                var t = this.$element;
                return this.isInput ? t.val() : t.text()
            }
        }, {
            key: "setValue",
            value: function() {
                var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ""
                  , i = this.$element;
                this.isInput ? i.val(t) : (!this.inline || this.options.container) && i.text(t)
            }
        }], [{
            key: "setDefaults",
            value: function() {
                var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                $.extend(Te, me[t.language], $.isPlainObject(t) && t)
            }
        }]),
        a
    }();
    $.extend && $.extend(le.prototype, ot, nt, rt);
    $.fn && (Oe = $.fn.datepicker,
    $.fn.datepicker = function(e) {
        for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
            i[s - 1] = arguments[s];
        var r;
        return this.each(function(n, d) {
            var l = $(d)
              , o = e === "destroy"
              , f = l.data(I);
            if (!f) {
                if (o)
                    return;
                var y = $.extend({}, l.data(), $.isPlainObject(e) && e);
                f = new le(d,y),
                l.data(I, f)
            }
            if (ie(e)) {
                var c = f[e];
                $.isFunction(c) && (r = c.apply(f, i),
                o && l.removeData(I))
            }
        }),
        oe(r) ? this : r
    }
    ,
    $.fn.datepicker.Constructor = le,
    $.fn.datepicker.languages = me,
    $.fn.datepicker.setDefaults = le.setDefaults,
    $.fn.datepicker.noConflict = function() {
        return $.fn.datepicker = Oe,
        this
    }
    );
    var Oe;
    var G = [];
    localStorage.getItem("selectedDates") && ($e = JSON.parse(localStorage.getItem("selectedDates")),
    T($e) === !1 && (G = $e));
    var $e;
    function ce(a, e) {
        G = [a, e],
        localStorage.setItem("selectedDates", JSON.stringify(G)),
        $("#enquiry_data").length && V(!0)
    }
    $.fn.datepicker.setDefaults({
        format: "dd-mm-yyyy",
        language: "en-GB",
        autoHide: !0,
        startDate: new Date,
        pick: function(a) {
            if (a.view === "day") {
                var e = $(this)
                  , t = e.attr("id");
                if (t === "hire-start") {
                    var i = a.date
                      , s = a.date.getTime()
                      , r = new Date(s + 864e5 * 28)
                      , n = $("#hire-end")
                      , d = n.datepicker("getDate");
                    n.datepicker("setStartDate", r),
                    R(d) ? i >= new Date(d.getTime() - 864e5 * 28) ? (n.datepicker("setDate", r),
                    n.datepicker("show"),
                    ce(i, r)) : ce(i, d) : (n.datepicker("setDate", r),
                    n.datepicker("show"),
                    ce(i, r))
                } else if (t === "hire-end") {
                    var l = $("#hire-start");
                    if (l.val() !== "") {
                        var d = a.date
                          , i = l.datepicker("getDate");
                        if (d < i) {
                            a.preventDefault(),
                            alert("End date cannot be before the start date");
                            return
                        }
                        if (d === i) {
                            a.preventDefault(),
                            alert("Minimum hire period is 1 day");
                            return
                        }
                        ce(i, d)
                    } else
                        l.datepicker("show")
                }
            }
        }
    });
    var ht = T(G) === !1;
    ht ? ($("#hire-start").datepicker({
        date: new Date(G[0]),
        template: H("Select a start date")
    }).val(U(G[0])).attr("readonly", ""),
    $("#hire-end").datepicker({
        date: new Date(G[1]),
        template: H("Select an end date")
    }).val(U(G[1])).attr("readonly", "")) : ($("#hire-start").datepicker({
        template: H("Select a start date")
    }).attr("readonly", ""),
    $("#hire-end").datepicker({
        startDate: new Date(new Date().getTime() + 864e5 * 28),
        template: H("Select an end date")
    }).attr("readonly", ""));
    function Ue(a) {
        var e = a <= 1 ? " disabled" : "";
        return e
    }
    (function() {
        var a = JSON.parse(localStorage.getItem("enquiry")), e = !0, t, i;
        if (T(a) === !1) {
            let D = function(v, u) {
                for (let k in a)
                    if (a[k].id === v) {
                        a[k].qty = u;
                        break
                    }
                localStorage.setItem("enquiry", JSON.stringify(a)),
                V()
            }
              , C = function(v) {
                let u;
                for (let b in a)
                    a[b].id === v && (u = b);
                let k = a.length;
                _e(a, u, k).join(","),
                a.pop(),
                localStorage.setItem("enquiry", JSON.stringify(a)),
                V();
                let w = $("#" + v)
                  , m = w.parent();
                w.removeClass("visible").addClass("removing"),
                setTimeout(function() {
                    w.remove(),
                    m.children().length < 1 && m.closest(".form-section").remove()
                }, 200),
                T(a) ? Z("get-a-quote") : Z("complete-enquiry")
            };
            var y = D
              , c = C
              , r = !1
              , n = !1
              , d = a.length
              , l = 0;
            for (let v = 0; v < a.length; v++) {
                l += 1;
                var o = a[v];
                if (o.billing === "hire") {
                    if (r === !1 && (r = !0),
                    T(o.selectedDates) === !1) {
                        let k = function(b) {
                            var S = "";
                            return $.each(b, function(q, E) {
                                var x = new Date(E);
                                R(x) && (q === 0 ? S += '<span data-date-id="' + o.id + '-0">' + U(x) + "</span> - " : S += '<span data-date-id="' + o.id + '-1">' + U(x) + "</span>",
                                e === !0 && (v > 0 ? (q === 0 && t !== E || q === 1 && i !== E) && (e = !1) : q === 0 ? t = E : i = E))
                            }),
                            S = '<div class="hire-period-details text-black-16"><div>' + S + '</div><a class="change-dates" href="#">Change Dates</a></div>',
                            S
                        }
                          , w = function(b) {
                            var S = "";
                            return $.each(b, function(q, E) {
                                var x = new Date(E);
                                if (R(x)) {
                                    var Y = x.getFullYear()
                                      , P = Q(x.getMonth() + 1)
                                      , J = Q(x.getDate());
                                    S += '<div class="date-picker"><input type="text" class="calendar-field w-input" data-toggle="datepicker" autocomplete="off" maxlength="256" placeholder="Select Date" id="' + o.id + "-" + q + '" data-id="' + o.id + '" data-index="' + q + '" value="' + J + "-" + P + "-" + Y + '" readonly><div class="icon-calendar"></div></div>'
                                }
                            }),
                            S = '<div class="date-picker-wrapper with-confirm">' + S + "</div>",
                            S
                        }
                          , m = function(b, S, q) {
                            $('[data-date-id="' + b + "-" + S + '"]').text(U(q));
                            var E = parseInt(S);
                            for (let Y in a)
                                if (a[Y].id === b) {
                                    var x = q.toISOString();
                                    a[Y].selectedDates[E] = x;
                                    break
                                }
                            localStorage.setItem("enquiry", JSON.stringify(a)),
                            V()
                        };
                        var g = k
                          , p = w
                          , h = m
                          , f = o.variant !== "n/a" ? o.variant + " " + o.name : o.name;
                        $("#hireItemsList").append('<div id="' + o.id + '" class="enquiry-item"><div class="enquiry-item-column details"><div class="enquiry-item-image-wrapper"><div class="enquiry-item-image-inner"><img src="' + o.img + '" loading="lazy" alt="" class="enquiry-item-image"><div class="inner-shadow show-on-mobile-portrait"></div></div></div><div class="enquiry-details"><div class="enquiry-details-inner"><div class="enquiry-item-title">' + f + "</div>" + k(o.selectedDates) + '</div><div class="hire-period-dates with-confirm" style="display:none;">' + w(o.selectedDates) + '<div class="interaction-button-wrapper"><a data-for="enquiry-form" data-id="' + o.id + '" class="save-dates interaction-button w-inline-block"><div class="interaction-button-inner"><img loading="lazy" src="https://assets-global.website-files.com/624d4f43e7b206386b75086e/63230f71299e7f9af52085d7_date-picker-confirm.svg" alt="" class="icon"></div></a></div></div></div></div><div class="enquiry-item-column counter"><label class="enquiry-item-label">Qty:</label><div class="enquiry-counter"><div class="counter-input-wrapper"><div class="interaction-button-wrapper"><a href="#" class="interaction-button decrease w-inline-block"' + Ue(o.qty) + ' data-for="enquiry-form"><div class="interaction-button-inner"><img src="https://assets.website-files.com/624d4f43e7b206386b75086e/626c6c68910685550a1bd19c_icon%20quantity%20less.svg" loading="lazy" alt="" class="icon"></div></a></div><input type="number" class="input counter w-input" maxlength="2" pattern="[0-9]{2}" min="1" max="99" data-id="' + o.id + '" value="' + o.qty + '"><div class="interaction-button-wrapper"><a href="#" class="interaction-button increase w-inline-block" data-for="enquiry-form"><div class="interaction-button-inner"><img src="https://assets.website-files.com/624d4f43e7b206386b75086e/626c6c026ae0603c4b631668_icon%20quantity%20more.svg" loading="lazy" alt="" class="icon"></div></a></div></div></div></div><div class="remove-button-wrapper"><div class="interaction-button-wrapper"><a href="#" class="interaction-button remove-item w-inline-block" data-id="' + o.id + '"><div class="interaction-button-inner remove-item"><div class="icon remove w-embed"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path fill="#a6a6a6" d="M18,1.81l-1.81-1.81-7.19,7.19L1.81,0,0,1.81l7.19,7.19L0,16.19l1.81,1.81,7.19-7.19,7.19,7.19,1.81-1.81-7.19-7.19L18,1.81Z"></path></svg></div></div></a></div></div></div>'),
                        $.each(o.selectedDates, function(b, S) {
                            $("#" + o.id + "-" + b).datepicker({
                                date: new Date(S),
                                template: b === 0 ? H("Select a start date") : H("Select an end date"),
                                pick: function(q) {
                                    if (q.view === "day") {
                                        var E = $(this)
                                          , x = E.attr("data-id")
                                          , Y = E.attr("data-index");
                                        if (Y === "0") {
                                            var P = q.date
                                              , J = q.date.getTime()
                                              , W = new Date(J + 864e5 * 28)
                                              , F = $("#" + x + "-1")
                                              , M = F.datepicker("getDate");
                                            m(x, Y, P),
                                            F.datepicker("setStartDate", W),
                                            R(M) ? P >= new Date(M.getTime() - 864e5 * 28) && (F.datepicker("setDate", W),
                                            F.datepicker("show"),
                                            m(x, "1", W)) : (F.datepicker("setDate", W),
                                            F.datepicker("show"))
                                        } else {
                                            var z = $("#" + x + "-0");
                                            if (z.val() !== "") {
                                                var M = q.date
                                                  , P = z.datepicker("getDate");
                                                if (M < P) {
                                                    q.preventDefault(),
                                                    alert("End date cannot be before the start date");
                                                    return
                                                }
                                                if (M === P) {
                                                    q.preventDefault(),
                                                    alert("Minimum hire period is 1 day");
                                                    return
                                                }
                                            } else
                                                z.datepicker("show");
                                            m(x, Y, M)
                                        }
                                    }
                                }
                            })
                        })
                    }
                } else {
                    n === !1 && (n = !0);
                    var f = o.variant !== "n/a" ? o.variant + " " + o.name : o.name;
                    $("#purchaseItemsList").append('<div id="' + o.id + '" class="enquiry-item"><div class="enquiry-item-column details"><div class="enquiry-item-image-wrapper"><div class="enquiry-item-image-inner"><img src="' + o.img + '" loading="lazy" alt="" class="enquiry-item-image"><div class="inner-shadow show-on-mobile-portrait"></div></div></div><div class="enquiry-details"><div class="enquiry-details-inner"><div class="enquiry-item-title">' + f + '</div></div></div></div><div class="enquiry-item-column counter"><label class="enquiry-item-label">Qty:</label><div class="enquiry-counter"><div class="counter-input-wrapper"><div class="interaction-button-wrapper"><a href="#" class="interaction-button decrease w-inline-block"' + Ue(o.qty) + ' data-for="enquiry-form"><div class="interaction-button-inner"><img src="https://assets.website-files.com/624d4f43e7b206386b75086e/626c6c68910685550a1bd19c_icon%20quantity%20less.svg" loading="lazy" alt="" class="icon"></div></a></div><input type="number" class="input counter w-input" maxlength="2" pattern="[0-9]{2}" min="1" max="99" data-id="' + o.id + '" value="' + o.qty + '"><div class="interaction-button-wrapper"><a href="#" class="interaction-button increase w-inline-block" data-for="enquiry-form"><div class="interaction-button-inner"><img src="https://assets.website-files.com/624d4f43e7b206386b75086e/626c6c026ae0603c4b631668_icon%20quantity%20more.svg" loading="lazy" alt="" class="icon"></div></a></div></div></div></div><div class="remove-button-wrapper"><div class="interaction-button-wrapper"><a href="#" class="interaction-button remove-item w-inline-block" data-id="' + o.id + '"><div class="interaction-button-inner remove-item"><div class="icon remove w-embed"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path fill="#a6a6a6" d="M18,1.81l-1.81-1.81-7.19,7.19L1.81,0,0,1.81l7.19,7.19L0,16.19l1.81,1.81,7.19-7.19,7.19,7.19,1.81-1.81-7.19-7.19L18,1.81Z"></path></svg></div></div></a></div></div></div>')
                }
                l === d && ($(".enquiry-item:not([id])").remove(),
                r === !1 && $("#hireItems").remove(),
                n === !1 && $("#purchaseItems").remove())
            }
            $(".change-dates").on("click", function(v) {
                v.preventDefault();
                var u = $(this);
                u.parent().hide(),
                u.closest(".enquiry-details").find(".hire-period-dates").css({
                    display: "flex"
                })
            }),
            $(".save-dates").on("click", function(v) {
                v.preventDefault();
                var u = $("#" + $(this).attr("data-id"));
                u.find(".hire-period-dates").hide(),
                u.find(".hire-period-details").show()
            }),
            $('.increase[data-for="enquiry-form"]').on("click", function(v) {
                v.preventDefault();
                var u = $(this)
                  , k = u.parent()
                  , w = k.siblings(".counter")
                  , m = w.attr("data-id")
                  , b = w.val();
                if (b >= 1 && k.siblings(".interaction-button-wrapper").find(".decrease").prop("disabled", !1).removeAttr("disabled"),
                b < 99) {
                    var S = +b + 1;
                    w.val(S),
                    D(m, S),
                    Z("complete-enquiry")
                }
            }),
            $('.decrease[data-for="enquiry-form"]').on("click", function(v) {
                v.preventDefault();
                var u = $(this)
                  , k = u.parent()
                  , w = k.siblings(".counter")
                  , m = w.attr("data-id")
                  , b = w.val();
                if (b > 1) {
                    b === 2 && u.prop("disabled", !0).attr("disabled", "");
                    var S = +b - 1;
                    w.val(S),
                    D(m, S),
                    Z("complete-enquiry")
                }
            }),
            $(".counter").on("change", function(v) {
                v.preventDefault();
                var u = $(this)
                  , k = u.attr("data-id")
                  , w = u.val();
                w >= 1 && w < 100 ? (D(k, w),
                Z("complete-enquiry")) : u.val(1)
            }),
            $(".interaction-button.remove-item").on("click", function(v) {
                if (v.preventDefault(),
                confirm("Confirm, OK to remove this item?")) {
                    var u = $(this).attr("data-id");
                    C(u)
                }
            }),
            e === !0 && ($(".hire-period-details").hide(),
            $("#same_hire_period").attr("checked", "checked"),
            $("#same_hire_period").prop("checked", !0),
            $("#hire-start").datepicker({
                date: new Date(t),
                template: H("Select a start date")
            }).val(U(t)).attr("readonly", ""),
            $("#hire-end").datepicker({
                date: new Date(i),
                template: H("Select an end date")
            }).val(U(i)).attr("readonly", ""),
            $("#same-hire-period-dates").css({
                display: "flex"
            })),
            $("#enquiry-form-wrapper,#hireItemsList,#purchaseItemsList").removeClass("loading")
        } else
            $("#hireItems,#purchaseItems,#tab-items-show-hide").remove(),
            $("#enquiry-form-wrapper").removeClass("loading")
    }
    )();
    $("#same_hire_period").on("change", function(a) {
        re($(this)) === !0 ? ($(".hire-period-details").hide(),
        $("#same-hire-period-dates").css({
            display: "flex"
        }),
        V(!0)) : ($("#same-hire-period-dates").hide(),
        $(".hire-period-details").show(),
        V())
    });
    $('input[name="is_a_company"]').on("change", function() {
        $('[name="placed_order"],[name="know_account_num"],[name="vat_registered"]').removeAttr("checked"),
        $('[name="placed_order"],[name="know_account_num"],[name="vat_registered"]').prop("checked", !1),
        $("#account_num,#vat_num").val(""),
        $(this).val() === "YES" ? ($("#company_name").attr("required", !0),
        $("#know-account-num-show-hide,#vat-registered-show-hide").addClass("hidden"),
        $("#company-details-show-hide,#company-name-delivery-show-hide").removeClass("hidden"),
        L("#company-details-show-hide")) : ($("#company_name").removeAttr("required").val(""),
        $("#company-details-show-hide").addClass("hidden"),
        $("#company_name_delivery").val() !== "" && $("#company-name-delivery-show-hide").addClass("hidden"))
    });
    $('input[name="placed_order"]').on("change", function() {
        $('[name="know_account_num"],[name="vat_registered"]').removeAttr("checked"),
        $('[name="know_account_num"],[name="vat_registered"]').prop("checked", !1),
        $("#account_num,#vat_num").val(""),
        $(this).val() === "YES" ? ($("#account-num-show-hide,#vat-registered-show-hide, #vat-num-show-hide").addClass("hidden"),
        $("#know-account-num-show-hide").removeClass("hidden"),
        L("#know-account-num-show-hide")) : ($("#account-num-show-hide,#know-account-num-show-hide, #vat-num-show-hide").addClass("hidden"),
        $("#vat-registered-show-hide").removeClass("hidden"),
        L("#vat-registered-show-hide"))
    });
    $('input[name="know_account_num"]').on("change", function() {
        $('[name="vat_registered"]').removeAttr("checked"),
        $('[name="vat_registered"]').prop("checked", !1),
        $("#account_num,#vat_num").val(""),
        $(this).val() === "YES" ? ($("#account-num-show-hide").removeClass("hidden"),
        $("#vat-registered-show-hide, #know-vat-num-show-hide, #vat-num-show-hide").addClass("hidden")) : ($("#account-num-show-hide").addClass("hidden"),
        $("#vat-registered-show-hide").removeClass("hidden"),
        L("#vat-registered-show-hide"))
    });
    $('input[name="vat_registered"]').on("change", function() {
        $(this).val() === "YES" ? $("#vat-num-show-hide").removeClass("hidden") : ($("#vat-num-show-hide").addClass("hidden"),
        $("#reason_for_enquiry").val() === "New Hire/Sales Quote" ? L("#address") : L("#notes-show-hide"))
    });
    $(".tab-group-tab").on("click", function(a) {
        $(this).hasClass("active") || ($(this).parent().siblings().find(".active").removeClass("active"),
        $(this).addClass("active"))
    });
    (function() {
        let a = 0
          , e = 0;
        var t = !1
          , i = !1;
        window.addEventListener("scroll", n => {
            e = window.pageYOffset,
            a < e ? (t = !1,
            i = !0) : a > e && (t = !0,
            i = !1),
            a = e
        }
        );
        var s = $("#navigation").css("position") === "static" ? ($(".tab-group").eq(0).outerHeight(!1) + 30 - 59) * -1 : ($("#navigation").outerHeight(!1) + $(".tab-group").eq(0).outerHeight(!1) + 30 - 59) * -1
          , r = new IntersectionObserver(function(n) {
            n.forEach(function(d) {
                if (d.isIntersecting) {
                    if (t) {
                        var l = d.target.id
                          , o = $(".tab-group-tab")
                          , f = $('.tab-group-tab[href="#' + l + '"]')
                          , y = $('.tab-group-tab[href="#' + l + '"]').parent().next().find(".tab-group-tab");
                        y.hasClass("active") && (o.removeClass("active"),
                        f.addClass("active"))
                    }
                } else if (i) {
                    var l = d.target.id
                      , o = $(".tab-group-tab")
                      , f = $('.tab-group-tab[href="#' + l + '"]');
                    f.hasClass("active") && f.parent().index() !== o.length - 1 && (o.removeClass("active"),
                    f.parent().next().find(".tab-group-tab").addClass("active"))
                }
            })
        }
        ,{
            root: null,
            rootMargin: s + "px 0px 0px 0px",
            threshold: .25
        });
        document.querySelectorAll(".tab-section").forEach(function(n) {
            r.observe(n)
        })
    }
    )();
    $("#submit-enquiry").on("click", function(a) {
        var e = !0
          , t = $("#reason_for_enquiry").val();
        if (t === "Container Conversions" || t === "Self Storage" || t === "General Enquiry") {
            var i = [{
                id: "email_address",
                message: "Please enter an email address"
            }, {
                id: "phone_number",
                message: "Please enter a phone number"
            }, {
                id: "last_name",
                message: "Please enter a last name"
            }, {
                id: "first_name",
                message: "Please enter a first name"
            }];
            $.each(i, function(g, p) {
                $("#" + p.id).val() ? $("#" + p.id).siblings(".form-error").remove() : (e = !1,
                $("#" + p.id).siblings(".form-error").length || $('<div class="form-error">' + p.message + "</div>").insertAfter("#" + p.id),
                $("#" + p.id).trigger("focus"))
            })
        } else {
            var i = [{
                id: "postcode_delivery",
                message: "Please enter a delivery postcode"
            }, {
                id: "addressline1_delivery",
                message: "Please enter a delivery address"
            }, {
                id: "email_address",
                message: "Please enter an email address"
            }, {
                id: "phone_number",
                message: "Please enter a phone number"
            }, {
                id: "last_name",
                message: "Please enter a last name"
            }, {
                id: "first_name",
                message: "Please enter a first name"
            }];
            $.each(i, function(p, h) {
                $("#" + h.id).val() ? $("#" + h.id).siblings(".form-error").remove() : (e = !1,
                $("#search_address_delivery").hide(),
                $("#delivery-address").css({
                    display: "flex",
                    "margin-top": "0px"
                }),
                $("#" + h.id).siblings(".form-error").length || $('<div class="form-error">' + h.message + "</div>").insertAfter("#" + h.id),
                $("#" + h.id).trigger("focus"),
                L("#" + h.id))
            }),
            re($("#is_a_company-YES")) === !1 && re($("#is_a_company-NO")) === !1 ? (e = !1,
            $("#is_a_company-YES").closest(".button-row").siblings(".form-error").length || $('<div class="form-error">Please select one of these options</div>').insertAfter($("#is_a_company-YES").closest(".button-row")),
            L("#is_a_company_section")) : $("#is_a_company-YES").closest(".button-row").siblings(".form-error").remove()
        }
        if (e) {
            if ($('input[name="placed_order"],input[name="know_account_num"],input[name="vat_registered"],#postcoder_search_delivery,.calendar-field,.input.counter').remove(),
            !$("#company_name").val()) {
                var s = $("#first_name").val() + " " + $("#last_name").val();
                $("#company_name").val(s)
            }
            if (document.getElementById("enquiry_data").value !== "") {
                for (var r = JSON.parse(document.getElementById("enquiry_data").value), n = {
                    hire: [],
                    purchase: []
                }, d = 0; d < r.length; d++) {
                    var l = r[d]
                      , o = r[d].billing
                      , f = "";
                    let h = xe(l);
                    var y = 0;
                    for (var c in l)
                        l.hasOwnProperty(c) && (c !== "billing" && (f += `${c}: ${l[c]}`),
                        y > 0 && y !== h - 1 && (f += `,
`),
                        y += 1);
                    n[o].push(f)
                }
                if (T(n.hire) === !1) {
                    let h = document.createElement("textarea");
                    h.name = "Hire items",
                    h.hidden = !0;
                    for (var c in n)
                        if (c === "hire" && T(n[c]) === !1) {
                            h.value += `Hire items:

`;
                            for (var d = 0; d < n[c].length; d++)
                                h.value += n[c][d],
                                d < n[c].length - 1 && (h.value += `

`)
                        }
                    document.getElementById("wf-form-enquiry").append(h)
                }
                if (T(n.purchase) === !1) {
                    let h = document.createElement("textarea");
                    h.name = "Purchase items",
                    h.hidden = !0;
                    for (var c in n)
                        if (c === "purchase" && T(n[c]) === !1) {
                            h.value += `Purchase items:

`;
                            for (var d = 0; d < n[c].length; d++)
                                h.value += n[c][d],
                                d < n[c].length - 1 && (h.value += `

`)
                        }
                    document.getElementById("wf-form-enquiry").append(h)
                }
            } else
                document.getElementById("enquiry_data").remove(),
                console.log("Removed enquiry input");
            let g = [];
            localStorage.setItem("enquiry", JSON.stringify(g));
            let p = [];
            localStorage.setItem("selectedDates", JSON.stringify(p)),
            Z("get-a-quote"),
            t = t.replace("/", " or "),
            console.log("selectedReason", t),
            $("#wf-form-enquiry").attr("data-name", t).attr("aria-label", t),
            $("#wf-form-enquiry").trigger("submit")
        }
        return !1
    });
    $("#manual-address-delivery").on("click", function(a) {
        a.preventDefault(),
        $("#search_address_delivery").hide(),
        $("#delivery-address").css({
            display: "flex",
            "margin-top": "0px"
        })
    });
    $("#how_hear_about").on("change", function() {
        $(this).val() === "Other; " ? ($("#how-hear-about-other-show-hide").removeClass("hidden"),
        $("#how_hear_about_other").prop("required", !0).attr("required"),
        L("#how-hear-about-other-show-hide")) : ($("#how_hear_about_other").val("").prop("required", !1).removeAttr("required"),
        $("#how-hear-about-other-show-hide").addClass("hidden"))
    });
    function Se(a) {
        $("#wf-form-enquiry").attr("data-redirect", a).attr("redirect", a),
        $("#wf-form-enquiry").data(".wForm").redirect = a
    }
    function be(a, e) {
        Se("/complete-your-enquiry/thank-you"),
        $("#addressline1_delivery,#postcode_delivery").prop("required", !1).removeAttr("required"),
        $("#tab-group,#address,#items-show-hide").addClass("hidden"),
        $("#reason-for-enquiry-show-hide,#upload-file-show-hide").removeClass("hidden"),
        $("#label-is-a-company").html("Are you enquiring on behalf of a company?*"),
        $("#label-notes").html("Your project requirements"),
        $("#notes").attr("placeholder", "Please provide a brief summary of your project to discuss."),
        a === !0 && (e === "ContainerConversions" ? $("#reason_for_enquiry").val("Container Conversions") : $("#reason_for_enquiry").val("Self Storage"))
    }
    function Je(a) {
        Se("/complete-your-enquiry/thank-you"),
        $("#enquiry-title").html("Get in touch"),
        $("#addressline1_delivery,#postcode_delivery").prop("required", !1).removeAttr("required"),
        $("#tab-group,#address,#upload-file-show-hide,#items-show-hide").addClass("hidden"),
        $("#reason-for-enquiry-show-hide").removeClass("hidden"),
        $("#label-is-a-company").html("Are you enquiring on behalf of a company?*"),
        $("#label-notes").html("Your message"),
        $("#notes").attr("placeholder", "Please provide a brief summary of your project to discuss."),
        a === !0 && $("#reason_for_enquiry").val("General Enquiry")
    }
    function ke(a) {
        Se("/complete-your-enquiry/hire-sales-thank-you"),
        $("#upload-file-show-hide").addClass("hidden"),
        $("#tab-group,#placed-order-show-hide,#know-account-num-show-hide,#vat-registered-show-hide,#address,#items-show-hide").removeClass("hidden"),
        $("#addressline1_delivery,#postcode_delivery").prop("required", !0).attr("required"),
        $("#label-is-a-company").html("Are you hiring or purchasing for a company?*"),
        $("#label-notes").html("Your message"),
        $("#notes").attr("placeholder", "Enter any additional information relevant to your enquiry or questions you may have about hiring/purchasing with us."),
        a === !0 && $("#reason_for_enquiry").val("New Hire/Sales Quote")
    }
    $("#reason_for_enquiry").on("change", function() {
        $(this).val() === "Container Conversions" || $(this).val() === "Self Storage" ? (be(),
        $(this).val() === "Container Conversions" ? he("reason", "ContainerConversions") : he("reason", "SelfStorage")) : $(this).val() === "General Enquiry" ? (Je(),
        he("reason", "GeneralEnquiry")) : (ke(),
        he("reason", "NewHireSalesQuote"))
    });
    (function() {
        var a = window.location.href
          , e = a.split("?");
        if (e.length > 1 && e[1] !== "") {
            let s = new Map(location.search.slice(1).split("&").map(r => r.split("=")));
            if (s.has("reason") === !0) {
                var t = s.get("reason");
                if (t === "ContainerConversions" || t === "SelfStorage")
                    t === "ContainerConversions" ? be(!0, "ContainerConversions") : be(!0, "SelfStorage");
                else if (t === "GeneralEnquiry")
                    Je(!0);
                else if (ke(!0),
                $("#reason-for-enquiry-show-hide").hide(),
                localStorage.getItem("enquiry")) {
                    var i = JSON.parse(localStorage.getItem("enquiry"));
                    T(i) === !1 && ($("#enquiry-title").html("Complete your Enquiry"),
                    V())
                }
            }
        } else if (ke(!0),
        localStorage.getItem("enquiry")) {
            var i = JSON.parse(localStorage.getItem("enquiry"));
            T(i) === !1 && ($("#enquiry-title").html("Complete your Enquiry"),
            V())
        }
    }
    )();
    function he(a, e) {
        a = encodeURI(a),
        e = encodeURI(e);
        for (var t = document.location.search.substr(1).split("&"), i = t.length, s, r = !1; i -= 1; )
            if (s = t[i].split("="),
            s[0] === a) {
                s[1] = e,
                t[i] = s.join("="),
                r = !0;
                break
            }
        r === !1 && (t[0] = a + "=" + e);
        var n = t.join("&");
        history.replaceState && window.history.replaceState(null, null, window.location.pathname + "?" + n)
    }
    function L(a) {
        var e = 700
          , t = location.hash ? r(location.href) : location.href;
        i();
        function i() {
            document.body.addEventListener("click", l, !1);
            function l(o) {
                !s(o.target) || (o.stopPropagation(),
                o.preventDefault(),
                d(o.target.hash, {
                    duration: e,
                    offset: $("#navigation").css("position") === "static" ? ($(".tab-group").eq(0).outerHeight(!1) + 30) * -1 : ($("#navigation").outerHeight(!1) + $(".tab-group").eq(0).outerHeight(!1) + 30) * -1,
                    callback: function() {
                        n(o.target.hash)
                    }
                }))
            }
        }
        function s(l) {
            return l.tagName.toLowerCase() === "a" && l.hash.length > 0 && r(l.href) === t
        }
        function r(l) {
            return l.slice(0, l.lastIndexOf("#"))
        }
        function n(l) {
            var o = document.getElementById(l.substring(1));
            o && (/^(?:a|select|input|button|textarea)$/i.test(o.tagName) || (o.tabIndex = -1))
        }
        function d(l, o) {
            var f = window.pageYOffset, y = {
                duration: o.duration,
                offset: o.offset || 0,
                callback: o.callback,
                easing: o.easing || v
            }, c = typeof l == "string" ? y.offset + document.querySelector(l).getBoundingClientRect().top : l, g = typeof y.duration == "function" ? y.duration(c) : y.duration, p, h;
            requestAnimationFrame(function(u) {
                p = u,
                D(u)
            });
            function D(u) {
                h = u - p,
                window.scrollTo(0, y.easing(h, f, c, g)),
                h < g ? requestAnimationFrame(D) : C()
            }
            function C() {
                window.scrollTo(0, f + c),
                typeof y.callback == "function" && y.callback()
            }
            function v(u, k, w, m) {
                return u /= m / 2,
                u < 1 ? w / 2 * u * u + k : (u -= 1,
                -w / 2 * (u * (u - 2) - 1) + k)
            }
        }
        a && d(a, {
            duration: e,
            offset: $("#navigation").css("position") === "static" ? ($(".tab-group").eq(0).outerHeight(!1) + 30) * -1 : ($("#navigation").outerHeight(!1) + $(".tab-group").eq(0).outerHeight(!1) + 30) * -1,
            callback: function() {
                n(a)
            }
        })
    }
    L();
    var De = class {
        constructor(e) {
            _(this, "init", () => {
                this.suggestionendpoint = "https://ws.postcoder.com/pcw/autocomplete/find?apikey=" + this.config.apikey,
                this.retrieveendpoint = "https://ws.postcoder.com/pcw/autocomplete/retrieve?apikey=" + this.config.apikey,
                this.cache = [],
                this.suggestionhierarchy = [],
                this.suggestions = [],
                this.searchterm = "",
                this.selectedoptiontext = "",
                this.pathfilter = "",
                this.selectedIndex = -1,
                this.no_results_message = "No addresses found",
                this.inputdelay = 300,
                this.suggestionlist = document.querySelector(this.config.suggestions),
                this.input = document.querySelector(this.config.searchterm),
                this.searchwrap = document.querySelector(this.config.searchwrap),
                this.input.setAttribute("type", "search"),
                this.input.setAttribute("autocomplete", "off"),
                this.input.setAttribute("autocapitalize", "off"),
                this.input.setAttribute("autocorrect", "off"),
                this.input.setAttribute("spellcheck", "false"),
                this.input.addEventListener("input", this.handleInput),
                this.input.addEventListener("focus", this.handleFocus),
                this.input.addEventListener("keydown", this.handleKeyDown),
                this.suggestionlist.addEventListener("click", this.handleSuggestionClick),
                document.body.addEventListener("click", this.handleDocumentClick),
                this.addresslines = 0;
                for (let e = 1; e <= 4; e++)
                    this.config["addressline" + e] !== "" && this.addresslines++
            }
            );
            _(this, "getSuggestions", e => {
                if (this.searchterm = encodeURIComponent(this.input.value.trim()),
                this.searchterm.length < 3)
                    return void this.hideSuggestions();
                let t = this.suggestionendpoint + "&country=" + this.getCountry() + "&query=" + this.searchterm + "&identifier=" + this.config.identifier;
                this.pathfilter ? t += "&pathfilter=" + this.pathfilter : this.selectedoptiontext = this.searchterm;
                let i = this.cache.findIndex(s => s.url === t);
                i >= 0 ? (this.suggestions = this.cache[i].suggestions,
                this.addSuggestionHierarchy(i),
                this.showSuggestions()) : fetch(t).then(s => {
                    if (!s.ok)
                        throw s;
                    return s.json()
                }
                ).then(s => {
                    this.suggestions = s,
                    this.addCache(t),
                    this.addSuggestionHierarchy(this.cache.length - 1),
                    this.showSuggestions()
                }
                ).catch(s => {
                    typeof s.text == "function" ? s.text().then(r => {
                        console.log("Postcoder request error " + s.status + " : " + r)
                    }
                    ) : console.log(s)
                }
                )
            }
            );
            _(this, "addCache", e => {
                let t = {};
                t.url = e,
                t.suggestions = this.suggestions,
                t.label = this.selectedoptiontext,
                this.cache.push(t)
            }
            );
            _(this, "newSuggestionsReset", () => {
                this.hideSuggestions(),
                this.pathfilter = "",
                this.suggestionlist.scrollTop = 0,
                this.selectedIndex = -1
            }
            );
            _(this, "suggestionsHierarchyReset", () => {
                this.suggestionhierarchy = []
            }
            );
            _(this, "addSuggestionHierarchy", e => {
                this.suggestionhierarchy.push(e)
            }
            );
            _(this, "handleSuggestionClick", e => {
                e.stopPropagation();
                let t = e.target;
                for (; t.tagName.toLowerCase() !== "li"; )
                    t = t.parentNode;
                this.selectSuggestion(t)
            }
            );
            _(this, "selectSuggestion", e => {
                this.selectedoptiontext = e.innerHTML,
                e.getAttribute("data-type") == "CACHE" ? (this.suggestions = this.cache[e.getAttribute("data-id")].suggestions,
                this.suggestionhierarchy.pop(),
                this.showSuggestions()) : e.getAttribute("data-type") == "ADD" ? this.retrieve(e.getAttribute("data-id")) : (this.pathfilter = e.getAttribute("data-id"),
                this.getSuggestions())
            }
            );
            _(this, "retrieve", e => {
                var t = this.retrieveendpoint + "&country=" + this.getCountry() + "&query=" + this.searchterm + "&id=" + e + "&lines=" + this.addresslines + "&exclude=organisation,country&identifier=" + this.config.identifier;
                fetch(t).then(i => {
                    if (!i.ok)
                        throw i;
                    return i.json()
                }
                ).then(i => {
                    this.cache[t] = i[0],
                    this.processResult(i[0])
                }
                ).catch(i => {
                    typeof i.text == "function" ? i.text().then(s => {
                        console.log("Postcoder request error " + i.status + " : " + s)
                    }
                    ) : console.log(i)
                }
                )
            }
            );
            _(this, "showSuggestions", () => {
                if (this.newSuggestionsReset(),
                this.suggestions.length === 0) {
                    let e = document.createElement("li");
                    e.innerHTML = this.no_results_message,
                    this.suggestionlist.appendChild(e)
                } else {
                    if (this.suggestionhierarchy.length > 1) {
                        let e = this.suggestionhierarchy[this.suggestionhierarchy.length - 2]
                          , t = document.createElement("li");
                        t.classList.add("header"),
                        t.innerHTML = '<i class="arrow left"></i> ' + unescape(this.cache[e].label),
                        t.setAttribute("data-id", e),
                        t.setAttribute("data-type", "CACHE"),
                        this.suggestionlist.appendChild(t)
                    }
                    for (let e = 0; e < this.suggestions.length; e++) {
                        let t = document.createElement("li")
                          , i = this.suggestions[e].summaryline + ' <span class="location">' + this.suggestions[e].locationsummary + "</span>";
                        this.suggestions[e].count > 1 && (i += ' <span class="count">(' + (this.suggestions[e].count > 100 ? "100+" : this.suggestions[e].count) + " addresses)</span>"),
                        t.innerHTML = i,
                        t.setAttribute("data-id", this.suggestions[e].id),
                        t.setAttribute("data-type", this.suggestions[e].type),
                        this.suggestionlist.appendChild(t)
                    }
                }
            }
            );
            _(this, "getCountry", () => this.config.countrycode !== void 0 && this.config.countrycode !== "" ? this.config.countrycode : document.querySelector(this.config.country).value);
            _(this, "processResult", e => {
                this.hideSuggestions(),
                this.searchwrap.style.display = "none";
                var t = document.getElementById("delivery-address");
                t.style.display = "flex",
                t.style.marginTop = 0;
                let i = ["organisation", "addressline1", "addressline2", "addressline3", "addressline4", "posttown", "county", "postcode"];
                for (let s = 0; s < i.length; s++) {
                    let r = this.config[i[s]];
                    r !== void 0 && r !== "" && (document.querySelector(r).value = e[i[s]] !== void 0 ? e[i[s]] : ""),
                    console.log("i", r),
                    console.log("t[s[e]]", e[i[s]]),
                    $('input[name="is_a_company"]').val() === "YES" && r === "#company_name_delivery" && $("#company-name-delivery-show-hide").removeClass("hidden")
                }
            }
            );
            _(this, "handleDocumentClick", e => {
                this.suggestionlist.contains(e.target) || this.input.contains(e.target) || this.hideSuggestions()
            }
            );
            _(this, "hideSuggestions", () => {
                this.suggestionlist.innerHTML = ""
            }
            );
            _(this, "handleKeyDown", e => {
                let {key: t} = e;
                switch (t) {
                case "Up":
                case "Down":
                case "ArrowUp":
                case "ArrowDown":
                    {
                        let i = t === "ArrowUp" || t === "Up" ? this.selectedIndex - 1 : this.selectedIndex + 1;
                        e.preventDefault(),
                        this.handleArrows(i);
                        break
                    }
                case "Tab":
                    this.handleTab(e);
                    break;
                case "Enter":
                    this.selectSuggestion(this.suggestionlist.querySelectorAll("li")[this.selectedIndex]);
                    break;
                case "Esc":
                case "Escape":
                    this.hideSuggestions(),
                    this.setValue();
                    break;
                default:
                    return
                }
            }
            );
            _(this, "handleArrows", e => {
                let t = this.suggestions.length;
                this.suggestionhierarchy.length > 1 && t++,
                this.suggestionlist.querySelectorAll("li").length > 0 && (this.selectedIndex >= 0 && this.suggestionlist.querySelectorAll("li")[this.selectedIndex].classList.remove("selected"),
                this.selectedIndex = (e % t + t) % t,
                this.suggestionlist.querySelectorAll("li")[this.selectedIndex].classList.add("selected"),
                this.suggestionlist.querySelectorAll("li")[this.selectedIndex].scrollIntoView(!1))
            }
            );
            _(this, "handleTab", e => {
                this.selectedIndex >= 0 ? (e.preventDefault(),
                this.selectSuggestion(this.suggestionlist.querySelectorAll("li")[this.selectedIndex])) : this.hideSuggestions()
            }
            );
            _(this, "handleInput", () => {
                this.suggestionsHierarchyReset(),
                clearTimeout(this.debounce),
                this.debounce = setTimeout( () => this.getSuggestions(), this.inputdelay)
            }
            );
            _(this, "handleFocus", () => {
                this.suggestions.length > 0 ? this.showSuggestions() : this.getSuggestions()
            }
            );
            this.config = e,
            this.init()
        }
    }
    ;
    new De({
        apikey: "PCWEU-XDJ5U-HQZHX-92AZF",
        identifier: "willbox_enquiry_delivery_address",
        searchterm: "#postcoder_search_delivery",
        suggestions: "#suggestion_list_delivery",
        searchwrap: "#search_address_delivery",
        country: "",
        countrycode: "uk",
        organisation: "#company_name_delivery",
        addressline1: "#addressline1_delivery",
        addressline2: "#addressline2_delivery",
        addressline3: "#addressline3_delivery",
        county: "#county_delivery",
        posttown: "#posttown_delivery",
        postcode: "#postcode_delivery"
    });
}
)();
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
