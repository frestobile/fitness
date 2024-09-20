export interface ILanguage {
  name?: string;
  code?: string;
}

export class Language implements ILanguage{
  constructor(
    public name?: string,
    public code?: string){}
}
