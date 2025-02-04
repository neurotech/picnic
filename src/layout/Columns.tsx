import styled from '@emotion/styled'
import { createContext } from 'react'

interface ColumnsProps {
  alignItems?: string
  children?: React.ReactNode
  flexWrap?: string
  flow?: string
  justifyContent?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  space?: string
}

const StyledColumns = styled.div<ColumnsProps>`
  align-items: ${(props) => props.alignItems};
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-flow: ${(props) => props.flow};
  flex-wrap: ${(props) => props.flexWrap};
  justify-content: ${(props) => props.justifyContent};
  margin-left: -${(props) => props.space};
  overflow-wrap: break-word;
`

export const ColumnsContext = createContext({
  space: '0.5rem'
})

export const Columns = ({
  alignItems,
  children,
  flexWrap,
  flow,
  justifyContent = 'flex-start',
  onClick,
  space = '0.5rem'
}: ColumnsProps) => {
  return (
    <StyledColumns
      alignItems={alignItems}
      flexWrap={flexWrap}
      flow={flow}
      justifyContent={justifyContent}
      onClick={onClick}
      space={space}
    >
      <ColumnsContext.Provider value={{ space }}>
        {children}
      </ColumnsContext.Provider>
    </StyledColumns>
  )
}
