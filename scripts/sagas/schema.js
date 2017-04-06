import { Schema, arrayOf } from 'normalizr'

export const person = new Schema('persons')
export const arrayOfPersons = arrayOf(person)
