import styled from '@emotion/styled'

const StyledSeparator = styled.hr`
  padding: 0;
  height: 1px;
  border: none;
  background-color: ${(props) => props.theme.separator};
`

export const Separator = () => <StyledSeparator />
