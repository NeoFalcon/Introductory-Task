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
	}

	public render() {
		return <div>
			<span style={{ color: "red" }}>{this.props.validationErrorMessage}</span>
			<form onSubmit={(e) => this.props.submitPayment(this.props.payment)}>
				<div className="form-group row">
					<label className=" control-label col-md-12" htmlFor="cardNumber">Card number</label>
					<div className="col-md-4">
						<input className="form-control" type="text" name="cardNumber" defaultValue={this.props.payment.cardNumber} onChange={(e) => this.onCardNumberChange(e)} required maxLength={100} />
					</div>
				</div>
				<div className="form-group row">
					<label className="control-label col-md-12" htmlFor="nameOnCard">Name on card</label>
					<div className="col-md-4">
						<input className="form-control" type="text" name="nameOnCard" defaultValue={this.props.payment.nameOnCard} onChange={(e) => this.onCardNumberChange(e)} maxLength={100} />
					</div>
				</div>
				<div className="form-group row">
					<label className="control-label col-md-12" htmlFor="expiryDate">Expiry date</label>
					<div className="col-md-4">
						<input className="form-control" type="text" name="expiryDate" defaultValue={this.props.payment.expiryDate} onChange={(e) => this.onCardNumberChange(e)} required maxLength={20} pattern="^[\+]?([0-9]+ ?)+$" />
					</div>
				</div>
				<div className="form-group row">
					<label className="control-label col-md-12" htmlFor="securityCode">Security code</label>
					<div className="col-md-4">
						<input className="form-control" type="text" name="securityCode" defaultValue={this.props.payment.securityCode} onChange={(e) => this.onCardNumberChange(e)} required maxLength={20} pattern="^[\+]?([0-9]+ ?)+$" />
					</div>
				</div>
				<div className="form-group">
					<button type="submit" className="btn btn-default">Pay now</button>
				</div>
			</form>
		</div>;
	}
}

export default connect(
	(state: ApplicationState) => state.payment,
	PaymentState.actionCreators
)(SubmitPayment) as typeof SubmitPayment;
