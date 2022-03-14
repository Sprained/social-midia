import { Handler } from './handler'

interface IFieldErros {
  id?: string
  message?: string
}

export class ErrorExpressValidation extends Handler {
  fieldErrors: IFieldErros

  constructor(fieldErrors: IFieldErros) {
    super(422, 'There are validation errors.')
    this.fieldErrors = fieldErrors
  }
}
