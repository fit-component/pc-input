/**
 * 为 validate 拓展功能
 */

import * as validator from 'validator'
import * as _ from 'lodash'

export interface ExtendValidatorStatic extends ValidatorJS.ValidatorStatic {
    notEmpty(str: string): boolean
    len(str: string, min: number, max: number): boolean
    isUrl(str: string): boolean
    isIPv6(str: string): boolean
    isIPv4(str: string): boolean
    notIn(str: string, values: any[]): boolean
    regex(str: string, pattern: any, modifiers: string): boolean
    notRegex(str: string, pattern: any, modifiers: string): boolean
    isDecimal(str: string): boolean
    min(str: string, val: number): boolean
    max(str: string, val: number): boolean
    not(str: string, pattern: any, modifiers: string): boolean
    contains(str: string, elem: string): boolean
    notContains(str: string, elem: string): boolean
    is(str: string, pattern: any, modifiers: string): boolean
}

const extendValidator: ExtendValidatorStatic = {
    contains: validator.contains,
    equals: validator.equals,
    isAfter: validator.isAfter,
    isAlpha: validator.isAlpha,
    isAlphanumeric: validator.isAlphanumeric,
    isAscii: validator.isAscii,
    isBase64: validator.isBase64,
    isBefore: validator.isBefore,
    isBoolean: validator.isBoolean,
    isByteLength: validator.isByteLength,
    isCreditCard: validator.isCreditCard,
    isCurrency: validator.isCurrency,
    isDate: validator.isDate,
    isDecimal: validator.isDecimal,
    isDivisibleBy: validator.isDivisibleBy,
    isEmail: validator.isEmail,
    isFQDN: validator.isFQDN,
    isFloat: validator.isFloat,
    isFullWidth: validator.isFullWidth,
    isHalfWidth: validator.isHalfWidth,
    isHexColor: validator.isHexColor,
    isHexadecimal: validator.isHexadecimal,
    isIP: validator.isIP,
    isISBN: validator.isISBN,
    isISIN: validator.isISIN,
    isISO8601: validator.isISO8601,
    isIn: validator.isIn,
    isInt: validator.isInt,
    isJSON: validator.isJSON,
    isLength: validator.isLength,
    isLowercase: validator.isLowercase,
    isMACAddress: validator.isMACAddress,
    isMobilePhone: validator.isMobilePhone,
    isMongoId: validator.isMongoId,
    isMultibyte: validator.isMultibyte,
    isNull: validator.isNull,
    isNumeric: validator.isNumeric,
    isSurrogatePair: validator.isSurrogatePair,
    isURL: validator.isURL,
    isUUID: validator.isUUID,
    isUppercase: validator.isUppercase,
    isVariableWidth: validator.isVariableWidth,
    isWhitelisted: validator.isWhitelisted,
    matches: validator.matches,
    blacklist: validator.blacklist,
    escape: validator.escape,
    ltrim: validator.ltrim,
    normalizeEmail: validator.normalizeEmail,
    rtrim: validator.rtrim,
    stripLow: validator.stripLow,
    toBoolean: validator.toBoolean,
    toDate: validator.toDate,
    toFloat: validator.toFloat,
    toInt: validator.toInt,
    toString: validator.toString,
    trim: validator.trim,
    whitelist: validator.whitelist,
    extend: validator.extend,

    notEmpty: (str: string) => {
        return !str.match(/^[\s\t\r\n]*$/)
    },

    len: (str: string, min: number, max: number) => {
        return extendValidator.isLength(str, min, max)
    },

    isUrl: (str: string) => {
        return validator.isURL(str)
    },

    isIPv6: (str: string) => {
        return validator.isIP(str, 6)
    },

    isIPv4: (str: string) => {
        return validator.isIP(str, 4)
    },

    notIn: (str: string, values: any[]) => {
        return !validator.isIn(str, values)
    },

    regex: (str: string, pattern: any, modifiers: string) => {
        str += ''
        if (Object.prototype.toString.call(pattern).slice(8, -1) !== 'RegExp') {
            pattern = new RegExp(pattern, modifiers)
        }
        return !!str.match(pattern)
    },

    notRegex: (str: string, pattern: any, modifiers: string) => {
        return !extendValidator.regex(str, pattern, modifiers)
    },

    min: (str: string, val: number) => {
        const number = parseFloat(str)
        return isNaN(number) || number >= val
    },

    max: (str: string, val: number) => {
        const number = parseFloat(str)
        return isNaN(number) || number <= val
    },

    not: (str: string, pattern: any, modifiers: string) => {
        return extendValidator.notRegex(str, pattern, modifiers)
    },

    notContains: (str: string, elem: string) => {
        return !validator.contains(str, elem)
    },

    is: (str: string, pattern: any, modifiers: string) => {
        return extendValidator.regex(str, pattern, modifiers)
    }
}

export default extendValidator