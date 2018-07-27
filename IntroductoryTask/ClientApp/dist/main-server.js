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
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: 'fb-login-button', "data-max-rows": '1', "data-size": 'large', "data-button-type": 'continue_with', "data-show-faces": 'false', "data-auto-logout-link": 'false', "data-use-continue-as": 'false', "data-scope": 'public_profile,email' }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzQzZTczNzBkYzEzODkyMDI3NzYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL1BheW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9yb3V0ZXMudHN4Iiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZS50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9TdWJtaXRQYXltZW50LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUEscUM7Ozs7OztBQ0FBLDZDOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FzQztBQStDL0IsSUFBTSxj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LHlCQUF5QixFQUFDLE9BQU8sRUFBQyxjQUFjLG9CQUFzQjtvQkFDdkYsOERBQUssU0FBUyxFQUFDLFVBQVU7d0JBQ3hCLGdFQUFPLFNBQVMsRUFBQyxjQUFjLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLFVBQUMsQ0FBQyxJQUFLLFlBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBNUIsQ0FBNEIsRUFBRSxRQUFRLFFBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUMsY0FBYyxHQUFHO3dCQUNyTSxpQkFBaUIsQ0FDZCxDQUNEO2dCQUNOLDhEQUFLLFNBQVMsRUFBQyxZQUFZO29CQUMxQixpRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLGNBRW5FLENBQ0osQ0FDQSxDQUNGLENBQUM7SUFDUixDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLENBaE0yQixnREFBZSxHQWdNMUM7QUFFRCx5REFBZSwyRUFBTyxDQUNyQixVQUFDLEtBQXVCLElBQUssWUFBSyxDQUFDLE9BQU8sRUFBYixDQUFhLEVBQzFDLHNFQUEyQixDQUMzQixDQUFDLGFBQWEsQ0FBeUIsRUFBQzs7Ozs7Ozs7OztBQ2hOSjtBQU9yQyxzR0FBc0c7QUFDdEcsd0dBQXdHO0FBQ3hHLDREQUE0RDtBQUNyRCxJQUFNLFFBQVEsR0FBRztJQUN2QixPQUFPLEVBQUUseURBQWU7Q0FDeEIsQ0FBQzs7Ozs7OztBQ1pGLCtDOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsOEMiLCJmaWxlIjoibWFpbi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImRpc3QvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGM0M2U3MzcwZGMxMzg5MjAyNzc2IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi92ZW5kb3JcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCIuL3ZlbmRvclwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDYpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC9yZWFjdC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQwKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDEpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItZG9tL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItcmVkdXgvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGFkZFRhc2sgfSBmcm9tIFwiZG9tYWluLXRhc2tcIjtcclxuaW1wb3J0IHsgUm91dGVyQWN0aW9uLCBwdXNoLCByb3V0ZXJBY3Rpb25zIH0gZnJvbSBcInJlYWN0LXJvdXRlci1yZWR1eFwiO1xyXG5pbXBvcnQgeyBBcHBUaHVua0FjdGlvbiB9IGZyb20gXCJDbGllbnRBcHAvc3RvcmVcIjtcclxuaW1wb3J0IHsgQWN0aW9uLCBSZWR1Y2VyIH0gZnJvbSBcInJlZHV4XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFBheW1lbnQge1xyXG5cdGNhcmROdW1iZXJIYXNFcnJvcnM6IGJvb2xlYW47XHJcblx0Y2FyZE51bWJlckVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG5cdGNhcmROdW1iZXI6IHN0cmluZztcclxuXHRuYW1lT25DYXJkSGFzRXJyb3JzOiBib29sZWFuO1xyXG5cdG5hbWVPbkNhcmRFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuXHRuYW1lT25DYXJkOiBzdHJpbmc7XHJcblx0ZXhwaXJ5TW9udGhIYXNFcnJvcnM6IGJvb2xlYW47XHJcblx0ZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuXHRleHBpcnlNb250aDogc3RyaW5nO1xyXG5cdGV4cGlyeVllYXJIYXNFcnJvcnM6IGJvb2xlYW47XHJcblx0ZXhwaXJ5WWVhckVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG5cdGV4cGlyeVllYXI6IHN0cmluZztcclxuXHRzZWN1cml0eUNvZGVIYXNFcnJvcnM6IGJvb2xlYW47XHJcblx0c2VjdXJpdHlDb2RlRXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblx0c2VjdXJpdHlDb2RlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudFN0YXRlIHtcclxuXHRpc0xvYWRpbmc6IGJvb2xlYW47XHJcblx0cGF5bWVudDogUGF5bWVudDtcclxuXHR2YWxpZGF0aW9uRXJyb3JNZXNzYWdlPzogc3RyaW5nO1xyXG5cdGhhc1BheW1lbnRTdWNjZWVkZWQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBTdWJtaXRQYXltZW50QWN0aW9uIHtcclxuXHR0eXBlOiAnU1VCTUlUX1BBWU1FTlQnO1xyXG5cdHBheW1lbnQ6IFBheW1lbnQ7XHJcbn1cclxuXHJcbmludGVyZmFjZSBQYXltZW50U3VjY2VlZGVkQWN0aW9uIHtcclxuXHR0eXBlOiAnUEFZTUVOVF9TVUNDRUVERUQnO1xyXG5cdHN1Y2Nlc3NNZXNzYWdlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBWYWxpZGF0aW9uRXJyb3JBY3Rpb24ge1xyXG5cdHR5cGU6ICdWQUxJREFUSU9OX0VSUk9SJztcclxuXHRlcnJvck1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxudHlwZSBLbm93bkFjdGlvbiA9IFN1Ym1pdFBheW1lbnRBY3Rpb24gfCBQYXltZW50U3VjY2VlZGVkQWN0aW9uIHwgVmFsaWRhdGlvbkVycm9yQWN0aW9uO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFjdGlvbkNyZWF0b3JzID0ge1xyXG5cdHN1Ym1pdFBheW1lbnQ6IChwYXltZW50OiBQYXltZW50KTogQXBwVGh1bmtBY3Rpb248YW55PiA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XHJcblx0XHQoPGFueT53aW5kb3cpLkZCLmFwaSgnL21lJywgJ2dldCcsIHsgZmllbGRzOiAnZW1haWwnIH0sIGZ1bmN0aW9uIChmYlJlc3BvbnNlOiBhbnkpIHtcclxuXHRcdFx0KDxhbnk+d2luZG93KS5wYXltaWxsLmNyZWF0ZVRva2VuKHtcclxuXHRcdFx0XHRudW1iZXI6IHBheW1lbnQuY2FyZE51bWJlcixcclxuXHRcdFx0XHRleHBfbW9udGg6IHBheW1lbnQuZXhwaXJ5TW9udGgsXHJcblx0XHRcdFx0ZXhwX3llYXI6IHBheW1lbnQuZXhwaXJ5WWVhcixcclxuXHRcdFx0XHRjdmM6IHBheW1lbnQuc2VjdXJpdHlDb2RlLFxyXG5cdFx0XHRcdGFtb3VudF9pbnQ6IDEwMCxcclxuXHRcdFx0XHRjdXJyZW5jeTogJ0VVUicsXHJcblx0XHRcdFx0Y2FyZGhvbGRlcjogcGF5bWVudC5uYW1lT25DYXJkLFxyXG5cdFx0XHRcdGVtYWlsOiBmYlJlc3BvbnNlLmVtYWlsXHJcblx0XHRcdH0sIGZ1bmN0aW9uIChlcnJvcjogYW55LCByZXN1bHQ6IGFueSkge1xyXG5cdFx0XHRcdGlmIChlcnJvcikge1xyXG5cdFx0XHRcdFx0ZGlzcGF0Y2goeyB0eXBlOiAnVkFMSURBVElPTl9FUlJPUicsIGVycm9yTWVzc2FnZTogZXJyb3IuYXBpZXJyb3IgfSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFyIHBheW1pbGxUb2tlbiA9IHJlc3VsdC50b2tlbjtcclxuXHRcdFx0XHRcdHZhciBhcGlNZXRob2RVcmwgPSBgYXBpL1N1Ym1pdFBheW1lbnQvU2F2ZWA7XHJcblx0XHRcdFx0XHR2YXIgYXBpTWV0aG9kVHlwZSA9IGBwb3N0YDtcclxuXHRcdFx0XHRcdGxldCBmZXRjaFRhc2sgPSBmZXRjaChhcGlNZXRob2RVcmwsIHtcclxuXHRcdFx0XHRcdFx0bWV0aG9kOiBhcGlNZXRob2RUeXBlLFxyXG5cdFx0XHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeShwYXltaWxsVG9rZW4pLFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8bnVtYmVyPilcclxuXHRcdFx0XHRcdFx0LnRoZW4oZGF0YSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKHsgdHlwZTogJ1ZBTElEQVRJT05fRVJST1InLCBlcnJvck1lc3NhZ2U6IGRhdGEgfSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2goeyB0eXBlOiAnUEFZTUVOVF9TVUNDRUVERUQnIH0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0YWRkVGFzayhmZXRjaFRhc2spO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0ZGlzcGF0Y2goeyB0eXBlOiAnU1VCTUlUX1BBWU1FTlQnLCBwYXltZW50OiBwYXltZW50IH0pO1xyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IGVtcHR5UGF5bWVudDogUGF5bWVudCA9IHtcclxuXHRjYXJkTnVtYmVySGFzRXJyb3JzOiBmYWxzZSwgY2FyZE51bWJlckVycm9yTWVzc2FnZTogJycsIGNhcmROdW1iZXI6ICcnLFxyXG5cdG5hbWVPbkNhcmRIYXNFcnJvcnM6IGZhbHNlLCBuYW1lT25DYXJkRXJyb3JNZXNzYWdlOiAnJywgbmFtZU9uQ2FyZDogJycsXHJcblx0ZXhwaXJ5TW9udGhIYXNFcnJvcnM6IGZhbHNlLCBleHBpcnlNb250aEVycm9yTWVzc2FnZTogJycsIGV4cGlyeU1vbnRoOiAnJyxcclxuXHRleHBpcnlZZWFySGFzRXJyb3JzOiBmYWxzZSwgZXhwaXJ5WWVhckVycm9yTWVzc2FnZTogJycsIGV4cGlyeVllYXI6ICcnLFxyXG5cdHNlY3VyaXR5Q29kZUhhc0Vycm9yczogZmFsc2UsIHNlY3VyaXR5Q29kZUVycm9yTWVzc2FnZTogJycsIHNlY3VyaXR5Q29kZTogJydcclxufVxyXG5jb25zdCB1bmxvYWRlZFN0YXRlOiBQYXltZW50U3RhdGUgPSB7IGlzTG9hZGluZzogZmFsc2UsIHBheW1lbnQ6IGVtcHR5UGF5bWVudCwgaGFzUGF5bWVudFN1Y2NlZWRlZDogZmFsc2UgfTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VyOiBSZWR1Y2VyPFBheW1lbnRTdGF0ZT4gPSAoc3RhdGU6IFBheW1lbnRTdGF0ZSwgaW5jb21pbmdBY3Rpb246IEFjdGlvbikgPT4ge1xyXG5cdGNvbnN0IGFjdGlvbiA9IGluY29taW5nQWN0aW9uIGFzIEtub3duQWN0aW9uO1xyXG5cdHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuXHRcdGNhc2UgJ1NVQk1JVF9QQVlNRU5UJzpcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRwYXltZW50OiBhY3Rpb24ucGF5bWVudCxcclxuXHRcdFx0XHRpc0xvYWRpbmc6IHRydWUsXHJcblx0XHRcdFx0aGFzUGF5bWVudFN1Y2NlZWRlZDogZmFsc2VcclxuXHRcdFx0fTtcclxuXHRcdGNhc2UgJ1BBWU1FTlRfU1VDQ0VFREVEJzpcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRwYXltZW50OiBlbXB0eVBheW1lbnQsXHJcblx0XHRcdFx0aXNMb2FkaW5nOiBmYWxzZSxcclxuXHRcdFx0XHR2YWxpZGF0aW9uRXJyb3JNZXNzYWdlOiB1bmRlZmluZWQsXHJcblx0XHRcdFx0aGFzUGF5bWVudFN1Y2NlZWRlZDogdHJ1ZVxyXG5cdFx0XHR9O1xyXG5cdFx0Y2FzZSAnVkFMSURBVElPTl9FUlJPUic6XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0cGF5bWVudDogc3RhdGUucGF5bWVudCxcclxuXHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbGlkYXRpb25FcnJvck1lc3NhZ2U6IGFjdGlvbi5lcnJvck1lc3NhZ2UsXHJcblx0XHRcdFx0aGFzUGF5bWVudFN1Y2NlZWRlZDogZmFsc2VcclxuXHRcdFx0fVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0Y29uc3QgZXhoYXVzdGl2ZUNoZWNrOiBuZXZlciA9IGFjdGlvbjtcclxuXHR9XHJcblxyXG5cdHJldHVybiBzdGF0ZSB8fCB1bmxvYWRlZFN0YXRlO1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9zdG9yZS9QYXltZW50LnRzIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSwgY29tYmluZVJlZHVjZXJzLCBHZW5lcmljU3RvcmVFbmhhbmNlciwgU3RvcmUsIFN0b3JlRW5oYW5jZXJTdG9yZUNyZWF0b3IsIFJlZHVjZXJzTWFwT2JqZWN0IH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xyXG5pbXBvcnQgeyByb3V0ZXJSZWR1Y2VyLCByb3V0ZXJNaWRkbGV3YXJlIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4JztcclxuaW1wb3J0ICogYXMgU3RvcmVNb2R1bGUgZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uU3RhdGUsIHJlZHVjZXJzIH0gZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICdoaXN0b3J5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGhpc3Rvcnk6IEhpc3RvcnksIGluaXRpYWxTdGF0ZT86IEFwcGxpY2F0aW9uU3RhdGUpIHtcclxuICAgIC8vIEJ1aWxkIG1pZGRsZXdhcmUuIFRoZXNlIGFyZSBmdW5jdGlvbnMgdGhhdCBjYW4gcHJvY2VzcyB0aGUgYWN0aW9ucyBiZWZvcmUgdGhleSByZWFjaCB0aGUgc3RvcmUuXHJcbiAgICBjb25zdCB3aW5kb3dJZkRlZmluZWQgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB3aW5kb3cgYXMgYW55O1xyXG4gICAgLy8gSWYgZGV2VG9vbHMgaXMgaW5zdGFsbGVkLCBjb25uZWN0IHRvIGl0XHJcbiAgICBjb25zdCBkZXZUb29sc0V4dGVuc2lvbiA9IHdpbmRvd0lmRGVmaW5lZCAmJiB3aW5kb3dJZkRlZmluZWQuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyBhcyAoKSA9PiBHZW5lcmljU3RvcmVFbmhhbmNlcjtcclxuICAgIGNvbnN0IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUgPSBjb21wb3NlKFxyXG4gICAgICAgIGFwcGx5TWlkZGxld2FyZSh0aHVuaywgcm91dGVyTWlkZGxld2FyZShoaXN0b3J5KSksXHJcbiAgICAgICAgZGV2VG9vbHNFeHRlbnNpb24gPyBkZXZUb29sc0V4dGVuc2lvbigpIDogPFM+KG5leHQ6IFN0b3JlRW5oYW5jZXJTdG9yZUNyZWF0b3I8Uz4pID0+IG5leHRcclxuICAgICkoY3JlYXRlU3RvcmUpO1xyXG5cclxuICAgIC8vIENvbWJpbmUgYWxsIHJlZHVjZXJzIGFuZCBpbnN0YW50aWF0ZSB0aGUgYXBwLXdpZGUgc3RvcmUgaW5zdGFuY2VcclxuICAgIGNvbnN0IGFsbFJlZHVjZXJzID0gYnVpbGRSb290UmVkdWNlcihyZWR1Y2Vycyk7XHJcbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUoYWxsUmVkdWNlcnMsIGluaXRpYWxTdGF0ZSkgYXMgU3RvcmU8QXBwbGljYXRpb25TdGF0ZT47XHJcblxyXG4gICAgLy8gRW5hYmxlIFdlYnBhY2sgaG90IG1vZHVsZSByZXBsYWNlbWVudCBmb3IgcmVkdWNlcnNcclxuICAgIGlmIChtb2R1bGUuaG90KSB7XHJcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vc3RvcmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRSb290UmVkdWNlciA9IHJlcXVpcmU8dHlwZW9mIFN0b3JlTW9kdWxlPignLi9zdG9yZScpO1xyXG4gICAgICAgICAgICBzdG9yZS5yZXBsYWNlUmVkdWNlcihidWlsZFJvb3RSZWR1Y2VyKG5leHRSb290UmVkdWNlci5yZWR1Y2VycykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdG9yZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRSb290UmVkdWNlcihhbGxSZWR1Y2VyczogUmVkdWNlcnNNYXBPYmplY3QpIHtcclxuICAgIHJldHVybiBjb21iaW5lUmVkdWNlcnM8QXBwbGljYXRpb25TdGF0ZT4oT2JqZWN0LmFzc2lnbih7fSwgYWxsUmVkdWNlcnMsIHsgcm91dGluZzogcm91dGVyUmVkdWNlciB9KSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBMYXlvdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvTGF5b3V0JztcclxuaW1wb3J0IEhvbWUgZnJvbSAnLi9jb21wb25lbnRzL0hvbWUnO1xyXG5pbXBvcnQgU3VibWl0UGF5bWVudCBmcm9tICcuL2NvbXBvbmVudHMvU3VibWl0UGF5bWVudCc7XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVzID0gPExheW91dD5cclxuICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvJyBjb21wb25lbnQ9eyBIb21lIH0gLz5cclxuICAgIDxSb3V0ZSBwYXRoPScvc3VibWl0cGF5bWVudCcgY29tcG9uZW50PXsgU3VibWl0UGF5bWVudCBhcyBhbnkgfSAvPlxyXG48L0xheW91dD47XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9yb3V0ZXMudHN4IiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTMyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTM3KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTM5KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtZG9tL3NlcnZlci5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XHJcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyByZXBsYWNlIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4JztcclxuaW1wb3J0IHsgY3JlYXRlTWVtb3J5SGlzdG9yeSB9IGZyb20gJ2hpc3RvcnknO1xyXG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXJSZW5kZXJlciwgUmVuZGVyUmVzdWx0IH0gZnJvbSAnYXNwbmV0LXByZXJlbmRlcmluZyc7XHJcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4vcm91dGVzJztcclxuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vY29uZmlndXJlU3RvcmUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2VydmVyUmVuZGVyZXIocGFyYW1zID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxSZW5kZXJSZXN1bHQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAvLyBQcmVwYXJlIFJlZHV4IHN0b3JlIHdpdGggaW4tbWVtb3J5IGhpc3RvcnksIGFuZCBkaXNwYXRjaCBhIG5hdmlnYXRpb24gZXZlbnRcclxuICAgICAgICAvLyBjb3JyZXNwb25kaW5nIHRvIHRoZSBpbmNvbWluZyBVUkxcclxuICAgICAgICBjb25zdCBiYXNlbmFtZSA9IHBhcmFtcy5iYXNlVXJsLnN1YnN0cmluZygwLCBwYXJhbXMuYmFzZVVybC5sZW5ndGggLSAxKTsgLy8gUmVtb3ZlIHRyYWlsaW5nIHNsYXNoXHJcbiAgICAgICAgY29uc3QgdXJsQWZ0ZXJCYXNlbmFtZSA9IHBhcmFtcy51cmwuc3Vic3RyaW5nKGJhc2VuYW1lLmxlbmd0aCk7XHJcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZShjcmVhdGVNZW1vcnlIaXN0b3J5KCkpO1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHJlcGxhY2UodXJsQWZ0ZXJCYXNlbmFtZSkpO1xyXG5cclxuICAgICAgICAvLyBQcmVwYXJlIGFuIGluc3RhbmNlIG9mIHRoZSBhcHBsaWNhdGlvbiBhbmQgcGVyZm9ybSBhbiBpbml0YWwgcmVuZGVyIHRoYXQgd2lsbFxyXG4gICAgICAgIC8vIGNhdXNlIGFueSBhc3luYyB0YXNrcyAoZS5nLiwgZGF0YSBhY2Nlc3MpIHRvIGJlZ2luXHJcbiAgICAgICAgY29uc3Qgcm91dGVyQ29udGV4dDogYW55ID0ge307XHJcbiAgICAgICAgY29uc3QgYXBwID0gKFxyXG4gICAgICAgICAgICA8UHJvdmlkZXIgc3RvcmU9eyBzdG9yZSB9PlxyXG4gICAgICAgICAgICAgICAgPFN0YXRpY1JvdXRlciBiYXNlbmFtZT17IGJhc2VuYW1lIH0gY29udGV4dD17IHJvdXRlckNvbnRleHQgfSBsb2NhdGlvbj17IHBhcmFtcy5sb2NhdGlvbi5wYXRoIH0gY2hpbGRyZW49eyByb3V0ZXMgfSAvPlxyXG4gICAgICAgICAgICA8L1Byb3ZpZGVyPlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmVuZGVyVG9TdHJpbmcoYXBwKTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlcmUncyBhIHJlZGlyZWN0aW9uLCBqdXN0IHNlbmQgdGhpcyBpbmZvcm1hdGlvbiBiYWNrIHRvIHRoZSBob3N0IGFwcGxpY2F0aW9uXHJcbiAgICAgICAgaWYgKHJvdXRlckNvbnRleHQudXJsKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeyByZWRpcmVjdFVybDogcm91dGVyQ29udGV4dC51cmwgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gT25jZSBhbnkgYXN5bmMgdGFza3MgYXJlIGRvbmUsIHdlIGNhbiBwZXJmb3JtIHRoZSBmaW5hbCByZW5kZXJcclxuICAgICAgICAvLyBXZSBhbHNvIHNlbmQgdGhlIHJlZHV4IHN0b3JlIHN0YXRlLCBzbyB0aGUgY2xpZW50IGNhbiBjb250aW51ZSBleGVjdXRpb24gd2hlcmUgdGhlIHNlcnZlciBsZWZ0IG9mZlxyXG4gICAgICAgIHBhcmFtcy5kb21haW5UYXNrcy50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICBodG1sOiByZW5kZXJUb1N0cmluZyhhcHApLFxyXG4gICAgICAgICAgICAgICAgZ2xvYmFsczogeyBpbml0aWFsUmVkdXhTdGF0ZTogc3RvcmUuZ2V0U3RhdGUoKSB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIHJlamVjdCk7IC8vIEFsc28gcHJvcGFnYXRlIGFueSBlcnJvcnMgYmFjayBpbnRvIHRoZSBob3N0IGFwcGxpY2F0aW9uXHJcbiAgICB9KTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Um91dGVDb21wb25lbnRQcm9wczx7fT4sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG5cdFx0XHQ8ZGl2XHJcblx0XHRcdFx0Y2xhc3NOYW1lPSdmYi1sb2dpbi1idXR0b24nXHJcblx0XHRcdFx0ZGF0YS1tYXgtcm93cz0nMSdcclxuXHRcdFx0XHRkYXRhLXNpemU9J2xhcmdlJ1xyXG5cdFx0XHRcdGRhdGEtYnV0dG9uLXR5cGU9J2NvbnRpbnVlX3dpdGgnXHJcblx0XHRcdFx0ZGF0YS1zaG93LWZhY2VzPSdmYWxzZSdcclxuXHRcdFx0XHRkYXRhLWF1dG8tbG9nb3V0LWxpbms9J2ZhbHNlJ1xyXG5cdFx0XHRcdGRhdGEtdXNlLWNvbnRpbnVlLWFzPSdmYWxzZSdcclxuXHRcdFx0XHRkYXRhLXNjb3BlPSdwdWJsaWNfcHJvZmlsZSxlbWFpbCc+XHJcblx0XHRcdDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9Ib21lLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyLWZsdWlkJz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jvdyc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLXNtLTEyJz5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9MYXlvdXQudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgKiBhcyBQYXltZW50U3RhdGUgZnJvbSAnLi4vc3RvcmUvUGF5bWVudCc7XHJcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xyXG5pbXBvcnQgeyBGb3JtRXZlbnQsIENoYW5nZUV2ZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxudHlwZSBQYXltZW50UHJvcHMgPVxyXG5cdFBheW1lbnRTdGF0ZS5QYXltZW50U3RhdGVcclxuXHQmIHR5cGVvZiBQYXltZW50U3RhdGUuYWN0aW9uQ3JlYXRvcnM7XHJcblxyXG5jbGFzcyBTdWJtaXRQYXltZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFBheW1lbnRQcm9wcywge30+IHtcclxuXHRwcml2YXRlIG9uQ2FyZE51bWJlckNoYW5nZShlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG5cdFx0dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXIgPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcblx0XHRpZiAoIWUudGFyZ2V0LnZhbHVlLm1hdGNoKC9bMC05XXsxNn0vZykpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgMTYgZGlnaXRzJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25OYW1lT25DYXJkQ2hhbmdlKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcblx0XHR0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZCA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuXHRcdGlmIChlLnRhcmdldC52YWx1ZS5sZW5ndGggPCAyKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkSGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmRFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgbmFtZSc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmRIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmRFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uRXhwaXJ5TW9udGhDaGFuZ2UoZTogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pIHtcclxuXHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aCA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuXHRcdGlmICghZS50YXJnZXQudmFsdWUubWF0Y2goL1swLTldKy9nKVxyXG5cdFx0XHR8fCBwYXJzZUludChlLnRhcmdldC52YWx1ZSkgPCAxXHJcblx0XHRcdHx8IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSA+IDEyKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBtb250aCc7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChwYXJzZUludCh0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhcikgPT09IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxyXG5cdFx0XHQmJiBwYXJzZUludChlLnRhcmdldC52YWx1ZSkgPD0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMSkge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGEgZnV0dXJlIG1vbnRoJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkV4cGlyeVllYXJDaGFuZ2UoZTogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pIHtcclxuXHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG5cdFx0aWYgKCFlLnRhcmdldC52YWx1ZS5tYXRjaCgvWzAtOV17NH0vZykpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCB5ZWFyJztcclxuXHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSA8IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSkge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBjdXJyZW50IG9yIGZ1dHVyZSB5ZWFyJztcclxuXHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSA9PSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcclxuXHRcdFx0JiYgcGFyc2VJbnQodGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoKSA8PSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgYSBmdXR1cmUgbW9udGgnO1xyXG5cclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJyc7XHJcblxyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25TZWN1cml0eUNvZGVDaGFuZ2UoZTogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pIHtcclxuXHRcdHRoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGUgPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcblx0XHRpZiAoIWUudGFyZ2V0LnZhbHVlLm1hdGNoKC9bMC05XXsyLDR9L2cpKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGVIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIHNlY3VyaXR5IGNvZGUnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGVIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25Gb3JtU3VibWl0KGU6IEZvcm1FdmVudDxIVE1MRm9ybUVsZW1lbnQ+KSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR0aGlzLnByb3BzLnN1Ym1pdFBheW1lbnQodGhpcy5wcm9wcy5wYXltZW50KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZW5kZXIoKSB7XHJcblx0XHR2YXIgY2FyZE51bWJlckVycm9yID0gdGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJIYXNFcnJvcnNcclxuXHRcdFx0PyA8c3BhbiBpZD1cImNhcmQtbnVtYmVyLWVycm9yXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVyRXJyb3JNZXNzYWdlfTwvc3Bhbj5cclxuXHRcdFx0OiA8c3BhbiBpZD1cImNhcmQtbnVtYmVyLWVycm9yXCI+PC9zcGFuPjtcclxuXHJcblx0XHR2YXIgbmFtZU9uQ2FyZEVycm9yID0gdGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmRIYXNFcnJvcnNcclxuXHRcdFx0PyA8c3BhbiBpZD1cIm5hbWUtb24tY2FyZC1lcnJvclwiIHN0eWxlPXt7IGNvbG9yOiBcInJlZFwiIH19Pnt0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEVycm9yTWVzc2FnZX08L3NwYW4+XHJcblx0XHRcdDogPHNwYW4gaWQ9XCJuYW1lLW9uLWNhcmQtZXJyb3JcIj48L3NwYW4+O1xyXG5cclxuXHRcdHZhciBleHBpcnlNb250aEVycm9yID0gdGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzXHJcblx0XHRcdD8gPHNwYW4gaWQ9XCJleHBpcnktbW9udGgtZXJyb3JcIiBzdHlsZT17eyBjb2xvcjogXCJyZWRcIiB9fT57dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlfTwvc3Bhbj5cclxuXHRcdFx0OiA8c3BhbiBpZD1cImV4cGlyeS1tb250aC1lcnJvclwiPjwvc3Bhbj47XHJcblxyXG5cdFx0dmFyIGV4cGlyeVllYXJFcnJvciA9IHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzXHJcblx0XHRcdD8gPHNwYW4gaWQ9XCJleHBpcnkteWVhci1lcnJvclwiIHN0eWxlPXt7IGNvbG9yOiBcInJlZFwiIH19Pnt0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckVycm9yTWVzc2FnZX08L3NwYW4+XHJcblx0XHRcdDogPHNwYW4gaWQ9XCJleHBpcnkteWVhci1lcnJvclwiPjwvc3Bhbj47XHJcblxyXG5cdFx0dmFyIHNlY3VyaXR5Q29kZUVycm9yID0gdGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUhhc0Vycm9yc1xyXG5cdFx0XHQ/IDxzcGFuIGlkPVwic2VjdXJpdHktY29kZS1lcnJvclwiIHN0eWxlPXt7IGNvbG9yOiBcInJlZFwiIH19Pnt0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlRXJyb3JNZXNzYWdlfTwvc3Bhbj5cclxuXHRcdFx0OiA8c3BhbiBpZD1cInNlY3VyaXR5LWNvZGUtZXJyb3JcIj48L3NwYW4+O1xyXG5cclxuXHRcdHZhciBpc0J1dHRvbkRpc2FibGVkID0gdGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJIYXNFcnJvcnNcclxuXHRcdFx0fHwgdGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmRIYXNFcnJvcnNcclxuXHRcdFx0fHwgdGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzXHJcblx0XHRcdHx8IHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzXHJcblx0XHRcdHx8IHRoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGVIYXNFcnJvcnM7XHJcblxyXG5cdFx0dmFyIHN1Y2Nlc3NBbGVydCA9IHRoaXMucHJvcHMuaGFzUGF5bWVudFN1Y2NlZWRlZFxyXG5cdFx0XHQ/IDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtc3VjY2VzcyBhbGVydC1kaXNtaXNzaWJsZVwiIHJvbGU9XCJhbGVydFwiPlxyXG5cdFx0XHRcdFBheW1lbnQgb2YgMSBldXJvIHN1Y2NlZWRlZFxyXG5cdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XHJcblx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ6IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIDxkaXY+XHJcblx0XHRcdHsgc3VjY2Vzc0FsZXJ0IH1cclxuXHRcdFx0PHNwYW4gaWQ9XCJmb3JtLXZhbGlkYXRpb24tZXJyb3JzXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMudmFsaWRhdGlvbkVycm9yTWVzc2FnZX08L3NwYW4+XHJcblx0XHRcdDxmb3JtIG9uU3VibWl0PXsoZSkgPT4gdGhpcy5vbkZvcm1TdWJtaXQoZSl9PlxyXG5cdFx0XHRcdDxkaXYgaWQ9XCJjYXJkLW51bWJlclwiIGNsYXNzTmFtZT17XCJmb3JtLWdyb3VwIHJvdyBcIiArICh0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckhhc0Vycm9ycyA/ICdoYXMtZXJyb3InIDogJycpfT5cclxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCIgY29udHJvbC1sYWJlbCBjb2wtbWQtMTJcIiBodG1sRm9yPVwiY2FyZE51bWJlclwiPkNhcmQgbnVtYmVyPC9sYWJlbD5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJjYXJkTnVtYmVyXCIgdmFsdWU9e3RoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVyfSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25DYXJkTnVtYmVyQ2hhbmdlKGUpfSByZXF1aXJlZCBtYXhMZW5ndGg9ezE2fSBwYXR0ZXJuPVwiXlswLTldezE2fSRcIiAvPlxyXG5cdFx0XHRcdFx0XHR7IGNhcmROdW1iZXJFcnJvciB9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwibmFtZS1vbi1jYXJkXCIgY2xhc3NOYW1lPXtcImZvcm0tZ3JvdXAgcm93IFwiICsgKHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkSGFzRXJyb3JzID8gJ2hhcy1lcnJvcicgOiAnJyl9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWwgY29sLW1kLTEyXCIgaHRtbEZvcj1cIm5hbWVPbkNhcmRcIj5OYW1lIG9uIGNhcmQ8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZU9uQ2FyZFwiIHZhbHVlPXt0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZH0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uTmFtZU9uQ2FyZENoYW5nZShlKX0gcmVxdWlyZWQgbWF4TGVuZ3RoPXsxMDB9IC8+XHJcblx0XHRcdFx0XHRcdHsgbmFtZU9uQ2FyZEVycm9yIH1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgaWQ9XCJleHBpcnktbW9udGhcIiBjbGFzc05hbWU9e1wiZm9ybS1ncm91cCByb3cgXCIgKyAodGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID8gJ2hhcy1lcnJvcicgOiAnJyl9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWwgY29sLW1kLTEyXCIgaHRtbEZvcj1cImV4cGlyeU1vbnRoXCI+RXhwaXJ5IG1vbnRoPC9sYWJlbD5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJudW1iZXJcIiBuYW1lPVwiZXhwaXJ5TW9udGhcIiB2YWx1ZT17dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRofSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25FeHBpcnlNb250aENoYW5nZShlKX0gcmVxdWlyZWQgbWF4TGVuZ3RoPXsyfSBwYXR0ZXJuPVwiXlswLTldKyRcIiAvPlxyXG5cdFx0XHRcdFx0XHR7IGV4cGlyeU1vbnRoRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cImV4cGlyeS15ZWFyXCIgY2xhc3NOYW1lPXtcImZvcm0tZ3JvdXAgcm93IFwiICsgKHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzID8gJ2hhcy1lcnJvcicgOiAnJyl9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWwgY29sLW1kLTEyXCIgaHRtbEZvcj1cImV4cGlyeVllYXJcIj5FeHBpcnkgeWVhcjwvbGFiZWw+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcblx0XHRcdFx0XHRcdDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwibnVtYmVyXCIgbmFtZT1cImV4cGlyeVllYXJcIiB2YWx1ZT17dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJ9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbkV4cGlyeVllYXJDaGFuZ2UoZSl9IHJlcXVpcmVkIG1heExlbmd0aD17NH0gcGF0dGVybj1cIl5bMC05XXs0fSRcIiAvPlxyXG5cdFx0XHRcdFx0XHR7IGV4cGlyeVllYXJFcnJvciB9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwic2VjdXJpdHktY29kZVwiIGNsYXNzTmFtZT17XCJmb3JtLWdyb3VwIHJvdyBcIiArICh0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlSGFzRXJyb3JzID8gJ2hhcy1lcnJvcicgOiAnJyl9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWwgY29sLW1kLTEyXCIgaHRtbEZvcj1cInNlY3VyaXR5Q29kZVwiPlNlY3VyaXR5IGNvZGU8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwic2VjdXJpdHlDb2RlXCIgdmFsdWU9e3RoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGV9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vblNlY3VyaXR5Q29kZUNoYW5nZShlKX0gcmVxdWlyZWQgbWF4TGVuZ3RoPXs0fSBwYXR0ZXJuPVwiXlswLTldezIsNH0kXCIgLz5cclxuXHRcdFx0XHRcdFx0eyBzZWN1cml0eUNvZGVFcnJvciB9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIGRpc2FibGVkPXtpc0J1dHRvbkRpc2FibGVkfT5cclxuXHRcdFx0XHRcdFx0UGF5IG5vd1xyXG5cdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZm9ybT5cclxuXHRcdDwvZGl2PjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcblx0KHN0YXRlOiBBcHBsaWNhdGlvblN0YXRlKSA9PiBzdGF0ZS5wYXltZW50LFxyXG5cdFBheW1lbnRTdGF0ZS5hY3Rpb25DcmVhdG9yc1xyXG4pKFN1Ym1pdFBheW1lbnQpIGFzIHR5cGVvZiBTdWJtaXRQYXltZW50O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9TdWJtaXRQYXltZW50LnRzeCIsImltcG9ydCAqIGFzIFBheW1lbnQgZnJvbSAnLi9QYXltZW50JztcclxuXHJcbi8vIFRoZSB0b3AtbGV2ZWwgc3RhdGUgb2JqZWN0XHJcbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpb25TdGF0ZSB7XHJcblx0cGF5bWVudDogUGF5bWVudC5QYXltZW50U3RhdGVcclxufVxyXG5cclxuLy8gV2hlbmV2ZXIgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsIFJlZHV4IHdpbGwgdXBkYXRlIGVhY2ggdG9wLWxldmVsIGFwcGxpY2F0aW9uIHN0YXRlIHByb3BlcnR5IHVzaW5nXHJcbi8vIHRoZSByZWR1Y2VyIHdpdGggdGhlIG1hdGNoaW5nIG5hbWUuIEl0J3MgaW1wb3J0YW50IHRoYXQgdGhlIG5hbWVzIG1hdGNoIGV4YWN0bHksIGFuZCB0aGF0IHRoZSByZWR1Y2VyXHJcbi8vIGFjdHMgb24gdGhlIGNvcnJlc3BvbmRpbmcgQXBwbGljYXRpb25TdGF0ZSBwcm9wZXJ0eSB0eXBlLlxyXG5leHBvcnQgY29uc3QgcmVkdWNlcnMgPSB7XHJcblx0cGF5bWVudDogUGF5bWVudC5yZWR1Y2VyXHJcbn07XHJcblxyXG4vLyBUaGlzIHR5cGUgY2FuIGJlIHVzZWQgYXMgYSBoaW50IG9uIGFjdGlvbiBjcmVhdG9ycyBzbyB0aGF0IGl0cyAnZGlzcGF0Y2gnIGFuZCAnZ2V0U3RhdGUnIHBhcmFtcyBhcmVcclxuLy8gY29ycmVjdGx5IHR5cGVkIHRvIG1hdGNoIHlvdXIgc3RvcmUuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXBwVGh1bmtBY3Rpb248VEFjdGlvbj4ge1xyXG4gICAgKGRpc3BhdGNoOiAoYWN0aW9uOiBUQWN0aW9uKSA9PiB2b2lkLCBnZXRTdGF0ZTogKCkgPT4gQXBwbGljYXRpb25TdGF0ZSk6IHZvaWQ7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3N0b3JlL2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTM1KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvZG9tYWluLXRhc2svaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDMpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSg3MCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=