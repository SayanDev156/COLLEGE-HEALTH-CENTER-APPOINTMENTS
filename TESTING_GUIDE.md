# Testing Login - Quick Guide

## Why "Invalid credentials" appears:

You're trying to login with accounts that were created earlier, but you don't remember the passwords.

## Solution: Create NEW test accounts

### Test User Account:
1. Go to frontend (http://localhost:5173)
2. Click "Register"
3. Select **"User"** role
4. Enter:
   - Name: Test User
   - Email: testuser@test.com
   - Password: test123
5. Click "Create account"
6. Now login with:
   - Email: testuser@test.com
   - Password: test123
   - Role: User

### Test Admin Account:
1. Go to frontend
2. Click "Register"
3. Select **"Admin"** role
4. Enter:
   - Name: Test Admin
   - Email: testadmin@test.com
   - Password: admin123
   - Admin Key: `dev-admin-key-please-change`
5. Click "Create account"
6. Now login with:
   - Email: testadmin@test.com
   - Password: admin123
   - Role: Admin

## Existing Working Accounts:

Based on the database, this admin account works:
- Email: admin@example.com
- Password: admin123
- Role: Admin

## Reset Password for Existing Account:

If you want to reset password for an existing account:

```powershell
cd backend
node scripts/resetPassword.js sayanbhowmik156@gmail.com newpass123 user
```

Then login with the new password.
