# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-07-27 06:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comments',
            old_name='parrent_id',
            new_name='parent_id',
        ),
        migrations.AddField(
            model_name='posts',
            name='last_modified',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='comments',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]