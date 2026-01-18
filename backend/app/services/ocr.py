from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from io import BytesIO
from typing import Iterable
import uuid

import boto3

from app.services.parser import categorize_income, parse_textract_tables


@dataclass
class OCRResult:
    statement_id: str
    transactions: list[dict]


class TextractClient:
    def __init__(self, region_name: str | None = None) -> None:
        self.client = boto3.client("textract", region_name=region_name)

    def analyze(self, file_bytes: bytes) -> dict:
        response = self.client.analyze_document(
            Document={"Bytes": file_bytes},
            FeatureTypes=["TABLES", "FORMS"],
        )
        return response


def extract_income_from_statement(
    file_bytes: bytes,
    region_name: str | None = None,
) -> OCRResult:
    textract = TextractClient(region_name=region_name)
    response = textract.analyze(file_bytes)
    transactions = parse_textract_tables(response)
    categorized = [categorize_income(txn) for txn in transactions]
    return OCRResult(statement_id=str(uuid.uuid4()), transactions=categorized)
