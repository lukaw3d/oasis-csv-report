var $3e8cab1de800fbb2$exports = {};
/* @license
Papa Parse
v5.3.2
https://github.com/mholt/PapaParse
License: MIT
*/ !function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : $3e8cab1de800fbb2$exports = t();
}($3e8cab1de800fbb2$exports, function s() {
    "use strict";
    var f = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== f ? f : {};
    var n = !f.document && !!f.postMessage, o = n && /blob:/i.test((f.location || {}).protocol), a = {}, h = 0, b = {
        parse: function(e, t) {
            var i = (t = t || {}).dynamicTyping || !1;
            M(i) && (t.dynamicTypingFunction = i, i = {});
            if (t.dynamicTyping = i, t.transform = !!M(t.transform) && t.transform, t.worker && b.WORKERS_SUPPORTED) {
                var r = function() {
                    if (!b.WORKERS_SUPPORTED) return !1;
                    var e = (i = f.URL || f.webkitURL || null, r = s.toString(), b.BLOB_URL || (b.BLOB_URL = i.createObjectURL(new Blob([
                        "(",
                        r,
                        ")();"
                    ], {
                        type: "text/javascript"
                    })))), t = new f.Worker(e);
                    var i, r;
                    return t.onmessage = _, t.id = h++, a[t.id] = t;
                }();
                return r.userStep = t.step, r.userChunk = t.chunk, r.userComplete = t.complete, r.userError = t.error, t.step = M(t.step), t.chunk = M(t.chunk), t.complete = M(t.complete), t.error = M(t.error), delete t.worker, void r.postMessage({
                    input: e,
                    config: t,
                    workerId: r.id
                });
            }
            var n = null;
            b.NODE_STREAM_INPUT, "string" == typeof e ? n = t.download ? new l(t) : new p(t) : !0 === e.readable && M(e.read) && M(e.on) ? n = new g(t) : (f.File && e instanceof File || e instanceof Object) && (n = new c(t));
            return n.stream(e);
        },
        unparse: function(e, t) {
            var n = !1, _ = !0, m = ",", y = "\r\n", s = '"', a = s + s, i = !1, r = null, o = !1;
            !function() {
                if ("object" != typeof t) return;
                "string" != typeof t.delimiter || b.BAD_DELIMITERS.filter(function(e) {
                    return -1 !== t.delimiter.indexOf(e);
                }).length || (m = t.delimiter);
                ("boolean" == typeof t.quotes || "function" == typeof t.quotes || Array.isArray(t.quotes)) && (n = t.quotes);
                "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (i = t.skipEmptyLines);
                "string" == typeof t.newline && (y = t.newline);
                "string" == typeof t.quoteChar && (s = t.quoteChar);
                "boolean" == typeof t.header && (_ = t.header);
                if (Array.isArray(t.columns)) {
                    if (0 === t.columns.length) throw new Error("Option columns is empty");
                    r = t.columns;
                }
                void 0 !== t.escapeChar && (a = t.escapeChar + s);
                ("boolean" == typeof t.escapeFormulae || t.escapeFormulae instanceof RegExp) && (o = t.escapeFormulae instanceof RegExp ? t.escapeFormulae : /^[=+\-@\t\r].*$/);
            }();
            var h = new RegExp(j(s), "g");
            "string" == typeof e && (e = JSON.parse(e));
            if (Array.isArray(e)) {
                if (!e.length || Array.isArray(e[0])) return u(null, e, i);
                if ("object" == typeof e[0]) return u(r || Object.keys(e[0]), e, i);
            } else if ("object" == typeof e) return "string" == typeof e.data && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields || r), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : "object" == typeof e.data[0] ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || "object" == typeof e.data[0] || (e.data = [
                e.data
            ])), u(e.fields || [], e.data || [], i);
            throw new Error("Unable to serialize unrecognized input");
            function u(e, t, i) {
                var r = "";
                "string" == typeof e && (e = JSON.parse(e)), "string" == typeof t && (t = JSON.parse(t));
                var n = Array.isArray(e) && 0 < e.length, s = !Array.isArray(t[0]);
                if (n && _) {
                    for(var a = 0; a < e.length; a++)0 < a && (r += m), r += v(e[a], a);
                    0 < t.length && (r += y);
                }
                for(var o = 0; o < t.length; o++){
                    var h = n ? e.length : t[o].length, u = !1, f = n ? 0 === Object.keys(t[o]).length : 0 === t[o].length;
                    if (i && !n && (u = "greedy" === i ? "" === t[o].join("").trim() : 1 === t[o].length && 0 === t[o][0].length), "greedy" === i && n) {
                        for(var d = [], l = 0; l < h; l++){
                            var c = s ? e[l] : l;
                            d.push(t[o][c]);
                        }
                        u = "" === d.join("").trim();
                    }
                    if (!u) {
                        for(var p = 0; p < h; p++){
                            0 < p && !f && (r += m);
                            var g = n && s ? e[p] : p;
                            r += v(t[o][g], p);
                        }
                        o < t.length - 1 && (!i || 0 < h && !f) && (r += y);
                    }
                }
                return r;
            }
            function v(e, t) {
                if (null == e) return "";
                if (e.constructor === Date) return JSON.stringify(e).slice(1, 25);
                var i = !1;
                o && "string" == typeof e && o.test(e) && (e = "'" + e, i = !0);
                var r = e.toString().replace(h, a);
                return (i = i || !0 === n || "function" == typeof n && n(e, t) || Array.isArray(n) && n[t] || function(e, t) {
                    for(var i = 0; i < t.length; i++)if (-1 < e.indexOf(t[i])) return !0;
                    return !1;
                }(r, b.BAD_DELIMITERS) || -1 < r.indexOf(m) || " " === r.charAt(0) || " " === r.charAt(r.length - 1)) ? s + r + s : r;
            }
        }
    };
    if (b.RECORD_SEP = String.fromCharCode(30), b.UNIT_SEP = String.fromCharCode(31), b.BYTE_ORDER_MARK = "\uFEFF", b.BAD_DELIMITERS = [
        "\r",
        "\n",
        '"',
        b.BYTE_ORDER_MARK
    ], b.WORKERS_SUPPORTED = !n && !!f.Worker, b.NODE_STREAM_INPUT = 1, b.LocalChunkSize = 10485760, b.RemoteChunkSize = 5242880, b.DefaultDelimiter = ",", b.Parser = E, b.ParserHandle = i, b.NetworkStreamer = l, b.FileStreamer = c, b.StringStreamer = p, b.ReadableStreamStreamer = g, f.jQuery) {
        var d = f.jQuery;
        d.fn.parse = function(o) {
            var i = o.config || {}, h = [];
            return this.each(function(e) {
                if (!("INPUT" === d(this).prop("tagName").toUpperCase() && "file" === d(this).attr("type").toLowerCase() && f.FileReader) || !this.files || 0 === this.files.length) return !0;
                for(var t = 0; t < this.files.length; t++)h.push({
                    file: this.files[t],
                    inputElem: this,
                    instanceConfig: d.extend({}, i)
                });
            }), e(), this;
            function e() {
                if (0 !== h.length) {
                    var e, t, i, r, n = h[0];
                    if (M(o.before)) {
                        var s = o.before(n.file, n.inputElem);
                        if ("object" == typeof s) {
                            if ("abort" === s.action) return e = "AbortError", t = n.file, i = n.inputElem, r = s.reason, void (M(o.error) && o.error({
                                name: e
                            }, t, i, r));
                            if ("skip" === s.action) return void u();
                            "object" == typeof s.config && (n.instanceConfig = d.extend(n.instanceConfig, s.config));
                        } else if ("skip" === s) return void u();
                    }
                    var a = n.instanceConfig.complete;
                    n.instanceConfig.complete = function(e) {
                        M(a) && a(e, n.file, n.inputElem), u();
                    }, b.parse(n.file, n.instanceConfig);
                } else M(o.complete) && o.complete();
            }
            function u() {
                h.splice(0, 1), e();
            }
        };
    }
    function u(e) {
        this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = {
            data: [],
            errors: [],
            meta: {}
        }, (function(e) {
            var t = w(e);
            t.chunkSize = parseInt(t.chunkSize), e.step || e.chunk || (t.chunkSize = null);
            this._handle = new i(t), (this._handle.streamer = this)._config = t;
        }).call(this, e), this.parseChunk = function(e, t) {
            if (this.isFirstChunk && M(this._config.beforeFirstChunk)) {
                var i = this._config.beforeFirstChunk(e);
                void 0 !== i && (e = i);
            }
            this.isFirstChunk = !1, this._halted = !1;
            var r = this._partialLine + e;
            this._partialLine = "";
            var n = this._handle.parse(r, this._baseIndex, !this._finished);
            if (!this._handle.paused() && !this._handle.aborted()) {
                var s = n.meta.cursor;
                this._finished || (this._partialLine = r.substring(s - this._baseIndex), this._baseIndex = s), n && n.data && (this._rowCount += n.data.length);
                var a = this._finished || this._config.preview && this._rowCount >= this._config.preview;
                if (o) f.postMessage({
                    results: n,
                    workerId: b.WORKER_ID,
                    finished: a
                });
                else if (M(this._config.chunk) && !t) {
                    if (this._config.chunk(n, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
                    n = void 0, this._completeResults = void 0;
                }
                return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(n.data), this._completeResults.errors = this._completeResults.errors.concat(n.errors), this._completeResults.meta = n.meta), this._completed || !a || !M(this._config.complete) || n && n.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), a || n && n.meta.paused || this._nextChunk(), n;
            }
            this._halted = !0;
        }, this._sendError = function(e) {
            M(this._config.error) ? this._config.error(e) : o && this._config.error && f.postMessage({
                workerId: b.WORKER_ID,
                error: e,
                finished: !1
            });
        };
    }
    function l(e) {
        var r;
        (e = e || {}).chunkSize || (e.chunkSize = b.RemoteChunkSize), u.call(this, e), this._nextChunk = n ? function() {
            this._readChunk(), this._chunkLoaded();
        } : function() {
            this._readChunk();
        }, this.stream = function(e) {
            this._input = e, this._nextChunk();
        }, this._readChunk = function() {
            if (this._finished) this._chunkLoaded();
            else {
                if (r = new XMLHttpRequest, this._config.withCredentials && (r.withCredentials = this._config.withCredentials), n || (r.onload = v(this._chunkLoaded, this), r.onerror = v(this._chunkError, this)), r.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !n), this._config.downloadRequestHeaders) {
                    var e = this._config.downloadRequestHeaders;
                    for(var t in e)r.setRequestHeader(t, e[t]);
                }
                if (this._config.chunkSize) {
                    var i = this._start + this._config.chunkSize - 1;
                    r.setRequestHeader("Range", "bytes=" + this._start + "-" + i);
                }
                try {
                    r.send(this._config.downloadRequestBody);
                } catch (e) {
                    this._chunkError(e.message);
                }
                n && 0 === r.status && this._chunkError();
            }
        }, this._chunkLoaded = function() {
            4 === r.readyState && (r.status < 200 || 400 <= r.status ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : r.responseText.length, this._finished = !this._config.chunkSize || this._start >= function(e) {
                var t = e.getResponseHeader("Content-Range");
                if (null === t) return -1;
                return parseInt(t.substring(t.lastIndexOf("/") + 1));
            }(r), this.parseChunk(r.responseText)));
        }, this._chunkError = function(e) {
            var t = r.statusText || e;
            this._sendError(new Error(t));
        };
    }
    function c(e) {
        var r, n;
        (e = e || {}).chunkSize || (e.chunkSize = b.LocalChunkSize), u.call(this, e);
        var s = "undefined" != typeof FileReader;
        this.stream = function(e) {
            this._input = e, n = e.slice || e.webkitSlice || e.mozSlice, s ? ((r = new FileReader).onload = v(this._chunkLoaded, this), r.onerror = v(this._chunkError, this)) : r = new FileReaderSync, this._nextChunk();
        }, this._nextChunk = function() {
            this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
            var e = this._input;
            if (this._config.chunkSize) {
                var t = Math.min(this._start + this._config.chunkSize, this._input.size);
                e = n.call(e, this._start, t);
            }
            var i = r.readAsText(e, this._config.encoding);
            s || this._chunkLoaded({
                target: {
                    result: i
                }
            });
        }, this._chunkLoaded = function(e) {
            this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e.target.result);
        }, this._chunkError = function() {
            this._sendError(r.error);
        };
    }
    function p(e) {
        var i;
        u.call(this, e = e || {}), this.stream = function(e) {
            return i = e, this._nextChunk();
        }, this._nextChunk = function() {
            if (!this._finished) {
                var e, t = this._config.chunkSize;
                return t ? (e = i.substring(0, t), i = i.substring(t)) : (e = i, i = ""), this._finished = !i, this.parseChunk(e);
            }
        };
    }
    function g(e) {
        u.call(this, e = e || {});
        var t = [], i = !0, r = !1;
        this.pause = function() {
            u.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
            u.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(e) {
            this._input = e, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
            r && 1 === t.length && (this._finished = !0);
        }, this._nextChunk = function() {
            this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i = !0;
        }, this._streamData = v(function(e) {
            try {
                t.push("string" == typeof e ? e : e.toString(this._config.encoding)), i && (i = !1, this._checkIsFinished(), this.parseChunk(t.shift()));
            } catch (e) {
                this._streamError(e);
            }
        }, this), this._streamError = v(function(e) {
            this._streamCleanUp(), this._sendError(e);
        }, this), this._streamEnd = v(function() {
            this._streamCleanUp(), r = !0, this._streamData("");
        }, this), this._streamCleanUp = v(function() {
            this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
    }
    function i(m) {
        var a, o, h, r = Math.pow(2, 53), n = -r, s = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, u = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/, t = this, i = 0, f = 0, d = !1, e = !1, l = [], c = {
            data: [],
            errors: [],
            meta: {}
        };
        if (M(m.step)) {
            var p = m.step;
            m.step = function(e) {
                if (c = e, _()) g();
                else {
                    if (g(), 0 === c.data.length) return;
                    i += e.data.length, m.preview && i > m.preview ? o.abort() : (c.data = c.data[0], p(c, t));
                }
            };
        }
        function y(e) {
            return "greedy" === m.skipEmptyLines ? "" === e.join("").trim() : 1 === e.length && 0 === e[0].length;
        }
        function g() {
            return c && h && (k("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + b.DefaultDelimiter + "'"), h = !1), m.skipEmptyLines && (c.data = c.data.filter(function(e) {
                return !y(e);
            })), _() && function() {
                if (!c) return;
                function e(e, t) {
                    M(m.transformHeader) && (e = m.transformHeader(e, t)), l.push(e);
                }
                if (Array.isArray(c.data[0])) {
                    for(var t = 0; _() && t < c.data.length; t++)c.data[t].forEach(e);
                    c.data.splice(0, 1);
                } else c.data.forEach(e);
            }(), function() {
                if (!c || !m.header && !m.dynamicTyping && !m.transform) return c;
                function e(e, t) {
                    var i, r = m.header ? {} : [];
                    for(i = 0; i < e.length; i++){
                        var n = i, s = e[i];
                        m.header && (n = i >= l.length ? "__parsed_extra" : l[i]), m.transform && (s = m.transform(s, n)), s = v(n, s), "__parsed_extra" === n ? (r[n] = r[n] || [], r[n].push(s)) : r[n] = s;
                    }
                    return m.header && (i > l.length ? k("FieldMismatch", "TooManyFields", "Too many fields: expected " + l.length + " fields but parsed " + i, f + t) : i < l.length && k("FieldMismatch", "TooFewFields", "Too few fields: expected " + l.length + " fields but parsed " + i, f + t)), r;
                }
                var t = 1;
                !c.data.length || Array.isArray(c.data[0]) ? (c.data = c.data.map(e), t = c.data.length) : c.data = e(c.data, 0);
                m.header && c.meta && (c.meta.fields = l);
                return f += t, c;
            }();
        }
        function _() {
            return m.header && 0 === l.length;
        }
        function v(e, t) {
            var i;
            return i = e, m.dynamicTypingFunction && void 0 === m.dynamicTyping[i] && (m.dynamicTyping[i] = m.dynamicTypingFunction(i)), !0 === (m.dynamicTyping[i] || m.dynamicTyping) ? "true" === t || "TRUE" === t || "false" !== t && "FALSE" !== t && (function(e) {
                if (s.test(e)) {
                    var t = parseFloat(e);
                    if (n < t && t < r) return !0;
                }
                return !1;
            }(t) ? parseFloat(t) : u.test(t) ? new Date(t) : "" === t ? null : t) : t;
        }
        function k(e, t, i, r) {
            var n = {
                type: e,
                code: t,
                message: i
            };
            void 0 !== r && (n.row = r), c.errors.push(n);
        }
        this.parse = function(e, t, i) {
            var r = m.quoteChar || '"';
            if (m.newline || (m.newline = function(e, t) {
                e = e.substring(0, 1048576);
                var i = new RegExp(j(t) + "([^]*?)" + j(t), "gm"), r = (e = e.replace(i, "")).split("\r"), n = e.split("\n"), s = 1 < n.length && n[0].length < r[0].length;
                if (1 === r.length || s) return "\n";
                for(var a = 0, o = 0; o < r.length; o++)"\n" === r[o][0] && a++;
                return a >= r.length / 2 ? "\r\n" : "\r";
            }(e, r)), h = !1, m.delimiter) M(m.delimiter) && (m.delimiter = m.delimiter(e), c.meta.delimiter = m.delimiter);
            else {
                var n = function(e, t, i, r, n) {
                    var s, a, o, h;
                    n = n || [
                        ",",
                        "	",
                        "|",
                        ";",
                        b.RECORD_SEP,
                        b.UNIT_SEP
                    ];
                    for(var u = 0; u < n.length; u++){
                        var f = n[u], d = 0, l = 0, c = 0;
                        o = void 0;
                        for(var p = new E({
                            comments: r,
                            delimiter: f,
                            newline: t,
                            preview: 10
                        }).parse(e), g = 0; g < p.data.length; g++)if (i && y(p.data[g])) c++;
                        else {
                            var _ = p.data[g].length;
                            l += _, void 0 !== o ? 0 < _ && (d += Math.abs(_ - o), o = _) : o = _;
                        }
                        0 < p.data.length && (l /= p.data.length - c), (void 0 === a || d <= a) && (void 0 === h || h < l) && 1.99 < l && (a = d, s = f, h = l);
                    }
                    return {
                        successful: !!(m.delimiter = s),
                        bestDelimiter: s
                    };
                }(e, m.newline, m.skipEmptyLines, m.comments, m.delimitersToGuess);
                n.successful ? m.delimiter = n.bestDelimiter : (h = !0, m.delimiter = b.DefaultDelimiter), c.meta.delimiter = m.delimiter;
            }
            var s = w(m);
            return m.preview && m.header && s.preview++, a = e, o = new E(s), c = o.parse(a, t, i), g(), d ? {
                meta: {
                    paused: !0
                }
            } : c || {
                meta: {
                    paused: !1
                }
            };
        }, this.paused = function() {
            return d;
        }, this.pause = function() {
            d = !0, o.abort(), a = M(m.chunk) ? "" : a.substring(o.getCharIndex());
        }, this.resume = function() {
            t.streamer._halted ? (d = !1, t.streamer.parseChunk(a, !0)) : setTimeout(t.resume, 3);
        }, this.aborted = function() {
            return e;
        }, this.abort = function() {
            e = !0, o.abort(), c.meta.aborted = !0, M(m.complete) && m.complete(c), a = "";
        };
    }
    function j(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function E(e) {
        var S, O = (e = e || {}).delimiter, x = e.newline, I = e.comments, T = e.step, D = e.preview, A = e.fastMode, L = S = void 0 === e.quoteChar || null === e.quoteChar ? '"' : e.quoteChar;
        if (void 0 !== e.escapeChar && (L = e.escapeChar), ("string" != typeof O || -1 < b.BAD_DELIMITERS.indexOf(O)) && (O = ","), I === O) throw new Error("Comment character same as delimiter");
        !0 === I ? I = "#" : ("string" != typeof I || -1 < b.BAD_DELIMITERS.indexOf(I)) && (I = !1), "\n" !== x && "\r" !== x && "\r\n" !== x && (x = "\n");
        var F = 0, z = !1;
        this.parse = function(r, t, i) {
            if ("string" != typeof r) throw new Error("Input must be a string");
            var n = r.length, e = O.length, s = x.length, a = I.length, o = M(T), h = [], u = [], f = [], d = F = 0;
            if (!r) return C();
            if (A || !1 !== A && -1 === r.indexOf(S)) {
                for(var l = r.split(x), c = 0; c < l.length; c++){
                    if (f = l[c], F += f.length, c !== l.length - 1) F += x.length;
                    else if (i) return C();
                    if (!I || f.substring(0, a) !== I) {
                        if (o) {
                            if (h = [], k(f.split(O)), R(), z) return C();
                        } else k(f.split(O));
                        if (D && D <= c) return h = h.slice(0, D), C(!0);
                    }
                }
                return C();
            }
            for(var p = r.indexOf(O, F), g = r.indexOf(x, F), _ = new RegExp(j(L) + j(S), "g"), m = r.indexOf(S, F);;)if (r[F] !== S) {
                if (I && 0 === f.length && r.substring(F, F + a) === I) {
                    if (-1 === g) return C();
                    F = g + s, g = r.indexOf(x, F), p = r.indexOf(O, F);
                } else if (-1 !== p && (p < g || -1 === g)) f.push(r.substring(F, p)), F = p + e, p = r.indexOf(O, F);
                else {
                    if (-1 === g) break;
                    if (f.push(r.substring(F, g)), w(g + s), o && (R(), z)) return C();
                    if (D && h.length >= D) return C(!0);
                }
            } else for(m = F, F++;;){
                if (-1 === (m = r.indexOf(S, m + 1))) return i || u.push({
                    type: "Quotes",
                    code: "MissingQuotes",
                    message: "Quoted field unterminated",
                    row: h.length,
                    index: F
                }), E();
                if (m === n - 1) return E(r.substring(F, m).replace(_, S));
                if (S !== L || r[m + 1] !== L) {
                    if (S === L || 0 === m || r[m - 1] !== L) {
                        -1 !== p && p < m + 1 && (p = r.indexOf(O, m + 1)), -1 !== g && g < m + 1 && (g = r.indexOf(x, m + 1));
                        var y = b(-1 === g ? p : Math.min(p, g));
                        if (r.substr(m + 1 + y, e) === O) {
                            f.push(r.substring(F, m).replace(_, S)), r[F = m + 1 + y + e] !== S && (m = r.indexOf(S, F)), p = r.indexOf(O, F), g = r.indexOf(x, F);
                            break;
                        }
                        var v = b(g);
                        if (r.substring(m + 1 + v, m + 1 + v + s) === x) {
                            if (f.push(r.substring(F, m).replace(_, S)), w(m + 1 + v + s), p = r.indexOf(O, F), m = r.indexOf(S, F), o && (R(), z)) return C();
                            if (D && h.length >= D) return C(!0);
                            break;
                        }
                        u.push({
                            type: "Quotes",
                            code: "InvalidQuotes",
                            message: "Trailing quote on quoted field is malformed",
                            row: h.length,
                            index: F
                        }), m++;
                    }
                } else m++;
            }
            return E();
            function k(e) {
                h.push(e), d = F;
            }
            function b(e) {
                var t = 0;
                if (-1 !== e) {
                    var i = r.substring(m + 1, e);
                    i && "" === i.trim() && (t = i.length);
                }
                return t;
            }
            function E(e) {
                return i || (void 0 === e && (e = r.substring(F)), f.push(e), F = n, k(f), o && R()), C();
            }
            function w(e) {
                F = e, k(f), f = [], g = r.indexOf(x, F);
            }
            function C(e) {
                return {
                    data: h,
                    errors: u,
                    meta: {
                        delimiter: O,
                        linebreak: x,
                        aborted: z,
                        truncated: !!e,
                        cursor: d + (t || 0)
                    }
                };
            }
            function R() {
                T(C()), h = [], u = [];
            }
        }, this.abort = function() {
            z = !0;
        }, this.getCharIndex = function() {
            return F;
        };
    }
    function _(e) {
        var t = e.data, i = a[t.workerId], r = !1;
        if (t.error) i.userError(t.error, t.file);
        else if (t.results && t.results.data) {
            var n = {
                abort: function() {
                    r = !0, m(t.workerId, {
                        data: [],
                        errors: [],
                        meta: {
                            aborted: !0
                        }
                    });
                },
                pause: y,
                resume: y
            };
            if (M(i.userStep)) {
                for(var s = 0; s < t.results.data.length && (i.userStep({
                    data: t.results.data[s],
                    errors: t.results.errors,
                    meta: t.results.meta
                }, n), !r); s++);
                delete t.results;
            } else M(i.userChunk) && (i.userChunk(t.results, n, t.file), delete t.results);
        }
        t.finished && !r && m(t.workerId, t.results);
    }
    function m(e, t) {
        var i = a[e];
        M(i.userComplete) && i.userComplete(t), i.terminate(), delete a[e];
    }
    function y() {
        throw new Error("Not implemented.");
    }
    function w(e) {
        if ("object" != typeof e || null === e) return e;
        var t = Array.isArray(e) ? [] : {};
        for(var i in e)t[i] = w(e[i]);
        return t;
    }
    function v(e, t) {
        return function() {
            e.apply(t, arguments);
        };
    }
    function M(e) {
        return "function" == typeof e;
    }
    return o && (f.onmessage = function(e) {
        var t = e.data;
        void 0 === b.WORKER_ID && t && (b.WORKER_ID = t.workerId);
        if ("string" == typeof t.input) f.postMessage({
            workerId: b.WORKER_ID,
            results: b.parse(t.input, t.config),
            finished: !0
        });
        else if (f.File && t.input instanceof File || t.input instanceof Object) {
            var i = b.parse(t.input, t.config);
            i && f.postMessage({
                workerId: b.WORKER_ID,
                results: i,
                finished: !0
            });
        }
    }), (l.prototype = Object.create(u.prototype)).constructor = l, (c.prototype = Object.create(u.prototype)).constructor = c, (p.prototype = Object.create(p.prototype)).constructor = p, (g.prototype = Object.create(u.prototype)).constructor = g, b;
});


function $08d0039663e943f9$var$showError(status) {
    document.querySelector("#error-display-text").textContent = status;
}
function $08d0039663e943f9$var$downloadFile(filename, content) {
    const url = window.URL.createObjectURL(new Blob([
        content
    ], {
        type: "text/plain"
    }));
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}
function $08d0039663e943f9$var$toCsv(objects) {
    const allHeaders = new Set();
    objects.forEach((obj)=>Object.keys(obj).forEach((k)=>allHeaders.add(k)));
    return (0, $3e8cab1de800fbb2$exports.unparse)(objects, {
        header: true,
        columns: allHeaders.size > 0 ? [
            ...allHeaders
        ] : [
            "empty"
        ]
    });
}
function $08d0039663e943f9$var$mapMaybe(value, mapper) {
    if (value == null) return value;
    return mapper(value);
}
// import { formatUnits } from 'ethers/lib/utils'
function $08d0039663e943f9$var$formatUnits(stringifiedBigInt, decimalPlaces) {
    const value = BigInt(stringifiedBigInt);
    const integer = (value / 10n ** BigInt(decimalPlaces)).toString();
    const fraction = (value % 10n ** BigInt(decimalPlaces)).toString().padStart(9, "0").replace(/0+$/, "");
    return `${integer}.${fraction}`.replace(/\.$/, ".0");
}
document.querySelector("#download-transactions").addEventListener("click", async ()=>{
    try {
        const address = window.account.value;
        const txsRaw = await (await fetch(`https://api.oasismonitor.com/data/transactions?limit=20000&offset=0&account_id=${encodeURIComponent(address)}`)).json();
        const txs = txsRaw.map((tx)=>{
            return {
                timestamp_iso: $08d0039663e943f9$var$mapMaybe(tx.timestamp, (v)=>new Date(v * 1000).toISOString()),
                amount_rose: $08d0039663e943f9$var$mapMaybe(tx.amount, (v)=>$08d0039663e943f9$var$formatUnits(v, 9)),
                escrow_amount_rose: $08d0039663e943f9$var$mapMaybe(tx.escrow_amount, (v)=>$08d0039663e943f9$var$formatUnits(v, 9)),
                reclaim_escrow_amount_rose: $08d0039663e943f9$var$mapMaybe(tx.reclaim_escrow_amount, (v)=>$08d0039663e943f9$var$formatUnits(v, 9)),
                ...tx
            };
        });
        $08d0039663e943f9$var$downloadFile("transactions.csv", $08d0039663e943f9$var$toCsv(txs));
    } catch (error) {
        $08d0039663e943f9$var$showError(error);
    }
});
document.querySelector("#download-staking-rewards").addEventListener("click", async ()=>{
    try {
        const address = window.account.value;
        const rewardsRaw = await (await fetch(`https://api.oasismonitor.com/data/accounts/${encodeURIComponent(address)}/rewards?limit=20000&offset=0`)).json();
        const rewards = rewardsRaw.map((reward)=>{
            return {
                created_at_iso: $08d0039663e943f9$var$mapMaybe(reward.created_at, (v)=>new Date(v * 1000).toISOString()),
                amount_rose: $08d0039663e943f9$var$mapMaybe(reward.amount, (v)=>$08d0039663e943f9$var$formatUnits(v, 9)),
                ...reward
            };
        });
        $08d0039663e943f9$var$downloadFile("staking-rewards.csv", $08d0039663e943f9$var$toCsv(rewards));
    } catch (error) {
        $08d0039663e943f9$var$showError(error);
    }
});


