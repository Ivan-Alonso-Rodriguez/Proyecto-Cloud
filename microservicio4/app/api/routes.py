from fastapi import APIRouter
from app.models.historia import armar_historia_clinica

router = APIRouter()

@router.get("/historia/{consulta_id}", tags=["Historia Clínica"])
def obtener_historia_clinica(consulta_id: int):
    historia = armar_historia_clinica(consulta_id)
    if "error" in historia:
        return {"detail": historia["error"]}
    return historia
