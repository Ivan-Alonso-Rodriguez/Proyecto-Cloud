from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from pacientes.views import PropietarioViewSet, MascotaViewSet
from django.http import HttpResponse

router = routers.DefaultRouter()
router.register(r'propietarios', PropietarioViewSet)
router.register(r'mascotas', MascotaViewSet)

schema_view = get_schema_view(
   openapi.Info(
      title="API Pacientes",
      default_version='v1',
      description="Documentación de Swagger",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

def health_check(request):
    return HttpResponse("OK", status=200)

urlpatterns = [
   path('', health_check),  # <- esto responde 200 en "/"
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('admin/', admin.site.urls),
   path('api/', include(router.urls)),
]
