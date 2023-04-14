/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FormatterProvider } from '../types/formatter-provider';
import type { Options } from 'prettier';
import { randCodeSnippet } from '@ngneat/falso';
import * as prettier from 'prettier/standalone';
import * as htmlParser from 'prettier/parser-html';
import * as babelParser from 'prettier/parser-babel';
import * as markdownParser from 'prettier/parser-markdown';
import * as yamlParser from 'prettier/parser-yaml';
import * as typescriptParser from 'prettier/parser-typescript';
// @ts-ignore
import * as xmlParser from '@prettier/plugin-xml';
import type { FormatterAvailableLangsType } from '../types/formatters';

type Parsers = 'html' | 'babel' | 'markdown' | 'yaml' | 'typescript' | 'sql';

type PrettierFormatterOptions = Options;

class PrettierFormatterProvider<O extends PrettierFormatterOptions>
  implements FormatterProvider<O>
{
  parser: Parsers;
  lang: FormatterAvailableLangsType;

  constructor(parser: Parsers, lang: FormatterAvailableLangsType) {
    this.parser = parser;
    this.lang = lang;
  }

  static WithParser(parser: Parsers, lang: FormatterAvailableLangsType) {
    return new PrettierFormatterProvider<PrettierFormatterOptions>(
      parser,
      lang
    );
  }

  Format(
    code: string,
    options?: PrettierFormatterOptions | undefined,
    errorCb?: ((err?: Error | undefined) => void) | undefined
  ): string {
    let outputCode = code;

    try {
      outputCode = prettier.format(code, {
        parser: this.parser,
        plugins: [
          htmlParser,
          babelParser,
          markdownParser,
          yamlParser,
          typescriptParser,
          xmlParser,
        ],
        ...options,
      });
    } catch (e) {
      if (errorCb) {
        errorCb(e as Error);
      }
    }
    return outputCode;
  }

  ProvideSampleCode(): string {
    if (this.lang === 'html') {
      return '<html><body><h1>Hello World!</h1></body></html>';
    }

    if (this.lang == 'javascript') {
      return randCodeSnippet('javascript').join('\n');
    }

    if (this.lang == 'typescript') {
      return `var carInsuranceCompany = {	name: "Geico",market_capital: "$34.9 billion", }; var carInsuranceCompanyObj = JSON.stringify(obj); document.getElementById("insurance").innerHTML = carInsuranceCompanyObj;`;
    }

    if (this.lang == 'markdown') {
      return `# MarkDown Sample
============================

   Actor|Movie|Insurance
   --|:--:|--:
   Tom Cruise|MI5|Geico
  Arnold|Ture Lies|AllState
`;
    }

    if (this.lang == 'yaml') {
      return `CarInsurance:
        - Company: {name: State Farm, foundedin: 1922, website: www.statefarm.com }
        - Company: {name: Geico, foundedin: 1936, website: www.geico.com }
`;
    }

    if (this.lang == 'xml') {
      return `<root><strong><capital>-782478147</capital><we>opportunity</we><bad>-1990636284</bad><cattle><perhaps>-1714813636</perhaps><section>-1428267151</section><while>handsome</while><stream>without</stream><recognize>-1800816747.1511197</recognize><can>twice</can></cattle><camera>carried</camera><origin>-572598105</origin></strong><my>865939221.2704754</my><nose>native</nose><constantly>1729346751</constantly><dress>-81343418.10572386</dress><silent>orange</silent></root>`;
    }

    return '(No sample code available)';
  }
}

export { PrettierFormatterProvider, PrettierFormatterOptions };