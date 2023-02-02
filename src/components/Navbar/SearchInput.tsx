import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
type SearchInputProps = {
    //user: 
};

const SearchInput: React.FC<SearchInputProps> = () => {

    return (
        <Flex flexGrow={1} mr={2} align="center">
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='grey' mb={1.5} />}
                />
                <Input
                    size="sm"
                    borderRadius={5}
                    borderColor="grey"
                    fontSize="10pt"
                    textColor="white"
                    placeholder='Search for ideas. categories...'
                    _placeholder={{ textColor: 'grey' }}
                    _hover={{
                        bg: 'black',
                        border: '1px solid',
                        borderColor: "white"
                    }} />
            </InputGroup>
        </Flex >
    )
}
export default SearchInput;