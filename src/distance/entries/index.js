import React, { Component } from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Demo from '../demo';

render(
    <AppContainer>
        <Demo />
    </AppContainer>,
    document.getElementById('app'),
);

if (module.hot) {
    module.hot.accept('../demo', () => {
        const newDemo = require('../demo').default;
        render(
            <AppContainer>
                {React.createElement(newDemo)}
            </AppContainer>,
            document.getElementById('app'),
        );
    });
}
