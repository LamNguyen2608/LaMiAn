
import React, { useEffect, useState } from "react";
import {
  Select
} from "chakra-react-select";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import axios from "axios";

type CategoryProps = {
  setSelectedTab: (value: string) => void;
  selectedCategory: { value: string; label: string }[];
  setSelectedCategory: (value: { value: string; label: string }[]) => void;
};

const CategorySelection: React.FC<CategoryProps> = ({ setSelectedTab, selectedCategory, setSelectedCategory }) => {

  const [catSelections, setCatSelections] = useState<{ value: string; label: string }[]>()
  const [loadingCat, setLoadingCat] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/cate').then(response => {
      console.log("Get all categories ===>", response.data);
      let listCategories = response.data.map((item: { id: number; name: string; }) => ({
        value: item.id.toString(),
        label: item.name
      }));
      let listOfindices: number[] = [];
      setCatSelections(listCategories);
      if (selectedCategory.length > 0) {
        selectedCategory.forEach(cat => {
          let index = listCategories.findIndex(item => item.value == cat.value);
          if (index !== -1) {
            listOfindices.push(index);
          }
        })
        setSelectedCategory(listOfindices.map(index => listCategories[index]))
      }
      setLoadingCat(false);
    });
  }, [])

  return (
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
          options={catSelections}
          value={selectedCategory}
          onChange={setSelectedCategory}
          closeMenuOnSelect={false}
        ></Select>
      </Flex>
      <Flex justify="flex-end">
        <Button
          height="34px"
          width="100px"
          variant="primary"
          type="submit"
          onClick={() => setSelectedTab("Terms & Condition")}>Next</Button>
      </Flex>
    </Stack>
  );
};
export default CategorySelection;