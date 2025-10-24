import Persons from "./Persons";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
    return{
        personInfo: state.messagesPage.personInfo,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        default: "none",
    }
}
const PersonsContainer = connect(mapStateToProps, mapDispatchToProps)(Persons)

export default PersonsContainer;