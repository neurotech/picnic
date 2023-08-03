import styled from "@emotion/styled";
import { palette } from "../theme/palette";

interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  active: boolean;
  invalid?: boolean;
}

const Input = styled.input<
  Pick<TextInputProps, "active" | "disabled" | "invalid">
>`
  min-height: 5rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.input.base.background};
  color: ${(props) => props.theme.input.base.color};
  flex: 1;
  font-size: 1.5rem;

  border-radius: 4px;
  border: 2px solid
    ${(props) =>
      props.invalid
        ? palette.red.main
        : props.active
        ? palette.green.main
        : props.theme.input.base.border};

  ::placeholder {
    color: ${(props) => props.theme.input.base.placeholder};
  }

  :active,
  :focus,
  :focus-visible,
  :focus-within {
    outline: none;
    box-shadow: ${(props) =>
        props.invalid
          ? `${palette.red.main}40`
          : props.active
          ? `${palette.green.main}40`
          : props.theme.input.active.boxShadow}
      0px 0px 0px 4px;
    background-color: ${(props) => props.theme.input.active.background};
    color: ${(props) => props.theme.input.active.placeholder};
    border-color: ${(props) =>
      props.invalid
        ? palette.red.main
        : props.active
        ? palette.green.main
        : props.theme.input.active.border};
  }

  :disabled {
    user-select: none;
    box-shadow: none;
    cursor: not-allowed;
    background-color: ${(props) => props.theme.input.disabled.background};
    border-color: ${(props) => props.theme.input.disabled.border};
    color: ${(props) => props.theme.input.disabled.color};

    ::placeholder {
      color: ${(props) => props.theme.input.disabled.placeholder};
    }

    :active,
    :focus,
    :focus-visible,
    :focus-within {
      user-select: none;
      background-color: ${(props) => props.theme.input.disabled.background};
      border-color: ${(props) => props.theme.input.disabled.border};
      color: ${(props) => props.theme.input.disabled.color};

      ::placeholder {
        color: ${(props) => props.theme.input.disabled.placeholder};
      }
    }
  }

  transition: background 0.2s, border 0.2s, box-shadow 0.2s;
`;

export const TextInput = ({
  active,
  invalid = false,
  ...props
}: TextInputProps) => {
  return <Input active={active} invalid={invalid} {...props} />;
};
