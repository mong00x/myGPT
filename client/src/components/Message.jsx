// import React from 'react'
import { Box, Flex, Avatar, Text} from '@chakra-ui/react'

const Message = () => {
  return (
    <Flex gap='4' py='4' flexDir='row-reverse' >
        <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence"/>
        <Box bg='blackAlpha.50' maxW='85%' p='4'  rounded='2xl' >
          <Text color='blackAlpha.800'>
            Hi, Lets Chat!
          </Text>  
        </Box>
        
    </Flex>
  )
}

export default Message