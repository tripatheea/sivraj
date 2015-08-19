import os

files = [f for f in os.listdir('.') if os.path.isfile(f)]

names = ""

for f in files:
	if '.py' not in f:
		names += "'{}', ".format(f)

print names