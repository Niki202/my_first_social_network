import { render, screen } from '@testing-library/react';
import AppContainer from "./App";



test('renders main preloader', () => {
  render(<AppContainer />);
  let linkElement = screen.getByRole('img', {name: "Loading..."});
  expect(linkElement).toBeInTheDocument();
  // const newState = appReducer(initialState,initializedSuccess())
  // render(<AppContainer />);
  // linkElement = screen.getByRole('main');
  // expect(linkElement).toBeInTheDocument();
});

