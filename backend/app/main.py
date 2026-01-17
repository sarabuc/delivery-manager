from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import statements

app = FastAPI(title="Income Insights API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-frontend-domain"],
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"] ,
)

app.include_router(statements.router, prefix="/api/statements", tags=["Statements"])


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}
