type ErrorTypes = 'network'

export default interface AppError {
  msg: string
  type: ErrorTypes
}
