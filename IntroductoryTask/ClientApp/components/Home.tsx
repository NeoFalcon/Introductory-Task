import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
			<h1>Registration / Login</h1>

			<div
				className='fb-login-button'
				data-max-rows='1'
				data-size='large'
				data-button-type='continue_with'
				data-show-faces='false'
				data-auto-logout-link='false'
				data-use-continue-as='false'>
			</div>
        </div>;
    }
}
