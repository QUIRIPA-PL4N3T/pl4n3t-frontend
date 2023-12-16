import * as cryptoNode from 'node:crypto'
import { format, isValid, parseISO } from 'date-fns'

const DEBUG = import.meta.env.VITE_DEBUG_MODE || false

// Return a date in specific format https://date-fns.org/v2.29.3/docs/format
export function formatDate(date: string, textFormat: string): string {
  const dateTime = parseISO(date)
  if (isValid(dateTime))
    return format(dateTime, textFormat)
  return ''
}

// Split multiple a string
export function splitMultipleChoiceOptions(value: string): string[][] {
  const questionParser: string[][] = []
  value.split(',').forEach((item) => {
    const itemSplit = item.split(':')
    if (itemSplit.length > 1)
      questionParser.push(itemSplit)
  })
  return questionParser
}

export function qtxLogger(error: any): void {
  if (!DEBUG)
    return
  console.warn(error.name, error)
  if (error.name === 'AxiosError') {
    console.warn(error.response.status)
    console.warn(error.response.data)
  }
  else {
    console.warn(error.name)
  }
}

export function uuidv4() {
  function getRandomValue() {
    let randomValues

    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      // Web Browser
      randomValues = window.crypto.getRandomValues(new Uint8Array(1))[0]
    }
    else {
      // Node.js
      randomValues = cryptoNode.randomBytes(1).readUInt8(0)
    }
    return randomValues
  }
  return ((1e7).toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
    (c ^ getRandomValue() & 15 >> c / 4).toString(16))
}

export function handleError(error: any): string {
  let message = ''
  // Display error in console
  if (DEBUG)
    console.error('🔥', error)
  try {
  // Handle error message Axios errors
    if (error.name && error.name === 'AxiosError') {
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          const objString = JSON.stringify(error.response.data).toString()
          if (DEBUG)
            console.error(objString)
          if (objString.includes('A user with that email already exists.'))
            message = 'errors.register.exist'
          else if (objString.includes('Los campos real_estate, phase deben formar un conjunto único.'))
            message = 'errors.postulation.realEstate.exist'
          else if (objString.includes('password'))
            message = 'errors.register.password'
          else if (objString.includes('document_type":["Clave primaria'))
            message = 'errors.postulation.documentType.notExist'
          else
            message = String(Object.values(error.response.data)[0])
        }
      }
    }
    else if (error.request) {
      message = error.request
    }
    else { message = error.message }
    // set error name
    if (error.name)
      message = `${message}`
    return message
  }
  catch (exception) {
    console.error(exception)
    return '🔥 Utils error 🔥!'
  }
}
