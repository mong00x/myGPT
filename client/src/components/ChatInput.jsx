import { Flex, Button, Input,useMediaQuery  } from "@chakra-ui/react"
import PropTypes from 'prop-types'
import { useState } from 'react';

const ChatInput = ({ sendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')

  // debounce
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedSendMessage = debounce(sendMessage, 500);

  const handleSendMessage = (event) => {
    message === "" ? event.preventDefault() :
    event.preventDefault();
    debouncedSendMessage(message);
    setMessage("");
  };

  // SQL injection prevention
  const handleInput = (event) => {
    const { value } = event.target;
    const regex = /['";]/gi;
    if (regex.test(value)) {
      const filteredValue = value.replace(regex, "");
      setMessage(filteredValue);
    } else {
      setMessage(value);
    }
  };


  return (
    <form onSubmit={handleSendMessage}> 
      <Flex 
        gap={isLargerThan800 ? '3' : '1'} 
        rounded={8} 
        mx={isLargerThan800 ? '12' : ''} 
        justify='center'
        alignItems='center'
        mb='8'
      >
        <Input 
          value={message}
          onChange={handleInput}
          fontSize={isLargerThan800 ? 'lg' : 'sm'}
          placeholder="Type your message here" 
          border='2px'  
          borderColor='#dfd5ec33'
          px={isLargerThan800 ? '8' : '4'} 
          py={isLargerThan800 ? '7' : '6'}
          rounded='100'
        />
        <Button 
          type="submit"
          rounded='100' 
          bg='none' 
          minW={isLargerThan800 ? '16' : '10'}
          minH={isLargerThan800 ? '16' : '10'}
          p={isLargerThan800 ? '4' : '2'} 
          _hover={{bg:'#66666622'}}
          _active={{bg:'#66666644'}} 
          disabled={message === "" || isLoading}
        >
          <svg 
            width="auto"
            height="auto"
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"><path d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z" 
            fill="#6750a4"
          />
          </svg>
        </Button>
      </Flex>

    </form>
      
  )
}

ChatInput.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
}

export default ChatInput