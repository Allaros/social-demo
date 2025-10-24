import PreloaderGreen from "../../../img/Trail loading green.gif";
import PreloaderBlue from "../../../img/Trail loading blue.gif";
import PreloaderPurple from "../../../img/Trail loading purple.gif";

export default function Preloader(props) {
   function chooseColor(color) {
      if (color === "green") {
         return <img src={PreloaderGreen} alt="loading gif" />;
      } else if (color === "blue") {
         return <img src={PreloaderBlue} alt="loading gif" />;
      } else if (color === "purple") {
         return <img src={PreloaderPurple} alt="loading gif" />;
      }
      else{
        return <img src={PreloaderGreen} alt="loading gif" />;
      }
   }

   return <div className={props.className}>{chooseColor(props.color)}</div>;
}
