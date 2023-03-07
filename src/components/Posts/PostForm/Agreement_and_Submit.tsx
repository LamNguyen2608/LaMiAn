import { Button, Checkbox, Flex, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import React from "react";

type AgreeAndSubmitProps = {
  check_Anonymous:boolean,
  check_agree:boolean,
  handleCreatePost: () => void;
  loading:boolean;
  onChange: () => void;
  title_input:string,
  anonymous_change: () => void;
};


const AgreeAndSubmit:React.FC<AgreeAndSubmitProps> = ({ handleCreatePost, loading, check_agree, onChange, anonymous_change, check_Anonymous, title_input}) => {
  return(
    <Stack spacing={3} width="100%">
      <Text mb={2} mt={2} fontSize={20} fontWeight={900} color="blackAlpha.600" >User Terms and Condition</Text>
      <Text mb={2} mt={2} fontSize={18} color="black" >By clicking “Accept“ you agree to our website's Terms and Condition use as described in our Policy. </Text>
      <Checkbox isChecked={check_agree} onChange={onChange}>I agree to terms and conditions</Checkbox>
      <Checkbox isChecked={check_Anonymous} onChange={anonymous_change}>Is Anonymous?</Checkbox>
      <Flex justify="flex-end">
      <Button 
        height="34px" 
        width="80px"
        variant="primary" 
        type="submit"
        isDisabled={!check_agree || !title_input}
        loadingText='Posting'
        spinnerPlacement="start"
        isLoading ={loading}
        _loading= {{opacity:2}}
        onClick={handleCreatePost}>Post</Button>
      </Flex>
    </Stack>
  );
};
export default AgreeAndSubmit;