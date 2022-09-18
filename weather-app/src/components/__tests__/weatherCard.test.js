import { render, screen } from '@testing-library/react'
import WeatherCard from '../WeatherCard';
import { Provider } from 'react-redux';
import store from '../../store/index';
import '@testing-library/jest-dom/extend-expect';

const reactRender = component => render(
    <Provider store={store}>
        {component}
    </Provider>
)

test('renders without crashing', () => {
   reactRender(<WeatherCard />);

   const weatherCard = screen.getByTestId('weatherCardBox');
    expect(weatherCard).toBeInTheDocument();

    const loadingBar = screen.getByTestId('loadingBar');
    expect(loadingBar).toBeInTheDocument();
});