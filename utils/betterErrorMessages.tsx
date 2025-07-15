export function getBetterErrorMessages(code: string): string {
    switch (code) {
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/user-disabled':
            return 'This user account has been disabled.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/invalid-credential':
            return 'Email or password is incorrect.';
        case 'auth/email-already-in-use':
            return 'An account with this email already exists.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        case 'auth/too-many-requests':
            return 'Too many attempts. Try again later.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
}