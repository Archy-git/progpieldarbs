from django.db import models

class Expense(models.Model):
    id = models.AutoField(primary_key=True)
    user_id =  models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    currency = models.CharField(max_length=20)
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)