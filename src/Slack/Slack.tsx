import { useEffect, useState } from 'react'
import { Alert } from '../Alert'
import { Button } from '../Button'
import { Card } from '../Card'
import { Column } from '../layout/Column'
import { Columns } from '../layout/Columns'
import { Stack } from '../layout/Stack'
import {
  type SlackStatusType,
  getAlertLevel,
  getSlackStatus,
  getSuccessMessage
} from '../utilities/slack'
import { language } from '../utilities/language'
import {
  CommitIcon,
  CookieIcon,
  CrossCircledIcon,
  LinkBreak2Icon,
  MagicWandIcon,
  SunIcon
} from '@radix-ui/react-icons'
import { ProgressBar } from '../ProgressBar'
import { Status, type StatusVariant } from '../Status'
import format from 'date-fns/format'
import enAU from 'date-fns/locale/en-AU'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const getStatusVariant = (progress: number): StatusVariant => {
  if (progress >= 0 && progress <= 25) {
    return 'cyan'
  }

  if (progress > 25 && progress <= 50) {
    return 'yellow'
  }

  if (progress > 50 && progress <= 75) {
    return 'orange'
  }

  if (progress > 75 && progress <= 100) {
    return 'red'
  }

  return 'green'
}

const getStatusText = (statusTimeout: number) => {
  const timeoutAsDate = new Date(statusTimeout * 1000)
  const clearTime = format(timeoutAsDate, 'h:mm a', {
    locale: enAU
  })
  const readableDate = formatDistanceToNow(new Date(timeoutAsDate))

  const statusText = `Status clears at ${clearTime} (in ${readableDate})`

  return statusText
}

export const Slack = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [statusText, setStatusText] = useState<string>(
    language.PleaseSelectAStatus
  )
  const [currentStatus, setCurrentStatus] = useState<SlackStatusType>('idle')
  const [statusTimeout, setStatusTimeout] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (statusTimeout === 0) {
      const progressTimer = setTimeout(() => {
        setProgress(0)
      }, 2000)

      return () => {
        clearTimeout(progressTimer)
      }
    }

    if (statusTimeout > 0) {
      const seconds = statusTimeout - Math.floor(Date.now() / 1000)
      const delay = seconds * 1000
      const timer = setTimeout(() => {
        setCurrentStatus('idle')
        setStatusText(language.PleaseSelectAStatus)
        setStatusTimeout(0)
      }, delay)

      const looper = setInterval(() => {
        const remainder = statusTimeout - Math.floor(Date.now() / 1000)
        setProgress(Math.round(100 - (remainder / seconds) * 100))
      }, 1000)

      return () => {
        clearTimeout(timer)
        clearInterval(looper)
      }
    }
  }, [statusTimeout])

  const handleStatusClick = async (status: SlackStatusType) => {
    setIsLoading(true)
    setCurrentStatus('loading')

    const result = await window.Main.setSlackStatus(status)

    if (result?.success) {
      setCurrentStatus('success')
      setStatusText(getSuccessMessage(status))
      setStatusTimeout(getSlackStatus(status).timeout)
    }

    if (result?.error) {
      setCurrentStatus('error')
      setStatusTimeout(0)
      setProgress(0)
    }

    setIsLoading(false)

    if (status === 'clear') {
      setIsLoading(true)

      const idleTimer = setTimeout(() => {
        setCurrentStatus('idle')
        setStatusText(language.PleaseSelectAStatus)
        setStatusTimeout(0)
        setProgress(0)
        setIsLoading(false)
      }, 1000)

      return () => {
        clearTimeout(idleTimer)
      }
    }
  }

  return (
    <Card
      heading={'Slack'}
      icon={
        statusTimeout > 0 ? (
          <Status
            variant={getStatusVariant(progress)}
            statusText={getStatusText(statusTimeout)}
          />
        ) : null
      }
    >
      <Stack>
        <Columns>
          <Column columnWidth="30%">
            <Stack>
              <Button
                disabled={isLoading}
                buttonText="BRB"
                icon={<LinkBreak2Icon />}
                onClick={() => handleStatusClick('brb')}
                stretch
              />
              <Button
                disabled={isLoading}
                buttonText="Lunch"
                icon={<CookieIcon />}
                onClick={() => handleStatusClick('lunch')}
                variant="green"
                stretch
              />
            </Stack>
          </Column>
          <Column columnWidth="30%">
            <Stack>
              <Button
                disabled={isLoading}
                buttonText="Laundry"
                icon={<MagicWandIcon />}
                onClick={() => handleStatusClick('laundry')}
                variant="purple"
                stretch
              />
              <Button
                disabled={isLoading}
                buttonText="Sunshine"
                icon={<SunIcon />}
                onClick={() => handleStatusClick('sunshine')}
                variant="yellow"
                stretch
              />
            </Stack>
          </Column>
          <Column columnWidth="40%">
            <Alert
              alertText={statusText}
              level={getAlertLevel(currentStatus)}
              stretch
            />
          </Column>
        </Columns>
        <ProgressBar progress={progress} />
        <Button
          disabled={isLoading}
          buttonText="Clear Status"
          icon={<CrossCircledIcon />}
          onClick={() => handleStatusClick('clear')}
          stretch
          variant="red"
        />
      </Stack>
    </Card>
  )
}
