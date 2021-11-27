import { Flex, Box, Text, Divider, Image, Button, VStack } from '@chakra-ui/react'
import React from 'react'

export const RequestCard = () => {
  return (
    <Box minWidth="23%" width="23%" height="45vh" rounded="3xl" ml="20px" bg="#4A5568">
      <VStack>
        <Flex alignItems="center">
          <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1024px-Python-logo-notext.svg.png"
              boxSize="10px"
              mx="5px"
          />
          <Text mt={1} fontSize="sm" fontWeight="semibold" lineHeight="short" color="#FFFFFF">
          Python
          </Text>
        </Flex>
        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short" color="#A5B4FC">
          David
        </Text>
        <Text mt={2} fontSize="s" fontWeight="semibold" lineHeight="short" color="#FFFFFF">
          #datastructures #linkedlist
        </Text>
        <Divider width="90%"/>
        <Text mx={2} py={3} fontSize="s" fontWeight="semibold" lineHeight="short" width="90%" color="#FFFFFF">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Button 
          type='submit' 
          bg="#818CF8" 
        >
          Expand
        </Button>

      </VStack>
    </Box>
  )
}
