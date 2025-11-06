import classes from "./Button.module.scss";

type Props = {
   className: string | undefined
   disabled: boolean
   onClick?: () => void
   children: React.ReactNode
}

const Button: React.FC<Props> = ({disabled, onClick, children, className}) => {
   return (
      <div className={`${classes.buttonCont} ${className}`}>
         <button disabled={disabled} onClick={onClick} className={classes.button}>
            {children}
         </button>
      </div>
   );
}

export default Button;
