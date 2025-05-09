from django.db import models

class Propietario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'propietario'  # <- nombre exacto de la tabla existente

class Mascota(models.Model):
    nombre = models.CharField(max_length=100)
    especie = models.CharField(max_length=50)
    raza = models.CharField(max_length=50)
    edad = models.PositiveIntegerField()
    propietario = models.ForeignKey(
        Propietario,
        related_name='mascotas',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.nombre} ({self.especie})"

    class Meta:
        db_table = 'mascota'  # <- nombre exacto de la tabla existente
