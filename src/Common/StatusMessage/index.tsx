import { FormError } from '@formspree/core/forms';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons/faCheckCircle';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons/faTimesCircle';
import { useTranslation } from 'react-i18next';

import { Status, StatusIcon } from './styles';

interface StatusState {
  submitting: boolean;
  succeeded: boolean;
  errors: FormError[];
}

export function StatusMessage({ state }: { state: StatusState }): JSX.Element {
  const [t] = useTranslation();
  return (
    <Status>
      {state.submitting ? (
        <>
          <StatusIcon icon={faPaperPlane} />
          <span>{t('actions.sending')}</span>
        </>
      ) : (
        <>
          {state.succeeded && (
            <>
              <StatusIcon icon={faCheckCircle} />
              <span>{t('keywords.thank_you')}</span>
            </>
          )}
          {state.errors && state.errors.length > 0 && (
            <>
              <StatusIcon icon={faTimesCircle} />
              {state.errors.map((error) => error.message)}
            </>
          )}
        </>
      )}
    </Status>
  );
}
