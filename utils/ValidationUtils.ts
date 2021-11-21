export const isValidString = (str: string) => str.trim()

export const isValidNumber = (number: number) => !isNaN(+number)

export const isValidEmail = (email: string) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(String(email).toLowerCase())
}

export const isValidPassword = (password: string) => {
  //   var regularExpression =
  //     /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  // atleast one number and atleast one string
  // const regularExpression = /^(?=.*[0-9])(?=.*[!a-zA-Z])/
  // return regularExpression.test(password)
  return password.length >= 8
}

export const comparePasswords = (password: string, confirmPassword: string) => {
  return String(password).localeCompare(String(confirmPassword)) === 0
}
