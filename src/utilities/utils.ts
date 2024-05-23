import { format, isValid, parseISO } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import { i18n } from '~/modules/i18n'

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

export function planetLogger(error: any): void {
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

export function generateUuid() {
  return uuidv4()
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

export function formatOptions(list: any, labelKey = 'name', valueKey = 'id', emptyOption = true) {
  const empty = {
    label: i18n.t('selectAnOption'),
    value: null,
  }

  const options = list.map((item: any) => {
    if (typeof item === 'object') {
      return {
        label: item[labelKey],
        value: item[valueKey],
      }
    }
    else {
      return {
        label: item,
        value: item,
      }
    }
  })
  return emptyOption ? [empty, ...options] : options
}

export function formatOptionsNotEmpty(list: any, labelKey = 'name', valueKey = 'id') {
  const options = list.map((item: any) => {
    if (typeof item === 'object') {
      return {
        label: item[labelKey],
        value: item[valueKey],
      }
    }
    else {
      return {
        label: item,
        value: item,
      }
    }
  })

  return options
}
