import { Topic } from '@/atoms/topicAtom';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { it } from 'node:test';
import React, { useEffect, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';

type SearchInputProps = {
  SearchData: Topic[];
};

const SearchInput: React.FC<SearchInputProps> = ({ SearchData }) => {
  const [filteredData, setFilteredData] = useState<Topic[]>([]);
  const [search, setSearch] = React.useState('');
  useEffect(() => {
    setFilteredData(SearchData);
  }, []);
  const handleFilter = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
    console.log('data:', filteredData);
  };
  return (
    <Flex flexGrow={1} mr={2} align="center" direction="column">
      <InputGroup>
        <InputLeftElement
          children={<SearchIcon color="grey" mb={1.5} />}
          cursor="pointer"
        />
        <Input
          size="sm"
          borderRadius={5}
          borderColor="grey"
          value={search}
          onChange={handleFilter}
          fontSize="10pt"
          textColor="white"
          placeholder="Search for ideas. topic..."
          _placeholder={{ textColor: 'grey' }}
          _hover={{
            bg: 'black',
            border: '1px solid',
            borderColor: 'white',
          }}
        />
      </InputGroup>
      {filteredData?.map((item) => (
        <Flex flexGrow={1} bg="gray.900" height={20}>
          <Box>
            <Text>{item.name}</Text>
          </Box>
        </Flex>
      ))}
    </Flex>
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
        SearchData: JSON.parse(safeJsonStringify([...response.data])),
      },
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default SearchInput;
