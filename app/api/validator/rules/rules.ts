export function email(value: string) {
  if (!value) return false;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(value))
    return {
      error: false,
    };

  return {
    error: true,
    type: "EMAIL_FORMAT",
    message: "Invalid email format",
  };
}

