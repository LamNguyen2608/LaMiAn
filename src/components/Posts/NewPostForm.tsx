import React, { useState } from "react";
import PageContent from "@/components/Layout/PageContent";
import { Flex, Icon } from "@chakra-ui/react";

import TabItems from "./TabItems";
import { async } from "@firebase/util";
import TextInput from "./PostForm/TextInput";
import { BiLinkAlt } from "react-icons/bi";
import { BsFillFileImageFill } from "react-icons/bs";
import {AiFillFileText} from "react-icons/ai"
import { FaPollH } from "react-icons/fa";
  

type NewPostForm = {};

const formTabs : TabItem[] =[
  {
  title: 'Post', 
  icon: AiFillFileText
},
{
  title:'Images & Video',
  icon: BsFillFileImageFill
},  
{
  title:'Link',
  icon: BiLinkAlt
},  
{
  title:'Poll',
  icon: FaPollH
}

];
export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};
const NewPostForm: React.FC = () => {
    const [selectTab, setSelectTab] = useState(formTabs[0].title);
    const [textInputs, setTextInputs] = useState({
      title: "", 
      body:"", 
    });
    const [selectedFile, setSelectedFile] = useState<string>();
    const [loading, setLoading] = useState(false)
    const handleCreatePost = async () => {};

    const onSelectImage = () => {};

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const {
          target: {name, value}, 
        } = event;
        setTextInputs((prev) => ({
          ...prev, 
          [name]: value,
        }
        ))
      };
   return(
   <Flex direction="column" bg="white" borderRadius={4} mt={2} >
    <Flex width="100%">
      {formTabs.map((item) => (
        <TabItems item={item} selected={item.title === selectTab} setSelectedTab = {setSelectTab}/>
      ))}
    </Flex>
    <Flex p={3}>
      {selectTab === "Post" && (
      <TextInput 
      textInputs={textInputs} 
      handCreatePost={handleCreatePost} 
      onChange = {onTextChange}
      loading={loading}/>
      )}
    </Flex>
   </Flex>
  );
};
export default NewPostForm;