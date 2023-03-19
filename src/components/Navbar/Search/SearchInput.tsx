import { Idea } from '@/atoms/ideaAtom';
import { searchState } from '@/atoms/searchAtom';
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
import router, { Router } from 'next/router';
import { it } from 'node:test';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import safeJsonStringify from 'safe-json-stringify';

type SearchInputProps = {};

const SearchInput: React.FC<SearchInputProps> = ({}) => {
  const [value, setValue] = useState('');
  const [search, setSearch] = useRecoilState(searchState);

  const getIdea = async () => {
    console.log('Idea');
    try {
      axios.get('http://localhost:8080/idea').then((res) => {
        console.log('Get ideas', res);
        setSearch((prev) => ({
          ...prev,
          allIdea: res.data,
        }));
      });
    } catch (error) {
      console.log('Get trending ideas error', error);
    }
  };
  const getTopic = async () => {
    console.log('Idea');
    try {
      axios.get('http://localhost:8080/topic').then((res) => {
        console.log('Get ideas', res);
        setSearch((prev) => ({
          ...prev,
          allTopic: res.data,
        }));
      });
    } catch (error) {
      console.log('Get trending ideas error', error);
    }
  };
  useEffect(() => {
    getIdea();
    getTopic();
  }, []);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setSearch((prev) => ({
      ...prev,
      currentSearch: value,
      idea: search.allIdea.filter((item) =>
        item.name.toLowerCase().startsWith(search.currentSearch.toLowerCase())
      ),
      topic: search.allTopic.filter((item) =>
        item.name.toLowerCase().match(search.currentSearch.toLowerCase())
      ),
    }));
    console.log('state value:', search.idea);
    console.log('state value topic:', search.topic);
  };
  const onSearch = () => {
    router.push('/Search/searchResult');
  };
  return (
    <Flex
      flexGrow={1}
      mr={2}
      align="center"
      direction="column"
      onClick={onSearch}
    >
      <InputGroup>
        <InputLeftElement
          children={<SearchIcon color="grey" mb={1.5} />}
          cursor="pointer"
        />
        <Input
          size="sm"
          borderRadius={5}
          borderColor="grey"
          onChange={onChange}
          value={search.currentSearch}
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
    </Flex>
  );
};

export default SearchInput;