import { Box, Button, Flex, Image, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import router from "next/router";
import React, { useRef, useState } from "react";


const TopicDetails:React.FC = () => {
  const [topicForm, setTopicForm] = useState({
    title:"", 
    body:"",
    closureDate:"",
    finalclosureDate:"",
  });
  
  return(
    <Flex
    justify="center"
    p="10px 50px"
    direction="column">
     
    <Box p="14px 0px" borderBottom="2px solid" borderColor="blackAlpha.600">
          <Text fontSize={25} fontWeight={900} >Topic Details</Text>
    </Box>
    <Text mb={2} mt={2} fontSize={20} fontWeight={900} color="blackAlpha.600" >Topic content</Text>
      <Text
      fontSize="14pt"
      >First Topic</Text>
      <Text
      fontSize="14pt"
     >Bla bla bla...</Text>
       <Text mb={2} mt={2} fontSize={20} fontWeight={900} color="blackAlpha.600" >Uploaded image</Text>
       <Flex direction="column" mt={3} justify="center" align="center" width="100%">
                <Image src="/images/logo-02.png" maxWidth="60%" maxHeight="60%" />
                
        </Flex>
      <Flex mt={2} width="100%" justify="center" direction="row">
      <Flex width="50%" direction="column">
      <Text mb={2} mt={2} fontSize={20} fontWeight={900} color="blackAlpha.600" >Closure Date</Text>
      <Text
      fontSize="14pt"
      >3/5/2023 10:37 PM</Text>
      </Flex>
      <Flex width="50%" direction="column" ml={2}>
      <Text mb={2} mt={2} fontSize={20} fontWeight={900} color="blackAlpha.600" >Final Closure Date</Text>
      <Text
      fontSize="14pt"
      >3/6/2023 10:37 PM</Text>
</Flex>
</Flex>
      <Flex justify="center" align="center">
      <Button 
        height="50px" 
        width="30%"
        variant="primary" 
        type="submit"
        mt={8}
        mb={8}
        onClick={() => router.back()}>Back to topic list</Button>
      </Flex>
    </Flex>
  );
};
export default TopicDetails;