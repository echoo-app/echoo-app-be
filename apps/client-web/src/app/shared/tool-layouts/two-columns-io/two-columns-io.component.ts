import type { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { FitterElementDirective, SyncStyleWithElementDirective } from '@echoo/directives/fitter-element';
import { NzSelectModule } from 'ng-zorro-antd/select';
import type { BehaviorSubject } from 'rxjs';
import { ClipboardModule } from 'ngx-clipboard';
import { NzMessageService, NzMessageServiceModule } from 'ng-zorro-antd/message';
import { NzDrawerServiceModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { WindowEventsService } from '../../../core/services/window-events.service';
import { MonacoEditorOptions } from '../../../data/monacoEditorOptions';
import type { ButtonClickAction } from '../../../data/types/actions';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import type { FormatterAvailableLangConfigsType } from '@echoo/tools/formatter-provider';
import { ToolOptionsToolbarComponent } from '@echoo/components/tool-options-toolbar';
import type { ToolSettingWidgetConfigItems } from '@echoo/types';
import { ToolSettingsService } from '../../../core/services/tool-settings.service';

@UntilDestroy()
@Component({
	selector: 'echoo-two-columns-io',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		NzGridModule,
		NzSelectModule,
		NzInputModule,
		NzButtonModule,
		ToolOptionsToolbarComponent,
		NzSpaceModule,
		NzIconModule,
		NzAlertModule,
		FitterElementDirective,
		SyncStyleWithElementDirective,
		ClipboardModule,
		NzMessageServiceModule,
		NzToolTipModule,
		MonacoEditorModule,
		NzDrawerServiceModule,
	],
	templateUrl: './two-columns-io.component.html',
	styleUrls: ['./two-columns-io.component.scss'],
	providers: [WindowEventsService, NzMessageService, NzDrawerService],
})
export class TwoColumnsIoComponent implements OnChanges {
	@ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>;

	@Input() inputPlaceholder = '';

	@Input() codeInput$!: BehaviorSubject<string | undefined>;
	@Input() codeOutput$!: BehaviorSubject<string | undefined>;
	@Input() inputError$!: BehaviorSubject<string | undefined>;

	@Input() actionInputSample?: ButtonClickAction;
	@Input() actionInputOpenFile?: ButtonClickAction;
	@Input() actionInputClear?: ButtonClickAction;
	@Input() actionInputPasteFromClipboard?: ButtonClickAction;

	@Input() configWidgetSettings?: ToolSettingWidgetConfigItems<object>;

	@Input() monacoEditorLang: FormatterAvailableLangConfigsType | null | undefined = undefined;

	messageService = inject(NzMessageService);
	settingService = inject(ToolSettingsService<string>, {
		skipSelf: true,
	});

	editorOptions = MonacoEditorOptions.ReadOnly('json');

	ngOnChanges(changes: SimpleChanges): void {
		const langChange = changes['monacoEditorLang'];
		if (langChange && langChange.currentValue) {
			this.editorOptions = MonacoEditorOptions.ReadOnly(langChange.currentValue);
		}
	}

	onCopied() {
		this.messageService.success('Copied to clipboard');
	}

	onSettingsChange(values: object) {
		Object.keys(values).forEach((key) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this.settingService.set(key, values[key]);
		});
	}
}
