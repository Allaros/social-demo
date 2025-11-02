import classes from './PostingForm.module.scss';

import Post from './Post/Post.jsx';
import Button from '../../Common/Button/Button.jsx';
import ValidatedFormField from '../../Common/FormField/ValidateFormField.jsx';

import Avatar from '../../../img/Avatar.jpg';

import { connect } from 'react-redux';
import { addPost } from '../../../redux/ProfileReducer.ts';
import { useForm } from 'react-hook-form';
import React from 'react';
import { compose } from 'redux';

function PostingForm(props) {
   const {
      register,
      handleSubmit,
      resetField,
      formState: { errors },
   } = useForm({
      mode: 'onBlur',
      reValidateMode: 'onBlur',
   });

   const fieldMask = {
      register,
      classes,
      errors,
   };

   let onSubmit = (data) => {
      props.addPost(data.post_text);
      resetField('post_text');
   };

   let postsComponents = props.postInfo.map((el) => <Post time={el.time} key={el.id} Avatar={props.avatar} text={el.postText} />);
   return (
      <>
         <div className={classes.posting}>
            <h2 className={classes.title}>Мои посты</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.post_form}>
               <ValidatedFormField tag="textarea" {...fieldMask} name="post_text" rules={{ required: 'Пост не может быть пустым' }} id={'email'} />
               <Button class={classes.button}>Выложить</Button>
            </form>
         </div>
         <div className={classes.posts}>{postsComponents}</div>
      </>
   );
}

let mapStateToProps = (state) => {
   return {
      postInfo: state.profilePage.postInfo,
      avatar: Avatar,
   };
};

export default compose(connect(mapStateToProps, { addPost }), React.memo)(PostingForm);
