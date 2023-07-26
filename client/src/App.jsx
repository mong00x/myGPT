import Header from './components/Header'
import MessageField from './components/MessageField'
import ChatInput from './components/ChatInput'
import { Box, Container,Flex, useMediaQuery } from '@chakra-ui/react'
import {useState} from 'react'
import axios from 'axios'



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')


  const addMessage = (role, content) => {
    // add a new message to the list
    setMessages(prevMessages => [...prevMessages, { role, content }]);
  };

  const sendMessage = (message) => {
    // When the user sends a message, add it and a placeholder for the bot's response
    console.log(message);
    addMessage("user", message);
    addMessage("bot", "");  // Placeholder bot message
    setIsLoading(true);

    
    if (import.meta.env.MODE === 'production') {
      // production
      axios.post('https://www.myopenaiapi.net/chat/', { prompt: message })
      .then((response) => {
        // Replace the placeholder bot message with the actual response
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].content = response.data.response.content;
          return updatedMessages;
        });
        setIsLoading(false);
      }, (error) => {
        console.log(error);
      });
    
    } else {

    // development
      axios.post('https://www.myopenaiapi.net/chat/', { prompt: message })
      .then((response) => {
        // Replace the placeholder bot message with the actual response
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].content = response.data.response.content;
          return updatedMessages;
        });
        setIsLoading(false);
      }, (error) => {
        console.log(error);
      });
    }

  };

  return (
      
    <Box fontFamily='roboto'>
      <Box className="patterned-circle" position="absolute" display={isLargerThan800 ? "" : "none"} />
      <Box mt={isLargerThan800 ? "12" : "4"}>
        <Container 
          maxW="container.xl"
          height={isLargerThan800 ? "90vh" : "95vh"}
          rounded="20px"
          bg='#FFFBFE'
          m="auto"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
        >
        <Header />

          <Flex flexDir='column' justify='space-between' h='90%' >
          <MessageField messages={messages} isLoading={isLoading} />
            <ChatInput sendMessage={sendMessage} isLoading={isLoading} />
          </Flex>
        </Container>
      </Box>
    </Box>
    
    
  )
}

export default App
