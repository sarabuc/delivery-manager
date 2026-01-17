from datetime import date
from typing import List

from pydantic import BaseModel, Field


class StatementUploadResponse(BaseModel):
    statement_id: str
    total_income: float
    average_monthly_income: float
    currency: str = "USD"


class Transaction(BaseModel):
    date: date
    description: str
    amount: float
    category: str


class IncomeSummary(BaseModel):
    statement_id: str
    transactions: List[Transaction]
    total_income: float
    average_monthly_income: float
    by_category: dict[str, float]
    monthly_totals: dict[str, float]


class CategorizationRule(BaseModel):
    category: str
    keywords: List[str] = Field(default_factory=list)
