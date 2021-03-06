import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Text,
  Heading,
  HStack,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  TagCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Input,
  FormControl,
  PopoverBody,
  PopoverFooter,
  ListItem,
  Image,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import FocusLock from 'react-focus-lock'
import { RiUserLine } from 'react-icons/ri'

import { auth } from '../../firebase'
import {
  useGetTutorByIdQuery,
  useUpdateTutorMutation,
} from '../../redux/services/tutorService'

import { ProgrammingLanguages } from '../../assets/devicon/ProgrammingLanguages'

import ModalEditTutorProfile from './ModalEditTutorProfile'

export const TutorInformation = () => {
  const languageKeys = Object.keys(ProgrammingLanguages)

  const [userId, setUserId] = useState()
  const [spokenLanugages, setSpokenLanguages] = useState([])
  const [programmingLanguages, setProgrammingLanguages] = useState([])
  const [addedSpokenLanguage, setAddedSpokenLanguage] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [filteredLanguages, setFilteredLanguages] = useState(languageKeys)

  const [updateTutor, updateTutorResult] = useUpdateTutorMutation()

  //@ts-ignore
  const tutor = useGetTutorByIdQuery(userId, { skip: !userId })

  const {
    isOpen: OpenModal,
    onOpen: onOpenModal,
    onClose: onModalClose,
  } = useDisclosure()

  const filterLanguages = (e: any) => {
    setSearchValue(e.target.value)
    setFilteredLanguages(
      languageKeys.filter((language: string) => {
        return searchValue
          ? language.toLowerCase().includes(searchValue.toLowerCase())
          : languageKeys
      })
    )
  }

  useEffect(() => {
    auth.onAuthStateChanged((item) => {
      // @ts-ignore
      setUserId(item.uid)
    })
  }, [])

  useEffect(() => {
    //@ts-ignore
    setSpokenLanguages(tutor.data?.spoken_language)
  }, [tutor.data?.spoken_language])

  useEffect(() => {
    //@ts-ignore
    setProgrammingLanguages(tutor.data?.programming_languages)
  }, [tutor.data?.programming_languages])

  function removeSpokenLanguage(language: string) {
    updateTutor({
      //@ts-ignore
      id: tutor.data.id,
      spoken_language: spokenLanugages.filter((lang) => lang !== language),
    })
  }

  function addSpokenLanguage() {
    updateTutor({
      //@ts-ignore
      id: tutor.data.id,
      spoken_language: [...spokenLanugages, addedSpokenLanguage],
    })
    setAddedSpokenLanguage('')
  }

  function removeProgrammingLanguage(language: string) {
    updateTutor({
      //@ts-ignore
      id: tutor.data.id,
      programming_languages: programmingLanguages.filter(
        (lang) => lang !== language
      ),
    })
  }

  function addProgrammingLanguage(language: string) {
    updateTutor({
      //@ts-ignore
      id: tutor.data.id,
      programming_languages: [...programmingLanguages, language],
    })
  }

  return (
    <Flex flexDirection="column">
      <Box mt={10} height="100%" fontFamily="montserrat" w="30ch" minW={'30ch'}>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading
            as="h1"
            size="lg"
            fontFamily="montserrat"
            fontWeight="300"
            pb={'1rem'}
            mt={2}
            mb={5}
          >
            <HStack>
              <RiUserLine />
              <Text>Tutor Information</Text>
            </HStack>
          </Heading>
        </Flex>

        {tutor.data && tutor.data.location ? (
          <Flex direction="column">
            <Text>Location:</Text>
            <HStack spacing={5}>
              <Tag mt={3} variant="outline" size="lg" colorScheme="indigo">
                <TagLabel>
                  {tutor.error
                    ? 'error'
                    : tutor.isLoading
                    ? 'loading'
                    : tutor.data
                    ? ' ' + tutor.data.location
                    : undefined}
                </TagLabel>
              </Tag>
            </HStack>
          </Flex>
        ) : (
          <Flex direction="column">
            <Text>Location:</Text>
            <HStack spacing={5}>
              <Tag variant="outline" size="sm" colorScheme="indigo" mt={1.5}>
                <AddIcon onClick={onOpenModal} />
              </Tag>
            </HStack>
          </Flex>
        )}

        <Flex mt={4} direction="column">
          <Text>Spoken languages:</Text>
          <Wrap mt={2} spacing={2}>
            {spokenLanugages &&
              spokenLanugages.map((language, index) => {
                return (
                  <WrapItem key={index}>
                    <Tag variant="outline" size="lg" colorScheme="indigo">
                      <TagLabel>{language}</TagLabel>
                      <TagCloseButton
                        onClick={() => removeSpokenLanguage(language)}
                      />
                    </Tag>
                  </WrapItem>
                )
              })}
            <WrapItem>
              <Popover>
                <PopoverTrigger>
                  <Tag
                    variant="outline"
                    size="sm"
                    colorScheme="indigo"
                    mt={1.5}
                  >
                    <AddIcon />
                  </Tag>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Add a Language!</PopoverHeader>
                  <FocusLock returnFocus persistentFocus={false}>
                    <PopoverBody>
                      <FormControl id="language">
                        <Input
                          placeholder="Add a Language"
                          _placeholder={{ color: 'gray.500' }}
                          onChange={(e) =>
                            setAddedSpokenLanguage(e.target.value)
                          }
                          value={addedSpokenLanguage}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && addSpokenLanguage()
                          }
                          type="text"
                        />
                      </FormControl>
                    </PopoverBody>
                  </FocusLock>
                </PopoverContent>
              </Popover>
            </WrapItem>
          </Wrap>
        </Flex>

        {tutor.data && tutor.data.bio ? (
          <Flex mt={4} direction="column" maxW="15rem">
            <Text>Bio:</Text>
            <Text fontSize={'md'} color="gray" fontWeight={'500'}>
              {tutor.error
                ? 'error'
                : tutor.isLoading
                ? 'loading'
                : tutor.data
                ? tutor.data.bio
                : undefined}
            </Text>
          </Flex>
        ) : (
          <Flex mt={4} direction="column" maxW="15rem">
            <Text>Bio:</Text>
            <HStack spacing={5}>
              <Tag variant="outline" size="sm" colorScheme="indigo" mt={1.5}>
                <AddIcon onClick={onOpenModal} />
              </Tag>
            </HStack>
          </Flex>
        )}

        <Flex
          alignItems="flex-start"
          justifyContent="center"
          fontFamily="montserrat"
          direction="column"
          maxW="25rem"
          mt={4}
        >
          <Text>Your Tech Expertise:</Text>

          <Wrap align="left" mt={2} spacing={2}>
            {programmingLanguages &&
              programmingLanguages.map((language, index) => {
                return (
                  <WrapItem key={index}>
                    {/*@ts-ignore*/}
                    <Tag variant="outline" size="lg" colorScheme="indigo">
                      <Image
                        mr={2}
                        height="1rem"
                        width="1rem"
                        borderRadius="5"
                        src={ProgrammingLanguages[language]}
                      />
                      <TagLabel>{language}</TagLabel>
                      <TagCloseButton
                        onClick={() => removeProgrammingLanguage(language)}
                      />
                    </Tag>
                  </WrapItem>
                )
              })}
            <WrapItem>
              <Popover>
                <PopoverTrigger>
                  <Tag
                    variant="outline"
                    size="sm"
                    colorScheme="indigo"
                    mt={1.5}
                  >
                    <AddIcon />
                  </Tag>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Add to your Tech Stack!</PopoverHeader>
                  <FocusLock returnFocus persistentFocus={false}>
                    <PopoverBody>
                      <FormControl id="techStack">
                        <Input
                          value={searchValue}
                          type="text"
                          onChange={(e) => filterLanguages(e)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              let addedLanguage = languageKeys.find(
                                (language) =>
                                  language.toLowerCase() ===
                                  searchValue.toLowerCase()
                              )
                              if (addedLanguage) {
                                addProgrammingLanguage(addedLanguage)
                                setSearchValue('')
                                setFilteredLanguages(languageKeys)
                              } else {
                                addProgrammingLanguage(searchValue)
                                setSearchValue('')
                                setFilteredLanguages(languageKeys)
                              }
                            }
                          }}
                          placeholder="Add a Technology"
                          _placeholder={{ color: 'gray.500' }}
                        />
                      </FormControl>
                    </PopoverBody>
                  </FocusLock>
                  <PopoverFooter>
                    {filteredLanguages.slice(0, 5).map((lang, index) => {
                      return (
                        <ListItem
                          key={index}
                          onClick={() => {
                            setSearchValue(lang)
                            addProgrammingLanguage(lang)
                            setSearchValue('')
                            setFilteredLanguages(languageKeys)
                          }}
                          listStyleType={'none'}
                        >
                          <Flex alignItems="center" direction="row">
                            {/*@ts-ignore*/}
                            <Image
                              mr={5}
                              height="1rem"
                              width="1rem"
                              borderRadius="5"
                              // @ts-ignore
                              src={ProgrammingLanguages[lang]}
                            />
                            <Text
                              _hover={{
                                cursor: 'pointer',
                                opacity: '0.7',
                                color: 'indigo.300',
                              }}
                            >
                              {lang}
                            </Text>
                          </Flex>
                        </ListItem>
                      )
                    })}
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </WrapItem>
          </Wrap>
        </Flex>
      </Box>
      <ModalEditTutorProfile
        tutor={tutor.data}
        isOpen={OpenModal}
        onClose={onModalClose}
      />
    </Flex>
  )
}
