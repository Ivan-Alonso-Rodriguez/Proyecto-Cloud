from fastapi import APIRouter
from app.models.historia import armar_historia_clinica

router = APIRouter()

@router.get("/historia", tags=["Historia Clínica"])
def obtener_todas_las_historias():
    from app.services.ms2 import get_all_consultas
    historias = []
    for consulta in get_all_consultas():
        historia = armar_historia_clinica(consulta["id"])
        if "error" not in historia:
            historias.append(historia)
    return historias

@router.get("/historia/{consulta_id}", tags=["Historia Clínica"])
def obtener_historia_clinica(consulta_id: int):
    historia = armar_historia_clinica(consulta_id)
    if "error" in historia:
        return {"detail": historia["error"]}
    return historia

