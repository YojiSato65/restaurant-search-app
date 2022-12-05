import { Link as TKLink } from '@tablecheck/tablekit-typography';
import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';

import { PageWrapper, PageContent, Headline, PageImage } from 'Layouts';

export function About(): JSX.Element {
  const [t, { language }] = useTranslation();

  return (
    <PageWrapper>
      <Headline>{t('attributes.links.about')}</Headline>
      <PageContent>
        <div>
          <h2>{t('attributes.pages.about_us_salute')} </h2>
          <p>
            <Trans i18nKey="attributes.pages.about_us">
              <TKLink
                href={`https://tablecheck.com/${language}`}
                target="_blank"
              >
                TableCheck
              </TKLink>
            </Trans>
          </p>
        </div>
        <PageImage
          src={`${CONFIG.baseName}/static/img/celebration.svg`}
          alt="Celebration"
        />
      </PageContent>
      <Helmet>
        <title lang={language}>{`${t('attributes.links.about')} - ${t(
          'keywords.app_name'
        )}`}</title>
      </Helmet>
    </PageWrapper>
  );
}
