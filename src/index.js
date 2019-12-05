import 'react-app-polyfill/ie9'
import '~utils/flexible';
import '~common/css/style.css';
import '~common/css/border-1px.css';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routes from '~router/route';
import Interecpt from '~router/intercept';
import { Provider } from 'mobx-react';
import * as stores from '~store';
ReactDOM.render(
    <Provider {...stores}>
        <Router basename="/activityWeb/m">
            <Switch>
                {
                    routes.map((item, index) => {
                        return (
                            <Route key={index} path={item.path} component={Interecpt(item)} />
                        )
                    })
                }
                <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}>
                    <Route component={React.lazy(() => import('~pages/notFound/index'))} />
                </Suspense>
            </Switch>
        </Router >
    </Provider >,
    document.getElementById('root')
);

