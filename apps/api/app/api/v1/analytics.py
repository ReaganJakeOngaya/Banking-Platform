from fastapi import APIRouter

router = APIRouter()


@router.get("/summary")
async def analytics_summary():
    return {
        "revenue": 125000,
        "transactions": 12340,
        "success_rate": 98.5
    }