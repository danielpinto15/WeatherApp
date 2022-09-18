import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Search from '../Search';
import { Provider } from 'react-redux';
import store from '../../store/index';
import '@testing-library/jest-dom/extend-expect';

const reactRender = component => render(
    <Provider store={store}>
        {component}
    </Provider>
);

test('Text in searchbox is changed when typed something', () => {
    const { getByTestId } = reactRender(<Search />);
    const searchBox = getByTestId('searchBox');

    fireEvent.change(searchBox, {
        target: {
            city: 'Leiria'
        }
    })

    expect(searchBox.city).toBe('Leiria');
});

test('renders without crashing', () => {
    reactRender(<Search />);
    const searchButton = screen.getByTestId('searchButton');
    expect(searchButton).toBeInTheDocument();

    const currentLocationButton = screen.getByTestId('currentLocationButton');
    expect(currentLocationButton).toBeInTheDocument();

    const searchBox = screen.getByTestId('searchBox');
    expect(searchBox).toBeInTheDocument();
});