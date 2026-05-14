import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	// 1. Глобальное состояние страницы
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// 2. Состояние открытия/закрытия панели
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Обработчик применения настроек из формы
	const handleApplyParams = (params: ArticleStateType) => {
		setArticleState(params);
		setIsSidebarOpen(false); // Закрываем панель после применения
	};

	// Обработчик сброса настроек
	const handleResetParams = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={setIsSidebarOpen}
				currentState={articleState}
				onApply={handleApplyParams}
				onReset={handleResetParams}
			/>
			<Article />
		</main>
	);
};
