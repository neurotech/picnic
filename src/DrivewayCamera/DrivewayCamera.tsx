import styled from '@emotion/styled'

interface DrivewayCameraProps {
  open: boolean
}

const DialogContainer = styled.div`
  z-index: 1000;
`

const Backdrop = styled.div`
  position: fixed;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 3rem;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 9;
`

const StyledDrivewayCamera = styled.iframe`
  width: 95%;
  height: 95%;
  border: 1px solid black;
  border-radius: 4px;
  padding: 0;
  margin: 0 -1px 0 0;
`

export const DrivewayCamera = ({ open }: DrivewayCameraProps) => {
  if (open)
    return (
      <DialogContainer>
        <Backdrop>
          <StyledDrivewayCamera src="http://localhost:8090/" />
        </Backdrop>
      </DialogContainer>
    )
}
