export interface FormsStateModel<T = any> {
  model: T;
  dirty: boolean;
  status: string;
  errors: FormError;
}

export const formDefaults: FormsStateModel = {
  model: {},
  dirty: false,
  status: '',
  errors: {}
};

type FormError = any;
