import { VFC } from 'react'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { HiDocumentDownload } from 'react-icons/hi'

import { downloadFileWithTimetable } from 'api/files.api'

export const DownloadFileWithTimetableButton: VFC = () => {
  return (
    <Tooltip hasArrow label="Скачать Excel файл с расписанием">
      <IconButton
        onClick={downloadFileWithTimetable}
        variant="ghost"
        fontSize="xl"
        aria-label="Download excel file with timetable"
        color="current"
        icon={<HiDocumentDownload />}
      />
    </Tooltip>
  )
}
