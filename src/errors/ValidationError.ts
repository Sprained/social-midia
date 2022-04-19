interface IFieldErros {
  id?: string
  message?: string
}

export class ValidationErrorHandler extends Error {
  statusCode: number
  fieldErrors: IFieldErros

  constructor(fieldErrors: IFieldErros, statusCode: number) {
    super('There are validation errors.')
    this.fieldErrors = fieldErrors
    this.statusCode = statusCode
  }
}
