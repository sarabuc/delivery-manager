from __future__ import annotations

from collections import defaultdict
from datetime import datetime
from typing import Iterable

INCOME_KEYWORDS = {
    "Salary": ["payroll", "salary", "wages", "direct deposit"],
    "Scholarship": ["scholarship", "grant", "fellowship"],
    "Dividends": ["dividend", "interest"],
    "Government Benefits": ["benefit", "ssa", "stimulus", "refund"],
    "Freelance": ["invoice", "client", "contract", "consulting"],
}


def parse_textract_tables(response: dict) -> list[dict]:
    blocks = response.get("Blocks", [])
    tables = [block for block in blocks if block.get("BlockType") == "TABLE"]
    transactions: list[dict] = []
    for table in tables:
        rows = _extract_rows(blocks, table)
        for row in rows:
            if len(row) < 3:
                continue
            date_str, description, amount_str = row[0], row[1], row[-1]
            amount = _parse_amount(amount_str)
            if amount <= 0:
                continue
            try:
                parsed_date = datetime.strptime(date_str.strip(), "%m/%d/%Y").date()
            except ValueError:
                continue
            transactions.append(
                {
                    "date": parsed_date,
                    "description": description.strip(),
                    "amount": amount,
                }
            )
    return transactions


def categorize_income(txn: dict) -> dict:
    description = txn["description"].lower()
    for category, keywords in INCOME_KEYWORDS.items():
        if any(keyword in description for keyword in keywords):
            return {**txn, "category": category}
    return {**txn, "category": "Other"}


def summarize_income(transactions: list[dict]) -> dict:
    by_category = defaultdict(float)
    monthly_totals = defaultdict(float)
    total_income = 0.0
    for txn in transactions:
        total_income += txn["amount"]
        by_category[txn["category"]] += txn["amount"]
        month_key = txn["date"].strftime("%Y-%m")
        monthly_totals[month_key] += txn["amount"]
    months = max(1, len(monthly_totals))
    average_monthly_income = total_income / months
    return {
        "total_income": total_income,
        "average_monthly_income": average_monthly_income,
        "by_category": dict(by_category),
        "monthly_totals": dict(monthly_totals),
    }


def _parse_amount(raw: str) -> float:
    normalized = raw.replace("$", "").replace(",", "").strip()
    if normalized.startswith("(") and normalized.endswith(")"):
        normalized = f"-{normalized[1:-1]}"
    try:
        return float(normalized)
    except ValueError:
        return 0.0


def _extract_rows(blocks: list[dict], table: dict) -> list[list[str]]:
    relationships = table.get("Relationships", [])
    cell_ids = [
        rel.get("Ids", []) for rel in relationships if rel.get("Type") == "CHILD"
    ]
    cell_ids = [cell_id for sublist in cell_ids for cell_id in sublist]
    cells = [block for block in blocks if block.get("Id") in cell_ids]
    rows: dict[int, list[str]] = defaultdict(list)
    for cell in cells:
        row_index = cell.get("RowIndex")
        text = _extract_text(blocks, cell)
        rows[row_index].append(text)
    return [rows[idx] for idx in sorted(rows.keys())]


def _extract_text(blocks: list[dict], cell: dict) -> str:
    relationships = cell.get("Relationships", [])
    word_ids = [
        rel.get("Ids", []) for rel in relationships if rel.get("Type") == "CHILD"
    ]
    word_ids = [word_id for sublist in word_ids for word_id in sublist]
    words = [block for block in blocks if block.get("Id") in word_ids]
    return " ".join(word.get("Text", "") for word in words)
