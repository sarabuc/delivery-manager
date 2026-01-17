from __future__ import annotations

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.schemas import IncomeSummary
from app.services.ocr import extract_income_from_statement
from app.services.parser import summarize_income

router = APIRouter()

ALLOWED_MIME_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/png",
}


@router.post("/upload", response_model=IncomeSummary)
async def upload_statement(file: UploadFile = File(...)) -> IncomeSummary:
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Empty file")

    result = extract_income_from_statement(file_bytes)
    summary = summarize_income(result.transactions)

    return IncomeSummary(
        statement_id=result.statement_id,
        transactions=result.transactions,
        total_income=summary["total_income"],
        average_monthly_income=summary["average_monthly_income"],
        by_category=summary["by_category"],
        monthly_totals=summary["monthly_totals"],
    )
