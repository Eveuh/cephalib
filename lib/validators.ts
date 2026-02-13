/**
 * Form Validation Functions
 * Matches Flutter validation logic with French error messages
 */

/**
 * Validates email address
 * @param email - Email address to validate
 * @returns Error message if invalid, null if valid
 */
export function validateEmail(email: string): string | null {
  const trimmed = email.trim();

  if (trimmed.length === 0) {
    return 'Entre ton email';
  }

  if (!trimmed.includes('@')) {
    return 'Email invalide';
  }

  return null;
}

/**
 * Validates password
 * @param password - Password to validate
 * @returns Error message if invalid, null if valid
 */
export function validatePassword(password: string): string | null {
  if (password.length === 0) {
    return 'Entre ton mot de passe';
  }

  if (password.length < 6) {
    return 'Au moins 6 caractères';
  }

  return null;
}

/**
 * Validates password confirmation matches password
 * @param password - Original password
 * @param confirmPassword - Password confirmation
 * @returns Error message if invalid, null if valid
 */
export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | null {
  if (confirmPassword.length === 0) {
    return 'Confirme ton mot de passe';
  }

  if (password !== confirmPassword) {
    return 'Les mots de passe diffèrent';
  }

  return null;
}

/**
 * Validates name
 * @param name - Name to validate
 * @returns Error message if invalid, null if valid
 */
export function validateName(name: string): string | null {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return 'Entre ton nom';
  }

  if (trimmed.length < 2) {
    return 'Au moins 2 caractères';
  }

  return null;
}
