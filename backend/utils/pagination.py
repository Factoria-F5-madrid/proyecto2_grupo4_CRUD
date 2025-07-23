from sqlalchemy import Select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Any

async def paginate(
    query: Select,
    db: AsyncSession,
    page: int = 1,
    limit: int = 10
) -> dict[str, Any]:
    offset = (page - 1) * limit

    total_result = await db.execute(query)
    total_items = len(total_result.scalars().all())

    paginated_result = await db.execute(query.offset(offset).limit(limit))
    items = paginated_result.scalars().all()

    return {
        "total": total_items,
        "page": page,
        "limit": limit,
        "items": items
    }