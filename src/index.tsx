import React from 'react';
import ReactDOM from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';
import * as serviceWorker from './serviceWorker';
import { StoreContext } from 'redux-react-hook';
import { MemoryRouter } from 'react-router-dom';
import store from 'config/store';
import routes from 'config/routes';
import { onResize } from 'services/init/helpers';
import initApp from 'services/init/initAppService';

// GUARDIANS
import IsAppReady from 'config/guardians/IsAppReady';

// COMPONENTS
import ErrorBasket from 'components/errorBasket/errorBasket';
import GlobalConfirmationModal from 'components/confirmationModal/globalConfirmationModal';

/**
 * main() function for your application.
 * @async
 * @returns Promise<void>
 */
async function main(): Promise<void> {
  try {
    await initApp();

    ReactDOM.render(
      <MemoryRouter>
        <StoreContext.Provider value={store}>
          <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
          <ErrorBasket />
          <IsAppReady>
            {routes}
          </IsAppReady>
          <GlobalConfirmationModal />
        </StoreContext.Provider>
      </MemoryRouter>, document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
  } catch (error) {
    console.error(error);
  }
}

main();
