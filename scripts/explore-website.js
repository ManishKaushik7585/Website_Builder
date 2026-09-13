"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("@playwright/test");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
function extractViewportSignals(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function () {
                        var getVisibleElements = function (selector) {
                            var elements = Array.from(document.querySelectorAll(selector));
                            return elements.filter(function (el) {
                                var rect = el.getBoundingClientRect();
                                return rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0 && rect.height > 0;
                            });
                        };
                        // Extract Typography
                        var headings = getVisibleElements('h1, h2, h3, h4, p.large, .display, .title').map(function (el) {
                            var _a;
                            var rect = el.getBoundingClientRect();
                            var style = window.getComputedStyle(el);
                            return {
                                tag: el.tagName,
                                text: ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.substring(0, 50).trim()) + '...',
                                fontSize: style.fontSize,
                                fontWeight: style.fontWeight,
                                textAlign: style.textAlign,
                                rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
                            };
                        });
                        // Extract Media
                        var media = getVisibleElements('img, video, svg, [style*="background-image"]').map(function (el) {
                            var rect = el.getBoundingClientRect();
                            var style = window.getComputedStyle(el);
                            return {
                                tag: el.tagName,
                                src: el.src || 'css-bg',
                                objectFit: style.objectFit,
                                rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
                            };
                        });
                        // Extract Layout / Sections
                        var layout = getVisibleElements('section, main, article, header, footer').map(function (el) {
                            var rect = el.getBoundingClientRect();
                            var style = window.getComputedStyle(el);
                            return {
                                tag: el.tagName,
                                id: el.id,
                                className: el.className,
                                display: style.display,
                                position: style.position,
                                rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
                            };
                        });
                        return { typography: headings, media: media, layout: layout };
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function runExplorer() {
    return __awaiter(this, void 0, void 0, function () {
        var targetUrl, hostname, timestamp, outDir, browser, context, page, report, scrollY_1, viewportHeight, pageHeight, step, screenshotPath, signals, scrollStep, newPageHeight, reportPath, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    targetUrl = process.argv[2];
                    if (!targetUrl) {
                        console.error('Usage: node explore-website.js <URL>');
                        process.exit(1);
                    }
                    hostname = new URL(targetUrl).hostname;
                    timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                    outDir = path.join(process.cwd(), 'research', "".concat(hostname, "-").concat(timestamp));
                    fs.mkdirSync(outDir, { recursive: true });
                    console.log("[Explorer] Launching browser to explore: ".concat(targetUrl));
                    return [4 /*yield*/, test_1.chromium.launch({ headless: true })];
                case 1:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.newContext({
                            viewport: { width: 1440, height: 900 },
                            deviceScaleFactor: 1,
                        })];
                case 2:
                    context = _b.sent();
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _b.sent();
                    _a = {
                        url: targetUrl
                    };
                    return [4 /*yield*/, browser.version()];
                case 4:
                    report = (_a.userAgent = _b.sent(),
                        _a.totalScrolls = 0,
                        _a.finalPageHeight = 0,
                        _a.observations = [],
                        _a);
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 17, 18, 20]);
                    console.log("[Explorer] Navigating...");
                    return [4 /*yield*/, page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 60000 })];
                case 6:
                    _b.sent();
                    // Wait for fonts & initial animations to settle
                    return [4 /*yield*/, page.evaluate(function () { return document.fonts.ready; })];
                case 7:
                    // Wait for fonts & initial animations to settle
                    _b.sent();
                    return [4 /*yield*/, page.waitForTimeout(3000)];
                case 8:
                    _b.sent();
                    scrollY_1 = 0;
                    viewportHeight = 900;
                    return [4 /*yield*/, page.evaluate(function () { return document.documentElement.scrollHeight; })];
                case 9:
                    pageHeight = _b.sent();
                    step = 0;
                    _b.label = 10;
                case 10:
                    if (!(scrollY_1 < pageHeight)) return [3 /*break*/, 16];
                    console.log("[Explorer] Analyzing viewport at scroll Y: ".concat(scrollY_1));
                    screenshotPath = path.join(outDir, "viewport-".concat(step, ".jpg"));
                    return [4 /*yield*/, page.screenshot({ path: screenshotPath, type: 'jpeg', quality: 70 })];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, extractViewportSignals(page)];
                case 12:
                    signals = _b.sent();
                    report.observations.push(__assign({ scrollPosition: scrollY_1, viewportWidth: 1440, viewportHeight: 900, pageHeight: pageHeight, timestamp: new Date().toISOString(), screenshotPath: screenshotPath }, signals));
                    scrollStep = Math.floor(viewportHeight * 0.75);
                    scrollY_1 += scrollStep;
                    return [4 /*yield*/, page.evaluate(function (y) { return window.scrollTo(0, y); }, scrollY_1)];
                case 13:
                    _b.sent();
                    // Allow lazy loads and animations to trigger and settle
                    return [4 /*yield*/, page.waitForTimeout(2000)];
                case 14:
                    // Allow lazy loads and animations to trigger and settle
                    _b.sent();
                    return [4 /*yield*/, page.evaluate(function () { return document.documentElement.scrollHeight; })];
                case 15:
                    newPageHeight = _b.sent();
                    if (newPageHeight > pageHeight) {
                        console.log("[Explorer] Page height expanded dynamically: ".concat(pageHeight, " -> ").concat(newPageHeight));
                        pageHeight = newPageHeight;
                    }
                    step++;
                    // Failsafe for infinite scrolling
                    if (step > 30) {
                        console.log('[Explorer] Reached 30 scroll steps. Stopping to avoid infinite loop.');
                        return [3 /*break*/, 16];
                    }
                    return [3 /*break*/, 10];
                case 16:
                    report.finalPageHeight = pageHeight;
                    report.totalScrolls = step;
                    reportPath = path.join(outDir, 'report.json');
                    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
                    console.log("[Explorer] Success! Report and screenshots saved to: ".concat(outDir));
                    return [3 /*break*/, 20];
                case 17:
                    error_1 = _b.sent();
                    console.error("[Explorer] Error during exploration:", error_1.message);
                    return [3 /*break*/, 20];
                case 18: return [4 /*yield*/, browser.close()];
                case 19:
                    _b.sent();
                    return [7 /*endfinally*/];
                case 20: return [2 /*return*/];
            }
        });
    });
}
runExplorer();
