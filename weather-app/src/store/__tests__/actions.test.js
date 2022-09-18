import * as selectActions from "../actions/actions";
import {
  GET_WEATHER_INFO,
  SET_DATA,
  DELETE_DATA,
} from "../type";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let id;

test("Dispatches the correct action and payload for getWeatherInfo action", () => {
  const store = mockStore({});

  return store.dispatch(selectActions.getWeatherInfo("Leiria")).then(() => {
    const actions = store.getActions();
    expect(actions[1].type).toEqual(GET_WEATHER_INFO);
    expect(actions[1].forecast).not.toBeNull();
    expect(actions[1].todayWeather).not.toBeNull();
  });
});

test("Dispatches the correct action and payload for setData action", () => {
  const store = mockStore({});
  const expectedActions = {
    type: SET_DATA,
    payload: true,
  };

  return store
    .dispatch(
      selectActions.setData("Leiria", "test", 23, 17, "01d", [{ test: "test" }])
    )
    .then(() => {
      const actions = store.getActions();
      expect(actions[1]).toEqual(expectedActions);
    });
});

test("Dispatches the correct action and payload for deleteData action", async () => {
  const store = mockStore({});

  const citiesData = await fetch("http://localhost:8000/cities").then((res) =>
    res.json()
  );

  const citiesDataFilter = citiesData.filter((city) => {
    return city.country === "test";
  });

  const expectedActions = {
    type: DELETE_DATA,
    payload: true,
  };

  return store
    .dispatch(selectActions.deleteData(citiesDataFilter[0].id))
    .then(() => {
      const actions = store.getActions();
      expect(actions[1]).toEqual(expectedActions);
    });
});

test("Dispatches the correct action and payload for getData action", () => {
  const store = mockStore({});

  return store.dispatch(selectActions.getData()).then(() => {
    const actions = store.getActions();
    expect(actions[0].payload).not.toBeNull();
  });
});

test("Dispatches the correct action and payload for getCurrentLocation action", () => {
  const store = mockStore({});

  return store.dispatch(selectActions.getCurrentLocation()).then(() => {
    const actions = store.getActions();
    expect(actions[0].payload).not.toBeNull();
  });
});
