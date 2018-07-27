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
                            dispatch({ type: 'PAYMENT_SUCCEEDED' });
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
        case 'PAYMENT_SUCCEEDED':
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
    SubmitPayment.prototype.onFormSubmit = function (e) {
        e.preventDefault();
        this.props.submitPayment(this.props.payment);
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
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("form", { onSubmit: function (e) { return _this.onFormSubmit(e); } },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "card-number", className: "form-group row " + (this.props.payment.cardNumberHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: " control-label col-md-12", htmlFor: "cardNumber" }, "Card number"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "text", name: "cardNumber", value: this.props.payment.cardNumber, onChange: function (e) { return _this.onCardNumberChange(e); }, required: true, maxLength: 16, pattern: "^[0-9]{16}$" }),
                        cardNumberError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "name-on-card", className: "form-group row " + (this.props.payment.nameOnCardHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "nameOnCard" }, "Name on card"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "text", name: "nameOnCard", value: this.props.payment.nameOnCard, onChange: function (e) { return _this.onNameOnCardChange(e); }, required: true, maxLength: 100 }),
                        nameOnCardError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "expiry-month", className: "form-group row " + (this.props.payment.expiryMonthHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "expiryMonth" }, "Expiry month"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "number", name: "expiryMonth", value: this.props.payment.expiryMonth, onChange: function (e) { return _this.onExpiryMonthChange(e); }, required: true, maxLength: 2, pattern: "^[0-9]+$" }),
                        expiryMonthError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "expiry-year", className: "form-group row " + (this.props.payment.expiryYearHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "expiryYear" }, "Expiry year"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "number", name: "expiryYear", value: this.props.payment.expiryYear, onChange: function (e) { return _this.onExpiryYearChange(e); }, required: true, maxLength: 4, pattern: "^[0-9]{4}$" }),
                        expiryYearError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { id: "security-code", className: "form-group row " + (this.props.payment.securityCodeHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "securityCode" }, "Security code"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "text", name: "securityCode", value: this.props.payment.securityCode, onChange: function (e) { return _this.onSecurityCodeChange(e); }, required: true, maxLength: 4, pattern: "^[0-9]{2,4}$" }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTUzY2FmYzQxZTg3NWE1MGU1ZmMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL1BheW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9yb3V0ZXMudHN4Iiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZS50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9TdWJtaXRQYXltZW50LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUEscUM7Ozs7OztBQ0FBLDZDOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FzQztBQStDL0IsSUFBTSxj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QUFPLEVBQUMsY0FBYyxvQkFBc0I7b0JBQ3ZGLDhEQUFLLFNBQVMsRUFBQyxVQUFVO3dCQUN4QixnRUFBTyxTQUFTLEVBQUMsY0FBYyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxVQUFDLENBQUMsSUFBSyxZQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQTVCLENBQTRCLEVBQUUsUUFBUSxRQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFDLGNBQWMsR0FBRzt3QkFDck0saUJBQWlCLENBQ2QsQ0FDRDtnQkFDTiw4REFBSyxTQUFTLEVBQUMsWUFBWTtvQkFDMUIsaUVBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixjQUVuRSxDQUNKLENBQ0EsQ0FDRixDQUFDO0lBQ1IsQ0FBQztJQUNGLG9CQUFDO0FBQUQsQ0FBQyxDQWhNMkIsZ0RBQWUsR0FnTTFDO0FBRUQseURBQWUsMkVBQU8sQ0FDckIsVUFBQyxLQUF1QixJQUFLLFlBQUssQ0FBQyxPQUFPLEVBQWIsQ0FBYSxFQUMxQyxzRUFBMkIsQ0FDM0IsQ0FBQyxhQUFhLENBQXlCLEVBQUM7Ozs7Ozs7Ozs7QUNoTko7QUFPckMsc0dBQXNHO0FBQ3RHLHdHQUF3RztBQUN4Ryw0REFBNEQ7QUFDckQsSUFBTSxRQUFRLEdBQUc7SUFDdkIsT0FBTyxFQUFFLHlEQUFlO0NBQ3hCLENBQUM7Ozs7Ozs7QUNaRiwrQzs7Ozs7O0FDQUEsK0M7Ozs7OztBQ0FBLDhDIiwiZmlsZSI6Im1haW4tc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJkaXN0L1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5NTNjYWZjNDFlODc1YTUwZTVmYyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vdmVuZG9yXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiLi92ZW5kb3JcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSg2KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QvcmVhY3QuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDE0MCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQxKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLXJlZHV4L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBhZGRUYXNrIH0gZnJvbSBcImRvbWFpbi10YXNrXCI7XHJcbmltcG9ydCB7IFJvdXRlckFjdGlvbiwgcHVzaCwgcm91dGVyQWN0aW9ucyB9IGZyb20gXCJyZWFjdC1yb3V0ZXItcmVkdXhcIjtcclxuaW1wb3J0IHsgQXBwVGh1bmtBY3Rpb24gfSBmcm9tIFwiQ2xpZW50QXBwL3N0b3JlXCI7XHJcbmltcG9ydCB7IEFjdGlvbiwgUmVkdWNlciB9IGZyb20gXCJyZWR1eFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXltZW50IHtcclxuXHRjYXJkTnVtYmVySGFzRXJyb3JzOiBib29sZWFuO1xyXG5cdGNhcmROdW1iZXJFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuXHRjYXJkTnVtYmVyOiBzdHJpbmc7XHJcblx0bmFtZU9uQ2FyZEhhc0Vycm9yczogYm9vbGVhbjtcclxuXHRuYW1lT25DYXJkRXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblx0bmFtZU9uQ2FyZDogc3RyaW5nO1xyXG5cdGV4cGlyeU1vbnRoSGFzRXJyb3JzOiBib29sZWFuO1xyXG5cdGV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblx0ZXhwaXJ5TW9udGg6IHN0cmluZztcclxuXHRleHBpcnlZZWFySGFzRXJyb3JzOiBib29sZWFuO1xyXG5cdGV4cGlyeVllYXJFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuXHRleHBpcnlZZWFyOiBzdHJpbmc7XHJcblx0c2VjdXJpdHlDb2RlSGFzRXJyb3JzOiBib29sZWFuO1xyXG5cdHNlY3VyaXR5Q29kZUVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG5cdHNlY3VyaXR5Q29kZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnRTdGF0ZSB7XHJcblx0aXNMb2FkaW5nOiBib29sZWFuO1xyXG5cdHBheW1lbnQ6IFBheW1lbnQ7XHJcblx0dmFsaWRhdGlvbkVycm9yTWVzc2FnZT86IHN0cmluZztcclxuXHRoYXNQYXltZW50U3VjY2VlZGVkOiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgU3VibWl0UGF5bWVudEFjdGlvbiB7XHJcblx0dHlwZTogJ1NVQk1JVF9QQVlNRU5UJztcclxuXHRwYXltZW50OiBQYXltZW50O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUGF5bWVudFN1Y2NlZWRlZEFjdGlvbiB7XHJcblx0dHlwZTogJ1BBWU1FTlRfU1VDQ0VFREVEJztcclxuXHRzdWNjZXNzTWVzc2FnZTogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVmFsaWRhdGlvbkVycm9yQWN0aW9uIHtcclxuXHR0eXBlOiAnVkFMSURBVElPTl9FUlJPUic7XHJcblx0ZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbn1cclxuXHJcbnR5cGUgS25vd25BY3Rpb24gPSBTdWJtaXRQYXltZW50QWN0aW9uIHwgUGF5bWVudFN1Y2NlZWRlZEFjdGlvbiB8IFZhbGlkYXRpb25FcnJvckFjdGlvbjtcclxuXHJcbmV4cG9ydCBjb25zdCBhY3Rpb25DcmVhdG9ycyA9IHtcclxuXHRzdWJtaXRQYXltZW50OiAocGF5bWVudDogUGF5bWVudCk6IEFwcFRodW5rQWN0aW9uPGFueT4gPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG5cdFx0KDxhbnk+d2luZG93KS5GQi5hcGkoJy9tZScsICdnZXQnLCB7IGZpZWxkczogJ2VtYWlsJyB9LCBmdW5jdGlvbiAoZmJSZXNwb25zZTogYW55KSB7XHJcblx0XHRcdCg8YW55PndpbmRvdykucGF5bWlsbC5jcmVhdGVUb2tlbih7XHJcblx0XHRcdFx0bnVtYmVyOiBwYXltZW50LmNhcmROdW1iZXIsXHJcblx0XHRcdFx0ZXhwX21vbnRoOiBwYXltZW50LmV4cGlyeU1vbnRoLFxyXG5cdFx0XHRcdGV4cF95ZWFyOiBwYXltZW50LmV4cGlyeVllYXIsXHJcblx0XHRcdFx0Y3ZjOiBwYXltZW50LnNlY3VyaXR5Q29kZSxcclxuXHRcdFx0XHRhbW91bnRfaW50OiAxMDAsXHJcblx0XHRcdFx0Y3VycmVuY3k6ICdFVVInLFxyXG5cdFx0XHRcdGNhcmRob2xkZXI6IHBheW1lbnQubmFtZU9uQ2FyZCxcclxuXHRcdFx0XHRlbWFpbDogZmJSZXNwb25zZS5lbWFpbFxyXG5cdFx0XHR9LCBmdW5jdGlvbiAoZXJyb3I6IGFueSwgcmVzdWx0OiBhbnkpIHtcclxuXHRcdFx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0XHRcdGRpc3BhdGNoKHsgdHlwZTogJ1ZBTElEQVRJT05fRVJST1InLCBlcnJvck1lc3NhZ2U6IGVycm9yLmFwaWVycm9yIH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHZhciBwYXltaWxsVG9rZW4gPSByZXN1bHQudG9rZW47XHJcblx0XHRcdFx0XHR2YXIgYXBpTWV0aG9kVXJsID0gYGFwaS9TdWJtaXRQYXltZW50L1NhdmVgO1xyXG5cdFx0XHRcdFx0dmFyIGFwaU1ldGhvZFR5cGUgPSBgcG9zdGA7XHJcblx0XHRcdFx0XHRsZXQgZmV0Y2hUYXNrID0gZmV0Y2goYXBpTWV0aG9kVXJsLCB7XHJcblx0XHRcdFx0XHRcdG1ldGhvZDogYXBpTWV0aG9kVHlwZSxcclxuXHRcdFx0XHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkocGF5bWlsbFRva2VuKSxcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSBhcyBQcm9taXNlPG51bWJlcj4pXHJcblx0XHRcdFx0XHRcdC50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChkYXRhKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaCh7IHR5cGU6ICdWQUxJREFUSU9OX0VSUk9SJywgZXJyb3JNZXNzYWdlOiBkYXRhIH0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKHsgdHlwZTogJ1BBWU1FTlRfU1VDQ0VFREVEJyB9KTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdGFkZFRhc2soZmV0Y2hUYXNrKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdGRpc3BhdGNoKHsgdHlwZTogJ1NVQk1JVF9QQVlNRU5UJywgcGF5bWVudDogcGF5bWVudCB9KTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBlbXB0eVBheW1lbnQ6IFBheW1lbnQgPSB7XHJcblx0Y2FyZE51bWJlckhhc0Vycm9yczogZmFsc2UsIGNhcmROdW1iZXJFcnJvck1lc3NhZ2U6ICcnLCBjYXJkTnVtYmVyOiAnJyxcclxuXHRuYW1lT25DYXJkSGFzRXJyb3JzOiBmYWxzZSwgbmFtZU9uQ2FyZEVycm9yTWVzc2FnZTogJycsIG5hbWVPbkNhcmQ6ICcnLFxyXG5cdGV4cGlyeU1vbnRoSGFzRXJyb3JzOiBmYWxzZSwgZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2U6ICcnLCBleHBpcnlNb250aDogJycsXHJcblx0ZXhwaXJ5WWVhckhhc0Vycm9yczogZmFsc2UsIGV4cGlyeVllYXJFcnJvck1lc3NhZ2U6ICcnLCBleHBpcnlZZWFyOiAnJyxcclxuXHRzZWN1cml0eUNvZGVIYXNFcnJvcnM6IGZhbHNlLCBzZWN1cml0eUNvZGVFcnJvck1lc3NhZ2U6ICcnLCBzZWN1cml0eUNvZGU6ICcnXHJcbn1cclxuY29uc3QgdW5sb2FkZWRTdGF0ZTogUGF5bWVudFN0YXRlID0geyBpc0xvYWRpbmc6IGZhbHNlLCBwYXltZW50OiBlbXB0eVBheW1lbnQsIGhhc1BheW1lbnRTdWNjZWVkZWQ6IGZhbHNlIH07XHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcjogUmVkdWNlcjxQYXltZW50U3RhdGU+ID0gKHN0YXRlOiBQYXltZW50U3RhdGUsIGluY29taW5nQWN0aW9uOiBBY3Rpb24pID0+IHtcclxuXHRjb25zdCBhY3Rpb24gPSBpbmNvbWluZ0FjdGlvbiBhcyBLbm93bkFjdGlvbjtcclxuXHRzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcblx0XHRjYXNlICdTVUJNSVRfUEFZTUVOVCc6XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0cGF5bWVudDogYWN0aW9uLnBheW1lbnQsXHJcblx0XHRcdFx0aXNMb2FkaW5nOiB0cnVlLFxyXG5cdFx0XHRcdGhhc1BheW1lbnRTdWNjZWVkZWQ6IGZhbHNlXHJcblx0XHRcdH07XHJcblx0XHRjYXNlICdQQVlNRU5UX1NVQ0NFRURFRCc6XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0cGF5bWVudDogZW1wdHlQYXltZW50LFxyXG5cdFx0XHRcdGlzTG9hZGluZzogZmFsc2UsXHJcblx0XHRcdFx0dmFsaWRhdGlvbkVycm9yTWVzc2FnZTogdW5kZWZpbmVkLFxyXG5cdFx0XHRcdGhhc1BheW1lbnRTdWNjZWVkZWQ6IHRydWVcclxuXHRcdFx0fTtcclxuXHRcdGNhc2UgJ1ZBTElEQVRJT05fRVJST1InOlxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHBheW1lbnQ6IHN0YXRlLnBheW1lbnQsXHJcblx0XHRcdFx0aXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHR2YWxpZGF0aW9uRXJyb3JNZXNzYWdlOiBhY3Rpb24uZXJyb3JNZXNzYWdlLFxyXG5cdFx0XHRcdGhhc1BheW1lbnRTdWNjZWVkZWQ6IGZhbHNlXHJcblx0XHRcdH1cclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdGNvbnN0IGV4aGF1c3RpdmVDaGVjazogbmV2ZXIgPSBhY3Rpb247XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3RhdGUgfHwgdW5sb2FkZWRTdGF0ZTtcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvc3RvcmUvUGF5bWVudC50cyIsImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UsIGNvbWJpbmVSZWR1Y2VycywgR2VuZXJpY1N0b3JlRW5oYW5jZXIsIFN0b3JlLCBTdG9yZUVuaGFuY2VyU3RvcmVDcmVhdG9yLCBSZWR1Y2Vyc01hcE9iamVjdCB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcclxuaW1wb3J0IHsgcm91dGVyUmVkdWNlciwgcm91dGVyTWlkZGxld2FyZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XHJcbmltcG9ydCAqIGFzIFN0b3JlTW9kdWxlIGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlLCByZWR1Y2VycyB9IGZyb20gJy4vc3RvcmUnO1xyXG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnaGlzdG9yeSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShoaXN0b3J5OiBIaXN0b3J5LCBpbml0aWFsU3RhdGU/OiBBcHBsaWNhdGlvblN0YXRlKSB7XHJcbiAgICAvLyBCdWlsZCBtaWRkbGV3YXJlLiBUaGVzZSBhcmUgZnVuY3Rpb25zIHRoYXQgY2FuIHByb2Nlc3MgdGhlIGFjdGlvbnMgYmVmb3JlIHRoZXkgcmVhY2ggdGhlIHN0b3JlLlxyXG4gICAgY29uc3Qgd2luZG93SWZEZWZpbmVkID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogd2luZG93IGFzIGFueTtcclxuICAgIC8vIElmIGRldlRvb2xzIGlzIGluc3RhbGxlZCwgY29ubmVjdCB0byBpdFxyXG4gICAgY29uc3QgZGV2VG9vbHNFeHRlbnNpb24gPSB3aW5kb3dJZkRlZmluZWQgJiYgd2luZG93SWZEZWZpbmVkLl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18gYXMgKCkgPT4gR2VuZXJpY1N0b3JlRW5oYW5jZXI7XHJcbiAgICBjb25zdCBjcmVhdGVTdG9yZVdpdGhNaWRkbGV3YXJlID0gY29tcG9zZShcclxuICAgICAgICBhcHBseU1pZGRsZXdhcmUodGh1bmssIHJvdXRlck1pZGRsZXdhcmUoaGlzdG9yeSkpLFxyXG4gICAgICAgIGRldlRvb2xzRXh0ZW5zaW9uID8gZGV2VG9vbHNFeHRlbnNpb24oKSA6IDxTPihuZXh0OiBTdG9yZUVuaGFuY2VyU3RvcmVDcmVhdG9yPFM+KSA9PiBuZXh0XHJcbiAgICApKGNyZWF0ZVN0b3JlKTtcclxuXHJcbiAgICAvLyBDb21iaW5lIGFsbCByZWR1Y2VycyBhbmQgaW5zdGFudGlhdGUgdGhlIGFwcC13aWRlIHN0b3JlIGluc3RhbmNlXHJcbiAgICBjb25zdCBhbGxSZWR1Y2VycyA9IGJ1aWxkUm9vdFJlZHVjZXIocmVkdWNlcnMpO1xyXG4gICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZVdpdGhNaWRkbGV3YXJlKGFsbFJlZHVjZXJzLCBpbml0aWFsU3RhdGUpIGFzIFN0b3JlPEFwcGxpY2F0aW9uU3RhdGU+O1xyXG5cclxuICAgIC8vIEVuYWJsZSBXZWJwYWNrIGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQgZm9yIHJlZHVjZXJzXHJcbiAgICBpZiAobW9kdWxlLmhvdCkge1xyXG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCcuL3N0b3JlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0Um9vdFJlZHVjZXIgPSByZXF1aXJlPHR5cGVvZiBTdG9yZU1vZHVsZT4oJy4vc3RvcmUnKTtcclxuICAgICAgICAgICAgc3RvcmUucmVwbGFjZVJlZHVjZXIoYnVpbGRSb290UmVkdWNlcihuZXh0Um9vdFJlZHVjZXIucmVkdWNlcnMpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RvcmU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkUm9vdFJlZHVjZXIoYWxsUmVkdWNlcnM6IFJlZHVjZXJzTWFwT2JqZWN0KSB7XHJcbiAgICByZXR1cm4gY29tYmluZVJlZHVjZXJzPEFwcGxpY2F0aW9uU3RhdGU+KE9iamVjdC5hc3NpZ24oe30sIGFsbFJlZHVjZXJzLCB7IHJvdXRpbmc6IHJvdXRlclJlZHVjZXIgfSkpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9jb25maWd1cmVTdG9yZS50cyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgTGF5b3V0IH0gZnJvbSAnLi9jb21wb25lbnRzL0xheW91dCc7XHJcbmltcG9ydCBIb21lIGZyb20gJy4vY29tcG9uZW50cy9Ib21lJztcclxuaW1wb3J0IFN1Ym1pdFBheW1lbnQgZnJvbSAnLi9jb21wb25lbnRzL1N1Ym1pdFBheW1lbnQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IDxMYXlvdXQ+XHJcbiAgICA8Um91dGUgZXhhY3QgcGF0aD0nLycgY29tcG9uZW50PXsgSG9tZSB9IC8+XHJcbiAgICA8Um91dGUgcGF0aD0nL3N1Ym1pdHBheW1lbnQnIGNvbXBvbmVudD17IFN1Ym1pdFBheW1lbnQgYXMgYW55IH0gLz5cclxuPC9MYXlvdXQ+O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvcm91dGVzLnRzeCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDEzMik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2FzcG5ldC1wcmVyZW5kZXJpbmcvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDEzNyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2hpc3RvcnkvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDEzOSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgcmVwbGFjZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCc7XHJcbmltcG9ydCB7IGNyZWF0ZU1lbW9yeUhpc3RvcnkgfSBmcm9tICdoaXN0b3J5JztcclxuaW1wb3J0IHsgY3JlYXRlU2VydmVyUmVuZGVyZXIsIFJlbmRlclJlc3VsdCB9IGZyb20gJ2FzcG5ldC1wcmVyZW5kZXJpbmcnO1xyXG5pbXBvcnQgeyByb3V0ZXMgfSBmcm9tICcuL3JvdXRlcyc7XHJcbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tICcuL2NvbmZpZ3VyZVN0b3JlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNlcnZlclJlbmRlcmVyKHBhcmFtcyA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8UmVuZGVyUmVzdWx0PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgLy8gUHJlcGFyZSBSZWR1eCBzdG9yZSB3aXRoIGluLW1lbW9yeSBoaXN0b3J5LCBhbmQgZGlzcGF0Y2ggYSBuYXZpZ2F0aW9uIGV2ZW50XHJcbiAgICAgICAgLy8gY29ycmVzcG9uZGluZyB0byB0aGUgaW5jb21pbmcgVVJMXHJcbiAgICAgICAgY29uc3QgYmFzZW5hbWUgPSBwYXJhbXMuYmFzZVVybC5zdWJzdHJpbmcoMCwgcGFyYW1zLmJhc2VVcmwubGVuZ3RoIC0gMSk7IC8vIFJlbW92ZSB0cmFpbGluZyBzbGFzaFxyXG4gICAgICAgIGNvbnN0IHVybEFmdGVyQmFzZW5hbWUgPSBwYXJhbXMudXJsLnN1YnN0cmluZyhiYXNlbmFtZS5sZW5ndGgpO1xyXG4gICAgICAgIGNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoY3JlYXRlTWVtb3J5SGlzdG9yeSgpKTtcclxuICAgICAgICBzdG9yZS5kaXNwYXRjaChyZXBsYWNlKHVybEFmdGVyQmFzZW5hbWUpKTtcclxuXHJcbiAgICAgICAgLy8gUHJlcGFyZSBhbiBpbnN0YW5jZSBvZiB0aGUgYXBwbGljYXRpb24gYW5kIHBlcmZvcm0gYW4gaW5pdGFsIHJlbmRlciB0aGF0IHdpbGxcclxuICAgICAgICAvLyBjYXVzZSBhbnkgYXN5bmMgdGFza3MgKGUuZy4sIGRhdGEgYWNjZXNzKSB0byBiZWdpblxyXG4gICAgICAgIGNvbnN0IHJvdXRlckNvbnRleHQ6IGFueSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IGFwcCA9IChcclxuICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXsgc3RvcmUgfT5cclxuICAgICAgICAgICAgICAgIDxTdGF0aWNSb3V0ZXIgYmFzZW5hbWU9eyBiYXNlbmFtZSB9IGNvbnRleHQ9eyByb3V0ZXJDb250ZXh0IH0gbG9jYXRpb249eyBwYXJhbXMubG9jYXRpb24ucGF0aCB9IGNoaWxkcmVuPXsgcm91dGVzIH0gLz5cclxuICAgICAgICAgICAgPC9Qcm92aWRlcj5cclxuICAgICAgICApO1xyXG4gICAgICAgIHJlbmRlclRvU3RyaW5nKGFwcCk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZXJlJ3MgYSByZWRpcmVjdGlvbiwganVzdCBzZW5kIHRoaXMgaW5mb3JtYXRpb24gYmFjayB0byB0aGUgaG9zdCBhcHBsaWNhdGlvblxyXG4gICAgICAgIGlmIChyb3V0ZXJDb250ZXh0LnVybCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKHsgcmVkaXJlY3RVcmw6IHJvdXRlckNvbnRleHQudXJsIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIE9uY2UgYW55IGFzeW5jIHRhc2tzIGFyZSBkb25lLCB3ZSBjYW4gcGVyZm9ybSB0aGUgZmluYWwgcmVuZGVyXHJcbiAgICAgICAgLy8gV2UgYWxzbyBzZW5kIHRoZSByZWR1eCBzdG9yZSBzdGF0ZSwgc28gdGhlIGNsaWVudCBjYW4gY29udGludWUgZXhlY3V0aW9uIHdoZXJlIHRoZSBzZXJ2ZXIgbGVmdCBvZmZcclxuICAgICAgICBwYXJhbXMuZG9tYWluVGFza3MudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgaHRtbDogcmVuZGVyVG9TdHJpbmcoYXBwKSxcclxuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHsgaW5pdGlhbFJlZHV4U3RhdGU6IHN0b3JlLmdldFN0YXRlKCkgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCByZWplY3QpOyAvLyBBbHNvIHByb3BhZ2F0ZSBhbnkgZXJyb3JzIGJhY2sgaW50byB0aGUgaG9zdCBhcHBsaWNhdGlvblxyXG4gICAgfSk7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvYm9vdC1zZXJ2ZXIudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJvdXRlQ29tcG9uZW50UHJvcHM8e30+LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuXHRcdFx0PGRpdlxyXG5cdFx0XHRcdGNsYXNzTmFtZT0nZmItbG9naW4tYnV0dG9uJ1xyXG5cdFx0XHRcdGRhdGEtbWF4LXJvd3M9JzEnXHJcblx0XHRcdFx0ZGF0YS1zaXplPSdsYXJnZSdcclxuXHRcdFx0XHRkYXRhLWJ1dHRvbi10eXBlPSdjb250aW51ZV93aXRoJ1xyXG5cdFx0XHRcdGRhdGEtc2hvdy1mYWNlcz0nZmFsc2UnXHJcblx0XHRcdFx0ZGF0YS1hdXRvLWxvZ291dC1saW5rPSdmYWxzZSdcclxuXHRcdFx0XHRkYXRhLXVzZS1jb250aW51ZS1hcz0nZmFsc2UnPlxyXG5cdFx0XHQ8L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZS50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGF5b3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCB7fT4ge1xyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lci1mbHVpZCc+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyb3cnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbC1zbS0xMic+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmNoaWxkcmVuIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25TdGF0ZSB9IGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0ICogYXMgUGF5bWVudFN0YXRlIGZyb20gJy4uL3N0b3JlL1BheW1lbnQnO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybUV2ZW50LCBDaGFuZ2VFdmVudCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbnR5cGUgUGF5bWVudFByb3BzID1cclxuXHRQYXltZW50U3RhdGUuUGF5bWVudFN0YXRlXHJcblx0JiB0eXBlb2YgUGF5bWVudFN0YXRlLmFjdGlvbkNyZWF0b3JzO1xyXG5cclxuY2xhc3MgU3VibWl0UGF5bWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQYXltZW50UHJvcHMsIHt9PiB7XHJcblx0cHJpdmF0ZSBvbkNhcmROdW1iZXJDaGFuZ2UoZTogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pIHtcclxuXHRcdHRoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVyID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG5cdFx0aWYgKCFlLnRhcmdldC52YWx1ZS5tYXRjaCgvWzAtOV17MTZ9L2cpKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVySGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIDE2IGRpZ2l0cyc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uTmFtZU9uQ2FyZENoYW5nZShlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG5cdFx0dGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmQgPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcblx0XHRpZiAoZS50YXJnZXQudmFsdWUubGVuZ3RoIDwgMikge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG5hbWUnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkV4cGlyeU1vbnRoQ2hhbmdlKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcblx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGggPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcblx0XHRpZiAoIWUudGFyZ2V0LnZhbHVlLm1hdGNoKC9bMC05XSsvZylcclxuXHRcdFx0fHwgcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIDwgMVxyXG5cdFx0XHR8fCBwYXJzZUludChlLnRhcmdldC52YWx1ZSkgPiAxMikge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgbW9udGgnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAocGFyc2VJbnQodGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXIpID09PSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcclxuXHRcdFx0JiYgcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIDw9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhIGZ1dHVyZSBtb250aCc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25FeHBpcnlZZWFyQ2hhbmdlKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcblx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhciA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuXHRcdGlmICghZS50YXJnZXQudmFsdWUubWF0Y2goL1swLTldezR9L2cpKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgeWVhcic7XHJcblxyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChwYXJzZUludChlLnRhcmdldC52YWx1ZSkgPCBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgY3VycmVudCBvciBmdXR1cmUgeWVhcic7XHJcblxyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChwYXJzZUludChlLnRhcmdldC52YWx1ZSkgPT0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXHJcblx0XHRcdCYmIHBhcnNlSW50KHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aCkgPD0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMSkge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGEgZnV0dXJlIG1vbnRoJztcclxuXHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICcnO1xyXG5cclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uU2VjdXJpdHlDb2RlQ2hhbmdlKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcblx0XHR0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG5cdFx0aWYgKCFlLnRhcmdldC52YWx1ZS5tYXRjaCgvWzAtOV17Miw0fS9nKSkge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlSGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBzZWN1cml0eSBjb2RlJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGVFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uRm9ybVN1Ym1pdChlOiBGb3JtRXZlbnQ8SFRNTEZvcm1FbGVtZW50Pikge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy5wcm9wcy5zdWJtaXRQYXltZW50KHRoaXMucHJvcHMucGF5bWVudCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcmVuZGVyKCkge1xyXG5cdFx0dmFyIGNhcmROdW1iZXJFcnJvciA9IHRoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVySGFzRXJyb3JzXHJcblx0XHRcdD8gPHNwYW4gaWQ9XCJjYXJkLW51bWJlci1lcnJvclwiIHN0eWxlPXt7IGNvbG9yOiBcInJlZFwiIH19Pnt0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckVycm9yTWVzc2FnZX08L3NwYW4+XHJcblx0XHRcdDogPHNwYW4gaWQ9XCJjYXJkLW51bWJlci1lcnJvclwiPjwvc3Bhbj47XHJcblxyXG5cdFx0dmFyIG5hbWVPbkNhcmRFcnJvciA9IHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkSGFzRXJyb3JzXHJcblx0XHRcdD8gPHNwYW4gaWQ9XCJuYW1lLW9uLWNhcmQtZXJyb3JcIiBzdHlsZT17eyBjb2xvcjogXCJyZWRcIiB9fT57dGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmRFcnJvck1lc3NhZ2V9PC9zcGFuPlxyXG5cdFx0XHQ6IDxzcGFuIGlkPVwibmFtZS1vbi1jYXJkLWVycm9yXCI+PC9zcGFuPjtcclxuXHJcblx0XHR2YXIgZXhwaXJ5TW9udGhFcnJvciA9IHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9yc1xyXG5cdFx0XHQ/IDxzcGFuIGlkPVwiZXhwaXJ5LW1vbnRoLWVycm9yXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZX08L3NwYW4+XHJcblx0XHRcdDogPHNwYW4gaWQ9XCJleHBpcnktbW9udGgtZXJyb3JcIj48L3NwYW4+O1xyXG5cclxuXHRcdHZhciBleHBpcnlZZWFyRXJyb3IgPSB0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckhhc0Vycm9yc1xyXG5cdFx0XHQ/IDxzcGFuIGlkPVwiZXhwaXJ5LXllYXItZXJyb3JcIiBzdHlsZT17eyBjb2xvcjogXCJyZWRcIiB9fT57dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJFcnJvck1lc3NhZ2V9PC9zcGFuPlxyXG5cdFx0XHQ6IDxzcGFuIGlkPVwiZXhwaXJ5LXllYXItZXJyb3JcIj48L3NwYW4+O1xyXG5cclxuXHRcdHZhciBzZWN1cml0eUNvZGVFcnJvciA9IHRoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGVIYXNFcnJvcnNcclxuXHRcdFx0PyA8c3BhbiBpZD1cInNlY3VyaXR5LWNvZGUtZXJyb3JcIiBzdHlsZT17eyBjb2xvcjogXCJyZWRcIiB9fT57dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUVycm9yTWVzc2FnZX08L3NwYW4+XHJcblx0XHRcdDogPHNwYW4gaWQ9XCJzZWN1cml0eS1jb2RlLWVycm9yXCI+PC9zcGFuPjtcclxuXHJcblx0XHR2YXIgaXNCdXR0b25EaXNhYmxlZCA9IHRoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVySGFzRXJyb3JzXHJcblx0XHRcdHx8IHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkSGFzRXJyb3JzXHJcblx0XHRcdHx8IHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9yc1xyXG5cdFx0XHR8fCB0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckhhc0Vycm9yc1xyXG5cdFx0XHR8fCB0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlSGFzRXJyb3JzO1xyXG5cclxuXHRcdHZhciBzdWNjZXNzQWxlcnQgPSB0aGlzLnByb3BzLmhhc1BheW1lbnRTdWNjZWVkZWRcclxuXHRcdFx0PyA8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgYWxlcnQtZGlzbWlzc2libGVcIiByb2xlPVwiYWxlcnRcIj5cclxuXHRcdFx0XHRQYXltZW50IG9mIDEgZXVybyBzdWNjZWVkZWRcclxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XHJcblx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxyXG5cdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0OiBudWxsO1xyXG5cclxuXHRcdHJldHVybiA8ZGl2PlxyXG5cdFx0XHR7IHN1Y2Nlc3NBbGVydCB9XHJcblx0XHRcdDxzcGFuIGlkPVwiZm9ybS12YWxpZGF0aW9uLWVycm9yc1wiIHN0eWxlPXt7IGNvbG9yOiBcInJlZFwiIH19Pnt0aGlzLnByb3BzLnZhbGlkYXRpb25FcnJvck1lc3NhZ2V9PC9zcGFuPlxyXG5cdFx0XHQ8Zm9ybSBvblN1Ym1pdD17KGUpID0+IHRoaXMub25Gb3JtU3VibWl0KGUpfT5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwiY2FyZC1udW1iZXJcIiBjbGFzc05hbWU9e1wiZm9ybS1ncm91cCByb3cgXCIgKyAodGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJIYXNFcnJvcnMgPyAnaGFzLWVycm9yJyA6ICcnKX0+XHJcblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiIGNvbnRyb2wtbGFiZWwgY29sLW1kLTEyXCIgaHRtbEZvcj1cImNhcmROdW1iZXJcIj5DYXJkIG51bWJlcjwvbGFiZWw+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcblx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiY2FyZE51bWJlclwiIHZhbHVlPXt0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlcn0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uQ2FyZE51bWJlckNoYW5nZShlKX0gcmVxdWlyZWQgbWF4TGVuZ3RoPXsxNn0gcGF0dGVybj1cIl5bMC05XXsxNn0kXCIgLz5cclxuXHRcdFx0XHRcdFx0eyBjYXJkTnVtYmVyRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cIm5hbWUtb24tY2FyZFwiIGNsYXNzTmFtZT17XCJmb3JtLWdyb3VwIHJvdyBcIiArICh0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9ycyA/ICdoYXMtZXJyb3InIDogJycpfT5cclxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsIGNvbC1tZC0xMlwiIGh0bWxGb3I9XCJuYW1lT25DYXJkXCI+TmFtZSBvbiBjYXJkPC9sYWJlbD5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVPbkNhcmRcIiB2YWx1ZT17dGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmR9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbk5hbWVPbkNhcmRDaGFuZ2UoZSl9IHJlcXVpcmVkIG1heExlbmd0aD17MTAwfSAvPlxyXG5cdFx0XHRcdFx0XHR7IG5hbWVPbkNhcmRFcnJvciB9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwiZXhwaXJ5LW1vbnRoXCIgY2xhc3NOYW1lPXtcImZvcm0tZ3JvdXAgcm93IFwiICsgKHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9ycyA/ICdoYXMtZXJyb3InIDogJycpfT5cclxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsIGNvbC1tZC0xMlwiIGh0bWxGb3I9XCJleHBpcnlNb250aFwiPkV4cGlyeSBtb250aDwvbGFiZWw+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcblx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwibnVtYmVyXCIgbmFtZT1cImV4cGlyeU1vbnRoXCIgdmFsdWU9e3RoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aH0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uRXhwaXJ5TW9udGhDaGFuZ2UoZSl9IHJlcXVpcmVkIG1heExlbmd0aD17Mn0gcGF0dGVybj1cIl5bMC05XSskXCIgLz5cclxuXHRcdFx0XHRcdFx0eyBleHBpcnlNb250aEVycm9yIH1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgaWQ9XCJleHBpcnkteWVhclwiIGNsYXNzTmFtZT17XCJmb3JtLWdyb3VwIHJvdyBcIiArICh0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckhhc0Vycm9ycyA/ICdoYXMtZXJyb3InIDogJycpfT5cclxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsIGNvbC1tZC0xMlwiIGh0bWxGb3I9XCJleHBpcnlZZWFyXCI+RXhwaXJ5IHllYXI8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cIm51bWJlclwiIG5hbWU9XCJleHBpcnlZZWFyXCIgdmFsdWU9e3RoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyfSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25FeHBpcnlZZWFyQ2hhbmdlKGUpfSByZXF1aXJlZCBtYXhMZW5ndGg9ezR9IHBhdHRlcm49XCJeWzAtOV17NH0kXCIgLz5cclxuXHRcdFx0XHRcdFx0eyBleHBpcnlZZWFyRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cInNlY3VyaXR5LWNvZGVcIiBjbGFzc05hbWU9e1wiZm9ybS1ncm91cCByb3cgXCIgKyAodGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUhhc0Vycm9ycyA/ICdoYXMtZXJyb3InIDogJycpfT5cclxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsIGNvbC1tZC0xMlwiIGh0bWxGb3I9XCJzZWN1cml0eUNvZGVcIj5TZWN1cml0eSBjb2RlPC9sYWJlbD5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlY3VyaXR5Q29kZVwiIHZhbHVlPXt0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlfSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25TZWN1cml0eUNvZGVDaGFuZ2UoZSl9IHJlcXVpcmVkIG1heExlbmd0aD17NH0gcGF0dGVybj1cIl5bMC05XXsyLDR9JFwiIC8+XHJcblx0XHRcdFx0XHRcdHsgc2VjdXJpdHlDb2RlRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBkaXNhYmxlZD17aXNCdXR0b25EaXNhYmxlZH0+XHJcblx0XHRcdFx0XHRcdFBheSBub3dcclxuXHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Zvcm0+XHJcblx0XHQ8L2Rpdj47XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG5cdChzdGF0ZTogQXBwbGljYXRpb25TdGF0ZSkgPT4gc3RhdGUucGF5bWVudCxcclxuXHRQYXltZW50U3RhdGUuYWN0aW9uQ3JlYXRvcnNcclxuKShTdWJtaXRQYXltZW50KSBhcyB0eXBlb2YgU3VibWl0UGF5bWVudDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbXBvbmVudHMvU3VibWl0UGF5bWVudC50c3giLCJpbXBvcnQgKiBhcyBQYXltZW50IGZyb20gJy4vUGF5bWVudCc7XHJcblxyXG4vLyBUaGUgdG9wLWxldmVsIHN0YXRlIG9iamVjdFxyXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aW9uU3RhdGUge1xyXG5cdHBheW1lbnQ6IFBheW1lbnQuUGF5bWVudFN0YXRlXHJcbn1cclxuXHJcbi8vIFdoZW5ldmVyIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLCBSZWR1eCB3aWxsIHVwZGF0ZSBlYWNoIHRvcC1sZXZlbCBhcHBsaWNhdGlvbiBzdGF0ZSBwcm9wZXJ0eSB1c2luZ1xyXG4vLyB0aGUgcmVkdWNlciB3aXRoIHRoZSBtYXRjaGluZyBuYW1lLiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBuYW1lcyBtYXRjaCBleGFjdGx5LCBhbmQgdGhhdCB0aGUgcmVkdWNlclxyXG4vLyBhY3RzIG9uIHRoZSBjb3JyZXNwb25kaW5nIEFwcGxpY2F0aW9uU3RhdGUgcHJvcGVydHkgdHlwZS5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXJzID0ge1xyXG5cdHBheW1lbnQ6IFBheW1lbnQucmVkdWNlclxyXG59O1xyXG5cclxuLy8gVGhpcyB0eXBlIGNhbiBiZSB1c2VkIGFzIGEgaGludCBvbiBhY3Rpb24gY3JlYXRvcnMgc28gdGhhdCBpdHMgJ2Rpc3BhdGNoJyBhbmQgJ2dldFN0YXRlJyBwYXJhbXMgYXJlXHJcbi8vIGNvcnJlY3RseSB0eXBlZCB0byBtYXRjaCB5b3VyIHN0b3JlLlxyXG5leHBvcnQgaW50ZXJmYWNlIEFwcFRodW5rQWN0aW9uPFRBY3Rpb24+IHtcclxuICAgIChkaXNwYXRjaDogKGFjdGlvbjogVEFjdGlvbikgPT4gdm9pZCwgZ2V0U3RhdGU6ICgpID0+IEFwcGxpY2F0aW9uU3RhdGUpOiB2b2lkO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9zdG9yZS9pbmRleC50cyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDEzNSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL2RvbWFpbi10YXNrL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQzKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgtdGh1bmsvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoNzApO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9