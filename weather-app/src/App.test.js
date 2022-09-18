import { render, screen } from '@testing-library/react'
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';


const reactRender = component => render(
    <Provider store={store}>
        {component}
    </Provider>
)

test('renders without crashing', () => {
    reactRender(<App />)
});

test('header renders with correct text', () => {
    const { getByTestId } = reactRender(<App />);
    const headerEl = getByTestId('header');

    expect(headerEl.textContent).toBe('Weather app');
})