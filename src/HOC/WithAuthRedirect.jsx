import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import Preloader from '../components/Common/Preloader/Preloader';

export default function WithAuthRedirect(Component) {
   let RedirectComponent = (props) => {
      const navigate = useNavigate();
      useEffect(() => {
         if (!props.isAuth) {
            navigate('/login');
         }
      }, [props.isAuth, navigate]);
      if (!props.isAuth) {
         return <Preloader />;
      }

      return <Component {...props} />;
   };

   let mapStateToProps = (state) => ({
      isAuth: state.auth.isAuth,
   });
   return connect(mapStateToProps, {})(RedirectComponent);
}
