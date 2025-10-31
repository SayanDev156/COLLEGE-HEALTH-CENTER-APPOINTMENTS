# Admin Registration Guide

## How It Works Now

### User Registration (stores in `users` collection)
1. Select **User** role in the frontend
2. Fill in name, email, password
3. Click "Create account"
4. Data is stored in MongoDB `users` collection

### Admin Registration (stores in `admins` collection)
1. Select **Admin** role in the frontend
2. Fill in name, email, password
3. Enter the admin creation key: `dev-admin-key-please-change`
4. Click "Create account"
5. Data is stored in MongoDB `admins` collection

## Important Notes

- **Admin Creation Key**: Set in `backend/.env` as `ADMIN_CREATION_KEY=dev-admin-key-please-change`
- **Separate Collections**: Users go to `users` collection, admins go to `admins` collection
- **No Fallback**: When you select admin role during login, it ONLY checks `admins` collection
- **No Duplicates**: You cannot register the same email as both user and admin

## Testing

1. Restart your backend server:
   ```powershell
   cd backend
   npm run dev
   ```

2. Test registration in the frontend or run:
   ```powershell
   cd backend
   node scripts/testRegistration.js
   ```

3. Check MongoDB Compass:
   - `users` collection should have regular users
   - `admins` collection should have admin accounts

## Troubleshooting

If admin data still goes to users collection:
1. Make sure backend server is restarted
2. Check `backend/.env` has `ADMIN_CREATION_KEY` (not `ADMIN_SETUP_KEY`)
3. Verify you're entering the correct admin key during registration
4. Check browser console for any errors
