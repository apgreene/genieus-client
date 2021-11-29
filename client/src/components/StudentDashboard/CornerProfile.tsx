import React from 'react'
import { Box, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react'

import { SettingsIcon } from '@chakra-ui/icons'

// TODO: pull from database/state/props
const userDetails: any = {
  name: 'David',
  tier: 'Pro',
  avatar: 'https://bit.ly/sage-adebayo',
}

function tierIcon(tier: string) {
  if (tier === 'Pro') {
    return 'X'
  } else if (tier === 'Budget') {
    return 'Y'
  } else {
    return 'Z'
  }
}

const CornerProfile = () => {
  return (
    <Flex flexDirection={'row'} color={'white'} justify={'flex-end'}>
      <Flex flexDirection={'column'}>
        <Heading as={'h3'} fontSize={'2xl'} fontWeight={500}>
          Welcome {userDetails.name}
        </Heading>
        <Text>
          {userDetails.tier} Tier {tierIcon(userDetails.tier)}
        </Text>

        <IconButton
          colorScheme="white"
          aria-label="Edit Profile"
          icon={<SettingsIcon />}
          size="small"
          bg="blue"
          h="20px"
          w="20px"
        />
      </Flex>
      <Box bg="orange" position="relative">
        <Image
          boxSize="8rem"
          borderRadius="4rem"
          ml="5"
          src={userDetails.avatar}
        />
      </Box>
    </Flex>
  )
}

export default CornerProfile