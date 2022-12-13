import { css, Global, Theme } from '@emotion/react';
import { LocaleCode } from '@tablecheck/locales';
import {
  buttonClassicTheme,
  buttonDarkTheme,
  buttonThemeNamespace
} from '@tablecheck/tablekit-button';
import { COLORS, Spacing, ThemeProvider } from '@tablecheck/tablekit-theme';
import { commonTypographyStyles } from '@tablecheck/tablekit-typography';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { defaultTheme } from './Themes/default';

export function AppThemeProvider({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [, { language }] = useTranslation();
  const isRtl = [LocaleCode.Arabic].indexOf(language as LocaleCode) !== -1;
  const selectedTheme = defaultTheme;

  React.useEffect(() => {
    if (window.matchMedia) {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const isSystemDark = media.matches;

      const listener = (e: MediaQueryListEvent) => {};

      if (media.addEventListener) {
        media.addEventListener('change', listener);
      } else {
        // Safari and IE
        media.addListener(listener);
      }

      return () => {
        if (media.removeEventListener) {
          media.removeEventListener('change', listener);
        } else {
          media.removeListener(listener);
        }
      };
    }

    return undefined;
  }, [selectedTheme]);

  const theme = React.useMemo<Partial<Theme>>(
    () =>
      // const customButtonDarkTheme = {
      //   ...buttonDarkTheme,
      //   primary: {
      //     ...buttonDarkTheme.primary,
      //     main: COLORS.PURPLE.L5,
      //     hover: COLORS.PURPLE.L6,
      //   },
      // }

      // const updatedTheme = isDarkMode
      //   ? {
      //       ...selectedTheme.dark,
      //       [buttonThemeNamespace]: customButtonDarkTheme,
      //       [buttonThemeNamespace]: buttonDarkTheme,
      //     }
      //   : {
      //       ...selectedTheme.classic,
      //       [buttonThemeNamespace]: buttonClassicTheme,
      //     }

      ({
        isRtl
      }),
    [selectedTheme, isRtl]
  );

  return (
    <ThemeProvider
      locale={language}
      theme={theme}
      // renderHeadNodes={(nodes) => <Helmet>{nodes}</Helmet>}
    >
      <Global
        styles={css`
          html,
          body,
          #root {
            height: 100%;
          }

          body {
            background-color: ${theme.colors?.canvas};
          }

          p {
            margin: ${Spacing.L4} 0;
          }

          ${commonTypographyStyles};
        `}
      />
      {children}
    </ThemeProvider>
  );
}
