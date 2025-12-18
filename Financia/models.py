from django.db import models

# Modelo de categoria para receitas e despesas
class Categoria(models.Model):
    TIPO_CHOICES = (
        ('R', 'Receita'),
        ('D', 'Despesa'),
    )

    nome = models.CharField(max_length=100, unique=True)
    tipo = models.CharField(max_length=1, choices=TIPO_CHOICES)

    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ['nome']

    def __str__(self):
        return f"{self.nome} ({self.get_tipo_display()})"

# Modelo exclusivo para Receitas
class Receita(models.Model):
    descricao = models.CharField(max_length=200)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateField()
    # Filtramos para aceitar apenas categorias de Receita
    categoria = models.ForeignKey(
        Categoria, 
        on_delete=models.CASCADE, 
        limit_choices_to={'tipo': 'R'}
    )

    def __str__(self):
        return f"Receita: {self.descricao} - {self.valor}"
    
    # Modelo exclusivo para Despesas
class Despesa(models.Model):
    descricao = models.CharField(max_length=200)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data = models.DateField()
    # Filtramos para aceitar apenas categorias de Despesa
    categoria = models.ForeignKey(
        Categoria, 
        on_delete=models.CASCADE, 
        limit_choices_to={'tipo': 'D'}
    )

    def __str__(self):
        return f"Despesa: {self.descricao} - {self.valor}"