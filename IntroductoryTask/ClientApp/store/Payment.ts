import { addTask } from "domain-task";
import { RouterAction, push, routerActions } from "react-router-redux";
import { AppThunkAction } from "ClientApp/store";
import { Action, Reducer } from "redux";

export interface Payment {
	cardNumber: string;
	nameOnCard: string;
	expiryDate: string;
	securityCode: string;
}

export interface PaymentState {
	isLoading: boolean;
	payment: Payment;
	validationErrorMessage?: string;
}

interface SubmitPaymentAction {
	type: 'SUBMIT_PAYMENT';
	payment: Payment;
}

interface ReceiveGenericResultAction {
	type: 'RECEIVE_GENERIC_RESULT';
}

interface ValidationErrorAction {
	type: 'VALIDATION_ERROR';
	errorMessage: string;
}

type KnownAction = SubmitPaymentAction | ReceiveGenericResultAction | ValidationErrorAction;

export const actionCreators = {
	submitPayment: (payment: Payment): AppThunkAction<any> => (dispatch, getState) => {
		var apiMethodUrl = `api/Person/Add`;
		var apiMethodType = `post`;
		let fetchTask = fetch(apiMethodUrl, {
			method: apiMethodType,
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(payment),
		})
		.then(response => response.json() as Promise<number>)
		.then(data => {
			if (data) {
				dispatch({ type: 'VALIDATION_ERROR', errorMessage: data });
			}
			else {
				dispatch({ type: 'RECEIVE_GENERIC_RESULT' });
				dispatch(push(`/fetchpeople`));
			}
		});

		addTask(fetchTask);
		dispatch({ type: 'SUBMIT_PAYMENT', person: payment });
	}
};

const emptyPayment: Payment = { cardNumber: '', nameOnCard: '', expiryDate: '', securityCode: '' }
const unloadedState: PaymentState = { isLoading: false, payment: emptyPayment };

export const reducer: Reducer<PaymentState> = (state: PaymentState, incomingAction: Action) => {
	const action = incomingAction as KnownAction;
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
			}
		default:
			const exhaustiveCheck: never = action;
	}

	return state || unloadedState;
};