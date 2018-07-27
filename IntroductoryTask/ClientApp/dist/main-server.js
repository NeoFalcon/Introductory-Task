(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("./vendor");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(6);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(140);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(141);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(142);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_domain_task__);

var actionCreators = {
    submitPayment: function (payment) { return function (dispatch, getState) {
        window.FB.api('/me', 'get', { fields: 'email' }, function (fbResponse) {
            window.paymill.createToken({
                number: payment.cardNumber,
                exp_month: payment.expiryMonth,
                exp_year: payment.expiryYear,
                cvc: payment.securityCode,
                amount_int: 100,
                currency: 'EUR',
                cardholder: payment.nameOnCard,
                email: fbResponse.email
            }, function (error, result) {
                if (error) {
                    dispatch({ type: 'VALIDATION_ERROR', errorMessage: error.apierror });
                }
                else {
                    var paymillToken = result.token;
                    var apiMethodUrl = "api/SubmitPayment/Save";
                    var apiMethodType = "post";
                    var fetchTask = fetch(apiMethodUrl, {
                        method: apiMethodType,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        body: JSON.stringify(paymillToken),
                    })
                        .then(function (response) { return response.json(); })
                        .then(function (data) {
                        if (data) {
                            dispatch({ type: 'VALIDATION_ERROR', errorMessage: data });
                        }
                        else {
                            dispatch({ type: 'RECEIVE_GENERIC_RESULT' });
                        }
                    });
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["addTask"])(fetchTask);
                }
            });
        });
        dispatch({ type: 'SUBMIT_PAYMENT', payment: payment });
    }; }
};
var emptyPayment = {
    cardNumberHasErrors: false, cardNumberErrorMessage: '', cardNumber: '',
    nameOnCardHasErrors: false, nameOnCardErrorMessage: '', nameOnCard: '',
    expiryMonthHasErrors: false, expiryMonthErrorMessage: '', expiryMonth: '',
    expiryYearHasErrors: false, expiryYearErrorMessage: '', expiryYear: '',
    securityCodeHasErrors: false, securityCodeErrorMessage: '', securityCode: ''
};
var unloadedState = { isLoading: false, payment: emptyPayment, hasPaymentSucceeded: false };
var reducer = function (state, incomingAction) {
    var action = incomingAction;
    switch (action.type) {
        case 'SUBMIT_PAYMENT':
            return {
                payment: action.payment,
                isLoading: true,
                hasPaymentSucceeded: false
            };
        case 'RECEIVE_GENERIC_RESULT':
            return {
                payment: emptyPayment,
                isLoading: false,
                validationErrorMessage: undefined,
                hasPaymentSucceeded: true
            };
        case 'VALIDATION_ERROR':
            return {
                payment: state.payment,
                isLoading: false,
                validationErrorMessage: action.errorMessage,
                hasPaymentSucceeded: false
            };
        default:
            var exhaustiveCheck = action;
    }
    return state || unloadedState;
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(15);




function configureStore(history, initialState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    var windowIfDefined = typeof window === 'undefined' ? null : window;
    // If devTools is installed, connect to it
    var devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__;
    var createStoreWithMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerMiddleware"])(history)), devToolsExtension ? devToolsExtension() : function (next) { return next; })(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"]);
    // Combine all reducers and instantiate the app-wide store instance
    var allReducers = buildRootReducer(__WEBPACK_IMPORTED_MODULE_3__store__["a" /* reducers */]);
    var store = createStoreWithMiddleware(allReducers, initialState);
    // Enable Webpack hot module replacement for reducers
    if (false) {
        module.hot.accept('./store', function () {
            var nextRootReducer = require('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }
    return store;
}
function buildRootReducer(allReducers) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])(Object.assign({}, allReducers, { routing: __WEBPACK_IMPORTED_MODULE_2_react_router_redux__["routerReducer"] }));
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_SubmitPayment__ = __webpack_require__(14);





var routes = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* Layout */], null,
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_3__components_Home__["a" /* default */] }),
    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { path: '/submitpayment', component: __WEBPACK_IMPORTED_MODULE_4__components_SubmitPayment__["a" /* default */] }));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(132);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(137);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(139);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_history___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_history__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__configureStore__ = __webpack_require__(6);









