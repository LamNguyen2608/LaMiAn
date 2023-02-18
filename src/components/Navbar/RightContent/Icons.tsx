import { Flex, Icon } from "@chakra-ui/react";
import {IoNotificationsOutline} from "react-icons/io5";

const Icons: React.FC = () => {
  return (
    <Flex>
      <Flex display="flex" align="center">
      <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
        >
          <Icon as={IoNotificationsOutline} fontSize={25} color="gray.200"  _hover={{ color: "brand.800" }}/>
        </Flex>
      </Flex>
      <></>
    </Flex>
  )
}
export default Icons;