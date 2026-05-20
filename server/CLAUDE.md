# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (with auto-reload)
npm run server

# Production
npm start

# Seed the initial admin user (requires ADMIN_EMAIL env var)
npm run seed
```

No test suite is configured. There is no lint script.

## Environment Variables

Create a `.env` file with:

```
PORT=4000
MONGODB_URI=<mongodb connection string>
JWT_SECRET=<secret key>
ADMIN_EMAIL=<admin email address>
SMTP_USER=<brevo SMTP user>
SMTP_PASS=<brevo SMTP password>
SENDER_EMAIL=<from email address>
```

## Architecture

This is an **Express 5 REST API** (ESM modules, `"type": "module"`) for an Employee Management System (EMS). It uses MongoDB via Mongoose and is deployed on Vercel (Singapore region).

### Request Flow

```
Request → middleware/auth.js (JWT verification) → routes/ → controllers/ → models/ (Mongoose)
```

All routes are prefixed with `/api`. The `protect` middleware attaches the decoded JWT payload to `req.session` (`{ userId, role, email }`). The `protectAdmin` middleware additionally enforces `role === "ADMIN"`.

### Data Model Relationships

- **User** — auth identity (`email`, `password`, `role: ADMIN|EMPLOYEE`)
- **Employee** — has a 1:1 `userId` ref to User; tracks salary fields (`basicSalary`, `allowances`, `deductions`), `department`, `employmentStatus`, and soft-delete via `isDeleted`
- **Attendance** — one record per employee per day; unique compound index on `(employeeId, date)`; tracks `checkIn`, `checkOut`, `workingHours`, `dayType`, `status`
- **LeaveApplication** — types: `SICK | CASUAL | ANNUAL`; statuses: `PENDING | APPROVED | REJECTED`
- **Payslip** — snapshots salary at pay time (`basicSalary`, `allowances`, `deductions`, `netSalary`); unique compound index on `(employeeId, date)`

### Departments

Defined in `constants/departments.js` as a static array — add new departments there to keep them consistent across the Employee schema enum and any UI consumers.

### Inngest Background Jobs (`inngest/index.js`)

Three async functions registered at `/api/inngest`:

1. **`auto-check-out`** (event: `employee/check-out`) — waits 9 hours after check-in, sends a reminder email if the employee hasn't checked out, then waits 1 more hour and force-closes the attendance as Half Day/LATE.
2. **`leave-application-reminder`** (event: `leave/pending`) — waits 24 hours and emails the admin if a leave application is still PENDING.
3. **`attendance-reminder-cron`** (cron: `0 6 * * *` / 12:00 PM Bangladesh time) — finds active employees who neither checked in nor are on approved leave, then emails each one a reminder.

### Email

`config/nodemailer.js` uses Brevo's SMTP relay (`smtp-relay.brevo.com:587`). The `sendEmail({ to, subject, body })` helper is called directly from controllers and Inngest functions.

### Admin Seeding

Run `npm run seed` once to create the initial admin account using `ADMIN_EMAIL` from `.env` with a temporary password `admin123`. The script is idempotent — it exits early if the admin already exists.
