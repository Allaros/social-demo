import DialogWindowContainer from "./DialogWindow/DialogWindowContainer.jsx";
import classes from "./Messages.module.scss";

import PersonsContainer from "./Persons/PersonsContainer.jsx";
import WithAuthRedirect from "../../HOC/WithAuthRedirect.jsx";

function Messages(props) {
   return (
      <section className={classes.messages}>
         <PersonsContainer />
         <DialogWindowContainer />
      </section>
   );
}



export default WithAuthRedirect(Messages);
