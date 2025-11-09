import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider, connect } from 'react-redux';
import store from './redux/reduxStore';

import { initApp, setErrorThunk } from './redux/AppReducer.ts';
import Preloader from './components/Common/Preloader/Preloader.tsx';

import Sidebar from './components/Sidebar/Sidebar.tsx';
import Header from './components/Header/Header.tsx';
import Login from './components/Login/Login.tsx';
import ProfilePage from './components/ProfilePage/ProfilePage.tsx';
import Error from './components/Common/Error/Error.tsx';

const Users = lazy(() => import('./components/Users/Users.tsx'));
const Messages = lazy(() => import('./components/Messages/Messages.tsx'));

class App extends React.Component {
   catchAllUnhandledErrors = (promiseRejectionEvent) => {
      promiseRejectionEvent.preventDefault();
      this.props.setErrorThunk('Произошла ошибка при обработке запроса. Пожалуйста повторите позже');
   };

   componentDidMount() {
      this.props.initApp();
      window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
   }
   componentWillUnmount() {
      window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
   }

   render() {
      return (
         <>
            <Error message={this.props.someError} />
            <Header />
            <main className="main">
               <div className="main__container">
                  <Sidebar></Sidebar>
                  <section className="dynamic-wrapper">
                     {!!this.props.initialized ? (
                        <Routes>
                           <Route
                              path="/dialogs/:userId?"
                              element={
                                 <Suspense fallback={<Preloader color="blue" />}>
                                    <Messages />
                                 </Suspense>
                              }
                           />
                           <Route
                              path="/users"
                              element={
                                 <Suspense fallback={<Preloader color="blue" />}>
                                    <Users />
                                 </Suspense>
                              }
                           />
                           <Route path="/profile/:userId?" element={<ProfilePage />} />
                           <Route path="/login" element={<Login />} />
                           <Route path="/" element={<ProfilePage />} />
                           <Route path="*" element={<div>404 Not Found</div>} />
                        </Routes>
                     ) : (
                        <Preloader />
                     )}
                  </section>
               </div>
            </main>
         </>
      );
   }
}

let mapStateToProps = (state) => {
   return {
      initialized: state.app.initialized,
      someError: state.app.someError,
   };
};

const AppConnected = connect(mapStateToProps, { initApp, setErrorThunk })(App);

const AppContainer = (props) => {
   return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
         <Provider store={store}>
            <AppConnected />
         </Provider>
      </BrowserRouter>
   );
};

export default AppContainer;
