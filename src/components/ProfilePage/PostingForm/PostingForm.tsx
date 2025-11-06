import classes from './PostingForm.module.scss';

import Post from './Post/Post.tsx';
import Button from '../../Common/Button/Button.tsx';
import ValidatedFormField from '../../Common/FormField/ValidateFormField.jsx';

import Avatar from '../../../img/Avatar.jpg';

import { FieldValues, useForm } from 'react-hook-form';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/typedHooks/hooks.ts';
import { addPost } from '../../../redux/ProfileReducer.ts';

const PostingForm: React.FC = () => {
   const dispatch = useAppDispatch();

   const postInfo = useAppSelector(state => state.profilePage.postInfo);
   const profilePhoto = useAppSelector(state => state.profilePage.profile?.photos?.large);

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

   let onSubmit = (data: FieldValues) => {
      dispatch(addPost(data.post_text));
      resetField('post_text');
   };

   let postsComponents = postInfo.map((el) => <Post time={el.time} key={el.id} avatar={profilePhoto ? profilePhoto : Avatar} text={el.postText} />);
   return (
      <>
         <div className={classes.posting}>
            <h2 className={classes.title}>Мои посты</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.post_form}>
               <ValidatedFormField tag="textarea" {...fieldMask} name="post_text" rules={{ required: 'Пост не может быть пустым' }} id={'email'} />
               <Button disabled={false} className={classes.button}>Выложить</Button>
            </form>
         </div>
         <div className={classes.posts}>{postsComponents}</div>
      </>
   );
}

export default PostingForm;
