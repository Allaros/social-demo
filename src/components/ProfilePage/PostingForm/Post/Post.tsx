import classes from "./Post.module.scss";

type Props = {
    time: string
    avatar: string
    text: string
}

const Post: React.FC<Props> = ( {time, avatar, text} ) => {
    return (
        <div className={classes.post}>
            <div className={classes.post_avatar}>
                <img src={avatar} alt="post-avatar" />
            </div>
            <div className={classes.post_text}>
                {text}
            </div>
            <p className={classes.post__time}>{time}</p>
        </div>
    );
}

export default Post;
