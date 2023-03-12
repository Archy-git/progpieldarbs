# Programmēšana II pielaides darbs
## Projekta palaišana
### Prasības
Python, Node, git
### Jāklonē repozitorijs
- Izveido tukšu mapi un ar `cd` pieslēdzies tai
- Ieraksti sekojošo komandu terminālī, lai klonētu projektu
```bash
git clone https://github.com/Archy-git/progpieldarbs
```
## Backend
### Lai izveidotu virtuālo vidi un instalētu visas prasības izmantojot cmd nokļūsti ./backend mapē un izpildi sekojošās komandas
	py -m venv venv
	venv\Scripts\activate
	pip install -r requirements.txt

### Lai uzstādītu jaunu projektu ievadi šo komadu
    py manage.py migrate

### Lai izveidotu Django administrēšanas superlietotāju portālā http://127.0.0.1:8000/admin/
    py manage.py createsuperuser

### Lai izmaiņas stātos spēkā
    manage.py makemigrations 
    manage.py migrate

### Lai startētu serveri
    py manage.py runserver

## Frontend
### Lai instalētu visas prasības izmantojot cmd nokļūsti ./frontend mapē un izpildi sekojošās komandas
	npm i

### Lai startētu aplikāciju
    npm run start
