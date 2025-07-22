from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from backend.exceptions.custom_exceptions import NotFoundException, BadRequestException
from backend.logger.logger import logger

def register_exception_handlers(app):

    @app.exception_handler(NotFoundException)
    async def not_found_exception_handler(request: Request, exc: NotFoundException):
        logger.warning(f"[404] {exc.detail} at {request.url}")
        return JSONResponse(status_code=404, content={"error": exc.detail})

    @app.exception_handler(BadRequestException)
    async def bad_request_exception_handler(request: Request, exc: BadRequestException):
        logger.warning(f"[400] {exc.detail} at {request.url}")
        return JSONResponse(status_code=400, content={"error": exc.detail})

      @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException):
        logger.warning(f"[{exc.status_code}] {exc.detail} at {request.url}")
        return JSONResponse(status_code=exc.status_code, content={"error": exc.detail})

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        logger.warning(f"[422] Validation error: {exc.errors()} at {request.url}")
        return JSONResponse(
            status_code=422,
            content={"error": "Validation failed", "details": exc.errors()},
        )    

    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        logger.error(f"[500] Unexpected error at {request.url}: {exc}", exc_info=True)
        return JSONResponse(status_code=500, content={"error": "Internal Server Error"})
