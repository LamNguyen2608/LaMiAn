import React from "react";
import { Box, Flex, Link, LinkOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const submit: React.FC = () => {
  return (
      <>
        <Box p="24px 10px" borderBottom="2px solid" borderColor="white">
          <Text fontSize={22} fontWeight={900} >Topic List</Text>
        </Box>
        <Flex direction="column" border="1px solid black ">
        <TableContainer>
  <Table  variant='striped' colorScheme='pink'>
    <Thead>
      <Tr>
        <Th fontSize={16}>Topic Name</Th>
        <Th fontSize={16}> CLosure Date</Th>
        <Th fontSize={16}>Final Closure Date</Th>
        <Th fontSize={16}>function</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td  fontWeight={900} >First topic</Td>
        <Td >27/2/2023</Td>
        <Td >28/2/2023</Td>
        <Td >
        
        <Link
    href="/Admin/Topic/TopicEdit" 
   >
    Edit
   </Link>
   |  <Link
    href="/Admin/Topic/TopicDelete" 
   >
    Delete
   </Link>
   |  <Link
    href="/Admin/Topic/TopicDetails" 
   >
    Details
   </Link>
        </Td>
      </Tr>
     
    </Tbody>
  </Table>
</TableContainer>
          
        </Flex>
      </>
  );
};
export default submit;