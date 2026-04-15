export function verifyPasswordInput(password: string): string {
  if (password === '') {
    throw new Error('Password is required');
  }

  return password;
}
