import { Box } from '@chakra-ui/react'
import TopBar from '../components/TopBar/TopBar'
import HrContent from '../components/StudentHR/HrContent'

const StudentHR = () => {
  return (
    <Box>
      <TopBar heading="New Help Request" />
      <HrContent />
    </Box>
  )
}

export default StudentHR
