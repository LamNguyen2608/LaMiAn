import { Box, Flex, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

const AdminTopic: React.FC = () => {
    return(
        <>
        <Box p="14px 8px" borderBottom="2px solid" borderColor="white">
          <Text fontSize={22} fontWeight={900} >Topics</Text>
        </Box>
        <Flex
        align="center"
        p="5px 0px"
        border='1px solid'
        direction="column"
        borderColor='brand.900'>
        <TableContainer>
  <Table size='sm' variant='striped' colorScheme='pink'>
    <Thead>
      <Tr>
        <Th fontSize={13}>Topic Name</Th>
        <Th fontSize={13}> CLosure Date</Th>
        <Th fontSize={13} isNumeric>Final Closure Date</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td textAlign="center" fontWeight={900} >First topic</Td>
        <Td textAlign="center" justifyContent="center">27/2/2023</Td>
        <Td textAlign="center">15</Td>
      </Tr>
     
    </Tbody>
  </Table>
</TableContainer>
        </Flex>
        </>
    )
};
export default AdminTopic;