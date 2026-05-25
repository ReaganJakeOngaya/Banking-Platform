import uuid

from sqlalchemy import Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel

class Account(BaseModel):
    __tablename__ = "accounts"
    
    id:Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        index=True
        
    )
    
    business_name: Mapped[str] = mapped_column(
        String(255), 
        nullable=False
    
    )
    
    email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        unique=True,
        index=True
    )
    
    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )
    
    api_key: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        unique=True,
        index=True
    )
    
    balance: Mapped[float] = mapped_column(
        Numeric(12, 2),
        nullable=False,
        default=0.00
    )
    
    transactions = relationship(
        "Transaction",
        back_populates="account",
        cascade="all, delete-orphan"
        
    )
             