import sys

sys.path.insert(0, '/var/www/html/sivraj/sivraj_nlp/sivraj_nlp.wsgi')
sys.path.insert(0, '/var/www/html/sivraj/sivraj_nlp')

from sivraj_nlp import app as application