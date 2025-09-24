# portfolio_platform

## Frontend Environment

Create `frontend/.env.local` with the API base URL:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The frontend uses Axios. The Authorization header is set automatically from `localStorage` token.

## Backend Endpoints Wiring

- Auth
  - POST `/auth/register` { name, email, password, role: "student" | "organisation" }
  - POST `/auth/login` { email, password } → returns `{ token, user }`
- Organisation (requires role `organisation`)
  - GET `/org/experiences`
  - POST `/org/experiences` { title, description, startDate?, endDate?, studentId? }
  - POST `/org/experiences/:experienceId/docs` multipart form-data `file`
- Student (requires role `student`)
  - GET `/student/experiences`
  - POST `/student/experiences/:id/accept`
  - POST `/student/experiences/:id/decline`
- Public
  - GET `/public/portfolio/:studentId`

Notes:
- JWT payload contains `{ id, role }`. The UI decodes this for role-based routing.
- To switch API environment, change `NEXT_PUBLIC_API_URL` and restart the dev server.
