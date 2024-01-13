import { postComment } from 'apis/grade.api';
import { TextInput } from 'components/FormControl';
import { TOAST } from 'constant';
import { toast } from 'layout';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { classNames } from 'primereact/utils';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';

export default function CommentList({ listComment, refetch }) {
  const { gradeId } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const { mutate: postCommentMutate, isLoading: isPostCommentMutateLoading } =
    useMutation(postComment);

  //form
  const {
    control,
    // setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { content: '' } });
  async function onSubmit(data) {
    postCommentMutate(
      { gradeId, content: data.content, currentPath: currentPath },
      {
        onSuccess() {
          toast(TOAST.SUCCESS, 'Post comment Successfully!');
          reset();
          refetch();
        },
        onError() {
          toast(TOAST.ERROR, 'Post comment Fail!');
        },
      }
    );
  }
  return (
    <div>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {listComment?.map(({ content, _id }) => (
          <div key={_id}>
            <Card subTitle={content} className='mt-1 border-1 surface-border' />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='p-fluid  '>
        <div className='flex align-items-center justify-content-center'>
          <div className='col-8'>
            <TextInput name='content' label='Comment' control={control} errors={errors} />
          </div>
          <div className='flex align-items-center justify-content-start gap-3 my-2'>
            <Button
              className={classNames('pi mt-2 ml-2', {
                'pi-spinner': isPostCommentMutateLoading,
                'pi-check': !isPostCommentMutateLoading,
              })}
              type='submit'
              label='Submit'
            />
          </div>
        </div>
      </form>
    </div>
  );
}

CommentList.propTypes = {
  listComment: PropTypes.array.isRequired,
  refetch: PropTypes.func.isRequired,
};
