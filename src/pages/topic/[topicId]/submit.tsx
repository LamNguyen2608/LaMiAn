import React from "react";
import PageContent from "@/components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "@/components/Posts/NewPostForm";

const submit: React.FC = () => {
  return(
    <PageContent>
      <>
      <Box p="14px 8px" borderBottom="2px solid" borderColor="white">
        <Text fontSize={22} fontWeight={900} >Create a post</Text>
      </Box>
      <NewPostForm/>
      </>
      <></>
    </PageContent>
  )
}
export default submit;