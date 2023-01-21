import dayjs from 'dayjs';
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT_TIME = 'DD/MM/YY HH:mm';

function humanizeBigDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizeStartTime(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

function humanizeStartDataTime(date) {
  return date ? dayjs(date).format(DATE_FORMAT_TIME) : '';
}

function isPointSame(dueDate) {
  return dueDate && dayjs().isSame(dueDate, 'D');
}

function isPointAfter(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isPointBefore(dueDate) {
  return dueDate && dayjs().isBefore(dueDate, 'D');
}

export {humanizeBigDate, humanizeStartTime, humanizeStartDataTime, isPointSame, isPointAfter, isPointBefore};
