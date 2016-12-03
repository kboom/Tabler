import React from "react";
import ReactDOM from "react-dom";
import classNames from 'classnames'
import {Router, Route, browserHistory} from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Provider} from "react-redux";
import Store from "./core/store";

import Placement from "./pages/placement/placement";
import ErrorPage from "./pages/error/error";

import styles from './main.css';

let cx = classNames.bind(styles);

injectTapEventPlugin();

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Provider store={Store}>
                    <div className={cx('root')}>{this.props.children}</div>
                </Provider>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/placement" component={Placement}/>
            <Route path="*" component={ErrorPage}/>
        </Route>
    </Router>,
    document.getElementById('container')
);