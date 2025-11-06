import PreloaderGreen from "../../../img/Trail loading green.gif";
import PreloaderBlue from "../../../img/Trail loading blue.gif";
import PreloaderPurple from "../../../img/Trail loading purple.gif";

type Props = {
   className?: string
   color?: string
}

const Preloader: React.FC<Props> = ({className, color}) => {
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

   return <div className={className}>{chooseColor(color)}</div>;
}

export default Preloader;
