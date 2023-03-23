import PageContent from '@/components/Layout/PageContent';
import NewPostForm from '@/components/Posts/NewPostForm';
import { auth } from '@/Firebase/clientApp';
import useIdeas from '@/hooks/useIdeas';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type updateProps = {};

const Update: React.FC<updateProps> = () => {
  const [user, loadingUser] = useAuthState(auth);
  const { ideaStateValue, updateIdea } = useIdeas();
  console.log('Update idea ======>', updateIdea);
  return (
    <PageContent>
      <>
        <NewPostForm user={user} updateIdea={ideaStateValue.selectedIdea} />
      </>
      <></>
    </PageContent>
  );
};
export default Update;
