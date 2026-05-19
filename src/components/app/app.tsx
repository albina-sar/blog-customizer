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
	// Глобальное состояние страницы (то, что применено к статье)
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApplyParams = (params: ArticleStateType) => {
		setArticleState(params);
	};

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
			{/* Передаём только то, что нужно для работы самой формы */}
			<ArticleParamsForm
				currentState={articleState}
				onApply={handleApplyParams}
				onReset={handleResetParams}
			/>
			<Article />
		</main>
	);
};
