from app.services.ms1 import get_mascota_by_id, get_propietario_by_id
from app.services.ms2 import get_consulta_by_id
from app.services.ms3 import get_images_by_consulta

def armar_historia_clinica(consulta_id):
    consulta = get_consulta_by_id(consulta_id)
    if not consulta:
        return {"error": "Consulta no encontrada"}

    mascota = get_mascota_by_id(consulta.get("mascotaId"))
    if not mascota:
        return {
            "consulta": consulta,
            "mascota": None,
            "propietario": None,
            "imagenes": get_images_by_consulta(consulta_id)
        }

    propietario_id = mascota.get("propietario")
    propietario = get_propietario_by_id(propietario_id) if propietario_id is not None else None
    imagenes = get_images_by_consulta(consulta_id)

    return {
        "consulta": consulta,
        "mascota": mascota,
        "propietario": propietario,
        "imagenes": imagenes,
    }
