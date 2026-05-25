# Mounts all v1 routes
from fastapi import APIRouter

from app.api.v1.transactions import router as transactions_router
from app.api.v1.accounts import router as accounts_router
from app.api.v1.analytics import router as analytics_router
from app.api.v1.webhooks import router as webhooks_router


api_router = APIRouter()

api_router.include_router(
    transactions_router,
    prefix="/transactions",
    tags=["Transactions"],
)

api_router.include_router(
    accounts_router,
    prefix="/accounts",
    tags=["Accounts"],
)

api_router.include_router(
    analytics_router,
    prefix="/analytics",
    tags=["Analytics"],
)

api_router.include_router(
    webhooks_router,
    prefix="/webhooks",
    tags=["Webhooks"],
)