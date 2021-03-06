import React, { useState, useEffect, ReactNode } from 'react'
import {
  Flex,
  Box,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
} from '@chakra-ui/react'
import { auth } from '../../firebase'
import { useGetTutorByIdQuery } from '../../redux/services/tutorService'
import { BsPerson } from 'react-icons/bs'
import { AiOutlineStar } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { displayTimeinHHMM } from './utils'

export const TutorStats = () => {
  const [userId, setUserId] = useState()
  //@ts-ignore
  const tutor = useGetTutorByIdQuery(userId, { skip: !userId })

  useEffect(() => {
    auth.onAuthStateChanged((item) => {
      //@ts-ignore
      setUserId(item.uid)
    })
  }, [])

  interface StatsCardProps {
    title: string
    stat: string
    icon: ReactNode
  }
  function StatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props
    const gradient = useColorModeValue(
      'linear(to-r, blue.400, teal.500)',
      'linear(to-l, blue.300, teal.100)'
    )

    return (
      <Stat
        px={{ base: 2, md: 4 }}
        // px={"10rem"}
        py={'5'}
        m={5}
        w={'13rem'}
        shadow={'base'}
        bg={useColorModeValue('gray.100', 'gray.700')}
        rounded={'lg'}

        // px={'2'}
        // py={'5'}
        // shadow={'xl'}
        // border={'1px solid'}
        // borderColor={useColorModeValue('gray.800', 'gray.500')}
      >
        <Flex justifyContent={'center'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber
              fontSize={'2xl'}
              fontWeight={'medium'}
              bgGradient={gradient}
              bgClip="text"
              width="fit-content"
            >
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    )
  }

  return (
    <Box
      // w="3xl"
      // minW="3xl"
      // maxW="3xl"
      // mx={'auto'}

      pt={5}
      px={{ base: 2, sm: 1, md: 17 }}
    >
      {/* <SimpleGrid
        columns={{ base: 1, md: 4 }}
        spacing={{ base: 5, lg: 8 }}
        justifyItems={'center'}
      > */}
      <Flex flexWrap="wrap" justifyContent={'center'}>
        <StatsCard
          title={'Requests Completed'}
          stat={
            tutor.error
              ? 'error'
              : tutor.isLoading
              ? 'loading'
              : tutor.data
              ? tutor.data.completed_help_requests
                ? tutor.data.completed_help_requests.toString()
                : 'N/A'
              : 'N/A'
          }
          icon={<BsPerson size={'3em'} />}
        />
        <StatsCard
          title={'Average Rating'}
          stat={
            tutor.error
              ? 'error'
              : tutor.isLoading
              ? 'loading'
              : tutor.data
              ? tutor.data.avg_rating
                ? tutor.data.avg_rating.toFixed(2).toString()
                : 'N/A'
              : 'N/A'
          }
          icon={<AiOutlineStar size={'3em'} />}
        />
        <StatsCard
          title={'Monthly Hours'}
          stat={
            tutor.error
              ? 'error'
              : tutor.isLoading
              ? 'loading'
              : tutor.data
              ? tutor.data.time_completed
                ? displayTimeinHHMM(tutor.data.time_completed)
                : 'N/A'
              : 'N/A'
          }
          icon={<BiTimeFive size={'3em'} />}
        />
        <StatsCard
          title={'Monthly Earnings'}
          stat={
            tutor.error
              ? 'error'
              : tutor.isLoading
              ? 'loading'
              : tutor.data
              ? tutor.data.time_completed
                ? `$${((tutor.data.time_completed * 40) / 3600).toFixed(2)}`
                : 'N/A'
              : 'N/A'
          }
          icon={<AiOutlineDollarCircle size={'3em'} />}
        />
        {/* </SimpleGrid> */}
      </Flex>
    </Box>
  )
}
