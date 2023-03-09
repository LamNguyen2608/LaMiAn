import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Link, LinkOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import DeleteConfirmationModal from "@/components/Modal/DeleteConfirmation";
import router from "next/router";
import { AiFillDelete, AiFillEdit, AiFillInfoCircle } from "react-icons/ai";
import {IoMdArrowRoundBack } from "react-icons/io";
import { GetServerSidePropsContext } from "next";
import axios from "axios";
import safeJsonStringify from "safe-json-stringify";
import { Topic } from "@/atoms/topicAtom";

type topicProps = {
  TopicData: Topic[];
}
const TopicList: React.FC<topicProps> = ({TopicData}) => {
  const [topicList, setTopicList] = useState<Topic[]>([]);
useEffect(() => {
    setTopicList(TopicData);
  }, []);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const showDeleteModal = () => {
    setDisplayConfirmationModal(true);
  };
  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  const submitDelete = () => {
    setDisplayConfirmationModal(false);
  };
  return (
      <>
        <Box p="24px 10px" borderBottom="2px solid" borderColor="white">
        <Icon as={IoMdArrowRoundBack} fontSize={30} onClick={() => router.back()}/>
          <Text fontSize={22} fontWeight={900} >Topic List</Text>
        </Box>
        <Flex direction="column" border="1px solid black ">
        <TableContainer>
  <Table  variant='striped' colorScheme='pink'>
    <Thead>
      <Tr>
        <Th fontSize={16}>Topic Name</Th>
        <Th fontSize={16}>Modify Date</Th>
        <Th fontSize={16}> CLosure Date</Th>
        <Th fontSize={16}>Final Closure Date</Th>
        <Th fontSize={16}>Status</Th>
        <Th fontSize={16}>function</Th>
      </Tr>
    </Thead>
    <Tbody>
      {topicList.map((item) => (
                <Tr>
                <Td  fontWeight={900} >{item.name}</Td>
                <Td >{item.modifyDate}</Td>
                <Td >{item.idea_closure_date}</Td>
                <Td >{item.final_closure_date}</Td>
                <Td >Open</Td>
                <Td justifyItems="center">
                <Icon as={AiFillInfoCircle} 
                fontSize={40} color="white" 
                 _hover={{ color: "yellow" }}
                 onClick={() => router.push('/Admin' +'/Topic' + '/TopicDetails')} />
                
                <Icon as={AiFillEdit} 
                fontSize={40} color="white" 
                 _hover={{ color: "blue.300" }}
                 ml="20px"
                 onClick={() => router.push('/Admin' +'/Topic' + '/TopicEdit')}/>
              
                <Icon as={AiFillDelete} 
                fontSize={40} color="white" 
                 _hover={{ color: "red" }}
                 ml="20px"
                 onClick={() => showDeleteModal()} />
                </Td>
              </Tr>
              ))}
      
     
    </Tbody>
  </Table>
</TableContainer>
        </Flex>
        <DeleteConfirmationModal showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal}   />
      </>
  );
  
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //get topic data and pass it to cline
  //context.query.topicId as string => getting id from route
  try {
    const response = await axios.get('http://localhost:8080/topic');
    console.log(response.data);
    return {
      props: {
        TopicData: JSON.parse(safeJsonStringify([...response.data])),
      },
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
export default TopicList;