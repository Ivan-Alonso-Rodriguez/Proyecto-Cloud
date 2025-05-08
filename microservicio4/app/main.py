from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="Microservicio 4",
    description="Documentación Swagger personalizada",
    version="1.0.0",
    docs_url="/swagger",
    redoc_url=None
)

app.include_router(router)
