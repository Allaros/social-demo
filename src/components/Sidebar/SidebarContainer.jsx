import Sidebar from "./Sidebar";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
    return{
        friends: state.sidebarComponent.friends,
    }
}
let mapDispatchToProps = (dispatch) => {
    return{
        default: "none",
    }
}


const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default SidebarContainer;