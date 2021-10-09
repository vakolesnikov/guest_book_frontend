import moment from 'moment';
import { IPostsFilters } from 'types/index';

export const stringToColor = (str: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const transformFilters = (filters: IPostsFilters) => Object.entries(filters).reduce(
  (acc, [key, value]) => {
    if (moment.isMoment(value)) {
      switch (key) {
        case 'startDate': {
          return { ...acc, [key]: value.startOf('day').valueOf() };
        }
        case 'endDate': {
          return { ...acc, [key]: value.endOf('day').valueOf() };
        }
        default: break;
      }
    }

    return value ? { ...acc, [key]: value } : acc;
  },
  {},
);
