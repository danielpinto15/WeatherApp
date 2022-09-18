import { render, screen } from '@testing-library/react'
import Toast from '../Toast';
import { Provider } from 'react-redux';
import store from '../../store/index';
import '@testing-library/jest-dom/extend-expect';

const reactRender = component => render(
    <Provider store={store}>
        {component}
    </Provider>
)

test('renders without crashing', () => {
    reactRender(<Toast />);

    const weatherCard = screen.getByTestId('toast');
    expect(weatherCard).toBeInTheDocument();
});