import { faObjectGroup } from '@fortawesome/free-regular-svg-icons/faObjectGroup';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons/faQuestionCircle';
import { faBug } from '@fortawesome/free-solid-svg-icons/faBug';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { ordered } from '@tablecheck/locales';
import { ButtonAppearance } from '@tablecheck/tablekit-button';
import { Icon } from '@tablecheck/tablekit-icon';
import { Item } from '@tablecheck/tablekit-item';
import { LanguageSelector, View } from '@tablecheck/tablekit-language-selector';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { tciSun } from 'tablecheck-icons/tciSun';

import { AppRoute } from 'enums';

import {
  CloseButton,
  MobileOnlyItems,
  SidenavItems,
  SidenavWrapper
} from './styles';

export function Sidenav({
  isOpen,
  setOpen,
  changeLanguage
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  changeLanguage: (locale: string) => void;
}): JSX.Element | null {
  const [t, { language }] = useTranslation();

  const onOutsideClickPanel = React.useCallback(
    (event: MouseEvent) => {
      const button = document.querySelector('#button-left');
      if (!button?.contains(event.target as Node)) {
        setOpen(false);
      }
    },
    [setOpen]
  );

  const currentLocale = ordered.find((locale) => locale.code === language);

  if (!language || !ordered) return null;

  return (
    <SidenavWrapper
      isOpen={isOpen}
      togglePanel={() => setOpen(false)}
      width="300px"
      onClickOutside={onOutsideClickPanel}
    >
      <CloseButton
        onClick={() => setOpen(!isOpen)}
        appearance={ButtonAppearance.Subtle}
        iconBefore={<Icon icon={faTimes} />}
      />
      <SidenavItems>
        <Item
          as={Link}
          to={`/${AppRoute.About}`}
          elemBefore={<Icon icon={faQuestionCircle} />}
          onClick={() => setOpen(false)}
        >
          {t('attributes.links.about')}
        </Item>
        <Item
          as={Link}
          to={`/${AppRoute.ReportIssue}`}
          elemBefore={<Icon icon={faBug} />}
          onClick={() => setOpen(false)}
        >
          {t('attributes.links.report_issue')}
        </Item>
        <Item
          as="a"
          href="http://tablekit.tablecheck.com/"
          target="_blank"
          elemBefore={<Icon icon={faObjectGroup} />}
          onClick={() => setOpen(false)}
        >
          TableKit
        </Item>
      </SidenavItems>
    </SidenavWrapper>
  );
}
