export default function formatDateTime(
  date?: Date | string | undefined | null,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: options?.year ?? 'numeric',
    month: options?.month ?? 'numeric',
    day: options?.day ?? 'numeric',
  };

  if (options?.weekday) {
    dateOptions['weekday'] = options?.weekday ?? 'long';
  }
  if (options?.hour) {
    dateOptions['hour'] = options?.hour ?? 'numeric';
  }
  if (options?.minute) {
    dateOptions['minute'] = options?.minute ?? 'numeric';
  }
  if (options?.second) {
    dateOptions['second'] = options?.second ?? 'numeric';
  }
  if (options?.hour12) {
    dateOptions['hour12'] = options?.hour12 ?? true;
  }
  let dateData: Date;
  if (typeof date === 'string') {
    dateData = new Date(date);
  } else if (date instanceof Date) {
    dateData = date;
  } else {
    return '';
  }
  return new Intl.DateTimeFormat('en-US', dateOptions).format(dateData);
}
