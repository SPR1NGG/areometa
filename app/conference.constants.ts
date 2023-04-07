import { SelectValue } from '@components/Select';

export const visibilityValues: SelectValue[] = [
	{ value: 'public', label: 'Публичная' },
	{ value: 'private', label: 'Закрытая' },
];

export const typeValues: SelectValue[] = [
	{ value: 'image', label: 'Слайды' },
	{ value: 'video', label: 'Видео' },
];

export const visibilityLabel = 'Тип конференции';
export const typeLabel = 'Тип презентации';
