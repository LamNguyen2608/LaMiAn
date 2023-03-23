import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import safeJsonStringify from 'safe-json-stringify';
import { stringify } from 'querystring';
import axios from 'axios';
import Header from '@/components/Topic/Header';
import PageContent from '@/components/Layout/PageContent';
import { Topic } from '@/atoms/topicAtom';
import CreatePostForm from '@/components/Posts/CreatePostForm';
import TopicRHS from '@/components/Topic/TopicRHS';
import IdeaItem from '@/components/Posts/IdeaItem';
import useIdeas from '@/hooks/useIdeas';
import { ideaState } from '@/atoms/ideaAtom';
import useTopics from '@/hooks/useTopics';
import { Client, clientState } from '@/atoms/clientAtom';
import UserHeader from '@/components/UserProfile/UserHeader';
import About from '@/components/UserProfile/About';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, Stack } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '@/Firebase/clientApp';
import { useRecoilState } from 'recoil';
import UpdateUserInfo from '@/components/UserProfile/UpdateUserInfo';
import update from '../topic/[topicId]/ideas/update';

type ProfilePageProps = {
  clientData: Client;
  showModal: any;
};

const UserPage: React.FC<ProfilePageProps> = ({ clientData }) => {
  const { ideaStateValue, setIdeaStateValue } = useIdeas();
  useEffect(() => {
    setIdeaStateValue((prev) => ({
      ...prev,
      Ideas: clientData.ideas,
    }));
  }, []);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  console.log('Loading items from ${itemOffset} to ${endOffset}');
  // const currentItems = ideaStateValue.Ideas.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(ideaStateValue?.Ideas?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) % ideaStateValue?.Ideas?.length;
    console.log(
      'User requested page number ${event.selected}, which is offset ${newOffset}'
    );
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };

  //hand update user
  const [displayUpdateUserModal, setDisplayUpdateUserModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateForm, setUpdateForm] = useState<Client>();
  useEffect(() => {
    if (clientData) {
      setUpdateForm(clientData);
    }
  }, []);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log('data:', updateForm);
  };

  const [user] = useAuthState(auth);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    console.log('email', clientData.email);
    setLoading(true);
    try {
      if (updateForm) {
        {
          axios
            .put('https://backend-2tza.onrender.com/client/update', {
              id: clientData.id,
              firstname: updateForm?.firstname,
              lastname: updateForm?.lastname,
              age: updateForm?.age,
              client_info: clientData?.client_info,
              role: clientData?.role,
              email: clientData?.email,
              pronoun: clientData.pronoun,
              department: clientData.department,
              isDeleted: clientData.isDeleted,
            })
            .then((response) => {
              console.log('after updateTopic ===>', response);
              window.location.reload();
              setLoading(false);
              hideUpdateUserModal();
            });
        }
      } else {
        setLoading(false);
        hideUpdateUserModal();
      }
    } catch (error: any) {
      console.log('handleUpdatePost error check', error.message);
      setLoading(false);
    }
  };

  const showUpdateUserModal = () => {
    setDisplayUpdateUserModal(true);
  };
  const hideUpdateUserModal = () => {
    setDisplayUpdateUserModal(false);
  };
  return (
    <>
      <UserHeader userData={clientData} />
      <PageContent>
        <>
          <Flex display={{ base: 'flex', md: 'none' }} mb={5} align="center">
            <About userData={clientData} showModal={showUpdateUserModal} />
          </Flex>
          {ideaStateValue?.Ideas?.slice(itemOffset, endOffset).map(
            (item, index) => (
              <li key={item.id}>
                <IdeaItem idea={item} index={index} />
              </li>
            )
          )}
          {ideaStateValue.Ideas?.length > 0 ? (
            <>
              <Stack
                width="70%"
                justify="space-evenly"
                alignSelf="center"
                display="flex"
              >
                <ReactPaginate
                  activeClassName={'item active '}
                  breakClassName={'item break-me '}
                  breakLabel={'...'}
                  containerClassName={'pagination'}
                  disabledClassName={'disabled-page'}
                  nextClassName={'item next '}
                  nextLabel={
                    <ArrowForwardIcon style={{ fontSize: 18, width: 150 }} />
                  }
                  pageClassName={'item pagination-page '}
                  previousClassName={'item previous'}
                  previousLabel={
                    <ArrowBackIcon style={{ fontSize: 18, width: 150 }} />
                  }
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                />
              </Stack>
            </>
          ) : (
            <>Your Ideas Will Be Display Here</>
          )}
        </>
        <>
          <About userData={clientData} showModal={showUpdateUserModal} />
        </>
      </PageContent>
      <UpdateUserInfo
        userData={updateForm}
        showModal={displayUpdateUserModal}
        hideModal={hideUpdateUserModal}
        onChange={onChange}
        loading={loading}
        Update={onSubmit}
      />
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const response = await axios.get(
      ('https://backend-2tza.onrender.com/client/' +
        context.query.userId) as string
    );
    console.log(response.data);
    return {
      props: {
        clientData: JSON.parse(safeJsonStringify({ ...response.data })),
      },
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default UserPage;
