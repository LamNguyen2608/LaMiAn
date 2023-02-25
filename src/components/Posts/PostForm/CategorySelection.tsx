
import React from "react";
import {
    Select
  } from "chakra-react-select";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";

type CategoryProps = {
    setSelectedTab: (value: string) => void;
    selectedCategory?: string[]; 
    setSelectedCategory: (value: string[]) => void
  };
const CategorySelection:React.FC<CategoryProps> = ({setSelectedTab, selectedCategory, setSelectedCategory}) => {
   
   
    const options = [
        { label: 'Green', value: 'green' },
        { label: 'Green-Yellow', value: 'greenyellow' },
        { label: 'Red', value: 'red' },
      ]
    return(
        <Stack spacing={3} width="100%" align="center">
          <Text>You can select or search your idea's category</Text>
            <Flex 
        direction="column"
        width="90%"
        height="flex"
        mt={3}>
             <Select
              isMulti
              placeholder="Choose your category..."
              size="md"
              options={options}
              value={selectedCategory}
              closeMenuOnSelect={false}
              onChange= {(value) => {setSelectedCategory(value)}}
              ></Select>
             </Flex>
      <Flex justify="flex-end">
      <Button 
        height="34px" 
        width="100px"
        variant="primary" 
        type="submit"
        onClick={() => setSelectedTab("Post")}>Confirm</Button>
      </Flex>
        </Stack>
    );
  };
  export default CategorySelection;