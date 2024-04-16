import os
import logging


def get_default_eval_types() -> list[str]:
    if not (base_types := os.getenv("BASE_EVAL_TYPES")):
        logging.error("Can't get base eval types from dotenv file")
        return ['']
    return base_types.split(":")


