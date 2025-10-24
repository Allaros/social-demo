import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider, connect } from 'react-redux';
import store from './redux/reduxStore';

import { initApp } from './redux/AppReducer.js';
import Preloader from './components/Common/Preloader/Preloader.jsx';

// import News from './components/News/News.jsx';
// import Music from './components/Music/Music.jsx';
import SidebarContainer from './components/Sidebar/SidebarContainer.jsx';
import Header from './components/Header/Header.jsx';
import Login from './components/Login/Login.jsx';
import ProfilePageContainer from './components/ProfilePage/ProfilePageContainer.jsx';
import SignUp from './components/SignUp/SignUp.jsx';

const UsersComponent = lazy(() => import('./components/Users/UsersContainer.jsx'));
const Messages = lazy(() => import('./components/Messages/Messages.jsx'));

class App extends React.Component {
   componentDidMount() {
      this.props.initApp();
   }
   render() {
      return (
         <>
            <Header />
            <main className="main">
               <div className="main__container">
                  <SidebarContainer></SidebarContainer>
                  <section className="dynamic-wrapper">
                     {!!this.props.initialized ? (
                        <Routes>
                           <Route
                              path="/dialogs/*"
                              element={
                                 <Suspense fallback={<Preloader color="blue" />}>
                                    <Messages />
                                 </Suspense>
                              }
                           />
                           {/* <Route path="/news" element={<News />} />
                           <Route path="/music" element={<Music />} /> */}
                           <Route
                              path="/users"
                              element={
                                 <Suspense fallback={<Preloader color="blue" />}>
                                    <UsersComponent />
                                 </Suspense>
                              }
                           />
                           <Route path="/profile/:userId?" element={<ProfilePageContainer />} />
                           <Route path="*" element={<ProfilePageContainer />} />
                           <Route path="/login" element={<Login />} />
                           <Route path="/sign-up" element={<SignUp />} />
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
   };
};

const AppConnected = connect(mapStateToProps, { initApp })(App);

const AppContainer = (props) => {
   return (
      <BrowserRouter>
         <Provider store={store}>
            <AppConnected />
         </Provider>
      </BrowserRouter>
   );
};

export default AppContainer;
