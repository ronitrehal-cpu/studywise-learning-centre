import { EMAIL, HOLIDAY_NOTE, MAIN_PHONE, MOBILE_PHONE, SMS_NUMBER, formatHours, type Campus } from '../data/business';

export const textLink =
  'text-brand-navy underline decoration-brand-orange underline-offset-4 decoration-1 hover:text-brand-navyDark';

const row = (index: number, last: boolean) =>
  `py-3 border-t ${index === 0 ? 'border-brand-ink' : 'border-brand-rule'} ${last ? 'border-b border-b-brand-rule' : ''}`;

/** Opening hours with the school holidays line. Until hours are confirmed, says to call for class times. */
export function CampusHours({ campus, compact = false }: { campus: Campus; compact?: boolean }) {
  const hours = formatHours(campus.hours);
  const text = compact ? 'text-base' : 'text-lg';
  return (
    <div className={`${text} leading-[1.6] text-brand-slate`}>
      {hours.length > 0 ? (
        <dl>
          {hours.map((h, index) => (
            <div key={h.days} className={`${row(index, index === hours.length - 1)} flex flex-wrap justify-between gap-x-6`}>
              <dt className="text-brand-ink">{h.days}</dt>
              <dd>{h.time}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p>
          Class times vary by program and year level. Call{' '}
          <a href={`tel:${MAIN_PHONE.tel}`} className={`${textLink} whitespace-nowrap`}>
            {MAIN_PHONE.display}
          </a>{' '}
          for current times.
        </p>
      )}
      <p className={`mt-3 ${compact ? 'text-[15px]' : 'text-base'} text-brand-muted`}>{HOLIDAY_NOTE}</p>
    </div>
  );
}

/** Phone, mobile and email as a ruled list. compact: labels sit above values, for narrow boxes. */
export function ContactRows({ compact = false }: { compact?: boolean }) {
  const items = [
    {
      label: 'Phone',
      content: (
        <a href={`tel:${MAIN_PHONE.tel}`} className={`${textLink} whitespace-nowrap`}>
          {MAIN_PHONE.display}
        </a>
      ),
    },
    {
      label: 'Call or text',
      content: (
        <>
          <a href={`tel:${MOBILE_PHONE.tel}`} className={`${textLink} whitespace-nowrap`}>
            {MOBILE_PHONE.display}
          </a>
          <span aria-hidden="true" className="px-2 text-brand-muted">·</span>
          <a href={`sms:${SMS_NUMBER}`} className={textLink}>
            Send a text
          </a>
        </>
      ),
    },
    {
      label: 'Email',
      content: (
        <a href={`mailto:${EMAIL}`} className={`${textLink} break-all`}>
          {EMAIL}
        </a>
      ),
    },
  ];
  return (
    <dl className={`${compact ? 'text-base' : 'text-lg'} leading-[1.6] text-brand-slate`}>
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`${row(index, index === items.length - 1)} ${compact ? '' : 'grid grid-cols-[120px_1fr] gap-4'}`}
        >
          <dt className={compact ? 'text-sm text-brand-muted' : 'text-base text-brand-muted pt-0.5'}>{item.label}</dt>
          <dd>{item.content}</dd>
        </div>
      ))}
    </dl>
  );
}
