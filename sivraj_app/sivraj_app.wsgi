import sys

sys.path.insert(0, '/var/www/html/sivraj/sivraj_app/sivraj_app.wsgi')
sys.path.insert(0, '/var/www/html/sivraj/sivraj_app')

from sivraj_app import app as application