import { useForm } from '@formspree/react';
import { Button } from '@tablecheck/tablekit-button';
import { Input } from '@tablecheck/tablekit-input';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { StatusMessage } from 'Common/StatusMessage';
import { PageWrapper, PageContent, Headline, PageImage } from 'Layouts';

import { MessageTextarea, FormFooter } from './styles';

export function ReportIssue(): JSX.Element {
  const [t, { language }] = useTranslation();
  const [state, handleSubmit] = useForm(CONFIG.formSpreeId);
  const [message, setMessage] = React.useState('');

  return (
    <PageWrapper>
      <Headline>{t('attributes.links.report_issue')}</Headline>
      <PageContent>
        <form onSubmit={handleSubmit}>
          <p>{t('attributes.pages.report_issue')}</p>
          <Input
            label={t('keywords.your_name')}
            name="name"
            shouldFitContainer
            placeholder={t('keywords.anonymous')}
          />
          <Input
            label={t('keywords.your_email')}
            name="email"
            shouldFitContainer
            placeholder={t('keywords.anonymous')}
          />
          <MessageTextarea
            label={t('keywords.message')}
            minimumRows={6}
            isMessageHidden
            shouldFitContainer
            enableResize
            isRequired
            name={t('keywords.message')}
            value={message}
            autoFocus
            onChange={(event) => setMessage(event.target.value)}
          />
          <FormFooter>
            <Button
              type="submit"
              isDisabled={state.submitting || !message}
              isLoading={state.submitting}
            >
              {t('actions.submit')}
            </Button>
            <StatusMessage state={state} />
          </FormFooter>
        </form>
        <PageImage
          src={`${CONFIG.baseName}/static/img/report_issue.svg`}
          alt="Report issue"
        />
      </PageContent>
      <Helmet>
        <title lang={language}>{`${t('attributes.links.report_issue')} - ${t(
          'keywords.app_name'
        )}`}</title>
      </Helmet>
    </PageWrapper>
  );
}
