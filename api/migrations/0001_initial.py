# Generated by Django 4.2.13 on 2024-05-20 06:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='College',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('Vels University', 'Vels University'), ('Crescent', 'Crescent'), ('Jamal Mohamad', 'Jamal Mohamad'), ('Malla Reddy', 'Malla Reddy')], max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='CourseItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('pdf', models.FileField(upload_to='path-to-file')),
                ('videos', models.FileField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('year', models.SmallIntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4')], default=1)),
                ('college', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.college')),
            ],
        ),
    ]