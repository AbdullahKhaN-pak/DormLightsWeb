# 01 - Architecture Overview & Tech Stack Rationale

## System Architecture Diagram

```
[ Customer Browser / Mobile ] <---> [ Vite React 18 SPA (Port 3000) ]
                                            │
                                  REST API / JSON Proxy
                                            │
                                            ▼
                               [ Node.js Express API Server (Port 3001) ]
                                            │
                                            ▼
                             [ Data Store: server/data/db.json ]
```

## Technology Stack Summary

| Layer | Technology | Version | Rationale & Justification | Alternatives Rejected |
|---|---|---|---|---|
| **Frontend Framework** | React + Vite | React 18 / Vite 5 | Fast HMR, component modularity, instant local server start (<200ms). | Create React App (Deprecated, slow build). |
| **Styling & UI Design** | Vanilla CSS + Tailwind CSS | 3.4.1 | Custom Stitch MCP design tokens ("Cinematic Ambience", Warm Gold `#ffd584`), glassmorphism, responsive bento grids. | Bootstrap (Generic appearance). |
| **Backend API** | Node.js + Express.js | Express 4.19 | Lightweight, non-blocking asynchronous REST API handling CORS, JSON endpoints, and authentication. | Django/Python (Heavy weight for single-tier). |
| **Database** | File-based JSON Store | Native fs / JSON | Zero configuration local persistence. Easy single-command deployment without external DB setup. | MongoDB (Requires local daemon installation). |
| **State Management** | React Context API | Native | Light-weight reactive store for Cart, Wishlist, and Auth token state without Redux boilerplate. | Redux Toolkit (Overkill for scope). |

---
*Delivered for DormLights PRD Section 2.4.*