/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_aspnet_prerendering__["createServerRenderer"])(function (params) {
    return new Promise(function (resolve, reject) {
        // Prepare Redux store with in-memory history, and dispatch a navigation event
        // corresponding to the incoming URL
        var basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
        var urlAfterBasename = params.url.substring(basename.length);
        var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__configureStore__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_history__["createMemoryHistory"])());
        store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__["replace"])(urlAfterBasename));
        // Prepare an instance of the application and perform an inital render that will
        // cause any async tasks (e.g., data access) to begin
        var routerContext = {};
        var app = (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_redux__["Provider"], { store: store },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["StaticRouter"], { basename: basename, context: routerContext, location: params.location.path, children: __WEBPACK_IMPORTED_MODULE_7__routes__["a" /* routes */] })));
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(app);
        // If there's a redirection, just send this information back to the host application
        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url });
            return;
        }
        // Once any async tasks are done, we can perform the final render
        // We also send the redux store state, so the client can continue execution where the server left off
        params.domainTasks.then(function () {
            resolve({
                html: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__["renderToString"])(app),
                globals: { initialReduxState: store.getState() }
            });
        }, reject); // Also propagate any errors back into the host application
    });
}));


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'fb-login-button', "data-max-rows": '1', "data-size": 'large', "data-button-type": 'continue_with', "data-show-faces": 'false', "data-auto-logout-link": 'false', "data-use-continue-as": 'false' }));
    };
    return Home;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (Home);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Layout = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'container-fluid' },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'row' },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'col-sm-12' }, this.props.children)));
    };
    return Layout;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_Payment__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var SubmitPayment = (function (_super) {
    __extends(SubmitPayment, _super);
    function SubmitPayment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubmitPayment.prototype.onCardNumberChange = function (e) {
        this.props.payment.cardNumber = e.target.value;
        if (!e.target.value.match(/[0-9]{16}/g)) {
            this.props.payment.cardNumberHasErrors = true;
            this.props.payment.cardNumberErrorMessage = 'Please enter 16 digits';
        }
        else {
            this.props.payment.cardNumberHasErrors = false;
            this.props.payment.cardNumberErrorMessage = '';
        }
        this.forceUpdate();
    };
    SubmitPayment.prototype.onNameOnCardChange = function (e) {
        this.props.payment.nameOnCard = e.target.value;
        if (e.target.value.length < 2) {
            this.props.payment.nameOnCardHasErrors = true;
            this.props.payment.nameOnCardErrorMessage = 'Please enter a valid name';
        }
        else {
            this.props.payment.nameOnCardHasErrors = false;
            this.props.payment.nameOnCardErrorMessage = '';
        }
        this.forceUpdate();
    };
    SubmitPayment.prototype.onExpiryMonthChange = function (e) {
        this.props.payment.expiryMonth = e.target.value;
        if (!e.target.value.match(/[0-9]+/g)
            || parseInt(e.target.value) < 1
            || parseInt(e.target.value) > 12) {
            this.props.payment.expiryMonthHasErrors = true;
            this.props.payment.expiryMonthErrorMessage = 'Please enter a valid month';
        }
        else if (parseInt(this.props.payment.expiryYear) === new Date().getFullYear()
            && parseInt(e.target.value) <= new Date().getMonth() + 1) {
            this.props.payment.expiryMonthHasErrors = true;
            this.props.payment.expiryMonthErrorMessage = 'Please enter a future month';
        }
        else {
            this.props.payment.expiryMonthHasErrors = false;
            this.props.payment.expiryMonthErrorMessage = '';
        }
        this.forceUpdate();
    };
    SubmitPayment.prototype.onExpiryYearChange = function (e) {
        this.props.payment.expiryYear = e.target.value;
        if (!e.target.value.match(/[0-9]{4}/g)) {
            this.props.payment.expiryYearHasErrors = true;
            this.props.payment.expiryYearErrorMessage = 'Please enter a valid year';
            this.props.payment.expiryMonthHasErrors = false;
            this.props.payment.expiryMonthErrorMessage = '';
        }
        else if (parseInt(e.target.value) < new Date().getFullYear()) {
            this.props.payment.expiryYearHasErrors = true;
            this.props.payment.expiryYearErrorMessage = 'Please enter current or future year';
            this.props.payment.expiryMonthHasErrors = false;
            this.props.payment.expiryMonthErrorMessage = '';
        }
        else if (parseInt(e.target.value) == new Date().getFullYear()
            && parseInt(this.props.payment.expiryMonth) <= new Date().getMonth() + 1) {
            this.props.payment.expiryMonthHasErrors = true;
            this.props.payment.expiryMonthErrorMessage = 'Please enter a future month';
            this.props.payment.expiryYearHasErrors = false;
            this.props.payment.expiryYearErrorMessage = '';
        }
        else {
            this.props.payment.expiryMonthHasErrors = false;
            this.props.payment.expiryMonthErrorMessage = '';
            this.props.payment.expiryYearHasErrors = false;
            this.props.payment.expiryYearErrorMessage = '';
        }
        this.forceUpdate();
    };
    SubmitPayment.prototype.onSecurityCodeChange = function (e) {
        this.props.payment.securityCode = e.target.value;
        if (!e.target.value.match(/[0-9]{2,4}/g)) {
            this.props.payment.securityCodeHasErrors = true;
            this.props.payment.securityCodeErrorMessage = 'Please enter a valid security code';
        }
        else {
            this.props.payment.securityCodeHasErrors = false;
            this.props.payment.securityCodeErrorMessage = '';
        }
        this.forceUpdate();
    };
    SubmitPayment.prototype.render = function () {
        var _this = this;
        var cardNumberError = this.props.payment.cardNumberHasErrors
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { id: "card-number-error", style: { color: "red" } }, this.props.payment.cardNumberErrorMessage)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { id: "card-number-error" });
        var nameOnCardError = this.props.payment.nameOnCardHasErrors
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { id: "name-on-card-error", style: { color: "red" } }, this.props.payment.nameOnCardErrorMessage)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { id: "name-on-card-error" });
        var expiryMonthError = this.props.payment.expiryMonthHasErrors
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { id: "expiry-month-error", style: { color: "red" } }, this.props.payment.expiryMonthErrorMessage)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { id: "expiry-month-error" });
        var expiryYearError = this.props.payment.expiryYearHasErrors
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { id: "expiry-year-error", style: { color: "red" } }, this.props.payment.expiryYearErrorMessage)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { id: "expiry-year-error" });
        var securityCodeError = this.props.payment.securityCodeHasErrors
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { id: "security-code-error", style: { color: "red" } }, this.props.payment.securityCodeErrorMessage)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { id: "security-code-error" });
        var isButtonDisabled = this.props.payment.cardNumberHasErrors
            || this.props.payment.nameOnCardHasErrors
            || this.props.payment.expiryMonthHasErrors
            || this.props.payment.expiryYearHasErrors
            || this.props.payment.securityCodeHasErrors;
        var successAlert = this.props.hasPaymentSucceeded
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "alert alert-success alert-dismissible", role: "alert" },
                "Payment of 1 euro succeeded",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "alert", "aria-label": "Close" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { "aria-hidden": "true" }, "\u00D7")))
            : null;
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            successAlert,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { id: "form-validation-errors", style: { color: "red" } }, this.props.validationErrorMessage),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("form", { onSubmit: function (e) { _this.props.submitPayment(_this.props.payment); } },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "card-number", className: "form-group row " + (this.props.payment.cardNumberHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: " control-label col-md-12", htmlFor: "cardNumber" }, "Card number"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "text", name: "cardNumber", defaultValue: this.props.payment.cardNumber, onChange: function (e) { return _this.onCardNumberChange(e); }, required: true, maxLength: 16, pattern: "^[0-9]{16}$" }),
                        cardNumberError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "name-on-card", className: "form-group row " + (this.props.payment.nameOnCardHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "nameOnCard" }, "Name on card"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "text", name: "nameOnCard", defaultValue: this.props.payment.nameOnCard, onChange: function (e) { return _this.onNameOnCardChange(e); }, required: true, maxLength: 100 }),
                        nameOnCardError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "expiry-month", className: "form-group row " + (this.props.payment.expiryMonthHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "expiryMonth" }, "Expiry month"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "number", name: "expiryMonth", defaultValue: this.props.payment.expiryMonth, onChange: function (e) { return _this.onExpiryMonthChange(e); }, required: true, maxLength: 2, pattern: "^[0-9]+$" }),
                        expiryMonthError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "expiry-year", className: "form-group row " + (this.props.payment.expiryYearHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "expiryYear" }, "Expiry year"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "number", name: "expiryYear", defaultValue: this.props.payment.expiryYear, onChange: function (e) { return _this.onExpiryYearChange(e); }, required: true, maxLength: 4, pattern: "^[0-9]{4}$" }),
                        expiryYearError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "security-code", className: "form-group row " + (this.props.payment.securityCodeHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "securityCode" }, "Security code"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "text", name: "securityCode", defaultValue: this.props.payment.securityCode, onChange: function (e) { return _this.onSecurityCodeChange(e); }, required: true, maxLength: 4, pattern: "^[0-9]{2,4}$" }),
                        securityCodeError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "form-group" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { type: "submit", className: "btn btn-default", disabled: isButtonDisabled }, "Pay now"))));
    };
    return SubmitPayment;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function (state) { return state.payment; }, __WEBPACK_IMPORTED_MODULE_2__store_Payment__["a" /* actionCreators */])(SubmitPayment));


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reducers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Payment__ = __webpack_require__(5);

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
var reducers = {
    payment: __WEBPACK_IMPORTED_MODULE_0__Payment__["b" /* reducer */]
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(135);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(143);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(70);

/***/ })
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZThjMThkNmRmN2FlMmQ1YmRlMTMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL1BheW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9yb3V0ZXMudHN4Iiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZS50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9TdWJtaXRQYXltZW50LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUEscUM7Ozs7OztBQ0FBLDZDOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FzQztBQStDL0IsSUFBTSxj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QUMsY0FBYyxFQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLFVBQUMsQ0FBQyxJQUFLLFlBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBNUIsQ0FBNEIsRUFBRSxRQUFRLFFBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUMsY0FBYyxHQUFHO3dCQUM1TSxpQkFBaUIsQ0FDZCxDQUNEO2dCQUNOLDhEQUFLLFNBQVMsRUFBQyxZQUFZO29CQUMxQixpRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLGNBRW5FLENBQ0osQ0FDQSxDQUNGLENBQUM7SUFDUixDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLENBM0wyQixnREFBZSxHQTJMMUM7QUFFRCx5REFBZSwyRUFBTyxDQUNyQixVQUFDLEtBQXVCLElBQUssWUFBSyxDQUFDLE9BQU8sRUFBYixDQUFhLEVBQzFDLHNFQUEyQixDQUMzQixDQUFDLGFBQWEsQ0FBeUIsRUFBQzs7Ozs7Ozs7OztBQzNNSjtBQU9yQyxzR0FBc0c7QUFDdEcsd0dBQXdHO0FBQ3hHLDREQUE0RDtBQUNyRCxJQUFNLFFBQVEsR0FBRztJQUN2QixPQUFPLEVBQUUseURBQWU7Q0FDeEIsQ0FBQzs7Ozs7OztBQ1pGLCtDOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsOEMiLCJmaWxlIjoibWFpbi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU4YzE4ZDZkZjdhZTJkNWJkZTEzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi92ZW5kb3JcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCIuL3ZlbmRvclwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDYpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC9yZWFjdC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQwKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDEpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItcmVkdXgvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGFkZFRhc2sgfSBmcm9tIFwiZG9tYWluLXRhc2tcIjtcclxuaW1wb3J0IHsgUm91dGVyQWN0aW9uLCBwdXNoLCByb3V0ZXJBY3Rpb25zIH0gZnJvbSBcInJlYWN0LXJvdXRlci1yZWR1eFwiO1xyXG5pbXBvcnQgeyBBcHBUaHVua0FjdGlvbiB9IGZyb20gXCJDbGllbnRBcHAvc3RvcmVcIjtcclxuaW1wb3J0IHsgQWN0aW9uLCBSZWR1Y2VyIH0gZnJvbSBcInJlZHV4XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnQge1xyXG5cdGNhcmROdW1iZXJIYXNFcnJvcnM6IGJvb2xlYW47XHJcblx0Y2FyZE51bWJlckVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG5cdGNhcmROdW1iZXI6IHN0cmluZztcclxuXHRuYW1lT25DYXJkSGFzRXJyb3JzOiBib29sZWFuO1xyXG5cdG5hbWVPbkNhcmRFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuXHRuYW1lT25DYXJkOiBzdHJpbmc7XHJcblx0ZXhwaXJ5TW9udGhIYXNFcnJvcnM6IGJvb2xlYW47XHJcblx0ZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuXHRleHBpcnlNb250aDogc3RyaW5nO1xyXG5cdGV4cGlyeVllYXJIYXNFcnJvcnM6IGJvb2xlYW47XHJcblx0ZXhwaXJ5WWVhckVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG5cdGV4cGlyeVllYXI6IHN0cmluZztcclxuXHRzZWN1cml0eUNvZGVIYXNFcnJvcnM6IGJvb2xlYW47XHJcblx0c2VjdXJpdHlDb2RlRXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblx0c2VjdXJpdHlDb2RlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudFN0YXRlIHtcclxuXHRpc0xvYWRpbmc6IGJvb2xlYW47XHJcblx0cGF5bWVudDogUGF5bWVudDtcclxuXHR2YWxpZGF0aW9uRXJyb3JNZXNzYWdlPzogc3RyaW5nO1xyXG5cdGhhc1BheW1lbnRTdWNjZWVkZWQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBTdWJtaXRQYXltZW50QWN0aW9uIHtcclxuXHR0eXBlOiAnU1VCTUlUX1BBWU1FTlQnO1xyXG5cdHBheW1lbnQ6IFBheW1lbnQ7XHJcbn1cclxuXHJcbmludGVyZmFjZSBSZWNlaXZlR2VuZXJpY1Jlc3VsdEFjdGlvbiB7XHJcblx0dHlwZTogJ1JFQ0VJVkVfR0VORVJJQ19SRVNVTFQnO1xyXG5cdHN1Y2Nlc3NNZXNzYWdlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBWYWxpZGF0aW9uRXJyb3JBY3Rpb24ge1xyXG5cdHR5cGU6ICdWQUxJREFUSU9OX0VSUk9SJztcclxuXHRlcnJvck1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxudHlwZSBLbm93bkFjdGlvbiA9IFN1Ym1pdFBheW1lbnRBY3Rpb24gfCBSZWNlaXZlR2VuZXJpY1Jlc3VsdEFjdGlvbiB8IFZhbGlkYXRpb25FcnJvckFjdGlvbjtcclxuXHJcbmV4cG9ydCBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHtcclxuXHRzdWJtaXRQYXltZW50OiAocGF5bWVudDogUGF5bWVudCk6IEFwcFRodW5rQWN0aW9uPGFueT4gPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG5cdFx0KDxhbnk+d2luZG93KS5GQi5hcGkoJy9tZScsICdnZXQnLCB7IGZpZWxkczogJ2VtYWlsJyB9LCBmdW5jdGlvbiAoZmJSZXNwb25zZTogYW55KSB7XHJcblx0XHRcdCg8YW55PndpbmRvdykucGF5bWlsbC5jcmVhdGVUb2tlbih7XHJcblx0XHRcdFx0bnVtYmVyOiBwYXltZW50LmNhcmROdW1iZXIsXHJcblx0XHRcdFx0ZXhwX21vbnRoOiBwYXltZW50LmV4cGlyeU1vbnRoLFxyXG5cdFx0XHRcdGV4cF95ZWFyOiBwYXltZW50LmV4cGlyeVllYXIsXHJcblx0XHRcdFx0Y3ZjOiBwYXltZW50LnNlY3VyaXR5Q29kZSxcclxuXHRcdFx0XHRhbW91bnRfaW50OiAxMDAsXHJcblx0XHRcdFx0Y3VycmVuY3k6ICdFVVInLFxyXG5cdFx0XHRcdGNhcmRob2xkZXI6IHBheW1lbnQubmFtZU9uQ2FyZCxcclxuXHRcdFx0XHRlbWFpbDogZmJSZXNwb25zZS5lbWFpbFxyXG5cdFx0XHR9LCBmdW5jdGlvbiAoZXJyb3I6IGFueSwgcmVzdWx0OiBhbnkpIHtcclxuXHRcdFx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0XHRcdGRpc3BhdGNoKHsgdHlwZTogJ1ZBTElEQVRJT05fRVJST1InLCBlcnJvck1lc3NhZ2U6IGVycm9yLmFwaWVycm9yIH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHZhciBwYXltaWxsVG9rZW4gPSByZXN1bHQudG9rZW47XHJcblx0XHRcdFx0XHR2YXIgYXBpTWV0aG9kVXJsID0gYGFwaS9TdWJtaXRQYXltZW50L1NhdmVgO1xyXG5cdFx0XHRcdFx0dmFyIGFwaU1ldGhvZFR5cGUgPSBgcG9zdGA7XHJcblx0XHRcdFx0XHRsZXQgZmV0Y2hUYXNrID0gZmV0Y2goYXBpTWV0aG9kVXJsLCB7XHJcblx0XHRcdFx0XHRcdG1ldGhvZDogYXBpTWV0aG9kVHlwZSxcclxuXHRcdFx0XHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkocGF5bWlsbFRva2VuKSxcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSBhcyBQcm9taXNlPG51bWJlcj4pXHJcblx0XHRcdFx0XHRcdC50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaCh7IHR5cGU6ICdWQUxJREFUSU9OX0VSUk9SJywgZXJyb3JNZXNzYWdlOiBkYXRhIH0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKHsgdHlwZTogJ1JFQ0VJVkVfR0VORVJJQ19SRVNVTFQnIH0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0YWRkVGFzayhmZXRjaFRhc2spO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0ZGlzcGF0Y2goeyB0eXBlOiAnU1VCTUlUX1BBWU1FTlQnLCBwYXltZW50OiBwYXltZW50IH0pO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IGVtcHR5UGF5bWVudDogUGF5bWVudCA9IHtcclxuXHRjYXJkTnVtYmVySGFzRXJyb3JzOiBmYWxzZSwgY2FyZE51bWJlckVycm9yTWVzc2FnZTogJycsIGNhcmROdW1iZXI6ICcnLFxyXG5cdG5hbWVPbkNhcmRIYXNFcnJvcnM6IGZhbHNlLCBuYW1lT25DYXJkRXJyb3JNZXNzYWdlOiAnJywgbmFtZU9uQ2FyZDogJycsXHJcblx0ZXhwaXJ5TW9udGhIYXNFcnJvcnM6IGZhbHNlLCBleHBpcnlNb250aEVycm9yTWVzc2FnZTogJycsIGV4cGlyeU1vbnRoOiAnJyxcclxuXHRleHBpcnlZZWFySGFzRXJyb3JzOiBmYWxzZSwgZXhwaXJ5WWVhckVycm9yTWVzc2FnZTogJycsIGV4cGlyeVllYXI6ICcnLFxyXG5cdHNlY3VyaXR5Q29kZUhhc0Vycm9yczogZmFsc2UsIHNlY3VyaXR5Q29kZUVycm9yTWVzc2FnZTogJycsIHNlY3VyaXR5Q29kZTogJydcclxufVxyXG5jb25zdCB1bmxvYWRlZFN0YXRlOiBQYXltZW50U3RhdGUgPSB7IGlzTG9hZGluZzogZmFsc2UsIHBheW1lbnQ6IGVtcHR5UGF5bWVudCwgaGFzUGF5bWVudFN1Y2NlZWRlZDogZmFsc2UgfTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VyOiBSZWR1Y2VyPFBheW1lbnRTdGF0ZT4gPSAoc3RhdGU6IFBheW1lbnRTdGF0ZSwgaW5jb21pbmdBY3Rpb246IEFjdGlvbikgPT4ge1xyXG5cdGNvbnN0IGFjdGlvbiA9IGluY29taW5nQWN0aW9uIGFzIEtub3duQWN0aW9uO1xyXG5cdHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuXHRcdGNhc2UgJ1NVQk1JVF9QQVlNRU5UJzpcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRwYXltZW50OiBhY3Rpb24ucGF5bWVudCxcclxuXHRcdFx0XHRpc0xvYWRpbmc6IHRydWUsXHJcblx0XHRcdFx0aGFzUGF5bWVudFN1Y2NlZWRlZDogZmFsc2VcclxuXHRcdFx0fTtcclxuXHRcdGNhc2UgJ1JFQ0VJVkVfR0VORVJJQ19SRVNVTFQnOlxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHBheW1lbnQ6IGVtcHR5UGF5bWVudCxcclxuXHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbGlkYXRpb25FcnJvck1lc3NhZ2U6IHVuZGVmaW5lZCxcclxuXHRcdFx0XHRoYXNQYXltZW50U3VjY2VlZGVkOiB0cnVlXHJcblx0XHRcdH07XHJcblx0XHRjYXNlICdWQUxJREFUSU9OX0VSUk9SJzpcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRwYXltZW50OiBzdGF0ZS5wYXltZW50LFxyXG5cdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXHJcblx0XHRcdFx0dmFsaWRhdGlvbkVycm9yTWVzc2FnZTogYWN0aW9uLmVycm9yTWVzc2FnZSxcclxuXHRcdFx0XHRoYXNQYXltZW50U3VjY2VlZGVkOiBmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRjb25zdCBleGhhdXN0aXZlQ2hlY2s6IG5ldmVyID0gYWN0aW9uO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHN0YXRlIHx8IHVubG9hZGVkU3RhdGU7XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3N0b3JlL1BheW1lbnQudHMiLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlLCBjb21iaW5lUmVkdWNlcnMsIEdlbmVyaWNTdG9yZUVuaGFuY2VyLCBTdG9yZSwgU3RvcmVFbmhhbmNlclN0b3JlQ3JlYXRvciwgUmVkdWNlcnNNYXBPYmplY3QgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XHJcbmltcG9ydCB7IHJvdXRlclJlZHVjZXIsIHJvdXRlck1pZGRsZXdhcmUgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xyXG5pbXBvcnQgKiBhcyBTdG9yZU1vZHVsZSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25TdGF0ZSwgcmVkdWNlcnMgfSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ2hpc3RvcnknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uZmlndXJlU3RvcmUoaGlzdG9yeTogSGlzdG9yeSwgaW5pdGlhbFN0YXRlPzogQXBwbGljYXRpb25TdGF0ZSkge1xyXG4gICAgLy8gQnVpbGQgbWlkZGxld2FyZS4gVGhlc2UgYXJlIGZ1bmN0aW9ucyB0aGF0IGNhbiBwcm9jZXNzIHRoZSBhY3Rpb25zIGJlZm9yZSB0aGV5IHJlYWNoIHRoZSBzdG9yZS5cclxuICAgIGNvbnN0IHdpbmRvd0lmRGVmaW5lZCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdyBhcyBhbnk7XHJcbiAgICAvLyBJZiBkZXZUb29scyBpcyBpbnN0YWxsZWQsIGNvbm5lY3QgdG8gaXRcclxuICAgIGNvbnN0IGRldlRvb2xzRXh0ZW5zaW9uID0gd2luZG93SWZEZWZpbmVkICYmIHdpbmRvd0lmRGVmaW5lZC5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fIGFzICgpID0+IEdlbmVyaWNTdG9yZUVuaGFuY2VyO1xyXG4gICAgY29uc3QgY3JlYXRlU3RvcmVXaXRoTWlkZGxld2FyZSA9IGNvbXBvc2UoXHJcbiAgICAgICAgYXBwbHlNaWRkbGV3YXJlKHRodW5rLCByb3V0ZXJNaWRkbGV3YXJlKGhpc3RvcnkpKSxcclxuICAgICAgICBkZXZUb29sc0V4dGVuc2lvbiA/IGRldlRvb2xzRXh0ZW5zaW9uKCkgOiA8Uz4obmV4dDogU3RvcmVFbmhhbmNlclN0b3JlQ3JlYXRvcjxTPikgPT4gbmV4dFxyXG4gICAgKShjcmVhdGVTdG9yZSk7XHJcblxyXG4gICAgLy8gQ29tYmluZSBhbGwgcmVkdWNlcnMgYW5kIGluc3RhbnRpYXRlIHRoZSBhcHAtd2lkZSBzdG9yZSBpbnN0YW5jZVxyXG4gICAgY29uc3QgYWxsUmVkdWNlcnMgPSBidWlsZFJvb3RSZWR1Y2VyKHJlZHVjZXJzKTtcclxuICAgIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmVXaXRoTWlkZGxld2FyZShhbGxSZWR1Y2VycywgaW5pdGlhbFN0YXRlKSBhcyBTdG9yZTxBcHBsaWNhdGlvblN0YXRlPjtcclxuXHJcbiAgICAvLyBFbmFibGUgV2VicGFjayBob3QgbW9kdWxlIHJlcGxhY2VtZW50IGZvciByZWR1Y2Vyc1xyXG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcclxuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgnLi9zdG9yZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmV4dFJvb3RSZWR1Y2VyID0gcmVxdWlyZTx0eXBlb2YgU3RvcmVNb2R1bGU+KCcuL3N0b3JlJyk7XHJcbiAgICAgICAgICAgIHN0b3JlLnJlcGxhY2VSZWR1Y2VyKGJ1aWxkUm9vdFJlZHVjZXIobmV4dFJvb3RSZWR1Y2VyLnJlZHVjZXJzKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0b3JlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZFJvb3RSZWR1Y2VyKGFsbFJlZHVjZXJzOiBSZWR1Y2Vyc01hcE9iamVjdCkge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVSZWR1Y2VyczxBcHBsaWNhdGlvblN0YXRlPihPYmplY3QuYXNzaWduKHt9LCBhbGxSZWR1Y2VycywgeyByb3V0aW5nOiByb3V0ZXJSZWR1Y2VyIH0pKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29uZmlndXJlU3RvcmUudHMiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IExheW91dCB9IGZyb20gJy4vY29tcG9uZW50cy9MYXlvdXQnO1xyXG5pbXBvcnQgSG9tZSBmcm9tICcuL2NvbXBvbmVudHMvSG9tZSc7XHJcbmltcG9ydCBTdWJtaXRQYXltZW50IGZyb20gJy4vY29tcG9uZW50cy9TdWJtaXRQYXltZW50JztcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0ZXMgPSA8TGF5b3V0PlxyXG4gICAgPFJvdXRlIGV4YWN0IHBhdGg9Jy8nIGNvbXBvbmVudD17IEhvbWUgfSAvPlxyXG4gICAgPFJvdXRlIHBhdGg9Jy9zdWJtaXRwYXltZW50JyBjb21wb25lbnQ9eyBTdWJtaXRQYXltZW50IGFzIGFueSB9IC8+XHJcbjwvTGF5b3V0PjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3JvdXRlcy50c3giLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxMzIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9hc3BuZXQtcHJlcmVuZGVyaW5nL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxMzcpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxMzkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vc2VydmVyLmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcclxuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHJlcGxhY2UgfSBmcm9tICdyZWFjdC1yb3V0ZXItcmVkdXgnO1xyXG5pbXBvcnQgeyBjcmVhdGVNZW1vcnlIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XHJcbmltcG9ydCB7IGNyZWF0ZVNlcnZlclJlbmRlcmVyLCBSZW5kZXJSZXN1bHQgfSBmcm9tICdhc3BuZXQtcHJlcmVuZGVyaW5nJztcclxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xyXG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAnLi9jb25maWd1cmVTdG9yZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTZXJ2ZXJSZW5kZXJlcihwYXJhbXMgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFJlbmRlclJlc3VsdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIC8vIFByZXBhcmUgUmVkdXggc3RvcmUgd2l0aCBpbi1tZW1vcnkgaGlzdG9yeSwgYW5kIGRpc3BhdGNoIGEgbmF2aWdhdGlvbiBldmVudFxyXG4gICAgICAgIC8vIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGluY29taW5nIFVSTFxyXG4gICAgICAgIGNvbnN0IGJhc2VuYW1lID0gcGFyYW1zLmJhc2VVcmwuc3Vic3RyaW5nKDAsIHBhcmFtcy5iYXNlVXJsLmxlbmd0aCAtIDEpOyAvLyBSZW1vdmUgdHJhaWxpbmcgc2xhc2hcclxuICAgICAgICBjb25zdCB1cmxBZnRlckJhc2VuYW1lID0gcGFyYW1zLnVybC5zdWJzdHJpbmcoYmFzZW5hbWUubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKGNyZWF0ZU1lbW9yeUhpc3RvcnkoKSk7XHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVwbGFjZSh1cmxBZnRlckJhc2VuYW1lKSk7XHJcblxyXG4gICAgICAgIC8vIFByZXBhcmUgYW4gaW5zdGFuY2Ugb2YgdGhlIGFwcGxpY2F0aW9uIGFuZCBwZXJmb3JtIGFuIGluaXRhbCByZW5kZXIgdGhhdCB3aWxsXHJcbiAgICAgICAgLy8gY2F1c2UgYW55IGFzeW5jIHRhc2tzIChlLmcuLCBkYXRhIGFjY2VzcykgdG8gYmVnaW5cclxuICAgICAgICBjb25zdCByb3V0ZXJDb250ZXh0OiBhbnkgPSB7fTtcclxuICAgICAgICBjb25zdCBhcHAgPSAoXHJcbiAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17IHN0b3JlIH0+XHJcbiAgICAgICAgICAgICAgICA8U3RhdGljUm91dGVyIGJhc2VuYW1lPXsgYmFzZW5hbWUgfSBjb250ZXh0PXsgcm91dGVyQ29udGV4dCB9IGxvY2F0aW9uPXsgcGFyYW1zLmxvY2F0aW9uLnBhdGggfSBjaGlsZHJlbj17IHJvdXRlcyB9IC8+XHJcbiAgICAgICAgICAgIDwvUHJvdmlkZXI+XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZW5kZXJUb1N0cmluZyhhcHApO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGVyZSdzIGEgcmVkaXJlY3Rpb24sIGp1c3Qgc2VuZCB0aGlzIGluZm9ybWF0aW9uIGJhY2sgdG8gdGhlIGhvc3QgYXBwbGljYXRpb25cclxuICAgICAgICBpZiAocm91dGVyQ29udGV4dC51cmwpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IHJlZGlyZWN0VXJsOiByb3V0ZXJDb250ZXh0LnVybCB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBPbmNlIGFueSBhc3luYyB0YXNrcyBhcmUgZG9uZSwgd2UgY2FuIHBlcmZvcm0gdGhlIGZpbmFsIHJlbmRlclxyXG4gICAgICAgIC8vIFdlIGFsc28gc2VuZCB0aGUgcmVkdXggc3RvcmUgc3RhdGUsIHNvIHRoZSBjbGllbnQgY2FuIGNvbnRpbnVlIGV4ZWN1dGlvbiB3aGVyZSB0aGUgc2VydmVyIGxlZnQgb2ZmXHJcbiAgICAgICAgcGFyYW1zLmRvbWFpblRhc2tzLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgIGh0bWw6IHJlbmRlclRvU3RyaW5nKGFwcCksXHJcbiAgICAgICAgICAgICAgICBnbG9iYWxzOiB7IGluaXRpYWxSZWR1eFN0YXRlOiBzdG9yZS5nZXRTdGF0ZSgpIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgcmVqZWN0KTsgLy8gQWxzbyBwcm9wYWdhdGUgYW55IGVycm9ycyBiYWNrIGludG8gdGhlIGhvc3QgYXBwbGljYXRpb25cclxuICAgIH0pO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSb3V0ZUNvbXBvbmVudFByb3BzPHt9Piwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcblx0XHRcdDxkaXZcclxuXHRcdFx0XHRjbGFzc05hbWU9J2ZiLWxvZ2luLWJ1dHRvbidcclxuXHRcdFx0XHRkYXRhLW1heC1yb3dzPScxJ1xyXG5cdFx0XHRcdGRhdGEtc2l6ZT0nbGFyZ2UnXHJcblx0XHRcdFx0ZGF0YS1idXR0b24tdHlwZT0nY29udGludWVfd2l0aCdcclxuXHRcdFx0XHRkYXRhLXNob3ctZmFjZXM9J2ZhbHNlJ1xyXG5cdFx0XHRcdGRhdGEtYXV0by1sb2dvdXQtbGluaz0nZmFsc2UnXHJcblx0XHRcdFx0ZGF0YS11c2UtY29udGludWUtYXM9J2ZhbHNlJz5cclxuXHRcdFx0PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL0hvbWUudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwge30+IHtcclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPSdjb250YWluZXItZmx1aWQnPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93Jz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtc20tMTInPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL0xheW91dC50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uU3RhdGUgfSBmcm9tICcuLi9zdG9yZSc7XHJcbmltcG9ydCAqIGFzIFBheW1lbnRTdGF0ZSBmcm9tICcuLi9zdG9yZS9QYXltZW50JztcclxuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XHJcbmltcG9ydCB7IEZvcm1FdmVudCwgQ2hhbmdlRXZlbnQgfSBmcm9tICdyZWFjdCc7XHJcblxyXG50eXBlIFBheW1lbnRQcm9wcyA9XHJcblx0UGF5bWVudFN0YXRlLlBheW1lbnRTdGF0ZVxyXG5cdCYgdHlwZW9mIFBheW1lbnRTdGF0ZS5hY3Rpb25DcmVhdG9ycztcclxuXHJcbmNsYXNzIFN1Ym1pdFBheW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UGF5bWVudFByb3BzLCB7fT4ge1xyXG5cdHByaXZhdGUgb25DYXJkTnVtYmVyQ2hhbmdlKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcblx0XHR0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlciA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuXHRcdGlmICghZS50YXJnZXQudmFsdWUubWF0Y2goL1swLTldezE2fS9nKSkge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVyRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciAxNiBkaWdpdHMnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVySGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVyRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbk5hbWVPbkNhcmRDaGFuZ2UoZTogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pIHtcclxuXHRcdHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG5cdFx0aWYgKGUudGFyZ2V0LnZhbHVlLmxlbmd0aCA8IDIpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmRIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBuYW1lJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25FeHBpcnlNb250aENoYW5nZShlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG5cdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG5cdFx0aWYgKCFlLnRhcmdldC52YWx1ZS5tYXRjaCgvWzAtOV0rL2cpXHJcblx0XHRcdHx8IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSA8IDFcclxuXHRcdFx0fHwgcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpID4gMTIpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG1vbnRoJztcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHBhcnNlSW50KHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyKSA9PT0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXHJcblx0XHRcdCYmIHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSA8PSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgYSBmdXR1cmUgbW9udGgnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uRXhwaXJ5WWVhckNoYW5nZShlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG5cdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXIgPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcblx0XHRpZiAoIWUudGFyZ2V0LnZhbHVlLm1hdGNoKC9bMC05XXs0fS9nKSkge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIHllYXInO1xyXG5cclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAocGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIDwgbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGN1cnJlbnQgb3IgZnV0dXJlIHllYXInO1xyXG5cclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAocGFyc2VJbnQoZS50YXJnZXQudmFsdWUpID09IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxyXG5cdFx0XHQmJiBwYXJzZUludCh0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGgpIDw9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhIGZ1dHVyZSBtb250aCc7XHJcblxyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2UgPSAnJztcclxuXHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvblNlY3VyaXR5Q29kZUNoYW5nZShlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG5cdFx0dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuXHRcdGlmICghZS50YXJnZXQudmFsdWUubWF0Y2goL1swLTldezIsNH0vZykpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGVFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgc2VjdXJpdHkgY29kZSc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHJlbmRlcigpIHtcclxuXHRcdHZhciBjYXJkTnVtYmVyRXJyb3IgPSB0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckhhc0Vycm9yc1xyXG5cdFx0XHQ/IDxzcGFuIGlkPVwiY2FyZC1udW1iZXItZXJyb3JcIiBzdHlsZT17eyBjb2xvcjogXCJyZWRcIiB9fT57dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJFcnJvck1lc3NhZ2V9PC9zcGFuPlxyXG5cdFx0XHQ6IDxzcGFuIGlkPVwiY2FyZC1udW1iZXItZXJyb3JcIj48L3NwYW4+O1xyXG5cclxuXHRcdHZhciBuYW1lT25DYXJkRXJyb3IgPSB0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9yc1xyXG5cdFx0XHQ/IDxzcGFuIGlkPVwibmFtZS1vbi1jYXJkLWVycm9yXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkRXJyb3JNZXNzYWdlfTwvc3Bhbj5cclxuXHRcdFx0OiA8c3BhbiBpZD1cIm5hbWUtb24tY2FyZC1lcnJvclwiPjwvc3Bhbj47XHJcblxyXG5cdFx0dmFyIGV4cGlyeU1vbnRoRXJyb3IgPSB0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnNcclxuXHRcdFx0PyA8c3BhbiBpZD1cImV4cGlyeS1tb250aC1lcnJvclwiIHN0eWxlPXt7IGNvbG9yOiBcInJlZFwiIH19Pnt0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2V9PC9zcGFuPlxyXG5cdFx0XHQ6IDxzcGFuIGlkPVwiZXhwaXJ5LW1vbnRoLWVycm9yXCI+PC9zcGFuPjtcclxuXHJcblx0XHR2YXIgZXhwaXJ5WWVhckVycm9yID0gdGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJIYXNFcnJvcnNcclxuXHRcdFx0PyA8c3BhbiBpZD1cImV4cGlyeS15ZWFyLWVycm9yXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyRXJyb3JNZXNzYWdlfTwvc3Bhbj5cclxuXHRcdFx0OiA8c3BhbiBpZD1cImV4cGlyeS15ZWFyLWVycm9yXCI+PC9zcGFuPjtcclxuXHJcblx0XHR2YXIgc2VjdXJpdHlDb2RlRXJyb3IgPSB0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlSGFzRXJyb3JzXHJcblx0XHRcdD8gPHNwYW4gaWQ9XCJzZWN1cml0eS1jb2RlLWVycm9yXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGVFcnJvck1lc3NhZ2V9PC9zcGFuPlxyXG5cdFx0XHQ6IDxzcGFuIGlkPVwic2VjdXJpdHktY29kZS1lcnJvclwiPjwvc3Bhbj47XHJcblxyXG5cdFx0dmFyIGlzQnV0dG9uRGlzYWJsZWQgPSB0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckhhc0Vycm9yc1xyXG5cdFx0XHR8fCB0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9yc1xyXG5cdFx0XHR8fCB0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnNcclxuXHRcdFx0fHwgdGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJIYXNFcnJvcnNcclxuXHRcdFx0fHwgdGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUhhc0Vycm9ycztcclxuXHJcblx0XHR2YXIgc3VjY2Vzc0FsZXJ0ID0gdGhpcy5wcm9wcy5oYXNQYXltZW50U3VjY2VlZGVkXHJcblx0XHRcdD8gPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlXCIgcm9sZT1cImFsZXJ0XCI+XHJcblx0XHRcdFx0UGF5bWVudCBvZiAxIGV1cm8gc3VjY2VlZGVkXHJcblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxyXG5cdFx0XHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cclxuXHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDogbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gPGRpdj5cclxuXHRcdFx0eyBzdWNjZXNzQWxlcnQgfVxyXG5cdFx0XHQ8c3BhbiBpZD1cImZvcm0tdmFsaWRhdGlvbi1lcnJvcnNcIiBzdHlsZT17eyBjb2xvcjogXCJyZWRcIiB9fT57dGhpcy5wcm9wcy52YWxpZGF0aW9uRXJyb3JNZXNzYWdlfTwvc3Bhbj5cclxuXHRcdFx0PGZvcm0gb25TdWJtaXQ9eyhlKSA9PiB7IHRoaXMucHJvcHMuc3VibWl0UGF5bWVudCh0aGlzLnByb3BzLnBheW1lbnQpOyB9fT5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwiY2FyZC1udW1iZXJcIiBjbGFzc05hbWU9e1wiZm9ybS1ncm91cCByb3cgXCIgKyAodGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJIYXNFcnJvcnMgPyAnaGFzLWVycm9yJyA6ICcnKX0+XHJcblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiIGNvbnRyb2wtbGFiZWwgY29sLW1kLTEyXCIgaHRtbEZvcj1cImNhcmROdW1iZXJcIj5DYXJkIG51bWJlcjwvbGFiZWw+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcblx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJjYXJkTnVtYmVyXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlcn0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uQ2FyZE51bWJlckNoYW5nZShlKX0gcmVxdWlyZWQgbWF4TGVuZ3RoPXsxNn0gcGF0dGVybj1cIl5bMC05XXsxNn0kXCIgLz5cclxuXHRcdFx0XHRcdFx0eyBjYXJkTnVtYmVyRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cIm5hbWUtb24tY2FyZFwiIGNsYXNzTmFtZT17XCJmb3JtLWdyb3VwIHJvdyBcIiArICh0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9ycyA/ICdoYXMtZXJyb3InIDogJycpfT5cclxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsIGNvbC1tZC0xMlwiIGh0bWxGb3I9XCJuYW1lT25DYXJkXCI+TmFtZSBvbiBjYXJkPC9sYWJlbD5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVPbkNhcmRcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkfSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25OYW1lT25DYXJkQ2hhbmdlKGUpfSByZXF1aXJlZCBtYXhMZW5ndGg9ezEwMH0gLz5cclxuXHRcdFx0XHRcdFx0eyBuYW1lT25DYXJkRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cImV4cGlyeS1tb250aFwiIGNsYXNzTmFtZT17XCJmb3JtLWdyb3VwIHJvdyBcIiArICh0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPyAnaGFzLWVycm9yJyA6ICcnKX0+XHJcblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbCBjb2wtbWQtMTJcIiBodG1sRm9yPVwiZXhwaXJ5TW9udGhcIj5FeHBpcnkgbW9udGg8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cIm51bWJlclwiIG5hbWU9XCJleHBpcnlNb250aFwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRofSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25FeHBpcnlNb250aENoYW5nZShlKX0gcmVxdWlyZWQgbWF4TGVuZ3RoPXsyfSBwYXR0ZXJuPVwiXlswLTldKyRcIiAvPlxyXG5cdFx0XHRcdFx0XHR7IGV4cGlyeU1vbnRoRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cImV4cGlyeS15ZWFyXCIgY2xhc3NOYW1lPXtcImZvcm0tZ3JvdXAgcm93IFwiICsgKHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzID8gJ2hhcy1lcnJvcicgOiAnJyl9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWwgY29sLW1kLTEyXCIgaHRtbEZvcj1cImV4cGlyeVllYXJcIj5FeHBpcnkgeWVhcjwvbGFiZWw+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcblx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwibnVtYmVyXCIgbmFtZT1cImV4cGlyeVllYXJcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyfSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25FeHBpcnlZZWFyQ2hhbmdlKGUpfSByZXF1aXJlZCBtYXhMZW5ndGg9ezR9IHBhdHRlcm49XCJeWzAtOV17NH0kXCIgLz5cclxuXHRcdFx0XHRcdFx0eyBleHBpcnlZZWFyRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cInNlY3VyaXR5LWNvZGVcIiBjbGFzc05hbWU9e1wiZm9ybS1ncm91cCByb3cgXCIgKyAodGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUhhc0Vycm9ycyA/ICdoYXMtZXJyb3InIDogJycpfT5cclxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsIGNvbC1tZC0xMlwiIGh0bWxGb3I9XCJzZWN1cml0eUNvZGVcIj5TZWN1cml0eSBjb2RlPC9sYWJlbD5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlY3VyaXR5Q29kZVwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZX0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uU2VjdXJpdHlDb2RlQ2hhbmdlKGUpfSByZXF1aXJlZCBtYXhMZW5ndGg9ezR9IHBhdHRlcm49XCJeWzAtOV17Miw0fSRcIiAvPlxyXG5cdFx0XHRcdFx0XHR7IHNlY3VyaXR5Q29kZUVycm9yIH1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGlzYWJsZWQ9e2lzQnV0dG9uRGlzYWJsZWR9PlxyXG5cdFx0XHRcdFx0XHRQYXkgbm93XHJcblx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9mb3JtPlxyXG5cdFx0PC9kaXY+O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuXHQoc3RhdGU6IEFwcGxpY2F0aW9uU3RhdGUpID0+IHN0YXRlLnBheW1lbnQsXHJcblx0UGF5bWVudFN0YXRlLmFjdGlvbkNyZWF0b3JzXHJcbikoU3VibWl0UGF5bWVudCkgYXMgdHlwZW9mIFN1Ym1pdFBheW1lbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL1N1Ym1pdFBheW1lbnQudHN4IiwiaW1wb3J0ICogYXMgUGF5bWVudCBmcm9tICcuL1BheW1lbnQnO1xyXG5cclxuLy8gVGhlIHRvcC1sZXZlbCBzdGF0ZSBvYmplY3RcclxuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGlvblN0YXRlIHtcclxuXHRwYXltZW50OiBQYXltZW50LlBheW1lbnRTdGF0ZVxyXG59XHJcblxyXG4vLyBXaGVuZXZlciBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCwgUmVkdXggd2lsbCB1cGRhdGUgZWFjaCB0b3AtbGV2ZWwgYXBwbGljYXRpb24gc3RhdGUgcHJvcGVydHkgdXNpbmdcclxuLy8gdGhlIHJlZHVjZXIgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZS4gSXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgbmFtZXMgbWF0Y2ggZXhhY3RseSwgYW5kIHRoYXQgdGhlIHJlZHVjZXJcclxuLy8gYWN0cyBvbiB0aGUgY29ycmVzcG9uZGluZyBBcHBsaWNhdGlvblN0YXRlIHByb3BlcnR5IHR5cGUuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VycyA9IHtcclxuXHRwYXltZW50OiBQYXltZW50LnJlZHVjZXJcclxufTtcclxuXHJcbi8vIFRoaXMgdHlwZSBjYW4gYmUgdXNlZCBhcyBhIGhpbnQgb24gYWN0aW9uIGNyZWF0b3JzIHNvIHRoYXQgaXRzICdkaXNwYXRjaCcgYW5kICdnZXRTdGF0ZScgcGFyYW1zIGFyZVxyXG4vLyBjb3JyZWN0bHkgdHlwZWQgdG8gbWF0Y2ggeW91ciBzdG9yZS5cclxuZXhwb3J0IGludGVyZmFjZSBBcHBUaHVua0FjdGlvbjxUQWN0aW9uPiB7XHJcbiAgICAoZGlzcGF0Y2g6IChhY3Rpb246IFRBY3Rpb24pID0+IHZvaWQsIGdldFN0YXRlOiAoKSA9PiBBcHBsaWNhdGlvblN0YXRlKTogdm9pZDtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxMzUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDE0Myk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDcwKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==