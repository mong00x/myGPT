import { useEffect, useRef } from 'react'
import { 
  Box, 
  Flex, 
  Avatar, 
  Text, 
  Stack,
  SkeletonText,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const MessageField = ({messages, isLoading}) => {
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box  
      px='12' 
      mb='4' 
      height='100%' 
      overflowY='auto' 
      rounded='12' 
      backgroundColor='#FFFBFE' 
    >
      <Stack>
        {messages.map((message, index) => (
          message.role === "bot" ? (
            <Flex gap='4' py='4' flexDir='row-reverse' key={index}>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence"/>
              <Box bg='blackAlpha.50'  maxW='85%' p='4'  rounded='2xl' >
                  {isLoading && index === messages.length - 1
                    ? 
                    (
                      <Box w='25vw'>
                        <SkeletonText  noOfLines={2} spacing='4' skeletonHeight='2' />
                      </Box>
                    )
                    : (
                      <Text color='blackAlpha.800'>
                        {message.content}
                      </Text>
                    )
                  }
              </Box>
            </Flex>
          ) 
          :(
            <Flex gap='4' py='4' flexDir='row' key={index}>
              <Avatar name="user"/>
              <Box bg='' maxW='85%' p='4'  rounded='2xl' border='1px' borderColor='blackAlpha.200'>
                <Text color='blackAlpha.800' >
                  {message.content}
                </Text>  
              </Box>
            </Flex>
          )
          
        ))}
        <div ref={endOfMessagesRef} />
      </Stack>
    </Box>
  )
}

MessageField.propTypes = {
  isLoading: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.shape({
    role: PropTypes.string,
    content: PropTypes.string
  }))
}

export default MessageField
