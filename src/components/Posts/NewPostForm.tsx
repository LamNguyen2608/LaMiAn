import React, { useEffect, useRef, useState } from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import TabItems from './TabItems';
import TextInput from './PostForm/TextInput';
import { MdCategory } from 'react-icons/md';
import { BsFillFileImageFill } from 'react-icons/bs';
import { AiFillFileText } from 'react-icons/ai';
import { FaPollH } from 'react-icons/fa';
import ImageUpload from './PostForm/ImageUpload';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { storage } from '@/Firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Idea } from '@/atoms/ideaAtom';
import uuid from 'react-uuid';
import axios from 'axios';
import CategorySelection from './PostForm/CategorySelection';
import AgreeAndSubmit from './PostForm/Agreement_and_Submit';
import useIdeas from '@/hooks/useIdeas';

type NewPostForm = {
  user: User;
  updateIdea?: Idea;
};

const formTabs: TabItem[] = [
  {
    title: 'Post',
    icon: AiFillFileText,
  },
  {
    title: 'File Upload',
    icon: BsFillFileImageFill,
  },
  {
    title: 'Category',
    icon: MdCategory,
  },
  {
    title: 'Terms & Condition',
    icon: FaPollH,
  },
];
export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};
const NewPostForm: React.FC<NewPostForm> = ({ user, updateIdea }) => {
  const router = useRouter();
  const [selectTab, setSelectTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: '',
    body: '',
  });
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string | undefined>(
    ''
  );
  const [type, setType] = useState<string>('');
  let test =
    updateIdea &&
    updateIdea.idea_cate.map((cate) => ({
      value: cate.cate_id.id as unknown as string,
      label: cate.cate_id.name,
    }));
  const [selectedCategory, setSelectedCategory] = useState<
    { value: string; label: string }[]
  >(test ? test : []);
  const [agree, setAgree] = useState(false);
  const [anonymous, isAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ideaStateValue, setIdeaStateValue } = useIdeas();
  const handleCreatePost = async () => {
    setLoading(true);
    console.log(
      'first',
      selectedCategory.map((item) => item.value)
    );
    const { topicId } = router.query;
    const newPost = {
      name: textInputs.title,
      body: textInputs.body,
      attached_path: '',
      client_id: user?.uid,
      topic_id: parseInt(topicId as string),
      isAnonymous: anonymous,
      categories: selectedCategory.map((item) => item.value),
    };

    try {
      //image URL
      if (selectedFile) {
        if (type === 'Word' || type === 'Excel') {
          const imageRef = ref(storage, `IdeasOtherFiles/${selectedFileName}`);
          uploadString(imageRef, selectedFile, 'data_url').then((result) => {
            console.log('result of uploading image ====>', result);
            getDownloadURL(imageRef).then((url) => {
              newPost.attached_path = url as string;
              console.log('newPost===>', newPost);
              axios
                .post('http://localhost:8080/idea/create', newPost)
                .then((response) => {
                  console.log('after creating idea ===>', response);
                  setLoading(false);
                  router.back();
                });
            });
          });
        } else {
          const imageRef = ref(storage, `Ideas/` + uuid());
          uploadString(imageRef, selectedFile, 'data_url').then((result) => {
            console.log('result of uploading image ====>', result);
            getDownloadURL(imageRef).then((url) => {
              newPost.attached_path = url as string;
              console.log('newPost===>', newPost);
              axios
                .post('http://localhost:8080/idea/create', newPost)
                .then((response) => {
                  console.log('after creating idea ===>', response);
                  setLoading(false);
                  router.back();
                });
            });
          });
        }
      } else {
        console.log('newPost===>', newPost);
        axios
          .post('http://localhost:8080/idea/create', newPost)
          .then((response) => {
            console.log('after creating idea ===>', response);
            setLoading(false);
            router.back();
          });
      }
    } catch (error: any) {
      console.log('handleCreatePost error check', error.message);
      setLoading(false);
    }
  };

  const handleUpdatePost = async () => {
    setLoading(true);
    const { topicId } = router.query;
    const updatePost = {
      id: updateIdea?.id,
      name: textInputs.title,
      body: textInputs.body,
      attached_path: selectedFile,
      client_id: user?.uid,
      topic_id: parseInt(topicId as string),
      isAnonymous: anonymous,
      categories: selectedCategory.map((item) => parseInt(item.value)),
    };

    try {
      //image URL
      let updatedIdea = JSON.parse(JSON.stringify(ideaStateValue.Ideas));
      if (selectedFile && !selectedFile.startsWith('http')) {
        if (type === 'Word' || type === 'Excel') {
          const imageRef = ref(storage, `IdeasOtherFiles/${selectedFileName}`);
          uploadString(imageRef, selectedFile, 'data_url').then((result) => {
            console.log('result of uploading image ====>', result);
            getDownloadURL(imageRef).then((url) => {
              updatePost.attached_path = url as string;
              console.log('newPost===>', updatePost);
              axios
                .put('http://localhost:8080/idea/update', updatePost)
                .then((response) => {
                  console.log('after creating idea ===>', response);
                  updatedIdea[ideaStateValue.selectedIdeaIndex] = response.data;
                  setIdeaStateValue((prev) => ({
                    ...prev,
                    Ideas: updatedIdea,
                  }));
                  window.location.replace("http://localhost:3000/topic/" + topicId);
                });
            });
          });
        } else {
          const imageRef = ref(storage, `Ideas/` + uuid());
          uploadString(imageRef, selectedFile, 'data_url').then((result) => {
            console.log('result of uploading image ====>', result);
            getDownloadURL(imageRef).then((url) => {
              updatePost.attached_path = url as string;
              console.log('updatePost===>', updatePost);
              axios
                .put('http://localhost:8080/idea/update', updatePost)
                .then((response) => {
                  console.log('after creating idea ===>', response);
                  updatedIdea[ideaStateValue.selectedIdeaIndex] = response.data;
                  setIdeaStateValue((prev) => ({
                    ...prev,
                    Ideas: updatedIdea,
                  }));
                  window.location.replace("http://localhost:3000/topic/" + topicId);
                });
            });
          });
        }
      } else {
        console.log('updatePost===>', updatePost);
        axios
          .put('http://localhost:8080/idea/update', updatePost)
          .then((response) => {
            console.log('after creating idea ===>', response);
            updatedIdea[ideaStateValue.selectedIdeaIndex] = response.data;
            setIdeaStateValue((prev) => ({
              ...prev,
              Ideas: updatedIdea,
            }));
            window.location.replace("http://localhost:3000/topic/" + topicId);
          });
      }
    } catch (error: any) {
      console.log('handleCreatePost error check', error.message);
      setLoading(false);
      //router.back();
    }
    setLoading(false);
    //router.back();
    //window.location.replace("http://localhost:3000/topic/" + topicId);
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileType = file.type;
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataURL = e.target?.result as string;
        setSelectedFile(dataURL);
        setSelectedFileName(file?.name ?? '');
      };

      reader.readAsDataURL(file);

      if (
        fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        setType('Word');
      } else if (file?.name.endsWith('.xlsx') || file?.name.endsWith('.xls')) {
        // Show preview of excel file
        setType('Excel');
      }
    }
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const checkboxHandler = () => {
    setAgree(!agree);
  };
  const anonymousHandler = () => {
    isAnonymous(!anonymous);
  };

  useEffect(() => {
    if (updateIdea) {
      setTextInputs({
        title: updateIdea.name,
        body: updateIdea.body,
      });
      setSelectedFile(updateIdea.attached_path ? updateIdea.attached_path : '');
      isAnonymous(updateIdea.isAnonymous);
      const fileExtension = updateIdea.attached_path?.toLowerCase();
      const updateFileName = updateIdea.attached_path
        ?.split('/')
        .pop()
        ?.split('?')[0];
      const decodedPath = decodeURIComponent(updateFileName);
      const fileName = decodedPath.split('/').pop();

      if (fileExtension?.includes('docx')) {
        setType('Word');
        setSelectedFileName(fileName);
      }
      // Check if the Firebase link is an excel file
      else if (fileExtension?.includes('xlsx') || fileExtension === 'xls') {
        setType('Excel');
        setSelectedFileName(fileName);
      }
    }
  }, []);
  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItems
            key={item.title}
            item={item}
            selected={item.title === selectTab}
            setSelectedTab={setSelectTab}
          />
        ))}
      </Flex>
      <Flex p={3} width="100%">
        {selectTab === 'Post' && (
          <TextInput
            textInputs={textInputs}
            onChange={onTextChange}
            loading={loading}
            setSelectedTab={setSelectTab}
          />
        )}
        {selectTab === 'File Upload' && (
          <ImageUpload
            selectedFile={selectedFile}
            selectedFileName={selectedFileName}
            onSelectImage={onSelectImage}
            setSelectedTab={setSelectTab}
            setSelectedFile={setSelectedFile}
            type={type}
            setSelectedType={setType}
            setSelectedName={setSelectedFileName}
          />
        )}
        {selectTab === 'Category' && (
          <CategorySelection
            setSelectedTab={setSelectTab}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        )}
        {selectTab === 'Terms & Condition' && (
          <AgreeAndSubmit
            onChange={checkboxHandler}
            handleCreatePost={handleCreatePost}
            check_agree={agree}
            check_Anonymous={anonymous}
            anonymous_change={anonymousHandler}
            loading={loading}
            title_input={textInputs.title}
            isUpdate={updateIdea ? true : false}
            handleUpdatePost={handleUpdatePost}
          />
        )}
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
