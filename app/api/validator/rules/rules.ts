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

export function password(value: string) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!]{8,})$/;

  if (passwordRegex.test(value)) {
    return { error: false };
  }

  return {
    error: true,
    type: "PASSWORD_FORMAT",
    message:
      "Sorry, the password you entered does not meet the required format. Please ensure your password includes at least one uppercase letter, one lowercase letter, one digit (0-9), and one special character (e.g., @, #, $, %, ^, &, +, =, !). Additionally, it must be at least 8 characters long.",
  };
}
