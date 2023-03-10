import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TabItem } from "./NewPostForm";

type TabItemProps = {
  item: TabItem;
  selected:boolean;
  setSelectedTab: (value: string) => void;
};

const TabItems:React.FC<TabItemProps> = ({item, selected, setSelectedTab}) => {
  return (
    <Flex 
    justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      fontWeight={900}
      color={selected ? "brand.800" : "gray.400"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "black" : "gray.200"}
      borderRightColor="gray.200"
      _hover={{ bg: "gray.50" }}
      onClick={() => setSelectedTab(item.title)}
      >
      <Flex align="center"  height="20px" mr={2}>
        <Icon height="100%" fontSize={22} as={item.icon} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};

export default TabItems;