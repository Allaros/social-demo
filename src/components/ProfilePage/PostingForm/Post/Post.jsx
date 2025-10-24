import classes from "./Post.module.scss";

export default function Post( props ) {
    return (
        <div className={classes.post}>
            <div className={classes.post_avatar}>
                <img src={props.Avatar} alt="post-avatar" />
            </div>
            <div className={classes.post_text}>
                {props.text}
            </div>
            <p className={classes.post__time}>{props.time}</p>
        </div>
    );
}
