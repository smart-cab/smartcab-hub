FROM python:alpine3.17

ENV PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.6.1

WORKDIR /app

RUN apk upgrade --no-cache && apk add --no-cache libgcc gcc musl-dev bind-tools yaml-dev

RUN pip install --no-cache-dir "poetry==$POETRY_VERSION"

COPY pyproject.toml .env README.md .
RUN poetry config --no-cache virtualenvs.create false && poetry install --no-cache --no-root --no-interaction --no-ansi --only main

# COPY pyproject.toml poetry.lock .env backend .
COPY backend ./backend
RUN poetry install --no-cache --no-interaction --no-ansi --only main

CMD ["poetry", "run", "python", "backend/run.py"]
EXPOSE ${SERVER_PORT}
