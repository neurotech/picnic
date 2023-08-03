import styled from "@emotion/styled";
import { palette } from "./theme/palette";
import { keyframes } from "@emotion/react";

interface ConfigDialogProps {
  open: boolean;
}

const getBackdropUrl = (darkMode: boolean) =>
  `url(./images/config-bg-${darkMode ? "dark" : "light"}.png)`;

const scroll = keyframes`
  100% {
    background-position: -3000px 3000px;
  }
`;

const DialogContainer = styled.div<{ isOpen: boolean }>`
  z-index: 1000;
`;

const Backdrop = styled.div<{ darkMode: boolean }>`
  position: fixed;
  background: ${(props) => getBackdropUrl(props.darkMode)};
  animation: 350s ${scroll} infinite linear;

  /* top: 0;
  left: 0;
  width: 100%;
  height: 100%; */

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
`;

const Dialog = styled.div`
  background-color: ${palette.ash.main};
  border-radius: 0.33rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  z-index: 10;
`;
const Header = styled.div`
  border-bottom: 1px solid ${palette.grey.main};
  padding-bottom: 1rem;
  min-height: 4rem;
`;
const Content = styled.div`
  flex: 1;
  padding-bottom: 1rem;
`;
const Footer = styled.div`
  border-top: 1px solid ${palette.grey.main};
  padding-top: 1rem;
  min-height: 4rem;
`;

export const ConfigDialog = ({ open }: ConfigDialogProps) => {
  const darkMode = window.Main.store.get().darkMode;

  return (
    <>
      {open && (
        <DialogContainer isOpen={open}>
          <Backdrop darkMode={darkMode}>
            <Dialog>
              <Header></Header>
              <Content></Content>
              <Footer></Footer>
            </Dialog>
          </Backdrop>
        </DialogContainer>
      )}
    </>
  );
};
