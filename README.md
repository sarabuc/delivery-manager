# Income Insights

A modular, full-stack application for uploading bank statements, extracting income data via OCR, and presenting analytics dashboards.

## Folder Structure

```
.
├── backend
│   ├── app
│   │   ├── main.py
│   │   ├── routers
│   │   │   └── statements.py
│   │   ├── schemas.py
│   │   └── services
│   │       ├── ocr.py
│   │       └── parser.py
│   └── requirements.txt
├── frontend
│   ├── index.html
│   ├── package.json
│   ├── src
│   │   ├── components
│   │   ├── lib
│   │   └── pages
├── docker-compose.yml
└── .github/workflows/main.yml
```

## Local Development

1. `docker-compose up --build`
2. Frontend: http://localhost:5173
3. Backend: http://localhost:8000

## OCR Flow

- Upload statements to `/api/statements/upload`.
- The backend sends the bytes to AWS Textract (`TABLES` + `FORMS`).
- Parsed transactions are filtered for positive amounts (income), categorized, and summarized.
- Files remain in memory only and are discarded after processing.
