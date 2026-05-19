import { SyntheticEvent, useState, useRef } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

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
	currentState: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: (newValue) => setIsOpen(newValue),
	});

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
		setIsOpen(false);
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[0]) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[0]) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: option }));
	};

	const handleFontColorChange = (option: (typeof fontColors)[0]) => {
		setFormState((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBgColorChange = (option: (typeof backgroundColors)[0]) => {
		setFormState((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[0]) => {
		setFormState((prev) => ({ ...prev, contentWidth: option }));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

			<div ref={rootRef}>
				<aside
					className={`${styles.container} ${
						isOpen ? styles.container_open : ''
					}`}>
					<form className={styles.form} onSubmit={handleSubmit}>
						{/* ===== ЗАГОЛОВОК ФОРМЫ ===== */}
						<Text as='h2' size={31} weight={800} uppercase align='center'>
							Задайте параметры
						</Text>

						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamilyChange}
							title='Шрифт'
						/>

						<RadioGroup
							name='font-size'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
							title='Размер шрифта'
						/>

						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
							title='Цвет шрифта'
						/>

						<Separator />

						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleBgColorChange}
							title='Цвет фона'
						/>

						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidthChange}
							title='Ширина контента'
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
