import { Global, type Theme, css } from '@emotion/react'

const getStyles = (theme: Theme) => {
  const styles = css`
    html {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      font-weight: 400;
      font-size: 12px;
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;

      color-scheme: light dark;
      background-color: ${theme.body.background};
    }

    #root {
      height: 100vh;
      display: flex;
    }

    // Josh W. Comeau Reset
    // --------------------
    // 1. Use a more-intuitive box-sizing model.
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    // 2. Remove default margin
    * {
      margin: 0;
    }

    // 3. Add accessible line-height
    // 4. Improve text rendering
    body {
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    // 5. Improve media defaults
    img,
    picture,
    video,
    canvas,
    svg {
      display: block;
      max-width: 100%;
    }

    // 6. Remove built-in form typography styles
    input,
    button,
    textarea,
    select {
      font: inherit;
    }

    // 7. Avoid text overflows
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      overflow-wrap: break-word;
    }

    // 8. Create a root stacking context
    #root,
    #__next {
      isolation: isolate;
    }

    :root {
      font-family: Inter, sans-serif;
      font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
    }
    @supports (font-variation-settings: normal) {
      :root { font-family: InterVariable, sans-serif; }
    }
  `
  return styles
}

export const GlobalStyles = ({ theme }: { theme: Theme }) => (
  <Global styles={getStyles(theme)} />
)
