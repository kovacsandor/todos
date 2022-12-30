import moment from 'moment';

export const getTimeBeforeTomorrow = (): Date => {
  return moment(moment().format('YYYY-MM-DD'))
    .add(60 * 60 * 24 - 1, 'seconds')
    .toDate();
};
