from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions, routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from orquestador.views import TuVistaViewSet

router = routers.DefaultRouter()
router.register(r'tuvista', TuVistaViewSet)

schema_view = get_schema_view(
   openapi.Info(
      title="API Orquestador",
      default_version='v1',
      description="Documentación Swagger del Microservicio 4",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('admin/', admin.site.urls),
   path('api/', include(router.urls)),
]
