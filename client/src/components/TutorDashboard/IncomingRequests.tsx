import { Box, Flex, List } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import HRType, { useGetPendingHRByIdQuery } from '../../redux/services/helpRequestService'
import { RequestCard } from './RequestCard'
import { auth } from '../../firebase'

export const IncomingRequests = () => {
  // requestNames is temporary until we get real data
  // const requestNames = ['David', 'Magi', 'Eugene', 'Alexi', 'Charley']

  const [userId, setUserId] = useState()

  //@ts-ignore
  const helpRequests = useGetPendingHRByIdQuery(userId)
  // [{...}, {...}, {...}]
  useEffect(() => {
    auth.onAuthStateChanged((item) => {
      //@ts-ignore
      setUserId(item.uid)
    })
  }, [])

  return (
    <Flex flexDirection="column">
      <Box
        my={2}
        ml={5}
        fontSize="xl"
        fontWeight="400"
        color="indigo.400"
        letterSpacing={0.5}
      >
        Open Requests:
      </Box>
      <List 
      display="flex" 
      overflow="scroll" 
      border="1px solid"
      borderColor="rgba(127, 6, 219, .4)"
      borderRadius="5px"
      py={3}
      >
        {helpRequests.error
        ? 'error'
        : helpRequests.isLoading
        ? 'loading'
        : helpRequests.data
        ? helpRequests.data.map((hr) => {
          //@ts-ignore
          return <RequestCard hr={hr} />
        }): undefined}
      </List>
    </Flex>
  )
}
