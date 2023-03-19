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
import { Stack } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '@/Firebase/clientApp';
import { useRecoilState } from 'recoil';
import UpdateUserInfo from '@/components/UserProfile/UpdateUserInfo';

type ProfilePageProps = {
  clientData: Client;
  showModal: any;
};

const TopicPage: React.FC<ProfilePageProps> = ({ clientData }) => {
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
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = ideaStateValue.Ideas.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(ideaStateValue.Ideas.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * itemsPerPage) % ideaStateValue.Ideas.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };

  //hand update user
  const [displayUpdateUserModal, setDisplayUpdateUserModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPass: '',
    firstname: '',
    lastname: '',
    age: '',
    pronoun: '',
    department: '',
  });
  const [formError, setformError] = useState('');
  const [allDepartments, setAllDepartments] = useState<Department[]>([]);
  const [clientStateValue, setClientStateValue] = useRecoilState(clientState);
  useEffect(() => {
    axios.get('http://localhost:8080/department').then((response) => {
      console.log('get all departments: ', response);
      setAllDepartments(response.data);
    });
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //set Error
    console.log(signUpForm);
    if (formError) setformError('');
    if (signUpForm.password !== signUpForm.confirmPass) {
      setformError('Password does not match');
      return;
    }
    //password matching
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    //update form state
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
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
          {currentItems.map((item, index) => (
            <IdeaItem idea={item} index={index} />
          ))}
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
        <>
          <About userData={clientData} showModal={showUpdateUserModal} />
        </>
      </PageContent>
      <UpdateUserInfo
        userData={clientData}
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
      (process.env.REACT_APP_BACKEND_ENDPOINT +
        'client/' +
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
export default TopicPage;
