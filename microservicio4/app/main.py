from fastapi import FastAPI
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware 
from app.api.routes import router
from fastapi.openapi.docs import get_swagger_ui_html

app = FastAPI(
    title="Microservicio 4",
    description="Documentación Swagger personalizada",
    version="1.0.0",
    docs_url=None,       # Desactivamos FastAPI por defecto
    redoc_url=None,
    openapi_url="/openapi.json"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/swagger", include_in_schema=False)
async def custom_swagger_ui():
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title="Documentación Clínica - Swagger UI"
    )

@app.get("/", response_class=PlainTextResponse)
async def root():
    return "OK"

app.include_router(router)
