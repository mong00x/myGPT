import Header from './components/Header'
import MessageField from './components/MessageField'
import ChatInput from './components/ChatInput'
import { Box, Container,Flex } from '@chakra-ui/react'

function App() {

  return (
      
    <Box fontFamily='roboto'>
      <div className="patterned-circle"></div>
      <Box>
        <Header />
        <Container 
          maxW="container.xl"
          height="91vh"
          rounded="16"
          bg='#FFFBFE'
          blur='8px'
        >
          <Flex flexDir='column' justify='space-between' h='100%' >
            <MessageField />
            <ChatInput />
          </Flex>
        </Container>
      </Box>
    </Box>
    
    
  )
}

export default App
