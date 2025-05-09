from fastapi import FastAPI
from fastapi.responses import PlainTextResponse
from app.api.routes import router

app = FastAPI(
    title="Microservicio 4",
    description="Documentación Swagger personalizada",
    version="1.0.0",
    docs_url="/swagger",
    redoc_url=None
)

# Agrega para health chec
@app.get("/", response_class=PlainTextResponse)
async def root():
    return "OK"
    
app.include_router(router)
