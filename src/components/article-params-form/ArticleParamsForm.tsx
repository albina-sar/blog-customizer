import { SyntheticEvent, useState } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: (value: boolean) => void;
	currentState: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	// Состояние формы
	const [formState, setFormState] = useState<ArticleStateType>(currentState);

	// Обработчик сброса
	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	// Обработчик применения
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => onToggle(!isOpen)} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>

					{/*НАЧАЛО НАПОЛНЕНИЯ ФОРМЫ*/}
					{/* Выбор шрифта */}
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
						}
						title='Шрифт'
					/>

					{/* Размер шрифта */}
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontSizeOption: option }))
						}
						title='Размер шрифта'
					/>

					<Separator />

					{/* Цвет шрифта */}
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontColor: option }))
						}
						title='Цвет шрифта'
					/>

					<Separator />

					{/* Цвет фона */}
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, backgroundColor: option }))
						}
						title='Цвет фона'
					/>

					{/* Ширина контента */}
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, contentWidth: option }))
						}
						title='Ширина контента'
					/>
				</form>
			</aside>
		</>
	);
};
