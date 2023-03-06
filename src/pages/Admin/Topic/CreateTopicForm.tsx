import { Topic } from "@/atoms/topicAtom";
import { Box, Button, Flex, Image, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import React, { useRef, useState } from "react";


const CreateTopicForm:React.FC = () => {
  
  const [topicForm, setTopicForm] = useState({
    title:"", 
    body:"",
    closureDate:"",
    finalclosureDate:"",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const handleCreateTopic = async () => {
  const newTopic: Topic = {
    name: topicForm.title,
    image_url: null,
    idea_closure_date: topicForm.closureDate,
    final_closure_date: topicForm.finalclosureDate,
  }
}
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const {
        target: { name, value },
      } = event;
      setTopicForm((prev) => ({
        ...prev,
        [name]: value,
      }
      ))
    };
    const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
  
      if (event.target.files?.[0]) {
        reader.readAsDataURL(event.target.files[0]);
      }
  
      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target?.result as string);
  
      }
    };
  return(
    <Flex
    justify="center"
    p="10px 50px"
    direction="column">
    <Box p="14px 8px" borderBottom="2px solid" borderColor="blackAlpha.600">
          <Text fontSize={25} fontWeight={900} >Create new topic</Text>
    </Box>
    <Text mb={2} mt={2} fontSize={20} fontWeight={900} color="blackAlpha.600" >Topic content</Text>
      <Input
      name="title"
      onChange={onTextChange}
      fontSize="14pt"
      placeholder="Title"
      borderRadius={4}
      bg="gray.50"
      _placeholder={{color:"gray.500"}}
      focusBorderColor="black"
      _hover={{
        bg: "white",
        border:"2px solid", 
        borderColor: "brand.600", 
      }}
      _focus ={{
        outline: "none",
        bg:"white",
        border: "1px solid", 
        borderColor: "black"
      }}
      />
      <Textarea
      name="body"
      fontSize="14pt"
      onChange={onTextChange}
      placeholder="Text (optional)"
      bg="gray.50"
      borderRadius={4}
      mt={2}
      height="100px"
      _placeholder={{color:"gray.500"}}
      focusBorderColor="black"
      _hover={{
        bg: "white",
        border:"2px solid", 
        borderColor: "brand.600", 
      }}
      _focus ={{
        outline: "none",
        bg:"white",
        border: "1px solid", 
        borderColor: "black"
      }}/>
       <Text mb={2} mt={2} fontSize={20} fontWeight={900} color="blackAlpha.600" >Upload image</Text>
       <Flex direction="column" mt={3} justify="center" align="center" width="100%">
           {selectedFile ? (
            <>
                <Image src={selectedFile} maxWidth="60%" maxHeight="60%" />
                
                <Button
                mt={4}
                 height="50px" 
                 width="20%"
                 variant="primary" 
                 type="submit"
                 onClick={() => setSelectedFile("")}
                 >
                    Remove Image
                </Button>
                
            </>
           ) : (
            <Flex justify="center" 
            align="center" 
            p={20} 
            border="2px dashed" 
            borderColor="brand.600"
            borderRadius={4}
            width="60%"
            height="50px"
            >
                <Button
                 height="34px" 
                 width="80px"
                 variant="primary" 
                 type="submit"
                 onClick={() => selectedFileRef.current?.click()}>
                    Upload
                </Button>
                <Input 
                ref={selectedFileRef} 
                type="file" hidden 
                onChange={onSelectImage} />
                <img src = {selectedFile} />
            </Flex>
           )}
 
        </Flex>
      <Flex mt={2} width="100%" justify="center" direction="row">
      <Flex width="50%" direction="column">
      <Text mb={2} mt={2} fontSize={20} fontWeight={900} color="blackAlpha.600" >Closure Date</Text>
      <Input
      placeholder="Select Date and Time"
      name="closureDate"
      size="md"
      type="datetime-local"
      fontSize="14pt"
      onChange={onTextChange}
      bg="gray.50"
      borderRadius={4}
      height="50px"
      _placeholder={{color:"gray.500"}}
      focusBorderColor="black"
      _hover={{
        bg: "white",
        border:"2px solid", 
        borderColor: "brand.600", 
      }}
      _focus ={{
        outline: "none",
        bg:"white",
        border: "1px solid", 
        borderColor: "black"
      }}/>
      </Flex>
      <Flex width="50%" direction="column" ml={2}>
      <Text mb={2} mt={2} fontSize={20} fontWeight={900} color="blackAlpha.600" >Final Closure Date</Text>
      <Input
      placeholder="Select Date and Time"
      name="finalclosureDate"
      size="md"
      type="datetime-local"
      fontSize="14pt"
      onChange={onTextChange}
      bg="gray.50"
      borderRadius={4}
      height="50px"
      _placeholder={{color:"gray.500"}}
      focusBorderColor="black"
      _hover={{
        bg: "white",
        border:"2px solid", 
        borderColor: "brand.600", 
      }}
      _focus ={{
        outline: "none",
        bg:"white",
        border: "1px solid", 
        borderColor: "black"
      }}
/>
</Flex>
</Flex>
      <Flex justify="center">
      <Button 
        height="50px" 
        width="50%"
        variant="primary" 
        type="submit"
        mt={8}
        mb={8}
        onClick={() => {}}>Post</Button>
      </Flex>
    </Flex>
  );
};
export default CreateTopicForm;