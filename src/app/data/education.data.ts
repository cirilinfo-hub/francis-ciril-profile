import type { Education } from '../core/models/portfolio.models';

/**
 * Only details present in the supplied resume are filled in. Institution, period and grade
 * are optional — add them here and they appear automatically.
 */
export const EDUCATION: readonly Education[] = [
  { id: 'bsc', qualification: 'B.Sc. Information Technology', period: '2002 – 2005', level: 'Undergraduate' },
  { id: 'hsc', qualification: 'Higher Secondary Certificate', period: '2000 – 2002', level: 'Higher Secondary' },
  { id: 'sslc', qualification: 'SSLC', period: '1998 – 1999', level: 'Secondary' },
];
