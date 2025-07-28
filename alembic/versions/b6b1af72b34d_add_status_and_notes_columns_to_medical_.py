"""Add status and notes columns to Medical_history table

Revision ID: b6b1af72b34d
Revises: a1391c706461
Create Date: 2025-07-27 20:14:14.736816

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b6b1af72b34d'
down_revision: Union[str, Sequence[str], None] = 'a1391c706461'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Agregar columna status
    op.add_column('Medical_history', sa.Column('status', sa.String(50), nullable=True, server_default='activo'))
    
    # Agregar columna notes
    op.add_column('Medical_history', sa.Column('notes', sa.Text(), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    # Eliminar columna notes
    op.drop_column('Medical_history', 'notes')
    
    # Eliminar columna status
    op.drop_column('Medical_history', 'status')
