import { tz } from 'moment-timezone'

const getHourAndMinuts = () => {
	const messageHourAndMinutes = tz('America/Sao_Paulo').format('HH:mm');
	return messageHourAndMinutes
}

export { getHourAndMinuts }