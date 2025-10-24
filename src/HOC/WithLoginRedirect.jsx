import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { connect } from 'react-redux';

export default function WithLoginRedirect(Component) {
   let RedirectComponent = (props) => {
      const navigate = useNavigate();
      useEffect(() => {
         if (props.isAuth) {
            navigate('/profile');
         }
      }, [props.isAuth, navigate]);

      return <Component {...props} />;
   };

   let mapStateToProps = (state) => ({
      isAuth: state.auth.isAuth,
   });
   return connect(mapStateToProps, {})(RedirectComponent);
}
