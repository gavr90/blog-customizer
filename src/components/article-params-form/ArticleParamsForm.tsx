import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useRef, useEffect, SyntheticEvent } from 'react';

type FormProps = {
	articleStyle: ArticleStateType;
	changeStyleHandler: (selected: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleStyle,
	changeStyleHandler,
}: FormProps) => {
	// Открытие и закрытие панели через замену стилей
	const [open, setOpen] = useState(false);

	const menuStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: open, // будет добавлен только когда open === true
	});

	// Состояния отдельных элементов формы
	const [fontFamily, setFontFamily] = useState(articleStyle.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleStyle.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleStyle.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleStyle.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleStyle.contentWidth);

	// // Обработка подтверждения изменений в стили страницы
	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		const formState = {
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		};
		changeStyleHandler(formState);
	};

	// Обработка сброса стилей на по умолчанию
	const handleDefaultState = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		changeStyleHandler(defaultArticleState);
	};

	// Закрытие панели по клику снаружи
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		function click(event: MouseEvent) {
			const target = event.target as HTMLElement;
			if (ref.current && !ref.current.contains(target)) {
				setOpen(open);
			}
		}

		document.addEventListener('mousedown', click);

		return () => {
			document.removeEventListener('mousedown', click);
		};
	}, []);

	return (
		<>
			<ArrowButton open={open} handleClick={() => setOpen(!open)} />
			<aside className={menuStyle} ref={ref}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleDefaultState}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={'Шрифт'}
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={setFontFamily}
					/>
					<RadioGroup
						title={'Размер шрифта'}
						name='fontsize'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontSize}
					/>
					<Select
						title={'Цвет шрифта'}
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
					/>
					<Separator />.
					<Select
						title={'Цвет фона'}
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}
					/>
					<Select
						title={'Ширина контента'}
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
