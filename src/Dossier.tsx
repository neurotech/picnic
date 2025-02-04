import styled from '@emotion/styled'
import { type Colour, palette } from './theme/palette'
import type { ReactNode } from 'react'

interface DossierProps {
  headerText: string
  bodyContent: string | ReactNode
  footerContent?: string | ReactNode
  position: 'left' | 'right'
  variant: Colour
}

const DossierContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const DossierHeader = styled.div<Pick<DossierProps, 'position'>>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.position === 'left' ? 'flex-start' : 'flex-end'};
`
const DossierHeaderText = styled.div<
  Pick<DossierProps, 'position' | 'variant'>
>`
  color: ${palette.white.main};
  background-color: ${(props) => palette[props.variant].main};
  width: fit-content;
  padding: 0.25rem 0.5rem;
  border-radius: 3px 3px 0 0;
  user-select: none;
`
const DossierBody = styled.div<Pick<DossierProps, 'position' | 'variant'>>`
  border: 1px solid ${(props) => palette[props.variant].main};
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;

  border-radius: 0 3px 3px 3px;
  border-radius: ${(props) =>
    props.position === 'left' ? '0 3px 3px 3px' : '3px 0 3px 3px'};
`
const DossierFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const DossierFooterText = styled.div`
  width: fit-content;
  padding: 0.15rem 0 0 0;
`

export const Dossier = ({
  headerText,
  bodyContent,
  footerContent,
  position = 'left',
  variant = 'blue'
}: DossierProps) => (
  <DossierContainer>
    <DossierHeader position={position}>
      <DossierHeaderText position={position} variant={variant}>
        {headerText}
      </DossierHeaderText>
    </DossierHeader>
    <DossierBody variant={variant} position={position}>
      {bodyContent}
    </DossierBody>
    <DossierFooter>
      <DossierFooterText>{footerContent}</DossierFooterText>
    </DossierFooter>
  </DossierContainer>
)
