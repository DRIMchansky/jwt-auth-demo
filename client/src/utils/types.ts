export type CustomError = {
  status: number
  error?: string
  data?: {
    message: string
    errors: string[]
  }
}

export type InputOnChangeEvent = React.ChangeEvent<HTMLInputElement>
