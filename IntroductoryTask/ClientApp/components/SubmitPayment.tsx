import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as PaymentState from '../store/Payment';
import { RouteComponentProps } from 'react-router';
import { FormEvent, ChangeEvent } from 'react';

type PaymentProps =
	PaymentState.PaymentState
	& typeof PaymentState.actionCreators;

class SubmitPayment extends React.Component<PaymentProps, {}> {
	private onCardNumberChange(e: ChangeEvent<HTMLInputElement>) {
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
	}

	private onNameOnCardChange(e: ChangeEvent<HTMLInputElement>) {
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
	}

	private onExpiryMonthChange(e: ChangeEvent<HTMLInputElement>) {
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
	}

	private onExpiryYearChange(e: ChangeEvent<HTMLInputElement>) {
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
	}

	private onSecurityCodeChange(e: ChangeEvent<HTMLInputElement>) {
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
	}

	public render() {
		var cardNumberError = this.props.payment.cardNumberHasErrors
			? <span style={{ color: "red" }}>{this.props.payment.cardNumberErrorMessage}</span>
			: <span></span>;

		var nameOnCardError = this.props.payment.nameOnCardHasErrors
			? <span style={{ color: "red" }}>{this.props.payment.nameOnCardErrorMessage}</span>
			: <span></span>;

		var expiryMonthError = this.props.payment.expiryMonthHasErrors
			? <span style={{ color: "red" }}>{this.props.payment.expiryMonthErrorMessage}</span>
			: <span></span>;

		var expiryYearError = this.props.payment.expiryYearHasErrors
			? <span style={{ color: "red" }}>{this.props.payment.expiryYearErrorMessage}</span>
			: <span></span>;

		var securityCodeError = this.props.payment.securityCodeHasErrors
			? <span style={{ color: "red" }}>{this.props.payment.securityCodeErrorMessage}</span>
			: <span></span>;

		var isButtonDisabled = this.props.payment.cardNumberHasErrors
			|| this.props.payment.nameOnCardHasErrors
			|| this.props.payment.expiryMonthHasErrors
			|| this.props.payment.expiryYearHasErrors
			|| this.props.payment.securityCodeHasErrors;

		var successAlert = this.props.hasPaymentSucceeded
			? <div className="alert alert-success alert-dismissible" role="alert">
				Payment of 1 euro succeeded
				<button type="button" className="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			: null;

		return <div>
			{ successAlert }
			<span style={{ color: "red" }}>{this.props.validationErrorMessage}</span>
			<form onSubmit={(e) => { this.props.submitPayment(this.props.payment); }}>
				<div className={"form-group row " + (this.props.payment.cardNumberHasErrors ? 'has-error' : '')}>
					<label className=" control-label col-md-12" htmlFor="cardNumber">Card number</label>
					<div className="col-md-4">
						<input className="form-control" type="text" name="cardNumber" defaultValue={this.props.payment.cardNumber} onChange={(e) => this.onCardNumberChange(e)} required maxLength={16} pattern="^[0-9]{16}$" />
						{ cardNumberError }
					</div>
				</div>
				<div className={"form-group row " + (this.props.payment.nameOnCardHasErrors ? 'has-error' : '')}>
					<label className="control-label col-md-12" htmlFor="nameOnCard">Name on card</label>
					<div className="col-md-4">
						<input className="form-control" type="text" name="nameOnCard" defaultValue={this.props.payment.nameOnCard} onChange={(e) => this.onNameOnCardChange(e)} required maxLength={100} />
						{ nameOnCardError }
					</div>
				</div>
				<div className={"form-group row " + (this.props.payment.expiryMonthHasErrors ? 'has-error' : '')}>
					<label className="control-label col-md-12" htmlFor="expiryMonth">Expiry month</label>
					<div className="col-md-4">
						<input className="form-control" type="number" name="expiryMonth" defaultValue={this.props.payment.expiryMonth} onChange={(e) => this.onExpiryMonthChange(e)} required maxLength={2} pattern="^[0-9]+$" />
						{ expiryMonthError }
					</div>
				</div>
				<div className={"form-group row " + (this.props.payment.expiryYearHasErrors ? 'has-error' : '')}>
					<label className="control-label col-md-12" htmlFor="expiryYear">Expiry year</label>
					<div className="col-md-4">
						<input className="form-control" type="number" name="expiryYear" defaultValue={this.props.payment.expiryYear} onChange={(e) => this.onExpiryYearChange(e)} required maxLength={4} pattern="^[0-9]{4}$" />
						{ expiryYearError }
					</div>
				</div>
				<div className={"form-group row " + (this.props.payment.securityCodeHasErrors ? 'has-error' : '')}>
					<label className="control-label col-md-12" htmlFor="securityCode">Security code</label>
					<div className="col-md-4">
						<input className="form-control" type="text" name="securityCode" defaultValue={this.props.payment.securityCode} onChange={(e) => this.onSecurityCodeChange(e)} required maxLength={4} pattern="^[0-9]{2,4}$" />
						{ securityCodeError }
					</div>
				</div>
				<div className="form-group">
					<button type="submit" className="btn btn-default" disabled={isButtonDisabled}>
						Pay now
					</button>
				</div>
			</form>
		</div>;
	}
}

export default connect(
	(state: ApplicationState) => state.payment,
	PaymentState.actionCreators
)(SubmitPayment) as typeof SubmitPayment;
