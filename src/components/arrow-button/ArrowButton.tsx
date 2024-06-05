import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
export type ArrowButtonProps = {
	open: boolean;
	handleClick: OnClick;
};

export const ArrowButton = ({ open, handleClick }: ArrowButtonProps) => {
	const containerMenuStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: open, // будет добавлен только когда open === true
	});

	const arrowMemuStyle = clsx({
		[styles.arrow]: true,
		[styles.arrow_open]: open,
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerMenuStyle}
			onClick={handleClick}>
			<img src={arrow} alt='иконка стрелочки' className={arrowMemuStyle} />
		</div>
	);
};
