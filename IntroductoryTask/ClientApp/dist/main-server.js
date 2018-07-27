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
        if (e.target.value.length <= 0) {
            this.props.payment.nameOnCardHasErrors = true;
            this.props.payment.nameOnCardErrorMessage = 'Please enter a name';
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
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { style: { color: "red" } }, this.props.validationErrorMessage),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTIyMjNmNTQyY2YwZTgxODM0NmUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL1BheW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9yb3V0ZXMudHN4Iiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZS50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9TdWJtaXRQYXltZW50LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUEscUM7Ozs7OztBQ0FBLDZDOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FzQztBQStDL0IsSUFBTSxj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LElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBQyxDQUFDLElBQUssWUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUE1QixDQUE0QixFQUFFLFFBQVEsUUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBQyxjQUFjLEdBQUc7d0JBQzVNLGlCQUFpQixDQUNkLENBQ0Q7Z0JBQ04sOERBQUssU0FBUyxFQUFDLFlBQVk7b0JBQzFCLGlFQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLGlCQUFpQixFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsY0FFbkUsQ0FDSixDQUNBLENBQ0YsQ0FBQztJQUNSLENBQUM7SUFDRixvQkFBQztBQUFELENBQUMsQ0EzTDJCLGdEQUFlLEdBMkwxQztBQUVELHlEQUFlLDJFQUFPLENBQ3JCLFVBQUMsS0FBdUIsSUFBSyxZQUFLLENBQUMsT0FBTyxFQUFiLENBQWEsRUFDMUMsc0VBQTJCLENBQzNCLENBQUMsYUFBYSxDQUF5QixFQUFDOzs7Ozs7Ozs7O0FDM01KO0FBT3JDLHNHQUFzRztBQUN0Ryx3R0FBd0c7QUFDeEcsNERBQTREO0FBQ3JELElBQU0sUUFBUSxHQUFHO0lBQ3ZCLE9BQU8sRUFBRSx5REFBZTtDQUN4QixDQUFDOzs7Ozs7O0FDWkYsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7QUNBQSw4QyIsImZpbGUiOiJtYWluLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTIyMjNmNTQyY2YwZTgxODM0NmUiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3ZlbmRvclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIi4vdmVuZG9yXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoNik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDApO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDE0MSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDE0Mik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgYWRkVGFzayB9IGZyb20gXCJkb21haW4tdGFza1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXJBY3Rpb24sIHB1c2gsIHJvdXRlckFjdGlvbnMgfSBmcm9tIFwicmVhY3Qtcm91dGVyLXJlZHV4XCI7XHJcbmltcG9ydCB7IEFwcFRodW5rQWN0aW9uIH0gZnJvbSBcIkNsaWVudEFwcC9zdG9yZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb24sIFJlZHVjZXIgfSBmcm9tIFwicmVkdXhcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudCB7XHJcblx0Y2FyZE51bWJlckhhc0Vycm9yczogYm9vbGVhbjtcclxuXHRjYXJkTnVtYmVyRXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblx0Y2FyZE51bWJlcjogc3RyaW5nO1xyXG5cdG5hbWVPbkNhcmRIYXNFcnJvcnM6IGJvb2xlYW47XHJcblx0bmFtZU9uQ2FyZEVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG5cdG5hbWVPbkNhcmQ6IHN0cmluZztcclxuXHRleHBpcnlNb250aEhhc0Vycm9yczogYm9vbGVhbjtcclxuXHRleHBpcnlNb250aEVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG5cdGV4cGlyeU1vbnRoOiBzdHJpbmc7XHJcblx0ZXhwaXJ5WWVhckhhc0Vycm9yczogYm9vbGVhbjtcclxuXHRleHBpcnlZZWFyRXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblx0ZXhwaXJ5WWVhcjogc3RyaW5nO1xyXG5cdHNlY3VyaXR5Q29kZUhhc0Vycm9yczogYm9vbGVhbjtcclxuXHRzZWN1cml0eUNvZGVFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuXHRzZWN1cml0eUNvZGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXltZW50U3RhdGUge1xyXG5cdGlzTG9hZGluZzogYm9vbGVhbjtcclxuXHRwYXltZW50OiBQYXltZW50O1xyXG5cdHZhbGlkYXRpb25FcnJvck1lc3NhZ2U/OiBzdHJpbmc7XHJcblx0aGFzUGF5bWVudFN1Y2NlZWRlZDogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFN1Ym1pdFBheW1lbnRBY3Rpb24ge1xyXG5cdHR5cGU6ICdTVUJNSVRfUEFZTUVOVCc7XHJcblx0cGF5bWVudDogUGF5bWVudDtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlY2VpdmVHZW5lcmljUmVzdWx0QWN0aW9uIHtcclxuXHR0eXBlOiAnUkVDRUlWRV9HRU5FUklDX1JFU1VMVCc7XHJcblx0c3VjY2Vzc01lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIFZhbGlkYXRpb25FcnJvckFjdGlvbiB7XHJcblx0dHlwZTogJ1ZBTElEQVRJT05fRVJST1InO1xyXG5cdGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG59XHJcblxyXG50eXBlIEtub3duQWN0aW9uID0gU3VibWl0UGF5bWVudEFjdGlvbiB8IFJlY2VpdmVHZW5lcmljUmVzdWx0QWN0aW9uIHwgVmFsaWRhdGlvbkVycm9yQWN0aW9uO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFjdGlvbkNyZWF0b3JzID0ge1xyXG5cdHN1Ym1pdFBheW1lbnQ6IChwYXltZW50OiBQYXltZW50KTogQXBwVGh1bmtBY3Rpb248YW55PiA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcblx0XHQoPGFueT53aW5kb3cpLkZCLmFwaSgnL21lJywgJ2dldCcsIHsgZmllbGRzOiAnZW1haWwnIH0sIGZ1bmN0aW9uIChmYlJlc3BvbnNlOiBhbnkpIHtcclxuXHRcdFx0KDxhbnk+d2luZG93KS5wYXltaWxsLmNyZWF0ZVRva2VuKHtcclxuXHRcdFx0XHRudW1iZXI6IHBheW1lbnQuY2FyZE51bWJlcixcclxuXHRcdFx0XHRleHBfbW9udGg6IHBheW1lbnQuZXhwaXJ5TW9udGgsXHJcblx0XHRcdFx0ZXhwX3llYXI6IHBheW1lbnQuZXhwaXJ5WWVhcixcclxuXHRcdFx0XHRjdmM6IHBheW1lbnQuc2VjdXJpdHlDb2RlLFxyXG5cdFx0XHRcdGFtb3VudF9pbnQ6IDEwMCxcclxuXHRcdFx0XHRjdXJyZW5jeTogJ0VVUicsXHJcblx0XHRcdFx0Y2FyZGhvbGRlcjogcGF5bWVudC5uYW1lT25DYXJkLFxyXG5cdFx0XHRcdGVtYWlsOiBmYlJlc3BvbnNlLmVtYWlsXHJcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnJvcjogYW55LCByZXN1bHQ6IGFueSkge1xyXG5cdFx0XHRcdGlmIChlcnJvcikge1xyXG5cdFx0XHRcdFx0ZGlzcGF0Y2goeyB0eXBlOiAnVkFMSURBVElPTl9FUlJPUicsIGVycm9yTWVzc2FnZTogZXJyb3IuYXBpZXJyb3IgfSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFyIHBheW1pbGxUb2tlbiA9IHJlc3VsdC50b2tlbjtcclxuXHRcdFx0XHRcdHZhciBhcGlNZXRob2RVcmwgPSBgYXBpL1N1Ym1pdFBheW1lbnQvU2F2ZWA7XHJcblx0XHRcdFx0XHR2YXIgYXBpTWV0aG9kVHlwZSA9IGBwb3N0YDtcclxuXHRcdFx0XHRcdGxldCBmZXRjaFRhc2sgPSBmZXRjaChhcGlNZXRob2RVcmwsIHtcclxuXHRcdFx0XHRcdFx0bWV0aG9kOiBhcGlNZXRob2RUeXBlLFxyXG5cdFx0XHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShwYXltaWxsVG9rZW4pLFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8bnVtYmVyPilcclxuXHRcdFx0XHRcdFx0LnRoZW4oZGF0YSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKHsgdHlwZTogJ1ZBTElEQVRJT05fRVJST1InLCBlcnJvck1lc3NhZ2U6IGRhdGEgfSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2goeyB0eXBlOiAnUkVDRUlWRV9HRU5FUklDX1JFU1VMVCcgfSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRhZGRUYXNrKGZldGNoVGFzayk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHRkaXNwYXRjaCh7IHR5cGU6ICdTVUJNSVRfUEFZTUVOVCcsIHBheW1lbnQ6IHBheW1lbnQgfSk7XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgZW1wdHlQYXltZW50OiBQYXltZW50ID0ge1xyXG5cdGNhcmROdW1iZXJIYXNFcnJvcnM6IGZhbHNlLCBjYXJkTnVtYmVyRXJyb3JNZXNzYWdlOiAnJywgY2FyZE51bWJlcjogJycsXHJcblx0bmFtZU9uQ2FyZEhhc0Vycm9yczogZmFsc2UsIG5hbWVPbkNhcmRFcnJvck1lc3NhZ2U6ICcnLCBuYW1lT25DYXJkOiAnJyxcclxuXHRleHBpcnlNb250aEhhc0Vycm9yczogZmFsc2UsIGV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlOiAnJywgZXhwaXJ5TW9udGg6ICcnLFxyXG5cdGV4cGlyeVllYXJIYXNFcnJvcnM6IGZhbHNlLCBleHBpcnlZZWFyRXJyb3JNZXNzYWdlOiAnJywgZXhwaXJ5WWVhcjogJycsXHJcblx0c2VjdXJpdHlDb2RlSGFzRXJyb3JzOiBmYWxzZSwgc2VjdXJpdHlDb2RlRXJyb3JNZXNzYWdlOiAnJywgc2VjdXJpdHlDb2RlOiAnJ1xyXG59XHJcbmNvbnN0IHVubG9hZGVkU3RhdGU6IFBheW1lbnRTdGF0ZSA9IHsgaXNMb2FkaW5nOiBmYWxzZSwgcGF5bWVudDogZW1wdHlQYXltZW50LCBoYXNQYXltZW50U3VjY2VlZGVkOiBmYWxzZSB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXI6IFJlZHVjZXI8UGF5bWVudFN0YXRlPiA9IChzdGF0ZTogUGF5bWVudFN0YXRlLCBpbmNvbWluZ0FjdGlvbjogQWN0aW9uKSA9PiB7XHJcblx0Y29uc3QgYWN0aW9uID0gaW5jb21pbmdBY3Rpb24gYXMgS25vd25BY3Rpb247XHJcblx0c3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG5cdFx0Y2FzZSAnU1VCTUlUX1BBWU1FTlQnOlxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHBheW1lbnQ6IGFjdGlvbi5wYXltZW50LFxyXG5cdFx0XHRcdGlzTG9hZGluZzogdHJ1ZSxcclxuXHRcdFx0XHRoYXNQYXltZW50U3VjY2VlZGVkOiBmYWxzZVxyXG5cdFx0XHR9O1xyXG5cdFx0Y2FzZSAnUkVDRUlWRV9HRU5FUklDX1JFU1VMVCc6XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0cGF5bWVudDogZW1wdHlQYXltZW50LFxyXG5cdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXHJcblx0XHRcdFx0dmFsaWRhdGlvbkVycm9yTWVzc2FnZTogdW5kZWZpbmVkLFxyXG5cdFx0XHRcdGhhc1BheW1lbnRTdWNjZWVkZWQ6IHRydWVcclxuXHRcdFx0fTtcclxuXHRcdGNhc2UgJ1ZBTElEQVRJT05fRVJST1InOlxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHBheW1lbnQ6IHN0YXRlLnBheW1lbnQsXHJcblx0XHRcdFx0aXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHR2YWxpZGF0aW9uRXJyb3JNZXNzYWdlOiBhY3Rpb24uZXJyb3JNZXNzYWdlLFxyXG5cdFx0XHRcdGhhc1BheW1lbnRTdWNjZWVkZWQ6IGZhbHNlXHJcblx0XHRcdH1cclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdGNvbnN0IGV4aGF1c3RpdmVDaGVjazogbmV2ZXIgPSBhY3Rpb247XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3RhdGUgfHwgdW5sb2FkZWRTdGF0ZTtcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvc3RvcmUvUGF5bWVudC50cyIsImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UsIGNvbWJpbmVSZWR1Y2VycywgR2VuZXJpY1N0b3JlRW5oYW5jZXIsIFN0b3JlLCBTdG9yZUVuaGFuY2VyU3RvcmVDcmVhdG9yLCBSZWR1Y2Vyc01hcE9iamVjdCB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcclxuaW1wb3J0IHsgcm91dGVyUmVkdWNlciwgcm91dGVyTWlkZGxld2FyZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XHJcbmltcG9ydCAqIGFzIFN0b3JlTW9kdWxlIGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlLCByZWR1Y2VycyB9IGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShoaXN0b3J5OiBIaXN0b3J5LCBpbml0aWFsU3RhdGU/OiBBcHBsaWNhdGlvblN0YXRlKSB7XHJcbiAgICAvLyBCdWlsZCBtaWRkbGV3YXJlLiBUaGVzZSBhcmUgZnVuY3Rpb25zIHRoYXQgY2FuIHByb2Nlc3MgdGhlIGFjdGlvbnMgYmVmb3JlIHRoZXkgcmVhY2ggdGhlIHN0b3JlLlxyXG4gICAgY29uc3Qgd2luZG93SWZEZWZpbmVkID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogd2luZG93IGFzIGFueTtcclxuICAgIC8vIElmIGRldlRvb2xzIGlzIGluc3RhbGxlZCwgY29ubmVjdCB0byBpdFxyXG4gICAgY29uc3QgZGV2VG9vbHNFeHRlbnNpb24gPSB3aW5kb3dJZkRlZmluZWQgJiYgd2luZG93SWZEZWZpbmVkLl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18gYXMgKCkgPT4gR2VuZXJpY1N0b3JlRW5oYW5jZXI7XHJcbiAgICBjb25zdCBjcmVhdGVTdG9yZVdpdGhNaWRkbGV3YXJlID0gY29tcG9zZShcclxuICAgICAgICBhcHBseU1pZGRsZXdhcmUodGh1bmssIHJvdXRlck1pZGRsZXdhcmUoaGlzdG9yeSkpLFxyXG4gICAgICAgIGRldlRvb2xzRXh0ZW5zaW9uID8gZGV2VG9vbHNFeHRlbnNpb24oKSA6IDxTPihuZXh0OiBTdG9yZUVuaGFuY2VyU3RvcmVDcmVhdG9yPFM+KSA9PiBuZXh0XHJcbiAgICApKGNyZWF0ZVN0b3JlKTtcclxuXHJcbiAgICAvLyBDb21iaW5lIGFsbCByZWR1Y2VycyBhbmQgaW5zdGFudGlhdGUgdGhlIGFwcC13aWRlIHN0b3JlIGluc3RhbmNlXHJcbiAgICBjb25zdCBhbGxSZWR1Y2VycyA9IGJ1aWxkUm9vdFJlZHVjZXIocmVkdWNlcnMpO1xyXG4gICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZVdpdGhNaWRkbGV3YXJlKGFsbFJlZHVjZXJzLCBpbml0aWFsU3RhdGUpIGFzIFN0b3JlPEFwcGxpY2F0aW9uU3RhdGU+O1xyXG5cclxuICAgIC8vIEVuYWJsZSBXZWJwYWNrIGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQgZm9yIHJlZHVjZXJzXHJcbiAgICBpZiAobW9kdWxlLmhvdCkge1xyXG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCcuL3N0b3JlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0Um9vdFJlZHVjZXIgPSByZXF1aXJlPHR5cGVvZiBTdG9yZU1vZHVsZT4oJy4vc3RvcmUnKTtcclxuICAgICAgICAgICAgc3RvcmUucmVwbGFjZVJlZHVjZXIoYnVpbGRSb290UmVkdWNlcihuZXh0Um9vdFJlZHVjZXIucmVkdWNlcnMpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RvcmU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkUm9vdFJlZHVjZXIoYWxsUmVkdWNlcnM6IFJlZHVjZXJzTWFwT2JqZWN0KSB7XHJcbiAgICByZXR1cm4gY29tYmluZVJlZHVjZXJzPEFwcGxpY2F0aW9uU3RhdGU+KE9iamVjdC5hc3NpZ24oe30sIGFsbFJlZHVjZXJzLCB7IHJvdXRpbmc6IHJvdXRlclJlZHVjZXIgfSkpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb25maWd1cmVTdG9yZS50cyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgTGF5b3V0IH0gZnJvbSAnLi9jb21wb25lbnRzL0xheW91dCc7XHJcbmltcG9ydCBIb21lIGZyb20gJy4vY29tcG9uZW50cy9Ib21lJztcclxuaW1wb3J0IFN1Ym1pdFBheW1lbnQgZnJvbSAnLi9jb21wb25lbnRzL1N1Ym1pdFBheW1lbnQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IDxMYXlvdXQ+XHJcbiAgICA8Um91dGUgZXhhY3QgcGF0aD0nLycgY29tcG9uZW50PXsgSG9tZSB9IC8+XHJcbiAgICA8Um91dGUgcGF0aD0nL3N1Ym1pdHBheW1lbnQnIGNvbXBvbmVudD17IFN1Ym1pdFBheW1lbnQgYXMgYW55IH0gLz5cclxuPC9MYXlvdXQ+O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvcm91dGVzLnRzeCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDEzMik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2FzcG5ldC1wcmVyZW5kZXJpbmcvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDEzNyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2hpc3RvcnkvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDEzOSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgcmVwbGFjZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XHJcbmltcG9ydCB7IGNyZWF0ZU1lbW9yeUhpc3RvcnkgfSBmcm9tICdoaXN0b3J5JztcclxuaW1wb3J0IHsgY3JlYXRlU2VydmVyUmVuZGVyZXIsIFJlbmRlclJlc3VsdCB9IGZyb20gJ2FzcG5ldC1wcmVyZW5kZXJpbmcnO1xyXG5pbXBvcnQgeyByb3V0ZXMgfSBmcm9tICcuL3JvdXRlcyc7XHJcbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tICcuL2NvbmZpZ3VyZVN0b3JlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNlcnZlclJlbmRlcmVyKHBhcmFtcyA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8UmVuZGVyUmVzdWx0PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgLy8gUHJlcGFyZSBSZWR1eCBzdG9yZSB3aXRoIGluLW1lbW9yeSBoaXN0b3J5LCBhbmQgZGlzcGF0Y2ggYSBuYXZpZ2F0aW9uIGV2ZW50XHJcbiAgICAgICAgLy8gY29ycmVzcG9uZGluZyB0byB0aGUgaW5jb21pbmcgVVJMXHJcbiAgICAgICAgY29uc3QgYmFzZW5hbWUgPSBwYXJhbXMuYmFzZVVybC5zdWJzdHJpbmcoMCwgcGFyYW1zLmJhc2VVcmwubGVuZ3RoIC0gMSk7IC8vIFJlbW92ZSB0cmFpbGluZyBzbGFzaFxyXG4gICAgICAgIGNvbnN0IHVybEFmdGVyQmFzZW5hbWUgPSBwYXJhbXMudXJsLnN1YnN0cmluZyhiYXNlbmFtZS5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoY3JlYXRlTWVtb3J5SGlzdG9yeSgpKTtcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChyZXBsYWNlKHVybEFmdGVyQmFzZW5hbWUpKTtcclxuXHJcbiAgICAgICAgLy8gUHJlcGFyZSBhbiBpbnN0YW5jZSBvZiB0aGUgYXBwbGljYXRpb24gYW5kIHBlcmZvcm0gYW4gaW5pdGFsIHJlbmRlciB0aGF0IHdpbGxcclxuICAgICAgICAvLyBjYXVzZSBhbnkgYXN5bmMgdGFza3MgKGUuZy4sIGRhdGEgYWNjZXNzKSB0byBiZWdpblxyXG4gICAgICAgIGNvbnN0IHJvdXRlckNvbnRleHQ6IGFueSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGFwcCA9IChcclxuICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXsgc3RvcmUgfT5cclxuICAgICAgICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgYmFzZW5hbWU9eyBiYXNlbmFtZSB9IGNvbnRleHQ9eyByb3V0ZXJDb250ZXh0IH0gbG9jYXRpb249eyBwYXJhbXMubG9jYXRpb24ucGF0aCB9IGNoaWxkcmVuPXsgcm91dGVzIH0gLz5cclxuICAgICAgICAgICAgPC9Qcm92aWRlcj5cclxuICAgICAgICApO1xyXG4gICAgICAgIHJlbmRlclRvU3RyaW5nKGFwcCk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZXJlJ3MgYSByZWRpcmVjdGlvbiwganVzdCBzZW5kIHRoaXMgaW5mb3JtYXRpb24gYmFjayB0byB0aGUgaG9zdCBhcHBsaWNhdGlvblxyXG4gICAgICAgIGlmIChyb3V0ZXJDb250ZXh0LnVybCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHsgcmVkaXJlY3RVcmw6IHJvdXRlckNvbnRleHQudXJsIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE9uY2UgYW55IGFzeW5jIHRhc2tzIGFyZSBkb25lLCB3ZSBjYW4gcGVyZm9ybSB0aGUgZmluYWwgcmVuZGVyXHJcbiAgICAgICAgLy8gV2UgYWxzbyBzZW5kIHRoZSByZWR1eCBzdG9yZSBzdGF0ZSwgc28gdGhlIGNsaWVudCBjYW4gY29udGludWUgZXhlY3V0aW9uIHdoZXJlIHRoZSBzZXJ2ZXIgbGVmdCBvZmZcclxuICAgICAgICBwYXJhbXMuZG9tYWluVGFza3MudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgaHRtbDogcmVuZGVyVG9TdHJpbmcoYXBwKSxcclxuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHsgaW5pdGlhbFJlZHV4U3RhdGU6IHN0b3JlLmdldFN0YXRlKCkgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCByZWplY3QpOyAvLyBBbHNvIHByb3BhZ2F0ZSBhbnkgZXJyb3JzIGJhY2sgaW50byB0aGUgaG9zdCBhcHBsaWNhdGlvblxyXG4gICAgfSk7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvYm9vdC1zZXJ2ZXIudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJvdXRlQ29tcG9uZW50UHJvcHM8e30+LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuXHRcdFx0PGRpdlxyXG5cdFx0XHRcdGNsYXNzTmFtZT0nZmItbG9naW4tYnV0dG9uJ1xyXG5cdFx0XHRcdGRhdGEtbWF4LXJvd3M9JzEnXHJcblx0XHRcdFx0ZGF0YS1zaXplPSdsYXJnZSdcclxuXHRcdFx0XHRkYXRhLWJ1dHRvbi10eXBlPSdjb250aW51ZV93aXRoJ1xyXG5cdFx0XHRcdGRhdGEtc2hvdy1mYWNlcz0nZmFsc2UnXHJcblx0XHRcdFx0ZGF0YS1hdXRvLWxvZ291dC1saW5rPSdmYWxzZSdcclxuXHRcdFx0XHRkYXRhLXVzZS1jb250aW51ZS1hcz0nZmFsc2UnPlxyXG5cdFx0XHQ8L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZS50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lci1mbHVpZCc+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbC1zbS0xMic+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25TdGF0ZSB9IGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0ICogYXMgUGF5bWVudFN0YXRlIGZyb20gJy4uL3N0b3JlL1BheW1lbnQnO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybUV2ZW50LCBDaGFuZ2VFdmVudCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbnR5cGUgUGF5bWVudFByb3BzID1cclxuXHRQYXltZW50U3RhdGUuUGF5bWVudFN0YXRlXHJcblx0JiB0eXBlb2YgUGF5bWVudFN0YXRlLmFjdGlvbkNyZWF0b3JzO1xyXG5cclxuY2xhc3MgU3VibWl0UGF5bWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQYXltZW50UHJvcHMsIHt9PiB7XHJcblx0cHJpdmF0ZSBvbkNhcmROdW1iZXJDaGFuZ2UoZTogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pIHtcclxuXHRcdHRoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVyID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG5cdFx0aWYgKCFlLnRhcmdldC52YWx1ZS5tYXRjaCgvWzAtOV17MTZ9L2cpKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVySGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIDE2IGRpZ2l0cyc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uTmFtZU9uQ2FyZENoYW5nZShlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG5cdFx0dGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmQgPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcblx0XHRpZiAoZS50YXJnZXQudmFsdWUubGVuZ3RoIDw9IDApIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmRIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgYSBuYW1lJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25FeHBpcnlNb250aENoYW5nZShlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG5cdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG5cdFx0aWYgKCFlLnRhcmdldC52YWx1ZS5tYXRjaCgvWzAtOV0rL2cpXHJcblx0XHRcdHx8IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSA8IDFcclxuXHRcdFx0fHwgcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpID4gMTIpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG1vbnRoJztcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHBhcnNlSW50KHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyKSA9PT0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXHJcblx0XHRcdCYmIHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSA8PSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgYSBmdXR1cmUgbW9udGgnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uRXhwaXJ5WWVhckNoYW5nZShlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG5cdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXIgPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcblx0XHRpZiAoIWUudGFyZ2V0LnZhbHVlLm1hdGNoKC9bMC05XXs0fS9nKSkge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIHllYXInO1xyXG5cclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAocGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIDwgbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGN1cnJlbnQgb3IgZnV0dXJlIHllYXInO1xyXG5cclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAocGFyc2VJbnQoZS50YXJnZXQudmFsdWUpID09IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxyXG5cdFx0XHQmJiBwYXJzZUludCh0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGgpIDw9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhIGZ1dHVyZSBtb250aCc7XHJcblxyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2UgPSAnJztcclxuXHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvblNlY3VyaXR5Q29kZUNoYW5nZShlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG5cdFx0dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuXHRcdGlmICghZS50YXJnZXQudmFsdWUubWF0Y2goL1swLTldezIsNH0vZykpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGVFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgc2VjdXJpdHkgY29kZSc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHJlbmRlcigpIHtcclxuXHRcdHZhciBjYXJkTnVtYmVyRXJyb3IgPSB0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckhhc0Vycm9yc1xyXG5cdFx0XHQ/IDxzcGFuIGlkPVwiY2FyZC1udW1iZXItZXJyb3JcIiBzdHlsZT17eyBjb2xvcjogXCJyZWRcIiB9fT57dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJFcnJvck1lc3NhZ2V9PC9zcGFuPlxyXG5cdFx0XHQ6IDxzcGFuIGlkPVwiY2FyZC1udW1iZXItZXJyb3JcIj48L3NwYW4+O1xyXG5cclxuXHRcdHZhciBuYW1lT25DYXJkRXJyb3IgPSB0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9yc1xyXG5cdFx0XHQ/IDxzcGFuIGlkPVwibmFtZS1vbi1jYXJkLWVycm9yXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkRXJyb3JNZXNzYWdlfTwvc3Bhbj5cclxuXHRcdFx0OiA8c3BhbiBpZD1cIm5hbWUtb24tY2FyZC1lcnJvclwiPjwvc3Bhbj47XHJcblxyXG5cdFx0dmFyIGV4cGlyeU1vbnRoRXJyb3IgPSB0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnNcclxuXHRcdFx0PyA8c3BhbiBpZD1cImV4cGlyeS1tb250aC1lcnJvclwiIHN0eWxlPXt7IGNvbG9yOiBcInJlZFwiIH19Pnt0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2V9PC9zcGFuPlxyXG5cdFx0XHQ6IDxzcGFuIGlkPVwiZXhwaXJ5LW1vbnRoLWVycm9yXCI+PC9zcGFuPjtcclxuXHJcblx0XHR2YXIgZXhwaXJ5WWVhckVycm9yID0gdGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJIYXNFcnJvcnNcclxuXHRcdFx0PyA8c3BhbiBpZD1cImV4cGlyeS15ZWFyLWVycm9yXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyRXJyb3JNZXNzYWdlfTwvc3Bhbj5cclxuXHRcdFx0OiA8c3BhbiBpZD1cImV4cGlyeS15ZWFyLWVycm9yXCI+PC9zcGFuPjtcclxuXHJcblx0XHR2YXIgc2VjdXJpdHlDb2RlRXJyb3IgPSB0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlSGFzRXJyb3JzXHJcblx0XHRcdD8gPHNwYW4gaWQ9XCJzZWN1cml0eS1jb2RlLWVycm9yXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGVFcnJvck1lc3NhZ2V9PC9zcGFuPlxyXG5cdFx0XHQ6IDxzcGFuIGlkPVwic2VjdXJpdHktY29kZS1lcnJvclwiPjwvc3Bhbj47XHJcblxyXG5cdFx0dmFyIGlzQnV0dG9uRGlzYWJsZWQgPSB0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckhhc0Vycm9yc1xyXG5cdFx0XHR8fCB0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9yc1xyXG5cdFx0XHR8fCB0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnNcclxuXHRcdFx0fHwgdGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJIYXNFcnJvcnNcclxuXHRcdFx0fHwgdGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUhhc0Vycm9ycztcclxuXHJcblx0XHR2YXIgc3VjY2Vzc0FsZXJ0ID0gdGhpcy5wcm9wcy5oYXNQYXltZW50U3VjY2VlZGVkXHJcblx0XHRcdD8gPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlXCIgcm9sZT1cImFsZXJ0XCI+XHJcblx0XHRcdFx0UGF5bWVudCBvZiAxIGV1cm8gc3VjY2VlZGVkXHJcblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxyXG5cdFx0XHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cclxuXHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDogbnVsbDtcclxuXHJcblx0XHRyZXR1cm4gPGRpdj5cclxuXHRcdFx0eyBzdWNjZXNzQWxlcnQgfVxyXG5cdFx0XHQ8c3BhbiBzdHlsZT17eyBjb2xvcjogXCJyZWRcIiB9fT57dGhpcy5wcm9wcy52YWxpZGF0aW9uRXJyb3JNZXNzYWdlfTwvc3Bhbj5cclxuXHRcdFx0PGZvcm0gb25TdWJtaXQ9eyhlKSA9PiB7IHRoaXMucHJvcHMuc3VibWl0UGF5bWVudCh0aGlzLnByb3BzLnBheW1lbnQpOyB9fT5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwiY2FyZC1udW1iZXJcIiBjbGFzc05hbWU9e1wiZm9ybS1ncm91cCByb3cgXCIgKyAodGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJIYXNFcnJvcnMgPyAnaGFzLWVycm9yJyA6ICcnKX0+XHJcblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiIGNvbnRyb2wtbGFiZWwgY29sLW1kLTEyXCIgaHRtbEZvcj1cImNhcmROdW1iZXJcIj5DYXJkIG51bWJlcjwvbGFiZWw+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcblx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJjYXJkTnVtYmVyXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlcn0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uQ2FyZE51bWJlckNoYW5nZShlKX0gcmVxdWlyZWQgbWF4TGVuZ3RoPXsxNn0gcGF0dGVybj1cIl5bMC05XXsxNn0kXCIgLz5cclxuXHRcdFx0XHRcdFx0eyBjYXJkTnVtYmVyRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cIm5hbWUtb24tY2FyZFwiIGNsYXNzTmFtZT17XCJmb3JtLWdyb3VwIHJvdyBcIiArICh0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9ycyA/ICdoYXMtZXJyb3InIDogJycpfT5cclxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsIGNvbC1tZC0xMlwiIGh0bWxGb3I9XCJuYW1lT25DYXJkXCI+TmFtZSBvbiBjYXJkPC9sYWJlbD5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVPbkNhcmRcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkfSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25OYW1lT25DYXJkQ2hhbmdlKGUpfSByZXF1aXJlZCBtYXhMZW5ndGg9ezEwMH0gLz5cclxuXHRcdFx0XHRcdFx0eyBuYW1lT25DYXJkRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cImV4cGlyeS1tb250aFwiIGNsYXNzTmFtZT17XCJmb3JtLWdyb3VwIHJvdyBcIiArICh0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPyAnaGFzLWVycm9yJyA6ICcnKX0+XHJcblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbCBjb2wtbWQtMTJcIiBodG1sRm9yPVwiZXhwaXJ5TW9udGhcIj5FeHBpcnkgbW9udGg8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cIm51bWJlclwiIG5hbWU9XCJleHBpcnlNb250aFwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRofSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25FeHBpcnlNb250aENoYW5nZShlKX0gcmVxdWlyZWQgbWF4TGVuZ3RoPXsyfSBwYXR0ZXJuPVwiXlswLTldKyRcIiAvPlxyXG5cdFx0XHRcdFx0XHR7IGV4cGlyeU1vbnRoRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cImV4cGlyeS15ZWFyXCIgY2xhc3NOYW1lPXtcImZvcm0tZ3JvdXAgcm93IFwiICsgKHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzID8gJ2hhcy1lcnJvcicgOiAnJyl9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWwgY29sLW1kLTEyXCIgaHRtbEZvcj1cImV4cGlyeVllYXJcIj5FeHBpcnkgeWVhcjwvbGFiZWw+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcblx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwibnVtYmVyXCIgbmFtZT1cImV4cGlyeVllYXJcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyfSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25FeHBpcnlZZWFyQ2hhbmdlKGUpfSByZXF1aXJlZCBtYXhMZW5ndGg9ezR9IHBhdHRlcm49XCJeWzAtOV17NH0kXCIgLz5cclxuXHRcdFx0XHRcdFx0eyBleHBpcnlZZWFyRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cInNlY3VyaXR5LWNvZGVcIiBjbGFzc05hbWU9e1wiZm9ybS1ncm91cCByb3cgXCIgKyAodGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUhhc0Vycm9ycyA/ICdoYXMtZXJyb3InIDogJycpfT5cclxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsIGNvbC1tZC0xMlwiIGh0bWxGb3I9XCJzZWN1cml0eUNvZGVcIj5TZWN1cml0eSBjb2RlPC9sYWJlbD5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlY3VyaXR5Q29kZVwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZX0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uU2VjdXJpdHlDb2RlQ2hhbmdlKGUpfSByZXF1aXJlZCBtYXhMZW5ndGg9ezR9IHBhdHRlcm49XCJeWzAtOV17Miw0fSRcIiAvPlxyXG5cdFx0XHRcdFx0XHR7IHNlY3VyaXR5Q29kZUVycm9yIH1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGlzYWJsZWQ9e2lzQnV0dG9uRGlzYWJsZWR9PlxyXG5cdFx0XHRcdFx0XHRQYXkgbm93XHJcblx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9mb3JtPlxyXG5cdFx0PC9kaXY+O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuXHQoc3RhdGU6IEFwcGxpY2F0aW9uU3RhdGUpID0+IHN0YXRlLnBheW1lbnQsXHJcblx0UGF5bWVudFN0YXRlLmFjdGlvbkNyZWF0b3JzXHJcbikoU3VibWl0UGF5bWVudCkgYXMgdHlwZW9mIFN1Ym1pdFBheW1lbnQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb21wb25lbnRzL1N1Ym1pdFBheW1lbnQudHN4IiwiaW1wb3J0ICogYXMgUGF5bWVudCBmcm9tICcuL1BheW1lbnQnO1xyXG5cclxuLy8gVGhlIHRvcC1sZXZlbCBzdGF0ZSBvYmplY3RcclxuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGlvblN0YXRlIHtcclxuXHRwYXltZW50OiBQYXltZW50LlBheW1lbnRTdGF0ZVxyXG59XHJcblxyXG4vLyBXaGVuZXZlciBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCwgUmVkdXggd2lsbCB1cGRhdGUgZWFjaCB0b3AtbGV2ZWwgYXBwbGljYXRpb24gc3RhdGUgcHJvcGVydHkgdXNpbmdcclxuLy8gdGhlIHJlZHVjZXIgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZS4gSXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgbmFtZXMgbWF0Y2ggZXhhY3RseSwgYW5kIHRoYXQgdGhlIHJlZHVjZXJcclxuLy8gYWN0cyBvbiB0aGUgY29ycmVzcG9uZGluZyBBcHBsaWNhdGlvblN0YXRlIHByb3BlcnR5IHR5cGUuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VycyA9IHtcclxuXHRwYXltZW50OiBQYXltZW50LnJlZHVjZXJcclxufTtcclxuXHJcbi8vIFRoaXMgdHlwZSBjYW4gYmUgdXNlZCBhcyBhIGhpbnQgb24gYWN0aW9uIGNyZWF0b3JzIHNvIHRoYXQgaXRzICdkaXNwYXRjaCcgYW5kICdnZXRTdGF0ZScgcGFyYW1zIGFyZVxyXG4vLyBjb3JyZWN0bHkgdHlwZWQgdG8gbWF0Y2ggeW91ciBzdG9yZS5cclxuZXhwb3J0IGludGVyZmFjZSBBcHBUaHVua0FjdGlvbjxUQWN0aW9uPiB7XHJcbiAgICAoZGlzcGF0Y2g6IChhY3Rpb246IFRBY3Rpb24pID0+IHZvaWQsIGdldFN0YXRlOiAoKSA9PiBBcHBsaWNhdGlvblN0YXRlKTogdm9pZDtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxMzUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDE0Myk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDcwKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==