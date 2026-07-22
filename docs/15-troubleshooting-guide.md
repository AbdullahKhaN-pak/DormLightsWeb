# 15 - Technical Troubleshooting Guide

## Common Issues & Resolutions

| Issue | Potential Cause | Solution |
|---|---|---|
| `Port 3000 or 3001 already in use` | Another dev process is running on port 3000/3001 | Kill process using `lsof -i :3001` or set `PORT=3002` in env. |
| `API Fetch Error / Connection Refused` | Express backend server is not running | Ensure `npm run dev` (or `npm run server`) is active. |
| `Admin Access Denied` | User is not logged in as admin | Log out and log back in using `admin@dormlights.com` / `admin123`. |

---
*Delivered for DormLights PRD Section 11.*
