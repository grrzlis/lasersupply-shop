import pathlib
import subprocess

p = pathlib.Path.home() / 'AppData/Local/Temp/lasersupply-database-url.txt'
raw = p.read_text(encoding='utf-8').strip()
print('Raw url has sslmode?', 'sslmode' in raw)

cmd = f'az containerapp secret set --name lasersupply-shop --resource-group rg-the-gist --secrets "database-url={raw}"'
res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
print('STDOUT:', res.stdout)
print('STDERR:', res.stderr)
