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

module.exports = (__webpack_require__(0))(142);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(140);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(141);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_domain_task___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_domain_task__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__);


var actionCreators = {
    submitPayment: function (payment) { return function (dispatch, getState) {
        var apiMethodUrl = "api/Person/Add";
        var apiMethodType = "post";
        var fetchTask = fetch(apiMethodUrl, {
            method: apiMethodType,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payment),
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (data) {
                dispatch({ type: 'VALIDATION_ERROR', errorMessage: data });
            }
            else {
                dispatch({ type: 'RECEIVE_GENERIC_RESULT' });
                dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__["push"])("/fetchpeople"));
            }
        });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_domain_task__["addTask"])(fetchTask);
        dispatch({ type: 'SUBMIT_PAYMENT', person: payment });
    }; }
};
var emptyPayment = {
    cardNumberHasErrors: false, cardNumberErrorMessage: '', cardNumber: '',
    nameOnCardHasErrors: false, nameOnCardErrorMessage: '', nameOnCard: '',
    expiryMonthHasErrors: false, expiryMonthErrorMessage: '', expiryMonth: '',
    expiryYearHasErrors: false, expiryYearErrorMessage: '', expiryYear: '',
    securityCodeHasErrors: false, securityCodeErrorMessage: '', securityCode: ''
};
var unloadedState = { isLoading: false, payment: emptyPayment };
var reducer = function (state, incomingAction) {
    var action = incomingAction;
    switch (action.type) {
        case 'SUBMIT_PAYMENT':
            return {
                payment: action.payment,
                isLoading: true
            };
        case 'RECEIVE_GENERIC_RESULT':
            return {
                payment: emptyPayment,
                isLoading: false,
                validationErrorMessage: undefined
            };
        case 'VALIDATION_ERROR':
            return {
                payment: state.payment,
                isLoading: false,
                validationErrorMessage: action.errorMessage
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(2);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(4);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux__ = __webpack_require__(2);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(3);
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
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { style: { color: "red" } }, this.props.payment.cardNumberErrorMessage)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null);
        var nameOnCardError = this.props.payment.nameOnCardHasErrors
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { style: { color: "red" } }, this.props.payment.nameOnCardErrorMessage)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null);
        var expiryMonthError = this.props.payment.expiryMonthHasErrors
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { style: { color: "red" } }, this.props.payment.expiryMonthErrorMessage)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null);
        var expiryYearError = this.props.payment.expiryYearHasErrors
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { style: { color: "red" } }, this.props.payment.expiryYearErrorMessage)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null);
        var securityCodeError = this.props.payment.securityCodeHasErrors
            ? __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { style: { color: "red" } }, this.props.payment.securityCodeErrorMessage)
            : __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", null);
        return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null,
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("span", { style: { color: "red" } }, this.props.validationErrorMessage),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("form", { onSubmit: function (e) { return _this.props.submitPayment(_this.props.payment); } },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "form-group row " + (this.props.payment.cardNumberHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: " control-label col-md-12", htmlFor: "cardNumber" }, "Card number"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "text", name: "cardNumber", defaultValue: this.props.payment.cardNumber, onChange: function (e) { return _this.onCardNumberChange(e); }, required: true, maxLength: 16, pattern: "^[0-9]{16}$" }),
                        cardNumberError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "form-group row " + (this.props.payment.nameOnCardHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "nameOnCard" }, "Name on card"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "text", name: "nameOnCard", defaultValue: this.props.payment.nameOnCard, onChange: function (e) { return _this.onNameOnCardChange(e); }, required: true, maxLength: 100 }),
                        nameOnCardError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "form-group row " + (this.props.payment.expiryMonthHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "expiryMonth" }, "Expiry month"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "number", name: "expiryMonth", defaultValue: this.props.payment.expiryMonth, onChange: function (e) { return _this.onExpiryMonthChange(e); }, required: true, maxLength: 2, pattern: "^[0-9]+$" }),
                        expiryMonthError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "form-group row " + (this.props.payment.expiryYearHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "expiryYear" }, "Expiry year"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "number", name: "expiryYear", defaultValue: this.props.payment.expiryYear, onChange: function (e) { return _this.onExpiryYearChange(e); }, required: true, maxLength: 4, pattern: "^[0-9]{4}$" }),
                        expiryYearError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "form-group row " + (this.props.payment.securityCodeHasErrors ? 'has-error' : '') },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { className: "control-label col-md-12", htmlFor: "securityCode" }, "Security code"),
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "col-md-4" },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { className: "form-control", type: "text", name: "securityCode", defaultValue: this.props.payment.securityCode, onChange: function (e) { return _this.onSecurityCodeChange(e); }, required: true, maxLength: 4, pattern: "^[0-9]{2,4}$" }),
                        securityCodeError)),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: "form-group" },
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { type: "submit", className: "btn btn-default" }, "Pay now"))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2JkYTMyYjg1MmEzZDI2NjJmMmYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiLi92ZW5kb3JcIiIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1yZWR1eC9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL3N0b3JlL1BheW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9yb3V0ZXMudHN4Iiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9oaXN0b3J5L2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9zZXJ2ZXIuanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvSG9tZS50c3giLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvY29tcG9uZW50cy9TdWJtaXRQYXltZW50LnRzeCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9kb21haW4tdGFzay9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3IiLCJ3ZWJwYWNrOi8vL2RlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yIiwid2VicGFjazovLy9kZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvciJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUEscUM7Ozs7OztBQ0FBLDZDOzs7Ozs7QUNBQSwrQzs7Ozs7O0FDQUEsK0M7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7Ozs7O0FDQXNDO0FBQ2lDO0FBNENo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QUNBQSw4QyIsImZpbGUiOiJtYWluLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiZGlzdC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2JkYTMyYjg1MmEzZDI2NjJmMmYiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3ZlbmRvclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIi4vdmVuZG9yXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoNik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0L3JlYWN0LmpzIGZyb20gZGxsLXJlZmVyZW5jZSAuL3ZlbmRvclxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXItcmVkdXgvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oMCkpKDE0MCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTQxKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyLWRvbS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgYWRkVGFzayB9IGZyb20gXCJkb21haW4tdGFza1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXJBY3Rpb24sIHB1c2gsIHJvdXRlckFjdGlvbnMgfSBmcm9tIFwicmVhY3Qtcm91dGVyLXJlZHV4XCI7XHJcbmltcG9ydCB7IEFwcFRodW5rQWN0aW9uIH0gZnJvbSBcIkNsaWVudEFwcC9zdG9yZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb24sIFJlZHVjZXIgfSBmcm9tIFwicmVkdXhcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudCB7XHJcblx0Y2FyZE51bWJlckhhc0Vycm9yczogYm9vbGVhbjtcclxuXHRjYXJkTnVtYmVyRXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblx0Y2FyZE51bWJlcjogc3RyaW5nO1xyXG5cdG5hbWVPbkNhcmRIYXNFcnJvcnM6IGJvb2xlYW47XHJcblx0bmFtZU9uQ2FyZEVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG5cdG5hbWVPbkNhcmQ6IHN0cmluZztcclxuXHRleHBpcnlNb250aEhhc0Vycm9yczogYm9vbGVhbjtcclxuXHRleHBpcnlNb250aEVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG5cdGV4cGlyeU1vbnRoOiBzdHJpbmc7XHJcblx0ZXhwaXJ5WWVhckhhc0Vycm9yczogYm9vbGVhbjtcclxuXHRleHBpcnlZZWFyRXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcblx0ZXhwaXJ5WWVhcjogc3RyaW5nO1xyXG5cdHNlY3VyaXR5Q29kZUhhc0Vycm9yczogYm9vbGVhbjtcclxuXHRzZWN1cml0eUNvZGVFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuXHRzZWN1cml0eUNvZGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYXltZW50U3RhdGUge1xyXG5cdGlzTG9hZGluZzogYm9vbGVhbjtcclxuXHRwYXltZW50OiBQYXltZW50O1xyXG5cdHZhbGlkYXRpb25FcnJvck1lc3NhZ2U/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBTdWJtaXRQYXltZW50QWN0aW9uIHtcclxuXHR0eXBlOiAnU1VCTUlUX1BBWU1FTlQnO1xyXG5cdHBheW1lbnQ6IFBheW1lbnQ7XHJcbn1cclxuXHJcbmludGVyZmFjZSBSZWNlaXZlR2VuZXJpY1Jlc3VsdEFjdGlvbiB7XHJcblx0dHlwZTogJ1JFQ0VJVkVfR0VORVJJQ19SRVNVTFQnO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVmFsaWRhdGlvbkVycm9yQWN0aW9uIHtcclxuXHR0eXBlOiAnVkFMSURBVElPTl9FUlJPUic7XHJcblx0ZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbn1cclxuXHJcbnR5cGUgS25vd25BY3Rpb24gPSBTdWJtaXRQYXltZW50QWN0aW9uIHwgUmVjZWl2ZUdlbmVyaWNSZXN1bHRBY3Rpb24gfCBWYWxpZGF0aW9uRXJyb3JBY3Rpb247XHJcblxyXG5leHBvcnQgY29uc3QgYWN0aW9uQ3JlYXRvcnMgPSB7XHJcblx0c3VibWl0UGF5bWVudDogKHBheW1lbnQ6IFBheW1lbnQpOiBBcHBUaHVua0FjdGlvbjxhbnk+ID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcclxuXHRcdHZhciBhcGlNZXRob2RVcmwgPSBgYXBpL1BlcnNvbi9BZGRgO1xyXG5cdFx0dmFyIGFwaU1ldGhvZFR5cGUgPSBgcG9zdGA7XHJcblx0XHRsZXQgZmV0Y2hUYXNrID0gZmV0Y2goYXBpTWV0aG9kVXJsLCB7XHJcblx0XHRcdG1ldGhvZDogYXBpTWV0aG9kVHlwZSxcclxuXHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcclxuXHRcdFx0fSxcclxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkocGF5bWVudCksXHJcblx0XHR9KVxyXG5cdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpIGFzIFByb21pc2U8bnVtYmVyPilcclxuXHRcdC50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHRcdGRpc3BhdGNoKHsgdHlwZTogJ1ZBTElEQVRJT05fRVJST1InLCBlcnJvck1lc3NhZ2U6IGRhdGEgfSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0ZGlzcGF0Y2goeyB0eXBlOiAnUkVDRUlWRV9HRU5FUklDX1JFU1VMVCcgfSk7XHJcblx0XHRcdFx0ZGlzcGF0Y2gocHVzaChgL2ZldGNocGVvcGxlYCkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRhZGRUYXNrKGZldGNoVGFzayk7XHJcblx0XHRkaXNwYXRjaCh7IHR5cGU6ICdTVUJNSVRfUEFZTUVOVCcsIHBlcnNvbjogcGF5bWVudCB9KTtcclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCBlbXB0eVBheW1lbnQ6IFBheW1lbnQgPSB7XHJcblx0Y2FyZE51bWJlckhhc0Vycm9yczogZmFsc2UsIGNhcmROdW1iZXJFcnJvck1lc3NhZ2U6ICcnLCBjYXJkTnVtYmVyOiAnJyxcclxuXHRuYW1lT25DYXJkSGFzRXJyb3JzOiBmYWxzZSwgbmFtZU9uQ2FyZEVycm9yTWVzc2FnZTogJycsIG5hbWVPbkNhcmQ6ICcnLFxyXG5cdGV4cGlyeU1vbnRoSGFzRXJyb3JzOiBmYWxzZSwgZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2U6ICcnLCBleHBpcnlNb250aDogJycsXHJcblx0ZXhwaXJ5WWVhckhhc0Vycm9yczogZmFsc2UsIGV4cGlyeVllYXJFcnJvck1lc3NhZ2U6ICcnLCBleHBpcnlZZWFyOiAnJyxcclxuXHRzZWN1cml0eUNvZGVIYXNFcnJvcnM6IGZhbHNlLCBzZWN1cml0eUNvZGVFcnJvck1lc3NhZ2U6ICcnLCBzZWN1cml0eUNvZGU6ICcnXHJcbn1cclxuY29uc3QgdW5sb2FkZWRTdGF0ZTogUGF5bWVudFN0YXRlID0geyBpc0xvYWRpbmc6IGZhbHNlLCBwYXltZW50OiBlbXB0eVBheW1lbnQgfTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VyOiBSZWR1Y2VyPFBheW1lbnRTdGF0ZT4gPSAoc3RhdGU6IFBheW1lbnRTdGF0ZSwgaW5jb21pbmdBY3Rpb246IEFjdGlvbikgPT4ge1xyXG5cdGNvbnN0IGFjdGlvbiA9IGluY29taW5nQWN0aW9uIGFzIEtub3duQWN0aW9uO1xyXG5cdHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuXHRcdGNhc2UgJ1NVQk1JVF9QQVlNRU5UJzpcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRwYXltZW50OiBhY3Rpb24ucGF5bWVudCxcclxuXHRcdFx0XHRpc0xvYWRpbmc6IHRydWVcclxuXHRcdFx0fTtcclxuXHRcdGNhc2UgJ1JFQ0VJVkVfR0VORVJJQ19SRVNVTFQnOlxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHBheW1lbnQ6IGVtcHR5UGF5bWVudCxcclxuXHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbGlkYXRpb25FcnJvck1lc3NhZ2U6IHVuZGVmaW5lZFxyXG5cdFx0XHR9O1xyXG5cdFx0Y2FzZSAnVkFMSURBVElPTl9FUlJPUic6XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0cGF5bWVudDogc3RhdGUucGF5bWVudCxcclxuXHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxyXG5cdFx0XHRcdHZhbGlkYXRpb25FcnJvck1lc3NhZ2U6IGFjdGlvbi5lcnJvck1lc3NhZ2VcclxuXHRcdFx0fVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0Y29uc3QgZXhoYXVzdGl2ZUNoZWNrOiBuZXZlciA9IGFjdGlvbjtcclxuXHR9XHJcblxyXG5cdHJldHVybiBzdGF0ZSB8fCB1bmxvYWRlZFN0YXRlO1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9zdG9yZS9QYXltZW50LnRzIiwiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSwgY29tYmluZVJlZHVjZXJzLCBHZW5lcmljU3RvcmVFbmhhbmNlciwgU3RvcmUsIFN0b3JlRW5oYW5jZXJTdG9yZUNyZWF0b3IsIFJlZHVjZXJzTWFwT2JqZWN0IH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xyXG5pbXBvcnQgeyByb3V0ZXJSZWR1Y2VyLCByb3V0ZXJNaWRkbGV3YXJlIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4JztcclxuaW1wb3J0ICogYXMgU3RvcmVNb2R1bGUgZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uU3RhdGUsIHJlZHVjZXJzIH0gZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICdoaXN0b3J5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGhpc3Rvcnk6IEhpc3RvcnksIGluaXRpYWxTdGF0ZT86IEFwcGxpY2F0aW9uU3RhdGUpIHtcclxuICAgIC8vIEJ1aWxkIG1pZGRsZXdhcmUuIFRoZXNlIGFyZSBmdW5jdGlvbnMgdGhhdCBjYW4gcHJvY2VzcyB0aGUgYWN0aW9ucyBiZWZvcmUgdGhleSByZWFjaCB0aGUgc3RvcmUuXHJcbiAgICBjb25zdCB3aW5kb3dJZkRlZmluZWQgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB3aW5kb3cgYXMgYW55O1xyXG4gICAgLy8gSWYgZGV2VG9vbHMgaXMgaW5zdGFsbGVkLCBjb25uZWN0IHRvIGl0XHJcbiAgICBjb25zdCBkZXZUb29sc0V4dGVuc2lvbiA9IHdpbmRvd0lmRGVmaW5lZCAmJiB3aW5kb3dJZkRlZmluZWQuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyBhcyAoKSA9PiBHZW5lcmljU3RvcmVFbmhhbmNlcjtcclxuICAgIGNvbnN0IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUgPSBjb21wb3NlKFxyXG4gICAgICAgIGFwcGx5TWlkZGxld2FyZSh0aHVuaywgcm91dGVyTWlkZGxld2FyZShoaXN0b3J5KSksXHJcbiAgICAgICAgZGV2VG9vbHNFeHRlbnNpb24gPyBkZXZUb29sc0V4dGVuc2lvbigpIDogPFM+KG5leHQ6IFN0b3JlRW5oYW5jZXJTdG9yZUNyZWF0b3I8Uz4pID0+IG5leHRcclxuICAgICkoY3JlYXRlU3RvcmUpO1xyXG5cclxuICAgIC8vIENvbWJpbmUgYWxsIHJlZHVjZXJzIGFuZCBpbnN0YW50aWF0ZSB0aGUgYXBwLXdpZGUgc3RvcmUgaW5zdGFuY2VcclxuICAgIGNvbnN0IGFsbFJlZHVjZXJzID0gYnVpbGRSb290UmVkdWNlcihyZWR1Y2Vycyk7XHJcbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlV2l0aE1pZGRsZXdhcmUoYWxsUmVkdWNlcnMsIGluaXRpYWxTdGF0ZSkgYXMgU3RvcmU8QXBwbGljYXRpb25TdGF0ZT47XHJcblxyXG4gICAgLy8gRW5hYmxlIFdlYnBhY2sgaG90IG1vZHVsZSByZXBsYWNlbWVudCBmb3IgcmVkdWNlcnNcclxuICAgIGlmIChtb2R1bGUuaG90KSB7XHJcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vc3RvcmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHRSb290UmVkdWNlciA9IHJlcXVpcmU8dHlwZW9mIFN0b3JlTW9kdWxlPignLi9zdG9yZScpO1xyXG4gICAgICAgICAgICBzdG9yZS5yZXBsYWNlUmVkdWNlcihidWlsZFJvb3RSZWR1Y2VyKG5leHRSb290UmVkdWNlci5yZWR1Y2VycykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdG9yZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRSb290UmVkdWNlcihhbGxSZWR1Y2VyczogUmVkdWNlcnNNYXBPYmplY3QpIHtcclxuICAgIHJldHVybiBjb21iaW5lUmVkdWNlcnM8QXBwbGljYXRpb25TdGF0ZT4oT2JqZWN0LmFzc2lnbih7fSwgYWxsUmVkdWNlcnMsIHsgcm91dGluZzogcm91dGVyUmVkdWNlciB9KSk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL2NvbmZpZ3VyZVN0b3JlLnRzIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBMYXlvdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvTGF5b3V0JztcclxuaW1wb3J0IEhvbWUgZnJvbSAnLi9jb21wb25lbnRzL0hvbWUnO1xyXG5pbXBvcnQgU3VibWl0UGF5bWVudCBmcm9tICcuL2NvbXBvbmVudHMvU3VibWl0UGF5bWVudCc7XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVzID0gPExheW91dD5cclxuICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvJyBjb21wb25lbnQ9eyBIb21lIH0gLz5cclxuICAgIDxSb3V0ZSBwYXRoPScvc3VibWl0cGF5bWVudCcgY29tcG9uZW50PXsgU3VibWl0UGF5bWVudCBhcyBhbnkgfSAvPlxyXG48L0xheW91dD47XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9yb3V0ZXMudHN4IiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTMyKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvYXNwbmV0LXByZXJlbmRlcmluZy9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTM3KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvaGlzdG9yeS9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTM5KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvcmVhY3QtZG9tL3NlcnZlci5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XHJcbmltcG9ydCB7IFN0YXRpY1JvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyByZXBsYWNlIH0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4JztcclxuaW1wb3J0IHsgY3JlYXRlTWVtb3J5SGlzdG9yeSB9IGZyb20gJ2hpc3RvcnknO1xyXG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXJSZW5kZXJlciwgUmVuZGVyUmVzdWx0IH0gZnJvbSAnYXNwbmV0LXByZXJlbmRlcmluZyc7XHJcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4vcm91dGVzJztcclxuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vY29uZmlndXJlU3RvcmUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2VydmVyUmVuZGVyZXIocGFyYW1zID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxSZW5kZXJSZXN1bHQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAvLyBQcmVwYXJlIFJlZHV4IHN0b3JlIHdpdGggaW4tbWVtb3J5IGhpc3RvcnksIGFuZCBkaXNwYXRjaCBhIG5hdmlnYXRpb24gZXZlbnRcclxuICAgICAgICAvLyBjb3JyZXNwb25kaW5nIHRvIHRoZSBpbmNvbWluZyBVUkxcclxuICAgICAgICBjb25zdCBiYXNlbmFtZSA9IHBhcmFtcy5iYXNlVXJsLnN1YnN0cmluZygwLCBwYXJhbXMuYmFzZVVybC5sZW5ndGggLSAxKTsgLy8gUmVtb3ZlIHRyYWlsaW5nIHNsYXNoXHJcbiAgICAgICAgY29uc3QgdXJsQWZ0ZXJCYXNlbmFtZSA9IHBhcmFtcy51cmwuc3Vic3RyaW5nKGJhc2VuYW1lLmxlbmd0aCk7XHJcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZShjcmVhdGVNZW1vcnlIaXN0b3J5KCkpO1xyXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKHJlcGxhY2UodXJsQWZ0ZXJCYXNlbmFtZSkpO1xyXG5cclxuICAgICAgICAvLyBQcmVwYXJlIGFuIGluc3RhbmNlIG9mIHRoZSBhcHBsaWNhdGlvbiBhbmQgcGVyZm9ybSBhbiBpbml0YWwgcmVuZGVyIHRoYXQgd2lsbFxyXG4gICAgICAgIC8vIGNhdXNlIGFueSBhc3luYyB0YXNrcyAoZS5nLiwgZGF0YSBhY2Nlc3MpIHRvIGJlZ2luXHJcbiAgICAgICAgY29uc3Qgcm91dGVyQ29udGV4dDogYW55ID0ge307XHJcbiAgICAgICAgY29uc3QgYXBwID0gKFxyXG4gICAgICAgICAgICA8UHJvdmlkZXIgc3RvcmU9eyBzdG9yZSB9PlxyXG4gICAgICAgICAgICAgICAgPFN0YXRpY1JvdXRlciBiYXNlbmFtZT17IGJhc2VuYW1lIH0gY29udGV4dD17IHJvdXRlckNvbnRleHQgfSBsb2NhdGlvbj17IHBhcmFtcy5sb2NhdGlvbi5wYXRoIH0gY2hpbGRyZW49eyByb3V0ZXMgfSAvPlxyXG4gICAgICAgICAgICA8L1Byb3ZpZGVyPlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmVuZGVyVG9TdHJpbmcoYXBwKTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlcmUncyBhIHJlZGlyZWN0aW9uLCBqdXN0IHNlbmQgdGhpcyBpbmZvcm1hdGlvbiBiYWNrIHRvIHRoZSBob3N0IGFwcGxpY2F0aW9uXHJcbiAgICAgICAgaWYgKHJvdXRlckNvbnRleHQudXJsKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoeyByZWRpcmVjdFVybDogcm91dGVyQ29udGV4dC51cmwgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gT25jZSBhbnkgYXN5bmMgdGFza3MgYXJlIGRvbmUsIHdlIGNhbiBwZXJmb3JtIHRoZSBmaW5hbCByZW5kZXJcclxuICAgICAgICAvLyBXZSBhbHNvIHNlbmQgdGhlIHJlZHV4IHN0b3JlIHN0YXRlLCBzbyB0aGUgY2xpZW50IGNhbiBjb250aW51ZSBleGVjdXRpb24gd2hlcmUgdGhlIHNlcnZlciBsZWZ0IG9mZlxyXG4gICAgICAgIHBhcmFtcy5kb21haW5UYXNrcy50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICBodG1sOiByZW5kZXJUb1N0cmluZyhhcHApLFxyXG4gICAgICAgICAgICAgICAgZ2xvYmFsczogeyBpbml0aWFsUmVkdXhTdGF0ZTogc3RvcmUuZ2V0U3RhdGUoKSB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIHJlamVjdCk7IC8vIEFsc28gcHJvcGFnYXRlIGFueSBlcnJvcnMgYmFjayBpbnRvIHRoZSBob3N0IGFwcGxpY2F0aW9uXHJcbiAgICB9KTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0NsaWVudEFwcC9ib290LXNlcnZlci50c3giLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Um91dGVDb21wb25lbnRQcm9wczx7fT4sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG5cdFx0XHQ8ZGl2XHJcblx0XHRcdFx0Y2xhc3NOYW1lPSdmYi1sb2dpbi1idXR0b24nXHJcblx0XHRcdFx0ZGF0YS1tYXgtcm93cz0nMSdcclxuXHRcdFx0XHRkYXRhLXNpemU9J2xhcmdlJ1xyXG5cdFx0XHRcdGRhdGEtYnV0dG9uLXR5cGU9J2NvbnRpbnVlX3dpdGgnXHJcblx0XHRcdFx0ZGF0YS1zaG93LWZhY2VzPSdmYWxzZSdcclxuXHRcdFx0XHRkYXRhLWF1dG8tbG9nb3V0LWxpbms9J2ZhbHNlJ1xyXG5cdFx0XHRcdGRhdGEtdXNlLWNvbnRpbnVlLWFzPSdmYWxzZSc+XHJcblx0XHRcdDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9Ib21lLnRzeCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIHt9PiB7XHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyLWZsdWlkJz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Jvdyc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLXNtLTEyJz5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9MYXlvdXQudHN4IiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBBcHBsaWNhdGlvblN0YXRlIH0gZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgKiBhcyBQYXltZW50U3RhdGUgZnJvbSAnLi4vc3RvcmUvUGF5bWVudCc7XHJcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xyXG5pbXBvcnQgeyBGb3JtRXZlbnQsIENoYW5nZUV2ZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxudHlwZSBQYXltZW50UHJvcHMgPVxyXG5cdFBheW1lbnRTdGF0ZS5QYXltZW50U3RhdGVcclxuXHQmIHR5cGVvZiBQYXltZW50U3RhdGUuYWN0aW9uQ3JlYXRvcnM7XHJcblxyXG5jbGFzcyBTdWJtaXRQYXltZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFBheW1lbnRQcm9wcywge30+IHtcclxuXHRwcml2YXRlIG9uQ2FyZE51bWJlckNoYW5nZShlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG5cdFx0dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXIgPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcblx0XHRpZiAoIWUudGFyZ2V0LnZhbHVlLm1hdGNoKC9bMC05XXsxNn0vZykpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgMTYgZGlnaXRzJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuY2FyZE51bWJlckVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25OYW1lT25DYXJkQ2hhbmdlKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcblx0XHR0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZCA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuXHRcdGlmIChlLnRhcmdldC52YWx1ZS5sZW5ndGggPD0gMCkge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9ycyA9IHRydWU7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhIG5hbWUnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkV4cGlyeU1vbnRoQ2hhbmdlKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcblx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGggPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcblx0XHRpZiAoIWUudGFyZ2V0LnZhbHVlLm1hdGNoKC9bMC05XSsvZylcclxuXHRcdFx0fHwgcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIDwgMVxyXG5cdFx0XHR8fCBwYXJzZUludChlLnRhcmdldC52YWx1ZSkgPiAxMikge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgbW9udGgnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAocGFyc2VJbnQodGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXIpID09PSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcclxuXHRcdFx0JiYgcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIDw9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhIGZ1dHVyZSBtb250aCc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25FeHBpcnlZZWFyQ2hhbmdlKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcblx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhciA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuXHRcdGlmICghZS50YXJnZXQudmFsdWUubWF0Y2goL1swLTldezR9L2cpKSB7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgeWVhcic7XHJcblxyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChwYXJzZUludChlLnRhcmdldC52YWx1ZSkgPCBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5WWVhckVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgY3VycmVudCBvciBmdXR1cmUgeWVhcic7XHJcblxyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChwYXJzZUludChlLnRhcmdldC52YWx1ZSkgPT0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXHJcblx0XHRcdCYmIHBhcnNlSW50KHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aCkgPD0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMSkge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGEgZnV0dXJlIG1vbnRoJztcclxuXHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyRXJyb3JNZXNzYWdlID0gJyc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRoSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEVycm9yTWVzc2FnZSA9ICcnO1xyXG5cclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJIYXNFcnJvcnMgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uU2VjdXJpdHlDb2RlQ2hhbmdlKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcblx0XHR0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG5cdFx0aWYgKCFlLnRhcmdldC52YWx1ZS5tYXRjaCgvWzAtOV17Miw0fS9nKSkge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlSGFzRXJyb3JzID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBzZWN1cml0eSBjb2RlJztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlSGFzRXJyb3JzID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGVFcnJvck1lc3NhZ2UgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvcmNlVXBkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcmVuZGVyKCkge1xyXG5cdFx0dmFyIGNhcmROdW1iZXJFcnJvciA9IHRoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVySGFzRXJyb3JzXHJcblx0XHRcdD8gPHNwYW4gc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVyRXJyb3JNZXNzYWdlfTwvc3Bhbj5cclxuXHRcdFx0OiA8c3Bhbj48L3NwYW4+O1xyXG5cclxuXHRcdHZhciBuYW1lT25DYXJkRXJyb3IgPSB0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEhhc0Vycm9yc1xyXG5cdFx0XHQ/IDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBcInJlZFwiIH19Pnt0aGlzLnByb3BzLnBheW1lbnQubmFtZU9uQ2FyZEVycm9yTWVzc2FnZX08L3NwYW4+XHJcblx0XHRcdDogPHNwYW4+PC9zcGFuPjtcclxuXHJcblx0XHR2YXIgZXhwaXJ5TW9udGhFcnJvciA9IHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlNb250aEhhc0Vycm9yc1xyXG5cdFx0XHQ/IDxzcGFuIHN0eWxlPXt7IGNvbG9yOiBcInJlZFwiIH19Pnt0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhFcnJvck1lc3NhZ2V9PC9zcGFuPlxyXG5cdFx0XHQ6IDxzcGFuPjwvc3Bhbj47XHJcblxyXG5cdFx0dmFyIGV4cGlyeVllYXJFcnJvciA9IHRoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFySGFzRXJyb3JzXHJcblx0XHRcdD8gPHNwYW4gc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMucGF5bWVudC5leHBpcnlZZWFyRXJyb3JNZXNzYWdlfTwvc3Bhbj5cclxuXHRcdFx0OiA8c3Bhbj48L3NwYW4+O1xyXG5cclxuXHRcdHZhciBzZWN1cml0eUNvZGVFcnJvciA9IHRoaXMucHJvcHMucGF5bWVudC5zZWN1cml0eUNvZGVIYXNFcnJvcnNcclxuXHRcdFx0PyA8c3BhbiBzdHlsZT17eyBjb2xvcjogXCJyZWRcIiB9fT57dGhpcy5wcm9wcy5wYXltZW50LnNlY3VyaXR5Q29kZUVycm9yTWVzc2FnZX08L3NwYW4+XHJcblx0XHRcdDogPHNwYW4+PC9zcGFuPjtcclxuXHJcblx0XHRyZXR1cm4gPGRpdj5cclxuXHRcdFx0PHNwYW4gc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+e3RoaXMucHJvcHMudmFsaWRhdGlvbkVycm9yTWVzc2FnZX08L3NwYW4+XHJcblx0XHRcdDxmb3JtIG9uU3VibWl0PXsoZSkgPT4gdGhpcy5wcm9wcy5zdWJtaXRQYXltZW50KHRoaXMucHJvcHMucGF5bWVudCl9PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtcImZvcm0tZ3JvdXAgcm93IFwiICsgKHRoaXMucHJvcHMucGF5bWVudC5jYXJkTnVtYmVySGFzRXJyb3JzID8gJ2hhcy1lcnJvcicgOiAnJyl9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cIiBjb250cm9sLWxhYmVsIGNvbC1tZC0xMlwiIGh0bWxGb3I9XCJjYXJkTnVtYmVyXCI+Q2FyZCBudW1iZXI8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiY2FyZE51bWJlclwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5wYXltZW50LmNhcmROdW1iZXJ9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbkNhcmROdW1iZXJDaGFuZ2UoZSl9IHJlcXVpcmVkIG1heExlbmd0aD17MTZ9IHBhdHRlcm49XCJeWzAtOV17MTZ9JFwiIC8+XHJcblx0XHRcdFx0XHRcdHsgY2FyZE51bWJlckVycm9yIH1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtcImZvcm0tZ3JvdXAgcm93IFwiICsgKHRoaXMucHJvcHMucGF5bWVudC5uYW1lT25DYXJkSGFzRXJyb3JzID8gJ2hhcy1lcnJvcicgOiAnJyl9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWwgY29sLW1kLTEyXCIgaHRtbEZvcj1cIm5hbWVPbkNhcmRcIj5OYW1lIG9uIGNhcmQ8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZU9uQ2FyZFwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5wYXltZW50Lm5hbWVPbkNhcmR9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbk5hbWVPbkNhcmRDaGFuZ2UoZSl9IHJlcXVpcmVkIG1heExlbmd0aD17MTAwfSAvPlxyXG5cdFx0XHRcdFx0XHR7IG5hbWVPbkNhcmRFcnJvciB9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17XCJmb3JtLWdyb3VwIHJvdyBcIiArICh0aGlzLnByb3BzLnBheW1lbnQuZXhwaXJ5TW9udGhIYXNFcnJvcnMgPyAnaGFzLWVycm9yJyA6ICcnKX0+XHJcblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbCBjb2wtbWQtMTJcIiBodG1sRm9yPVwiZXhwaXJ5TW9udGhcIj5FeHBpcnkgbW9udGg8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cIm51bWJlclwiIG5hbWU9XCJleHBpcnlNb250aFwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeU1vbnRofSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25FeHBpcnlNb250aENoYW5nZShlKX0gcmVxdWlyZWQgbWF4TGVuZ3RoPXsyfSBwYXR0ZXJuPVwiXlswLTldKyRcIiAvPlxyXG5cdFx0XHRcdFx0XHR7IGV4cGlyeU1vbnRoRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e1wiZm9ybS1ncm91cCByb3cgXCIgKyAodGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJIYXNFcnJvcnMgPyAnaGFzLWVycm9yJyA6ICcnKX0+XHJcblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY29udHJvbC1sYWJlbCBjb2wtbWQtMTJcIiBodG1sRm9yPVwiZXhwaXJ5WWVhclwiPkV4cGlyeSB5ZWFyPC9sYWJlbD5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJudW1iZXJcIiBuYW1lPVwiZXhwaXJ5WWVhclwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5wYXltZW50LmV4cGlyeVllYXJ9IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbkV4cGlyeVllYXJDaGFuZ2UoZSl9IHJlcXVpcmVkIG1heExlbmd0aD17NH0gcGF0dGVybj1cIl5bMC05XXs0fSRcIiAvPlxyXG5cdFx0XHRcdFx0XHR7IGV4cGlyeVllYXJFcnJvciB9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17XCJmb3JtLWdyb3VwIHJvdyBcIiArICh0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlSGFzRXJyb3JzID8gJ2hhcy1lcnJvcicgOiAnJyl9PlxyXG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWwgY29sLW1kLTEyXCIgaHRtbEZvcj1cInNlY3VyaXR5Q29kZVwiPlNlY3VyaXR5IGNvZGU8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwic2VjdXJpdHlDb2RlXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnBheW1lbnQuc2VjdXJpdHlDb2RlfSBvbkNoYW5nZT17KGUpID0+IHRoaXMub25TZWN1cml0eUNvZGVDaGFuZ2UoZSl9IHJlcXVpcmVkIG1heExlbmd0aD17NH0gcGF0dGVybj1cIl5bMC05XXsyLDR9JFwiIC8+XHJcblx0XHRcdFx0XHRcdHsgc2VjdXJpdHlDb2RlRXJyb3IgfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIj5QYXkgbm93PC9idXR0b24+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZm9ybT5cclxuXHRcdDwvZGl2PjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcblx0KHN0YXRlOiBBcHBsaWNhdGlvblN0YXRlKSA9PiBzdGF0ZS5wYXltZW50LFxyXG5cdFBheW1lbnRTdGF0ZS5hY3Rpb25DcmVhdG9yc1xyXG4pKFN1Ym1pdFBheW1lbnQpIGFzIHR5cGVvZiBTdWJtaXRQYXltZW50O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9DbGllbnRBcHAvY29tcG9uZW50cy9TdWJtaXRQYXltZW50LnRzeCIsImltcG9ydCAqIGFzIFBheW1lbnQgZnJvbSAnLi9QYXltZW50JztcclxuXHJcbi8vIFRoZSB0b3AtbGV2ZWwgc3RhdGUgb2JqZWN0XHJcbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpb25TdGF0ZSB7XHJcblx0cGF5bWVudDogUGF5bWVudC5QYXltZW50U3RhdGVcclxufVxyXG5cclxuLy8gV2hlbmV2ZXIgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsIFJlZHV4IHdpbGwgdXBkYXRlIGVhY2ggdG9wLWxldmVsIGFwcGxpY2F0aW9uIHN0YXRlIHByb3BlcnR5IHVzaW5nXHJcbi8vIHRoZSByZWR1Y2VyIHdpdGggdGhlIG1hdGNoaW5nIG5hbWUuIEl0J3MgaW1wb3J0YW50IHRoYXQgdGhlIG5hbWVzIG1hdGNoIGV4YWN0bHksIGFuZCB0aGF0IHRoZSByZWR1Y2VyXHJcbi8vIGFjdHMgb24gdGhlIGNvcnJlc3BvbmRpbmcgQXBwbGljYXRpb25TdGF0ZSBwcm9wZXJ0eSB0eXBlLlxyXG5leHBvcnQgY29uc3QgcmVkdWNlcnMgPSB7XHJcblx0cGF5bWVudDogUGF5bWVudC5yZWR1Y2VyXHJcbn07XHJcblxyXG4vLyBUaGlzIHR5cGUgY2FuIGJlIHVzZWQgYXMgYSBoaW50IG9uIGFjdGlvbiBjcmVhdG9ycyBzbyB0aGF0IGl0cyAnZGlzcGF0Y2gnIGFuZCAnZ2V0U3RhdGUnIHBhcmFtcyBhcmVcclxuLy8gY29ycmVjdGx5IHR5cGVkIHRvIG1hdGNoIHlvdXIgc3RvcmUuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXBwVGh1bmtBY3Rpb248VEFjdGlvbj4ge1xyXG4gICAgKGRpc3BhdGNoOiAoYWN0aW9uOiBUQWN0aW9uKSA9PiB2b2lkLCBnZXRTdGF0ZTogKCkgPT4gQXBwbGljYXRpb25TdGF0ZSk6IHZvaWQ7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQ2xpZW50QXBwL3N0b3JlL2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygwKSkoMTM1KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBkZWxlZ2F0ZWQgLi9ub2RlX21vZHVsZXMvZG9tYWluLXRhc2svaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSgxNDMpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGRlbGVnYXRlZCAuL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMgZnJvbSBkbGwtcmVmZXJlbmNlIC4vdmVuZG9yXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKDApKSg3MCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZGVsZWdhdGVkIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9pbmRleC5qcyBmcm9tIGRsbC1yZWZlcmVuY2UgLi92ZW5kb3Jcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=