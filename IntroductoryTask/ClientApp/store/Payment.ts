import { addTask } from "domain-task";
import { RouterAction, push, routerActions } from "react-router-redux";
import { AppThunkAction } from "ClientApp/store";
import { Action, Reducer } from "redux";

export interface Payment {
	cardNumberHasErrors: boolean;
	cardNumberErrorMessage: string;
	cardNumber: string;
	nameOnCardHasErrors: boolean;
	nameOnCardErrorMessage: string;
	nameOnCard: string;
	expiryMonthHasErrors: boolean;
	expiryMonthErrorMessage: string;
	expiryMonth: string;
	expiryYearHasErrors: boolean;
	expiryYearErrorMessage: string;
	expiryYear: string;
	securityCodeHasErrors: boolean;
	securityCodeErrorMessage: string;
	securityCode: string;
}

export interface PaymentState {
	isLoading: boolean;
	payment: Payment;
	validationErrorMessage?: string;
	hasPaymentSucceeded: boolean;
}

interface SubmitPaymentAction {
	type: 'SUBMIT_PAYMENT';
	payment: Payment;
}

interface PaymentSucceededAction {
	type: 'PAYMENT_SUCCEEDED';
	successMessage: string;
}

interface ValidationErrorAction {
	type: 'VALIDATION_ERROR';
	errorMessage: string;
}

type KnownAction = SubmitPaymentAction | PaymentSucceededAction | ValidationErrorAction;

export const actionCreators = {
	submitPayment: (payment: Payment): AppThunkAction<any> => (dispatch, getState) => {
		(<any>window).FB.api('/me', 'get', { fields: 'email' }, function (fbResponse: any) {
			(<any>window).paymill.createToken({
				number: payment.cardNumber,
				exp_month: payment.expiryMonth,
				exp_year: payment.expiryYear,
				cvc: payment.securityCode,
				amount_int: 100,
				currency: 'EUR',
				cardholder: payment.nameOnCard,
				email: fbResponse.email
			}, function (error: any, result: any) {
				if (error) {
					dispatch({ type: 'VALIDATION_ERROR', errorMessage: error.apierror });
				}
				else {
					var paymillToken = result.token;
					var apiMethodUrl = `api/SubmitPayment/Save`;
					var apiMethodType = `post`;
					let fetchTask = fetch(apiMethodUrl, {
						method: apiMethodType,
						headers: {
							'Content-Type': 'application/json; charset=utf-8'
						},
						body: JSON.stringify(paymillToken),
					})
						.then(response => response.json() as Promise<number>)
						.then(data => {
							if (data) {
								dispatch({ type: 'VALIDATION_ERROR', errorMessage: data });
							}
							else {
								dispatch({ type: 'PAYMENT_SUCCEEDED' });
							}
						});

					addTask(fetchTask);
				}
			});
		});
		
		dispatch({ type: 'SUBMIT_PAYMENT', payment: payment });
	}
};

const emptyPayment: Payment = {
	cardNumberHasErrors: false, cardNumberErrorMessage: '', cardNumber: '',
	nameOnCardHasErrors: false, nameOnCardErrorMessage: '', nameOnCard: '',
	expiryMonthHasErrors: false, expiryMonthErrorMessage: '', expiryMonth: '',
	expiryYearHasErrors: false, expiryYearErrorMessage: '', expiryYear: '',
	securityCodeHasErrors: false, securityCodeErrorMessage: '', securityCode: ''
}
const unloadedState: PaymentState = { isLoading: false, payment: emptyPayment, hasPaymentSucceeded: false };

export const reducer: Reducer<PaymentState> = (state: PaymentState, incomingAction: Action) => {
	const action = incomingAction as KnownAction;
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
			}
		default:
			const exhaustiveCheck: never = action;
	}

	return state || unloadedState;
};