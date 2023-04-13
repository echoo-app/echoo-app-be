import { FormatterJsonComponent } from '../features/tools/formatters/formatter-json/formatter-json.component';
import type { ToolConfig } from './types/tool-config';

export const RegisterdTools: ToolConfig[] = [
	{
		title: 'Formatter',
		icon: 'seperate-vertical',
		routerLink: ['formatters'],
		children: [
			{
				title: 'JSON',
				icon: 'file-json',
				routerLink: ['json'],
				component: FormatterJsonComponent,
			},
			{
				title: 'HTML',
				icon: 'file-html',
				routerLink: ['html'],
				component: FormatterJsonComponent,
			},
		],
	},
];