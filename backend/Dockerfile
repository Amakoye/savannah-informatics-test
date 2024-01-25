FROM python:3.10.12

ENV PYTHONUNBUFFERED 1

RUN git clone https://github.com/Amakoye/savannah-informatics-test.git 

WORKDIR /savannah-informatics-test/backend

RUN ls .

RUN pip install -r requirements.txt

VOLUME /savannah-informatics/savannah-informatics-test/backend

EXPOSE 8080

CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000

