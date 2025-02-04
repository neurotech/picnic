import styled from '@emotion/styled'
import { Column } from '../layout/Column'
import { Columns } from '../layout/Columns'
import { TextInput } from './TextInput'
import { useEffect, useRef, useState } from 'react'
import { getRandomInt } from '../utilities/numbers'
import templates from './reported-templates.json'
import { Button } from '../Button'
import { Stack } from '../layout/Stack'
import { Alert } from '../Alert'

const StyledReported = styled.div``

const getReportedTemplate = () =>
  templates[getRandomInt(0, templates.length - 1)]

const getReportedText = (template: string, input: string) => {
  let reportedText = template

  if (input === '' || !input) {
    reportedText = reportedText.replace('%pl', 'PLAYER_NAME')
    reportedText = reportedText.replace('%Pl', 'PLAYER_NAME')
    return reportedText
  }

  reportedText = reportedText.replace('%pl', input.toLowerCase())
  reportedText = reportedText.replace('%Pl', input)

  return reportedText
}

export const Reported = () => {
  const textTemplate = useRef<string>('')
  const [reportedTemplate, setReportedTemplate] = useState<string>(
    textTemplate.current
  )
  const [inputText, setInputText] = useState<string>('')
  const [outputText, setOutputText] = useState<string>(
    getReportedText(textTemplate.current, '')
  )

  useEffect(() => {
    const template = getReportedTemplate()
    setReportedTemplate(getReportedTemplate())
    setOutputText(getReportedText(template, ''))
  }, [])

  const isActive = inputText !== '' || Boolean(inputText)

  const handleInput = (input: string) => {
    setInputText(input)
    setOutputText(getReportedText(reportedTemplate, input))
  }

  const handleSubmit = (key: string) => {
    if (key === 'Enter') {
      window.Main.setClipboardText(outputText)
      setReportedTemplate(getReportedTemplate())
      handleInput('')
    }

    if (key === 'Escape') {
      setReportedTemplate(getReportedTemplate())
      handleInput('')
    }
  }
  return (
    <StyledReported>
      <Stack>
        <Columns>
          <Column columnWidth="50%">
            <TextInput
              active={isActive}
              type="text"
              value={inputText}
              onChange={(event) => handleInput(event.target.value)}
              onKeyDown={(event) => handleSubmit(event.key)}
              placeholder="Player Name"
            />
          </Column>
          <Column columnWidth="25%">
            <Button
              stretch
              buttonText="Reroll"
              variant="yellow"
              onClick={() => {
                setReportedTemplate(getReportedTemplate())
                setOutputText(
                  getReportedText(reportedTemplate, inputText || '')
                )
              }}
            />
          </Column>
          <Column columnWidth="25%">
            <Button
              stretch
              buttonText="Copy"
              variant="green"
              onClick={() => window.Main.setClipboardText(outputText)}
            />
          </Column>
        </Columns>

        <Alert
          alertText={outputText}
          level={inputText !== '' ? 'success' : 'warning'}
          stretch={false}
        />
      </Stack>
    </StyledReported>
  )
}
