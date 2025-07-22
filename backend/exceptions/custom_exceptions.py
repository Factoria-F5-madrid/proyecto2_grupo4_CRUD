from fastapi import HTTPException

class NotFoundException(HTTPException):
    def __init__(self, detail="Not Found"):
        super().__init__(status_code=404, detail=detail)

class BadRequestException(HTTPException):
    def __init__(self, detail="Bad Request"):
        super().__init__(status_code=400, detail=detail)
