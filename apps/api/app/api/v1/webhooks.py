from fastapi import APIRouter

router = APIRouter()


@router.post("/paystack")
async def paystack_webhook():
    return {
        "status": "received"
    }