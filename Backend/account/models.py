from django.db import models

class Order(models.Model):
    ORDER_ID_START = 1001
    
    DRESS_TYPES = [
        ('SHIRT', 'Shirt'),
        ('SUIT', 'Suit'),
    ]
    
    ORDER_STATUSES = [
        ('STARTED', 'Started'),
        ('PENDING', 'Pending'),
        ('FINISHED', 'Finished'),
    ]

    order_id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=255)
    customer_contact_number = models.CharField(max_length=15)
    dress_type = models.CharField(max_length=5, choices=DRESS_TYPES)
    shoulder = models.DecimalField(max_digits=5, decimal_places=2)
    bustline = models.DecimalField(max_digits=5, decimal_places=2)
    chest = models.DecimalField(max_digits=5, decimal_places=2)
    round = models.DecimalField(max_digits=5, decimal_places=2)
    height_of_dress = models.DecimalField(max_digits=5, decimal_places=2)
    amount_per_piece = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    advance_amount = models.DecimalField(max_digits=10, decimal_places=2)
    comment = models.TextField(blank=True, null=True)
    tailor_name = models.CharField(max_length=255)
    order_date = models.DateField(auto_now_add=True)
    finishing_date = models.DateField()
    sketch_picture = models.ImageField(upload_to='sketches/', blank=True, null=True)
    order_status = models.CharField(max_length=8, choices=ORDER_STATUSES, default='STARTED')
    
    def save(self, *args, **kwargs):
        if not self.order_id:
            last_order = Order.objects.all().order_by('-order_id').first()
            if last_order:
                self.order_id = last_order.order_id + 1
            else:
                self.order_id = self.ORDER_ID_START
        super(Order, self).save(*args, **kwargs)


    
    def __str__(self):
        return f"Order {self.order_id} - {self.customer_name}"
