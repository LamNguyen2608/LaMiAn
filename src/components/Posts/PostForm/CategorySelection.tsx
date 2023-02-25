
import React from "react";
import {
    Select
  } from "chakra-react-select";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";

type CategoryProps = {
    setSelectedTab: (value: string) => void;
  };
const CategorySelection:React.FC<CategoryProps> = ({setSelectedTab}) => {
    const options = [
        { label: 'Green', value: 'green' },
        { label: 'Green-Yellow', value: 'greenyellow' },
        { label: 'Red', value: 'red' },
        { label: 'Violet', value: 'violet' },
        { label: 'Forest', value: 'forest' },
        { label: 'Tangerine', value: 'tangerine' },
        { label: 'Blush', value: 'blush' },
        { label: 'Purple', value: 'purple' },
      ]
    return(
        <Stack spacing={3} width="100%" align="center">
          <Text>You can select or search your idea's category</Text>
            <Flex 
        direction="column"
        width="90%"
        height={250}
        mt={3}>
             <Select
              placeholder="Choose your category..."
              size="md"
              options={options}
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