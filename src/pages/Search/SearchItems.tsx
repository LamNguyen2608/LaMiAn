import { Topic, TopTopic } from '@/atoms/topicAtom';
import { auth } from '@/Firebase/clientApp';
import useTopics from '@/hooks/useTopics';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiLogOut, BiLogIn, BiUserPlus } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { SearchItem } from './searchResult';

type SearchItemProps = {
  item: SearchItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const SearchItems: React.FC<SearchItemProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      fontWeight={900}
      color={selected ? 'brand.900' : 'gray.400'}
      bg={selected ? 'gray.100' : 'white'}
      borderWidth={selected ? '0px 1px 2px 0px' : '0px 1px 1px 0px'}
      borderBlock={selected ? 'gray.400' : 'gray.200'}
      _hover={{ bg: 'gray.50' }}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" justify="center" height="20px">
        <Icon height="20pt" width="20pt" as={item.icon} />
        <Text ml={2} fontSize="15pt">
          {item.title}
        </Text>
      </Flex>
    </Flex>
  );
};
export default SearchItems;
