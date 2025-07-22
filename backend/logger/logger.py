import logging
import os


log_level = os.getenv("LOG_LEVEL", "INFO").upper()  

logger = logging.getLogger("petlandF5")
logger.setLevel(getattr(logging, log_level, logging.INFO))

if not logger.handlers:
    console_handler = logging.StreamHandler()
    console_handler.setLevel(getattr(logging, log_level, logging.INFO))
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(name)s - %(message)s')
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    
    file_handler = logging.FileHandler('app.log')
    file_handler.setLevel(getattr(logging, log_level, logging.INFO))
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
