import Header from './components/Header'
import MessageField from './components/MessageField'
import ChatInput from './components/ChatInput'
import { Box, Container,Flex } from '@chakra-ui/react'
import {useState} from 'react'
import axios from 'axios'



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

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
      axios.post('https://chatbot-ai.herokuapp.com/chat/', { prompt: message })
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
      axios.post('http://localhost:8000/chat/', { prompt: message })
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
      
    <Box fontFamily='roboto' pt='8'>
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
          <MessageField messages={messages} isLoading={isLoading} />
            <ChatInput sendMessage={sendMessage} isLoading={isLoading} />
          </Flex>
        </Container>
      </Box>
    </Box>
    
    
  )
}

export default App
